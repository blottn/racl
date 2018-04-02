from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^register/',views.register),
	url(r'^add/',views.add_u),
	url(r'^remove/',views.remove),
	url(r'^create/',views.create),
	url(r'^test/',views.test),
	url(r'^index/',views.index),
	url(r'^get/',views.get_keys),

]
