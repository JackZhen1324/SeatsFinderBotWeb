from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import StreamingHttpResponse
# Create your views here.
from django.http import HttpResponse,Http404
from django.views.decorators.csrf import csrf_exempt


import os
import requests
import time
import pyrebase
from django.shortcuts import render
from django.contrib import auth
from django.conf import settings
import threading
import urllib
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from argparse import ArgumentParser
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from selenium.webdriver.chrome.options import Options
import json
import pickle
import time
import logging
import datetime
import urllib.request
import threading
import sys
import unicodedata
#from sendgrid.helpers.mail import *
import time, datetime
# Create your views here.
statusURL = "http://104.154.119.236/api/WebAPI?GetSuperPowerVMTaskSchedulerStatus=true&guid="
checkURL = "http://104.154.119.236/api/WebAPI?checkStatusByBot=true&prefix=&number=&location=Tempe&term="
superPowerStatusURL = "http://104.154.119.236/api/WebAPI?registerStatusNotify=true&status="
myEmail = "mopjtv@gmail.com"
config = {
    'apiKey': "AIzaSyBPE9nfY4BG4P6Q5lxVkVSVElgQrRLKgV0",
    'authDomain': "seatsfinderbot.firebaseapp.com",
    'databaseURL': "https://seatsfinderbot.firebaseio.com",
    'projectId': "seatsfinderbot",
    'storageBucket': "seatsfinderbot.appspot.com",
    'messagingSenderId': "427671677247"
  };
firebase = pyrebase.initialize_app(config)
auth2 = firebase.auth()
database = firebase.database()
def home(request):
    response = render(request,'index.html',{'test':'test'})

    return response
def delClass(request):
    if (request.method == "POST"):
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        classID = data['user2']['classId']
        jobid=database.child('users').child('zqian15').child('courses').child(classID).child('jobId').get().val()
        data = [
            ('project', 'seatsfinder'),

            ('job', jobid),



        ]


        print(data)
        status_code = requests.post('http://localhost:6800/cancel.json', data=data)
        time.sleep(3)

        print (status_code)
        database.child('users').child('zqian15').child('courses').child(classID).remove()
        return HttpResponse(status=200)
    return HttpResponse(status=500)
def addClass(request):
    if (request.method == "POST"):
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        classID = data['user']['classId']
        asuID = data['user']['asuID']
        password = data['user']['password']
        classLevel = data['user']['classLevel']
        semester = data['user']['semester']
        reserved = data['user']['reserved']
        timeInterval = data['user']['timeInterval']
        choice = data['user']['method']



        data = [
            ('project', 'seatsfinder'),
            ('spider', 'seatsfinderbots'),
            ('semester', semester),
            ('section', classID),
            ('level', classLevel),
            ('choice',choice),
            ('reserved',reserved),
            ('username',asuID),
            ('password',password),
            ('timeInterval',timeInterval)



        ]

        print(data)
        status_code = requests.post('http://localhost:6800/schedule.json', data=data)
        return HttpResponse(status=200)
    return HttpResponse(status=500)