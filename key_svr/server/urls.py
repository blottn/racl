from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^example_key/',views.example_key),
]
