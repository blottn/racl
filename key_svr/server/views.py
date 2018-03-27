# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

import sys, os

keys = {}

E_MSG = 'na'


def register(request):
	if not 'gid' in request.GET.keys():
		return HttpResponse('gid required')
	if not 'uid' in request.GET.keys():
		return HttpResponse('uid required')

	gid = request.GET['gid']
	uid = request.GET['uid']

	if gid in keys.keys():
		return HttpResponse(gid + ' already registered')
	
	keys[gid] = {'admin':uid, 'u_keys':[]}
	return HttpResponse('registered ' + str(gid))

def add_k(request):
	if not 'gid' in request.GET.keys():
		return HttpResponse('gid required')
	if not 'uid' in request.GET.keys():
		return HttpResponse('uid required')
	if not 'key' in request.GET.keys():
		return HttpResponse('key required')

	gid = request.GET['gid']
	uid = request.GET['uid']
	key = request.GET['key']

	if not gid in keys.keys():
		return HttpResponse(str(gid) + ' doesn\'t exist yet')
	if not uid == keys[gid]['admin']:
		return HttpResponose('You are not authorised to modify this group')

	return HttpResponse('added ' + str(key) + ' to ' + str(gid))


