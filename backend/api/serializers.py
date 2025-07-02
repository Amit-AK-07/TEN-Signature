from rest_framework import serializers
from .models import (
    OutletForm, Property, Category, City, PropertyGallery, PropertyAmenity, Customer,
    Service, Attachment, Slot, ServiceFAQ, ServiceAddon, Tax, ProviderAddress,
    Provider, Coupon, ServiceReview, CustomerService, ServiceAddressMapping,ServiceCategory, ServiceSubCategory 
)
from django.contrib.auth import get_user_model
import re

User = get_user_model()

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

class OutletFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutletForm
        fields = '__all__'

class SendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email__iexact=value.strip()).exists():
            raise serializers.ValidationError("Email not registered. Please register first.")
        return value.strip()

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)

class RegisterUserSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()

    def to_internal_value(self, data):
        new_data = {}
        for key, value in data.items():
            new_key = camel_to_snake(key)
            new_data[new_key] = value
        return super().to_internal_value(new_data)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']

class PropertySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    city = CitySerializer()

    class Meta:
        model = Property
        fields = [
            'id',
            'name',
            'category',
            'price',
            'price_format',
            'address',
            'status',
            'premium_property',
            'price_duration',
            'property_image',
            'property_for',
            'advertisement_property',
            'advertisement_property_date',
            'city',
            'sqft',
        ]


class PropertyGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyGallery
        fields = ['id', 'image_url']

class PropertyAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAmenity
        fields = ['id', 'name', 'type', 'value', 'amenity_image']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class PropertyDetailSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    city = serializers.StringRelatedField()
    gallery = PropertyGallerySerializer(many=True, read_only=True)
    amenities = PropertyAmenitySerializer(many=True, read_only=True)
    customer = CustomerSerializer()

    class Meta:
        model = Property
        fields = '__all__'


#SERVICE SERIALIZERS

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'url']

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['day', 'slot']

class ProviderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderAddress
        fields = ['id', 'provider_id', 'address', 'latitude', 'longitude', 'status', 'created_at', 'updated_at', 'deleted_at']

class ProviderAddressMappingSerializer(serializers.ModelSerializer):
    provider_address_mapping = ProviderAddressSerializer(read_only=True, source='provider_address')

    class Meta:
        model = ServiceAddressMapping
        fields = ['id', 'service_id', 'provider_address_id', 'created_at', 'updated_at', 'provider_address_mapping']

class ServiceFAQSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(source='service.id', read_only=True)
    class Meta:
        model = ServiceFAQ
        fields = ['id', 'title', 'description', 'status', 'service_id', 'created_at', 'updated_at']

class ServiceAddonSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField(source='service.id', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)

    class Meta:
        model = ServiceAddon
        fields = ['id', 'name', 'service_id', 'service_name', 'price', 'status', 'serviceaddon_image']

class TaxSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tax
        fields = ['id', 'provider_id', 'title', 'type', 'value']


class ProviderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provider
        fields = [
            'id', 'first_name', 'last_name', 'username', 'provider_id', 'status',
            'description', 'user_type', 'email', 'contact_number', 'country_id',
            'state_id', 'city_id', 'city_name', 'address', 'providertype_id',
            'providertype', 'is_featured', 'display_name', 'created_at',
            'updated_at', 'deleted_at', 'profile_image', 'time_zone', 'uid',
            'login_type', 'service_address_id', 'last_notification_seen',
            'providers_service_rating', 'total_service_rating', 'handyman_rating',
            'is_verify_provider', 'isHandymanAvailable', 'designation',
            'handymantype_id', 'handyman_type', 'handyman_commission',
            'known_languages', 'skills', 'is_favourite', 'total_services_booked',
            'why_choose_me', 'is_subscribe', 'is_email_verified'
        ]


class ServiceSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    subcategory_id = serializers.IntegerField(source='subcategory.id', read_only=True)
    provider_id = serializers.IntegerField(source='provider.id', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    provider_name = serializers.CharField(source='provider.display_name', read_only=True)
    provider_image = serializers.CharField(source='provider.profile_image', read_only=True)
    price_format = serializers.SerializerMethodField()
    attchments = serializers.SerializerMethodField()
    attchments_array = AttachmentSerializer(source='attchments', many=True, read_only=True) 
    total_rating = serializers.DecimalField(max_digits=5, decimal_places=2, read_only=True)
    slots = SlotSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'category_id', 'subcategory_id', 'provider_id', 'price',
            'price_format', 'type', 'discount', 'duration', 'status', 'description',
            'is_featured', 'provider_name', 'provider_image', 'category_name',
            'subcategory_name', 'attchments', 'attchments_array',
            'total_review', 'total_rating', 'is_favourite', 'attchment_extension',
            'slots', 'visit_type', 'is_enable_advance_payment', 'advance_payment_amount', 'moq'
        ]

    def get_price_format(self, obj):
        return f"₹{obj.price:.2f}"

    def get_attchments(self, obj):
        return [attachment.url for attachment in obj.attchments.all()]


class RelatedServiceMiniSerializer(ServiceSerializer):
    service_address_mapping = ProviderAddressMappingSerializer(many=True, read_only=True, source='service_addresses')

    class Meta(ServiceSerializer.Meta):
        fields = [
            'id', 'name', 'category_id', 'subcategory_id', 'provider_id', 'price',
            'price_format', 'type', 'discount', 'duration', 'status', 'description',
            'is_featured', 'provider_name', 'provider_image', 'category_name',
            'subcategory_name', 'attchments', 'attchments_array',
            'total_review', 'total_rating', 'is_favourite','service_address_mapping','attchment_extension',
            'slots', 'visit_type', 'is_enable_advance_payment', 'advance_payment_amount', 'moq'
        ]


class ServiceDetailSerializer(ServiceSerializer):
    provider = ProviderDetailSerializer(read_only=True)
    service_address_mapping = ProviderAddressMappingSerializer(many=True, read_only=True, source='service_addresses')

    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['provider', 'service_address_mapping']


class CustomerServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerService
        fields = ['id', 'name', 'email', 'contact', 'profile_image']

class ServiceReviewSerializer(serializers.ModelSerializer):
    customer = CustomerServiceSerializer(read_only=True)

    class Meta:
        model = ServiceReview
        fields = ['id', 'customer', 'rating', 'comment', 'created_at']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'discount_type', 'discount_value', 'min_order_amount', 'expiry_date', 'is_active']

# New serializers for ServiceCategory and ServiceSubCategory if needed for other views
class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'image']

class ServiceSubCategorySerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True) 
    class Meta:
        model = ServiceSubCategory
        fields = ['id', 'name', 'category', 'image']