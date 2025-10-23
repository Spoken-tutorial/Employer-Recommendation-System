from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Optional: put roles into access token
        token["roles"] = list(user.groups.values_list("name", flat=True))
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "roles": list(user.groups.values_list("name", flat=True)),
        }
        return data

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        res = super().post(request, *args, **kwargs)
        # set refresh token as httpOnly cookie; keep access in response body
        refresh = res.data.get("refresh")
        if refresh:
            res.set_cookie(
                key="refresh",
                value=refresh,
                httponly=True,
                secure=False,     # True in production (HTTPS)
                samesite="Lax",
                path="/api/auth/",
                max_age=7*24*3600,
            )
            del res.data["refresh"]
        return res

class RefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # read refresh from cookie
        request.data["refresh"] = request.COOKIES.get("refresh")
        return super().post(request, *args, **kwargs)

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        u = request.user
        return Response({
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "roles": list(u.groups.values_list("name", flat=True)),
        })

class LogoutView(APIView):
    def post(self, request):
        res = Response({"ok": True})
        res.delete_cookie("refresh", path="/api/auth/")
        return res
