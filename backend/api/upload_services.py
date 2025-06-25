# upload_services.py
import json
from api.models import Service, ServiceCategory, ServiceSubCategory, Provider, Attachment, Slot

def load_service_from_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    for item in data["data"]:
        # Create or get category
        category, _ = ServiceCategory.objects.get_or_create(name=item["category_name"])

        # Create or get subcategory
        subcategory, _ = ServiceSubCategory.objects.get_or_create(
            name=item["subcategory_name"],
            category=category
        )

        # Create or get provider
        provider, _ = Provider.objects.get_or_create(
            name=item["provider_name"],
            defaults={"image": item["provider_image"]}
        )

        # Check for duplicate service
        service_name = item["name"]
        existing = Service.objects.filter(name=service_name, provider=provider).first()
        if existing:
            print(f"❌ Service already exists: {service_name}")
            continue

        # Create service
        service = Service.objects.create(
            name=service_name,
            category=category,
            subcategory=subcategory,
            provider=provider,
            price=item["price"],
            type=item["type"],
            discount=item["discount"],
            duration=item["duration"],
            status=item["status"],
            description=item["description"],
            is_featured=item["is_featured"] == 1,
            city_id=item["city_id"],
            total_review=item["total_review"],
            total_rating=item["total_rating"],
            is_favourite=item["is_favourite"] == 1,
            attchment_extension=item["attchment_extension"] == True,
            is_slot=item["is_slot"] == 1,
            visit_type=item["visit_type"],
            is_enable_advance_payment=item["is_enable_advance_payment"] == 1,
            advance_payment_amount=item["advance_payment_amount"],
            moq=item["moq"]
        )

        # Add attachments
        for att in item["attchments_array"]:
            attachment, _ = Attachment.objects.get_or_create(url=att["url"])
            service.attchments.add(attachment)

        # Add empty slots
        for slot_day in item["slots"]:
            Slot.objects.create(
                service=service,
                day=slot_day["day"],
                slot=slot_day.get("slot", [])
            )

        print(f"✅ Service added: {service.name}")


# To use:
# from api.upload_services import load_service_from_json
# load_service_from_json('api/sample_services.json')

