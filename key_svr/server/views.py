# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import sys, os

public_keys = {}

groups = {}

E_MSG = 'na'

def get_pubk(request):
    gid = request.GET['gid']
    if gid in public_keys.keys():
        return HttpResponse(public_keys[groupid])
    else:
        return HttpResponse("na")


def get_privk(request):
    if not "gid" in request.GET['gid']:
        return HttpResponse('gid required')
    if not "uid" in request.GET['uid']:
        return HttpResponse('uid required')
    groupid = request.GET['gid']
    if gid in public_keys.keys() and authorised(request):
        return HttpResponse(public_keys[groupid])
    else:
        return HttpResponse("na")

def authorised(uid, groupid):
    return groupid in groups.keys() and uid in groups[groupid]["members"]

def example_key(request):
    pub = open('./trimmed')
    priv = open('./trimmed.pub')
    pub_key = ''
    priv_key = ''
    for line in pub:
        pub_key += line
    for line in priv:
        priv_key += line
    return HttpResponse('{\"pub_key\":\"' + pub_key + '\", \"priv_key\":\"' + priv_key + '\"}')
