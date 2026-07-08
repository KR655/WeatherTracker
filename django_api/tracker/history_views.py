from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from .serializers import SearchHistorySerializer
from .services import SearchHistoryService


class SearchHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["Search History"],
        summary="View Search History",
        responses=SearchHistorySerializer(many=True),
    )
    def get(self, request):

        history = SearchHistoryService.get_history(request.user)

        serializer = SearchHistorySerializer(
            history,
            many=True,
        )

        return Response(
            {
                "success": True,
                "count": len(serializer.data),
                "data": serializer.data,
            }
        )