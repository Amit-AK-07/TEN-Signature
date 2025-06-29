from django.db import models
from django.utils.text import slugify
import json

class OutletForm(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    outlet_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    max_budget = models.BigIntegerField()
    min_size = models.IntegerField()
 
    def __str__(self):
        return f"{self.name} - {self.email}"

# from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    contact_number = models.CharField(max_length=15)
    profile_image = models.URLField()
    display_name = models.CharField(max_length=100)

    def __str__(self):
        return self.display_name

class Property(models.Model):
    SALE_CHOICES = (
        (0, 'Rent'),
        (1, 'Sale'),
    )

    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='properties')
    price = models.BigIntegerField()
    price_format = models.CharField(max_length=100)
    address = models.TextField()
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=True)
    premium_property = models.BooleanField(default=False)
    price_duration = models.CharField(max_length=100, null=True, blank=True)
    property_image = models.URLField()
    property_for = models.IntegerField(choices=SALE_CHOICES, default=1)
    advertisement_property = models.BooleanField(null=True, blank=True)
    advertisement_property_date = models.DateTimeField(null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='properties')
    sqft = models.IntegerField()
    brand_name = models.CharField(max_length=255, null=True, blank=True)
    current_rental = models.BigIntegerField(null=True, blank=True)
    monthly_sale = models.BigIntegerField(null=True, blank=True)
    age_of_property = models.IntegerField(null=True, blank=True)
    latitude = models.CharField(max_length=50, null=True, blank=True)
    longitude = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=100, default="India")
    state = models.CharField(max_length=100, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='properties')

    def __str__(self):
        return self.name

class PropertyGallery(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='gallery')
    image_url = models.URLField()

    def __str__(self):
        return f"Image for {self.property.name}"

class PropertyAmenity(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='amenities')
    name = models.CharField(max_length=100)
    value = models.JSONField()  # to store list like ["First", "Second"]
    type = models.CharField(max_length=50)  # like checkbox
    amenity_image = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} for {self.property.name}"






# class Favorite(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     property = models.ForeignKey(Property, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.property.name}"

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)

class ServiceSubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)

class Provider(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField()
    about = models.TextField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

class Attachment(models.Model):
    url = models.URLField()

class Service(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True)
    subcategory = models.ForeignKey(ServiceSubCategory, on_delete=models.SET_NULL, null=True)
    provider = models.ForeignKey(Provider, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=20)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.TimeField()
    status = models.IntegerField(default=1)
    description = models.TextField()
    is_featured = models.BooleanField(default=False)
    city_id = models.IntegerField()
    attchments = models.ManyToManyField(Attachment)
    total_review = models.IntegerField(default=0)
    total_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    is_favourite = models.BooleanField(default=False)
    attchment_extension = models.BooleanField(default=True)
    is_slot = models.BooleanField(default=False)
    visit_type = models.CharField(max_length=50)
    is_enable_advance_payment = models.BooleanField(default=False)
    advance_payment_amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    moq = models.IntegerField()

class Slot(models.Model):
    day = models.CharField(max_length=10)
    slot = models.JSONField(default=list)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='slots')

#details page for service

class ServiceFAQ(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="faqs")
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ServiceAddon(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="addons")
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True, null=True)
    status = models.BooleanField(default=True)

class ProviderAddress(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="addresses")
    address = models.CharField(max_length=255)
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    status = models.BooleanField(default=True)

class Tax(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name="taxes")
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=20)  # e.g., 'percent', 'fixed'
    value = models.DecimalField(max_digits=6, decimal_places=2)
