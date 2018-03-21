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

def add_user(request):
	gid = request.GET['gid']
	uid = request.GET['uid']
	if gid == '' or uid == '':
		return HttpResponse(E_MSG)

	authorise(uid,gid)
	return HttpResponse('added ' + str(uid) + ' to ' + str(gid))

def authorise(uid,gid):
	if (not authorised(uid,gid)) and gid in keys.keys():
		keys[gid]['members'].append(uid)


def authorised(uid, gid):
    return gid in keys.keys() and uid in keys[gid]['members']
