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

class Service(models.Model):
    title = models.CharField(max_length=200)
    photographer = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    per_item_price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='services/')
    description = models.TextField()
    featured = models.BooleanField(default=False)
    is_onsite = models.BooleanField(default=True)
    photos_covered = models.IntegerField(default=0)  # "15 items covered"
    slug = models.SlugField(unique=True, blank=True)
    # any additional fields like props, add-ons, etc.

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

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







# class Listing(models.Model):
#     title = models.CharField(max_length=255)
#     city = models.CharField(max_length=100)
#     state = models.CharField(max_length=100)
#     country = models.CharField(max_length=100, default='India')
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     area_sqft = models.PositiveIntegerField()
#     property_type = models.CharField(max_length=100)
#     year_built = models.IntegerField()
#     monthly_sales = models.DecimalField(max_digits=10, decimal_places=2)
#     current_rental = models.DecimalField(max_digits=10, decimal_places=2)
#     age_of_property = models.CharField(max_length=100)
#     features = models.TextField(blank=True)
#     slug = models.SlugField(unique=True, blank=True)
#     location = models.CharField(max_length=100) 
#     thumbnail = models.ImageField(upload_to='listing_thumbs/')

#     def __str__(self):
#         return self.title

#     # Optional: helper to get features as list
#     def get_features(self):
#         try:
#             return json.loads(self.features)
#         except json.JSONDecodeError:
#             return []
    
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.title)
#         super().save(*args, **kwargs)

#     def get_lat_lng(self):
#         try:
#             lat, lng = self.location.split(",")
#             return float(lat.strip()), float(lng.strip())
#         except ValueError:
#             return None, None