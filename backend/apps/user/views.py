from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated    
from rest_framework.decorators import api_view, permission_classes
from .permissions import BasicPermission, CustomDjangoModelPermissions
from .serializers import LoginSerializer, UserSerializer, User, UserAddSerializer


class UserViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAddSerializer
    permission_classes = [BasicPermission | CustomDjangoModelPermissions]


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
            token = Token._default_manager.get_or_create(user=user)
        except Exception as e:
            return Response(data=f"Incorrect Email or Password", status=400)
        else:
            return Response(data={
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token[0].key,
            }, status=200)


@api_view(['POST', ])
@permission_classes([IsAuthenticated, ])
def get_user(request, * args, **kwargs):
    if isinstance(request.user, User):
        return Response(data={
            "user": UserSerializer(request.user).data,
            "token": None
        }, status=200)
    else:
        return Response(status=401, data="Not a valid employee.")


@api_view(('POST',))
@permission_classes((IsAuthenticated,))
def logout(request, *args, **kwargs):
    request.user.auth_token.delete()
    return Response(status=200)