from django.contrib import admin
from .models import OutletForm, Property, City, Category, PropertyGallery, PropertyAmenity, Customer, ServiceCategory, ServiceSubCategory, Provider, Attachment, Slot, Service, ServiceFAQ, ServiceAddon, ProviderAddress, Tax,ServiceAddressMapping,CustomerService,ServiceReview,Coupon,ContactForm,Tag,Blog
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from django.contrib.admin.sites import AlreadyRegistered
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin as DefaultOutstandingTokenAdmin, BlacklistedTokenAdmin as DefaultBlacklistedTokenAdmin

class OutletFormAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'outlet_type', 'location', 'brand', 'max_budget', 'min_size')
    search_fields = ('name', 'email', 'phone', 'brand', 'location')
    list_filter = ('outlet_type', 'brand', 'location')

admin.site.register(OutletForm, OutletFormAdmin)

try:
    admin.site.unregister(OutstandingToken)
except (admin.sites.NotRegistered, AlreadyRegistered):
    pass

try:
    admin.site.unregister(BlacklistedToken)
except (admin.sites.NotRegistered, AlreadyRegistered):
    pass

class CustomOutstandingTokenAdmin(DefaultOutstandingTokenAdmin):
    ordering = ('-created_at',)
    list_display = ('user', 'created_at', 'expires_at', 'token')

    def user(self, obj):
        return obj.user

class CustomBlacklistedTokenAdmin(DefaultBlacklistedTokenAdmin):
    ordering = ('-blacklisted_at',)
    list_display = ('user', 'created_at', 'expires_at', 'blacklisted_at', 'token')

    def user(self, obj):
        return obj.token.user

    def created_at(self, obj):
        return obj.token.created_at

    def expires_at(self, obj):
        return obj.token.expires_at

admin.site.register(OutstandingToken, CustomOutstandingTokenAdmin)
admin.site.register(BlacklistedToken, CustomBlacklistedTokenAdmin)

#listing models
admin.site.register(Property)
admin.site.register(City)
admin.site.register(Category)
admin.site.register(PropertyGallery)
admin.site.register(PropertyAmenity)
admin.site.register(Customer)

class AttachmentInline(admin.TabularInline):
    model = Service.attchments.through
    extra = 1

class SlotInline(admin.TabularInline):
    model = Slot
    extra = 1

class ServiceFAQInline(admin.TabularInline):
    model = ServiceFAQ
    extra = 1

class ServiceAddonInline(admin.TabularInline):
    model = ServiceAddon
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'provider', 'category', 'price', 'status', 'is_featured')
    list_filter = ('category', 'status', 'is_featured', 'visit_type')
    search_fields = ('name', 'description', 'provider__display_name', 'category__name', 'subcategory__name')
    inlines = [
        AttachmentInline,
        SlotInline,
        ServiceFAQInline,
        ServiceAddonInline,
    ]
    fieldsets = (
        (None, {
            'fields': (
                'name', 'description', 'price', 'type', 'discount', 'duration',
                'status', 'is_featured', 'visit_type', 'is_enable_advance_payment',
                'advance_payment_amount', 'moq', 'total_review', 'total_rating',
                'is_favourite', 'attchment_extension',
            )
        }),
        ('Relationships', {
            'fields': ('category', 'subcategory', 'provider'),
            'classes': ('collapse',),
        }),
    )

# Register all specified models with the admin site
admin.site.register(ServiceCategory)
admin.site.register(ServiceSubCategory)
admin.site.register(Provider)
admin.site.register(Attachment)
admin.site.register(Slot)
admin.site.register(ProviderAddress)
admin.site.register(Tax)
admin.site.register(ServiceFAQ)
admin.site.register(ServiceAddon)
admin.site.register(ServiceAddressMapping)
admin.site.register(CustomerService)
admin.site.register(ServiceReview)
admin.site.register(Coupon)

class ContactFormAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'outlet_type', 'location', 'brand_name', 'created_at')
    list_filter = ('created_at',)

admin.site.register(ContactForm, ContactFormAdmin)
admin.site.register(Tag)
admin.site.register(Blog)




