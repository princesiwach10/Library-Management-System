from .serializers import Book, BookSerializer
from rest_framework.viewsets import ModelViewSet
from apps.user.permissions import CustomDjangoModelPermissions


class BookViewset(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (CustomDjangoModelPermissions,)
    
