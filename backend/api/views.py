from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
import random
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.cache import cache
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Property, Category, City, Service, Provider
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
import django_filters
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
from .pagination import CustomPagination

from .serializers import (
    SendOTPSerializer,
    VerifyOTPSerializer,
    RegisterUserSerializer,
    OutletFormSerializer, 
    PropertySerializer,
    CategorySerializer,
    CitySerializer,
    PropertyDetailSerializer,
    ServiceSerializer,
    ServiceDetailSerializer,
    ProviderDetailSerializer,
    ServiceFAQSerializer,
    ServiceAddonSerializer,
    TaxSerializer,
    RelatedServiceMiniSerializer,
    ServiceReviewSerializer,
    CouponSerializer,
    ContactFormSerializer
)

OTP_EXPIRY_SECONDS = 300

User = get_user_model()

@api_view(['POST'])
def submit_form(request):
    serializer = OutletFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Data saved successfully!'})
    return Response(serializer.errors, status=400)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated = serializer.validated_data
        user = User.objects.create_user(
            username=validated['email'], 
            email=validated['email'],
            first_name=validated['first_name'],
            last_name=validated['last_name']
        )

        return Response({
            'detail': 'User registered successfully. Please verify OTP to login.',
        }, status=status.HTTP_201_CREATED)
 
class SendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']

        if cache.get(f"otp_cooldown:{email}"):
            return Response({'detail': 'Please wait before requesting another OTP.'}, status=status.HTTP_429_TOO_MANY_REQUESTS)

        otp = str(random.randint(100000, 999999))
        cache.set(f"otp:{email}", otp, timeout=OTP_EXPIRY_SECONDS)
        cache.set(f"otp_cooldown:{email}", True, timeout=60)

        try:
            send_mail(
                'Your OTP Code',
                f'Your OTP is {otp}. It expires in 5 minutes.',
                'trialofproject@gmail.com',
                [email],
                fail_silently=False,
            )
        except Exception as e:
            return Response({'detail': f'Failed to send OTP: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'detail': 'OTP sent to your email'}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'detail': 'Email and OTP required.'}, status=status.HTTP_400_BAD_REQUEST)

        cached_otp = cache.get(f"otp:{email}")
        if cached_otp != otp:
            return Response({'detail': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(username=email, email=email)

        cache.delete(f"otp:{email}")

        refresh = RefreshToken.for_user(user)

        return Response({
            'detail': f'Logged in as {email}',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logged out successfully"}, status=200)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AuthStatusView(APIView):
    authentication_classes = [JWTAuthentication]  # Enable JWT authentication
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request):
        user = request.user
        if user and user.is_authenticated:
            return Response({
                "is_authenticated": True,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name
            })
        else:
            return Response({"is_authenticated": False})

# ✅ Inline PropertyFilter (no extra file)
class PropertyFilter(FilterSet):
    city = django_filters.NumberFilter(field_name='city')
    category = django_filters.NumberFilter(field_name='category')
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    sqft_min = django_filters.NumberFilter(field_name='sqft', lookup_expr='gte')
    sqft_max = django_filters.NumberFilter(field_name='sqft', lookup_expr='lte')
    property_for = django_filters.NumberFilter(field_name='property_for')
    listing_status = django_filters.NumberFilter(field_name='property_for')

    class Meta:
        model = Property
        fields = ['city', 'category', 'property_for', 'listing_status']


# ✅ API view with all filters + pagination
class PropertyListAPIView(ListAPIView):
    queryset = Property.objects.filter(status=True)
    serializer_class = PropertySerializer

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = PropertyFilter
    search_fields = ['name', 'address', 'city__name']
    ordering_fields = ['price', 'sqft', 'premium_property']
    ordering = ['-premium_property']



class PropertyBulkUploadView(APIView):
    def post(self, request):
        properties = request.data.get("property", [])
        saved = []
        errors = []

        for index, item in enumerate(properties):
            serializer = PropertySerializer(data=item)
            if serializer.is_valid():
                serializer.save()
                saved.append(serializer.data)
            else:
                errors.append({"index": index, "errors": serializer.errors})

        if errors:
            return Response({
                "message": "Some properties could not be uploaded.",
                "saved": saved,
                "errors": errors
            }, status=status.HTTP_207_MULTI_STATUS)  # 207 = partial success
        else:
            return Response({
                "message": "All properties uploaded successfully.",
                "data": saved
            }, status=status.HTTP_201_CREATED)

class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PropertyDetailAPIView(APIView):
    def post(self, request):
        property_id = request.data.get("id")

        if not property_id:
            return Response({"error": "Missing 'id' in request body"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PropertyDetailSerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NearbyPropertiesView(ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        city = self.request.query_params.get('city')
        current_property_id = self.request.query_params.get('exclude_id')
        queryset = Property.objects.filter(city__name__iexact=city)
        if current_property_id:
            queryset = queryset.exclude(id=current_property_id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        # Pagination
        page = request.query_params.get('page', 1)
        per_page = request.query_params.get('per_page', 5)

        paginator = PageNumberPagination()
        paginator.page_size = per_page
        result_page = paginator.paginate_queryset(queryset, request)

        serializer = self.get_serializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class ServiceListAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Service.objects.filter(status=1)  # default
        status_param = self.request.query_params.get("status")
        if status_param is not None:
            queryset = queryset.filter(status=status_param)
        return queryset


class ServiceDetailAPIView(APIView):
    def get(self, request, id):
        try:
            service = Service.objects.select_related(
                'provider',        # Select related Provider data
                'category',        # Select related ServiceCategory data
                'subcategory'      # Select related ServiceSubCategory data
            ).prefetch_related(
                'faqs',            # Prefetch all related ServiceFAQ objects
                'addons',          # Prefetch all related ServiceAddon objects
                'reviews',         # Prefetch all related ServiceReview objects
                'coupons',         # Prefetch all related Coupon objects
                'provider__taxes', # Prefetch taxes related to the provider
                'attchments',      # Prefetch attachments for the service
                'slots',           # Prefetch slots for the service
                'service_addresses' # IMPORTANT: Prefetch ServiceAddressMapping objects
                                            # This is the reverse relationship from Service to ServiceAddressMapping
            ).get(id=id)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the main service data.
        # The ServiceDetailSerializer now correctly includes 'provider' and 'service_address_mapping'
        service_data = ServiceDetailSerializer(service).data

        # Serialize other related data (already prefetched efficiently)
        faqs = ServiceFAQSerializer(service.faqs.all(), many=True).data
        addons = ServiceAddonSerializer(service.addons.all(), many=True).data
        service_reviews = ServiceReviewSerializer(service.reviews.all(), many=True).data
        coupons = CouponSerializer(service.coupons.all(), many=True).data
        taxes = TaxSerializer(service.provider.taxes.all(), many=True).data

        # Fetch related services (this is a separate query, which is acceptable
        # as it's a distinct set of services not directly linked to the current one
        # in a prefetchable way without complex custom prefetching).
        related = RelatedServiceMiniSerializer(
            Service.objects.filter(category=service.category).exclude(id=service.id)[:4],
            many=True
        ).data
        
        return Response({
            "service_detail": service_data,
            "customer_review": service_reviews,
            "coupon_data": coupons,
            "taxes": taxes,
            "related_service": related,
            "service_faq": faqs,
            "serviceaddon": addons
        })

@api_view(['POST'])
def submit_contact_form(request):
    serializer = ContactFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Contact form submitted successfully!'})
    return Response(serializer.errors, status=400)