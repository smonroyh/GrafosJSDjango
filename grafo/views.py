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
arrayGraphsBd=[]
def guCanvas(request):
    circlesJson=request.POST['textCircles']
    circlesJson=json.loads(circlesJson)

    ##inserta un documento
    vertices.insert_one(circlesJson)

    return redirect('/')
    # return render(request,'canvas.html',{"graph":lista_de_graphsEnBD})
    

def mostrarGraphsBD(request):
    lista_de_graphsEnBD=list(vertices.find())


    # print("la lista es :",lista_de_graphsEnBD)
    return render(request,'canvas.html',{"graph":lista_de_graphsEnBD})
    
