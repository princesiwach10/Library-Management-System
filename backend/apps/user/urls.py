from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import LoginView, logout, UserViewset, get_user

router = DefaultRouter()
router.register('user', UserViewset)

urlpatterns = [
    path("login/", LoginView.as_view(), name="user_login"),
    path("get_user/", get_user),
    path("logout/", logout)
] + router.urls
