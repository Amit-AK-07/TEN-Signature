import json
from api.models import Property, PropertyGallery, PropertyAmenity, City, Category, Customer

def load_property_from_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Get or create city
    city_name = data["data"]["city"]
    city, _ = City.objects.get_or_create(name=city_name)

    # Get or create category
    category_name = data["data"]["category"]
    category_image = data["data"].get("category_image", "")
    category, _ = Category.objects.get_or_create(name=category_name, defaults={"image": category_image})

    # Get or create customer
    customer_data = data.get("customer", {})
    customer, _ = Customer.objects.get_or_create(
        email=customer_data["email"],
        defaults={
            "first_name": customer_data.get("first_name", ""),
            "last_name": customer_data.get("last_name", ""),
            "contact_number": customer_data.get("contact_number", ""),
            "profile_image": customer_data.get("profile_image", ""),
            "display_name": customer_data.get("display_name", ""),
        }
    )

    # Check if property already exists using name + address + city + customer
    property_name = data["data"]["name"]
    address = data["data"].get("address", "")
    existing = Property.objects.filter(name=property_name, address=address, city=city, customer=customer).first()

    if existing:
        print(f"❌ Property already exists: {property_name}")
        return

    # Create property
    property_obj = Property.objects.create(
        name=property_name,
        category=category,
        price=data["data"]["price"],
        price_format=data["data"].get("price_format", ""),
        address=address,
        description=data["data"].get("description", ""),
        status=bool(data["data"].get("status", True)),
        premium_property=bool(data["data"].get("premium_property", False)),
        price_duration=data["data"].get("price_duration", ""),
        property_image=data["data"].get("property_image", ""),
        property_for=data["data"]["property_for"],
        advertisement_property=data["data"].get("advertisement_property"),
        advertisement_property_date=data["data"].get("advertisement_property_date"),
        city=city,
        sqft=int(data["data"]["sqft"]),
        brand_name=data["data"].get("brand_name", ""),
        current_rental=data["data"].get("current_rental", 0),
        monthly_sale=data["data"].get("monthly_sale", 0),
        age_of_property=data["data"].get("age_of_property", 0),
        latitude=data["data"].get("latitude", ""),
        longitude=data["data"].get("longitude", ""),
        country=data["data"].get("country", "India"),
        state=data["data"].get("state", ""),
        customer=customer,
    )

    # Save gallery images
    for img in data["data"].get("property_gallary_array", []):
        PropertyGallery.objects.create(property=property_obj, image_url=img["url"])

    # Save amenities
    for amenity in data.get("property_amenity_value", []):
        PropertyAmenity.objects.create(
            property=property_obj,
            name=amenity.get("name", ""),
            type=amenity.get("type", ""),
            value=", ".join(amenity.get("value", [])),
            amenity_image=amenity.get("amenity_image", "")
        )

    print(f"✅ Successfully added property: {property_obj.name}")




# from api.upload_properties import load_property_from_json
# load_property_from_json('api/sample_properties.json')



