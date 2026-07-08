from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer
from .jwt_serializer import CustomTokenObtainPairSerializer


class RegisterView(APIView):

    @extend_schema(
        request=RegisterSerializer,
        responses={201: RegisterSerializer},
        tags=["Authentication"],
    )
    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "success": True,
                "message": "User registered successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer