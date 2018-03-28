# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

import sys, os

keys = {}	# define collections of emails in group

users = {}	# map emails to public keys

E_MSG = 'na'

# create group
def create(request):
	if not 'gid' in request.GET.keys():
		return HttpResponse('gid required')
	if not 'adminid' in request.GET.keys():
		return HttpResponse('adminid required')

	gid = request.GET['gid']
	aid = request.GET['admin']

	if gid in keys.keys():
		return HttpResponse(gid + ' already registered')
	
	keys[gid] = {'admin':aid, 'emails':[]}
	return HttpResponse('registered ' + str(gid))


# authorise key to group
def add_u(request):
	if not 'gid' in request.GET.keys():
		return HttpResponse('gid required')
	if not 'aid' in request.GET.keys():
		return HttpResponse('aid required')
	if not 'email' in request.GET.keys():
		return HttpResponse('email required')

	gid = request.GET['gid']
	aid = request.GET['aid']
	email = request.GET['email']

	if not gid in keys.keys():
		return HttpResponse(str(gid) + ' doesn\'t exist yet')
	if not aid == keys['groups'][gid]['admin']:
		return HttpResponose('You are not authorised to modify this group')

	keys['groups'][gid]['emails'] += email
	return HttpResponse('added ' + str(key) + ' to ' + str(gid))

def register(request):	# might be necessary to add some authentication to this..
	if not 'email' in request.GET.keys():
		return HttpResponse('email required')
	if not 'key' in request.GET.keys():
		return HttpResponse('key required')

	email = request.GET['email']
	key = request.GET['key']
	
	users[email] = key

	return HttpResponse('registered: ' + str(email) + ' ' + str(key))

def test(request):
	return HttpResponse(str(keys) + ' ' + str(users))
