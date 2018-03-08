# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import sys, os

public_keys = {}

groups = {}

def get_pubk(request):
    gid = request.GET['gid']
    if gid in public_keys.keys():
        return HttpResponse(public_keys[groupid])
    else:
        return HttpResponse("not found")


def get_privk(request):
    if not "gid" in request.GET['gid']:
        return HttpResponse('gid required')
    if not "uid" in request.GET['uid']:
        return HttpResponse('uid required')
    groupid = request.GET['gid']
    if gid in public_keys.keys() and authorised(request):
        return HttpResponse(public_keys[groupid])
    else:
        return HttpResponse("not found")

def authorised(uid, groupid):
    return groupid in groups.keys() and uid in groups[groupid]["members"]

def example_key(request):
    pub = open('./trimmed')
    key = ''
    for line in pub:
        key += line
    return HttpResponse(key)
