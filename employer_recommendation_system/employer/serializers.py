from django.db import transaction
from rest_framework import serializers
from emp.models import JobDetail, JobEligiblCity, JobEligibleState, JobEligibleFoss, Employer, Company
from common.models import State, City
from spoken.models import FossCategory
from common.utils import is_employer, is_past, is_admin
from datetime import datetime, timedelta


class JobCreateSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), many=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    eligible_states = serializers.PrimaryKeyRelatedField(queryset=State.objects.all(), many=True, write_only=True, required=False)
    eligible_cities = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), many=True, write_only=True, required=False)
    eligible_foss_ids = serializers.ListField(child=serializers.IntegerField(min_value=1), write_only=True, required=False)

    class Meta:
        model = JobDetail
        fields = ['id',
                  "designation", "description", "domain",
                  "salary_range_min", "salary_range_max",
                  "job_type", "status", "requirements", "key_job_responsibilities",
                  "company", "last_app_date", "num_vacancies", "gender", "city",
                  "date_created", "date_updated",
                  "eligible_states", "eligible_cities", "eligible_foss_ids"]
        read_only_fields = ["date_created", "date_updated"]

    def validate_company(self, value):
        request = self.context['request']
        user = request.user
        # if employer, auto set the company
        if is_employer(user):
            try:
                e = Employer.objects.get(user=user)
                if e.status != "approved":
                    raise serializers.ValidationError({"company": "The employer is not approved."})
                return e.company
            except Employer.DoesNotExist:
                raise serializers.ValidationError({"company": "The user is not an employer."})
        return value
    
    def validate_last_app_date(self, value):
        if is_past(dt=value, delta=timedelta(hours=24)):
            raise serializers.ValidationError({"last_app_date": "Last application date should be more than atleast 24 hours from now"})
        return value

    def validate(self, data):
        min_sal = data.get("salary_range_min")
        max_sal = data.get("salary_range_max")
        if min_sal is not None and max_sal is not None and min_sal > max_sal:
            raise serializers.ValidationError({"salary_range_min": "Must be ≤ salary_range_max"})
        return data
    
    def _validate_foss_ids_in_spk(self, foss_ids):
        if not foss_ids:
            return
        existing = set(FossCategory.objects.filter(id__in=foss_ids).values_list('id', flat=True))
        missing = sorted(set(foss_ids) - existing)
        if missing:
            raise serializers.ValidationError({"eligible_foss_ids": f"Invalid FOSS IDs (spk): {missing}"})
        
    @transaction.atomic
    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        #  pull write-only helpers
        elig_states = validated_data.pop("eligible_states", [])
        elig_cities = validated_data.pop("eligible_cities", [])
        elig_foss = validated_data.pop("eligible_foss_ids", [])

        # validate SPK ids
        self._validate_foss_ids_in_spk(elig_foss)

        # create JobDetail
        city_list = validated_data.pop("city", [])
        job = JobDetail.objects.create(**validated_data)

        # set base cities (M2M)
        job.city.set(city_list)

        # build through tables (idempotent)
        if elig_states:
            JobEligibleState.objects.bulk_create(
                [JobEligibleState(job=job, state=s) for s in elig_states],
                ignore_conflicts=True
            )

        if elig_cities:
            JobEligiblCity.objects.bulk_create(
                [JobEligiblCity(job=job, city=c) for c in elig_cities],
                ignore_conflicts=True
            )
        
        if elig_foss:
            JobEligibleFoss.objects.bulk_create(
                [JobEligibleFoss(job=job, spk_foss_id=i) for i in set(elig_foss)],
                 ignore_conflicts=True
            )

        return job
    
