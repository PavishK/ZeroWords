from django.urls import path
from .views import register_user, login_user, whoami, logout_user, profile_data

urlpatterns = [
    path('register-user/', view=register_user, name="Register"),
    path('login-user/', view=login_user, name="Login"),
    path('whoami/', view=whoami, name="Whoami"),
    path('logout-user/', view=logout_user, name="Logout"),
    path('profile-data/', view=profile_data, name="ProfileData")
]