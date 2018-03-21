from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get_pubk/',views.get_pubk),
]
