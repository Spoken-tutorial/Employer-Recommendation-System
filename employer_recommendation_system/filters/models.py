from django.db import models

# Create your models here.
class FossSuperCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    specialisation = models.CharField(max_length=255, default='Programming Language')

    def __str__(self):
        return self.name
    
class FossCategory(models.Model):
    foss = models.CharField(unique=True, max_length=255)
    status = models.IntegerField()
    is_learners_allowed = models.IntegerField()
    show_on_homepage = models.PositiveSmallIntegerField()
    category = models.ManyToManyField(FossSuperCategory)

    def __str__(self):
        return self.foss

class Degree(models.Model): # degrees like BTech, BSc etc
    name = models.CharField(unique=True, max_length=255)

    def __str__(self):
        return self.name

class Discipline(models.Model): # branch like Mechanical , Arts etc
    name = models.CharField(unique=True, max_length=255)

    def __str__(self):
        return self.name

class InstituteType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class State(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class City(models.Model):
    state = models.ForeignKey(State, on_delete=models.PROTECT )
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class GraduationYear(models.Model):
    year = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.year)