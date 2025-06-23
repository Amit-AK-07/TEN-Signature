from django.urls import path
from api.views import (
    submit_form,
    SendOTPView,
    VerifyOTPView,
    RegisterUserView,
    LogoutView,
    AuthStatusView,
    ServiceListAPIView,
    ServiceDetailAPIView,
    PropertyListAPIView,
    PropertyBulkUploadView,
    CityListAPIView,
    CategoryListAPIView,
    PropertyDetailAPIView,
    NearbyPropertiesView,
)

urlpatterns = [
    path('submit-form/', submit_form),
    path('send-otp/', SendOTPView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth-status/', AuthStatusView.as_view(), name='auth-status'),
    path('services/', ServiceListAPIView.as_view(), name='service-list'),
    path('services/<slug:slug>/', ServiceDetailAPIView.as_view(), name='service-detail'),
    path('filter-property-list/', PropertyListAPIView.as_view(), name='filter-property-list'),
    path('upload-properties/', PropertyBulkUploadView.as_view(), name='upload-properties'),
    path('cities/', CityListAPIView.as_view(), name='city-list'),
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('property-detail/', PropertyDetailAPIView.as_view(), name='property-detail'),
    path('nearby-property-list/', NearbyPropertiesView.as_view(), name='nearby-properties'),

    #path('favorites/', FavoriteListAPIView.as_view(), name='favorite-list'),

]
