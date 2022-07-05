from calendar import c
import datetime
from numpy import gradient

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

    print("Mostrar Graphs enviar    los graph default")
    lista_de_graphsEnBD=list(vertices.find())

    

    # print("la lista es :",lista_de_graphsEnBD)
    return render(request,'canvas.html',{"graph":lista_de_graphsEnBD})

def k_subset(s, k):
    if k == len(s):
        return (tuple([(x,) for x in s]),)
    k_subs = []
    for i in range(len(s)):
        partials = k_subset(s[0:i] + s[i + 1:len(s)], k)
        for partial in partials:
            for p in range(len(partial)):
                k_subs.append(partial[:p] + (partial[p] + (s[i],),) + partial[p + 1:])
    return k_subs


def uniq_subsets(s):
    # print("checking",s)
    u = set()

    for x in s:
        t = []
        for y in x:
            y = list(y)
            y.sort()
            t.append(tuple(y))
        t.sort()
        u.add(tuple(t))
    return u


def find_partitions(V,k):
    """ find all partitions of elements in V that contain k members """
    k_subs = k_subset(V,k)
    k_subs = uniq_subsets(k_subs)

    return k_subs

    
def Queayranne(request):
    circlesJson=request.POST['textCircles']
    circlesJson=json.loads(circlesJson)
    
    print(circlesJson)
    print("\n")

    listaPartition=[]
    
    for i in range(len(circlesJson["graph"][0]["data"])):
        print(circlesJson["graph"][0]["data"][i]["id"])
        listaPartition.append(circlesJson["graph"][0]["data"][i]["id"])

    print(listaPartition)
    listRes=[]
    listValues=[]
    listaPartition=list(find_partitions(listaPartition,2))

    sublist=list(listaPartition)
    for i in sublist:
        listValues.append(list(i))
        
    for i in range(len(listValues)):
        lis=[]
        for j in listValues[i]:
            lis.append(list(j))
        listRes.append(lis)
    menor=99999999999
    menorAristas=[]

    for i in range(len(listRes)):
        ar=[]
        aristas=[]
        acum=0
        print(listRes[i])
        for j in range(len(listRes[i][0])):
            for h in range(len(listRes[i][1])):

                print(listRes[i][0][j],listRes[i][1][h])

                arista=retornaAristasDeVertx(circlesJson,listRes[i][0][j],listRes[i][1][h])
                if arista:
                    # print(arista)
                    aristas.append(arista)
                    acum+=arista["peso"]
                    ar.append(listRes[i][0][j])
                    ar.append(listRes[i][1][h])
        if acum<menor:
            menorAristas=[]
            menorAristas.append(ar)
            menorAristas.append(aristas)
    
            menor=acum
        print(acum)
    # print("el menor finalmente es :",menor)
    print("el menor",menorAristas)
    dictMenorAristas={
        "mAristas":menorAristas
    }

    return render(request,"canvasQ.html",{"j":dumps(circlesJson),"menorAristas":dumps(dictMenorAristas) })
   

def retornaAristasDeVertx(json,id1,id2):
   
    for i in json["graph"][0]["data"]:
        q=0
        if(i["id"]==id1 ):
            while q < len(i["linkedTo"]):
                if(i["linkedTo"][q]["nodeId"]==id2):
                    return i["linkedTo"][q]
                q+=1
    
    for i in json["graph"][0]["data"]:
        q=0
        if(i["id"]==id2 ):
            while q < len(i["linkedTo"]):
                if(i["linkedTo"][q]["nodeId"]==id1):
                    return i["linkedTo"][q]
                q+=1
    
def volverPrincipal(request):
    print("Queayranne               ss          enviar")
    return redirect('/')

AristasQuitar=[]
arNodeQ=[]
aristasList=[]
def PartirUser(request):
    AristasQuitar=[]
    circlesJson=request.POST['textCircles']
    circlesJson=json.loads(circlesJson)
    ArtsA=request.POST['textVecGroupA']
    ArtsA=json.loads(ArtsA)
    ArtsB=request.POST['textVecGroupB']
    ArtsB=json.loads(ArtsB)
    
    
    print(circlesJson)
    print("\n")

    listaPartition=[]
    
    for i in range(len(circlesJson["graph"][0]["data"])):
        print(circlesJson["graph"][0]["data"][i]["id"])
        listaPartition.append(circlesJson["graph"][0]["data"][i]["id"])
    arNodeQ=[]
    for i in range(len(ArtsA["elm"])):
       
        for j in range(len(ArtsB["elm"])):
            # print("A->",ArtsA["elm"][i]["node"])
            # print("B->",ArtsB["elm"][j]["node"])
            if(retornaAristasDeVertx(circlesJson,ArtsA["elm"][i]["node"],ArtsB["elm"][j]["node"])):
                arNodeQ.append(ArtsA["elm"][i]["node"])
                arNodeQ.append(ArtsB["elm"][j]["node"])
                aristasList.append(retornaAristasDeVertx(circlesJson,ArtsA["elm"][i]["node"],ArtsB["elm"][j]["node"]))
                
            # print(retornaAristasDeVertx(circlesJson,ArtsA["elm"][i]["node"],ArtsB["elm"][j]["node"]))
    AristasQuitar.append(arNodeQ)
    AristasQuitar.append(aristasList)
    print(AristasQuitar)
    dictAristasQuitar={
        "mAristas":AristasQuitar,
        "aristGrupA":ArtsA,
        "aristGrupB":ArtsB
    }
    return render(request,"canvasPartirUser.html",{"q":dumps(circlesJson),"Arts":dumps(dictAristasQuitar)})