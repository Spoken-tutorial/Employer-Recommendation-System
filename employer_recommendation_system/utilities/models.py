from django.db import models

# Create your models here.
class FossCategory(models.Model):
    foss = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    status = models.BooleanField(max_length=2)
    is_learners_allowed = models.BooleanField(max_length=2,default=0 )
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    show_on_homepage = models.PositiveSmallIntegerField(default=0, help_text ='0:Series, 1:Display on home page, 2:Archived')
    
    class Meta(object):
        verbose_name = 'FOSS'
        verbose_name_plural = 'FOSSes'
        ordering = ('foss', )

    def __str__(self):
        return self.foss

class State(models.Model):
  code = models.CharField(max_length=3)
  name = models.CharField(max_length=50)
  slug = models.CharField(max_length = 100)
  latitude = models.DecimalField(
    null=True,
    max_digits=10,
    decimal_places=4,
    blank=True
  )
  longtitude = models.DecimalField(
    null=True,
    max_digits=10,
    decimal_places=4,
    blank=True
  )
  img_map_area = models.TextField()
  has_map = models.BooleanField(default=1)
  created = models.DateTimeField(auto_now_add = True, null=True)
  updated = models.DateTimeField(auto_now = True, null=True)

  def __str__(self):
    return self.name

  class Meta(object):
    unique_together = (("code","name"),)

class District(models.Model):
  state = models.ForeignKey(State, on_delete=models.PROTECT )
  code = models.CharField(max_length=3)
  name = models.CharField(max_length=200)
  created = models.DateTimeField(auto_now_add = True, null=True)
  updated = models.DateTimeField(auto_now = True, null=True)

  def __str__(self):
    return self.name

  class Meta(object):
    unique_together = (("state", "code","name"),)
    #unique_together = (("state_id","name"),)


class City(models.Model):
  state = models.ForeignKey(State, on_delete=models.PROTECT )
  name = models.CharField(max_length=200)
  created = models.DateTimeField(auto_now_add = True, null=True)
  updated = models.DateTimeField(auto_now = True, null=True)

  def __str__(self):
    return self.name

  class Meta(object):
    unique_together = (("name","state"),)


class InstituteType(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name

class Location(models.Model):
   city = models.ForeignKey(City, on_delete=models.CASCADE)
  #  district = models.ForeignKey(District, on_delete=models.CASCADE)
   state = models.ForeignKey(State, on_delete=models.CASCADE)
   address = models.CharField(max_length=250) #Company Address for correspondence
   pincode = models.CharField(max_length=6)
   created = models.DateTimeField(auto_now_add = True)
   updated = models.DateTimeField(auto_now = True)