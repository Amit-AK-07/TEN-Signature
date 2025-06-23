from django.contrib import admin
from .models import OutletForm, Service, Property,City, Category, PropertyGallery, PropertyAmenity, Customer
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

admin.site.register(Service)
admin.site.register(Property)
admin.site.register(City)
admin.site.register(Category)
admin.site.register(PropertyGallery)
admin.site.register(PropertyAmenity)
admin.site.register(Customer)





