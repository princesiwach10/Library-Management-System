from .views import BookViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('books', BookViewset)

urlpatterns = [] + router.urls
