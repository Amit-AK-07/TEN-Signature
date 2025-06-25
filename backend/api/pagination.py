from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Service

class CustomPagination(PageNumberPagination):
    page_size = 7
    page_size_query_param = 'per_page'

    def get_paginated_response(self, data):
        return Response({
            "pagination": {
                "total_items": self.page.paginator.count,
                "per_page": self.page.paginator.per_page,
                "currentPage": self.page.number,
                "totalPages": self.page.paginator.num_pages,
                "from": self.page.start_index(),
                "to": self.page.end_index(),
                "next_page": self.get_next_link(),
                "previous_page": self.get_previous_link()
            },
            "data": data,
            "user_services": None,
            "max": Service.objects.order_by('-price').first().price if Service.objects.exists() else 0,
            "min": Service.objects.order_by('price').first().price if Service.objects.exists() else 0
        })
