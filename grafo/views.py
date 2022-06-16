from calendar import c
import datetime

from pymongo import MongoClient

import re

from ssl import HAS_TLSv1_1
#from sys import ps1
from time import timezone
from django import http
from django.http import HttpResponse

from django.template import Context,Template
from django.template import loader

from django.shortcuts import render,redirect


#Request: para realizar peticiones
#HttpResponse: Para enviar la respuesta usando el protocolo HTTP.
from json import dumps 

import json



## conectando mongoDB
client=MongoClient("mongodb+srv://smonroyh:LFKbuh31@clustergraph.ka4hl7h.mongodb.net/?retryWrites=true&w=majority")

db=client.get_database('grafos')

vertices=db.vertices


##list(list(vertices.find())) muestra todos los documents

#vertices.find_one({"aaa":123})




def plantillaCanvas(request):
    return render(request,"canvas.html")

  
#############################################
##prueba integrando canvas

def guCanvas(request):
    circlesJson=request.POST['textCircles']
    circlesJson=json.loads(circlesJson)

    print(circlesJson)
    # print(circlesJson)

    ##inserta un documento
    vertices.insert_one(circlesJson)
    

    return redirect('/')
    
    
