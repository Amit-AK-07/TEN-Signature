from django.urls import path
from api.views import (
    submit_form,
    SendOTPView,
    VerifyOTPView,
    RegisterUserView,
    LogoutView,
    AuthStatusView,
    PropertyListAPIView,
    PropertyBulkUploadView,
    CityListAPIView,
    CategoryListAPIView,
    PropertyDetailAPIView,
    NearbyPropertiesView,
    ServiceListAPIView,
    ServiceDetailAPIView,
    submit_contact_form

)

urlpatterns = [
    path('submit-form/', submit_form),
    path('send-otp/', SendOTPView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth-status/', AuthStatusView.as_view(), name='auth-status'),
    path('filter-property-list/', PropertyListAPIView.as_view(), name='filter-property-list'),
    path('upload-properties/', PropertyBulkUploadView.as_view(), name='upload-properties'),
    path('cities/', CityListAPIView.as_view(), name='city-list'),
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('property-detail/', PropertyDetailAPIView.as_view(), name='property-detail'),
    path('nearby-property-list/', NearbyPropertiesView.as_view(), name='nearby-properties'),
    path('service-list/', ServiceListAPIView.as_view()),
    path('service-detail/<int:id>/', ServiceDetailAPIView.as_view(), name="service-detail"),
    path('submit-contact-form/', submit_contact_form),

    #path('favorites/', FavoriteListAPIView.as_view(), name='favorite-list'),

]
