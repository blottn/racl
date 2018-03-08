# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

public_keys = {}


def get_pubk(request):
    uid = request.GET['uid']
    if uid in public_keys.keys():
        return HttpResponse(public_keys[uid])
    else:
        return HttpResponse("not found")
