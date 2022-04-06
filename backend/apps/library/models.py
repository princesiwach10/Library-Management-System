from django.db import models

class Book(models.Model): 
    name = models.CharField(max_length=25, blank=False, null=False)
    section = models.CharField(max_length=25, blank=False, null=False)

    def __str__(self) :
        return self.name
