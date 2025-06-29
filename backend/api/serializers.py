from rest_framework import serializers
from .models import OutletForm, Property, Category, City, PropertyGallery, PropertyAmenity, Customer, Service, Attachment, Slot, ServiceFAQ, ServiceAddon, Tax, ProviderAddress, Provider
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
            'id',                      # ❗ Extra field not in your model
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


#service serializers

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'url']

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ['day', 'slot']

class ServiceSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    subcategory_id = serializers.IntegerField(source='subcategory.id', read_only=True)
    provider_id = serializers.IntegerField(source='provider.id', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    provider_name = serializers.CharField(source='provider.name', read_only=True)
    provider_image = serializers.CharField(source='provider.image', read_only=True)
    price_format = serializers.SerializerMethodField()
    attchments = serializers.SlugRelatedField(slug_field='url', many=True, read_only=True)
    attchments_array = AttachmentSerializer(source='attchments', many=True, read_only=True)
    slots = SlotSerializer(many=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'category_id', 'subcategory_id', 'provider_id', 'price',
            'price_format', 'type', 'discount', 'duration', 'status', 'description',
            'is_featured', 'provider_name', 'provider_image', 'city_id', 'category_name',
            'subcategory_name', 'attchments', 'attchments_array', 'total_review',
            'total_rating', 'is_favourite', 'attchment_extension', 'slots', 'visit_type',
            'is_enable_advance_payment', 'advance_payment_amount', 'moq'
        ]

    def get_price_format(self, obj):
        return f"₹{obj.price:.2f}"

#detailed service serializer

class ServiceFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFAQ
        fields = ['title', 'description', 'status', 'created_at']

class ServiceAddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceAddon
        fields = ['name', 'price', 'image', 'status']

class TaxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax
        fields = ['title', 'type', 'value']

class ProviderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderAddress
        fields = ['address', 'latitude', 'longitude', 'status']

class ProviderDetailSerializer(serializers.ModelSerializer):
    addresses = ProviderAddressSerializer(many=True)
    taxes = TaxSerializer(many=True)

    class Meta:
        model = Provider
        fields = ['name', 'image', 'about', 'contact_number', 'email', 'addresses', 'taxes']

class RelatedServiceMiniSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    attchments = serializers.SlugRelatedField(slug_field='url', many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'category_name', 'subcategory_name', 'provider_name', 'attchments']

class ServiceDetailSerializer(ServiceSerializer):
    slots = SlotSerializer(many=True)
    attchments_array = AttachmentSerializer(source='attchments', many=True, read_only=True)
    faqs = ServiceFAQSerializer(many=True, read_only=True)
    addons = ServiceAddonSerializer(many=True, read_only=True)

    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['faqs', 'addons']






