# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import sys, os

keys = {}


E_MSG = 'na'

def get_pubk(request):
    gid = request.GET['gid']
    if gid in public_keys.keys():
        return HttpResponse(public_keys[gid]['aes_key'])
    else:
        return HttpResponse(E_MSG)


def authorised(uid, groupid):
    return uid in groups.keys() and uid in groups[groupid]["members"]
