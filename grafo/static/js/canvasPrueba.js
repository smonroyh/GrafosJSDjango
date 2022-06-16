const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');


const buttonEliminar=document.getElementById('botonElim');
const buttonEditar=document.getElementById('botonEdit');


const buttonEliminarArist=document.getElementById('botonElimArist');
const buttonEditarArist=document.getElementById('botonEditArist');


class Circle{
    constructor(id, xPos , yPos){
        this.id=id;     
        this.name=id;
        this.x=xPos;
        this.y=yPos;
        this.isDragging=false;
    }

    draw(){
        
        
        ctx.beginPath();
        
        ctx.font = "25px Arial";
        ctx.arc(this.x ,this.y , 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgb(70, 138, 188 )' ;
        ctx.fillText(this.name,this.x-8,this.y+8);
        ctx.stroke();
        
        

       
        
    }
}

class Line{
    
    constructor(idFrom,idTo,peso){
        
        ctx.beginPath();
        this.peso=peso;
        this.headlen = 10; // length of head in pixels


        this.fromx = idFrom.x;
        this.fromy = idFrom.y;
        this.tox = idTo.x;
        this.toy =idTo.y;

        this.idFrom=idFrom;
        this.idTo = idTo;

        
    }

    draw(){
       
     
        ctx.fillText(this.peso,(this.fromx+this.tox)/2,(this.fromy+this.toy)/2);
        this.dx=this.tox-this.fromx;
        this.dy = this.toy - this.fromy;
        this.angle = Math.atan2(this.dy, this.dx);
        ctx.moveTo(this.fromx, this.fromy);
        ctx.lineTo(this.tox, this.toy);
        ctx.lineTo(this.tox - this.headlen * Math.cos(this.angle - Math.PI / 6), 
        this.toy - this.headlen * Math.sin(this.angle - Math.PI / 6));
        ctx.moveTo(this.tox, this.toy);
        ctx.lineTo(this.tox - this.headlen * Math.cos(this.angle + Math.PI / 6), 
        this.toy - this.headlen * Math.sin(this.angle + Math.PI / 6));


        ctx.stroke()
        
    }
}



var circles=[]
var lines = []
  
const button = document.getElementById('button');

const buttonUnir = document.getElementById('unir');

const actualizar=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle)=>{
        
        circle.draw();
    })
    lines.forEach((line)=>{
  
        line.draw();
    })
}

const isIntersect=(point, circle)=>{
  
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < 20;
}

const isIntersectLine=(point, line)=>{
    
    return Math.sqrt((point.x-(line.fromx+line.tox)/2) ** 2 + (point.y - (line.fromy+line.toy)/2) ** 2) < 20;
}


//aclaración
explicacion=document.getElementById("explicacion");



const exp=(eCrear,eUnir)=>{

    if(eCrear.value==1 & eUnir.value==0){

        explicacion.children[0].
        textContent="Clickea en el área de trabajo para crear vertices";
    }

    else if(eCrear.value==0 & eUnir.value==0){

        explicacion.children[0].
        textContent="Ahora puedes mover los nodos y seleccionar los nodos y aristas con click derecho"
    }
    else if(eCrear.value==0 & eUnir.value==1){

        explicacion.children[0].
        textContent="Clickea entre los nodos para crear arista";
    }
    else if(eCrear.value==1 & eUnir.value==1){

        explicacion.children[0].
        textContent="Clickea en el área de trabajo para crear vertices";
    }
}

button.addEventListener('click',(e)=>{
    
   
    if (e.target.value ==1){
        e.target.value=0;
        // button.classList.replace("green","red");
        button.classList.remove("blue");

    } 
    else{
        e.target.value=1;
        // button.classList.replace("red","green");
        button.classList.add("blue");
    }
    exp(button,buttonUnir);
    // if(e.target.value==0 & buttonUnir.value==0){
    //     explicacion.children[0].
    //     textContent="Ahora puedes mover los nodos y seleccionar los nodos y aristas con click derecho"
    // }
    // else if(e.target.value==1 & button.value==1){
    //     explicacion.children[0].
    //     textContent="Clickea entre los nodos para crear arista";
    // }
   
})

buttonUnir.addEventListener('click',(e)=>{
    
    
    if (e.target.value ==1)
    {
        e.target.value=0;
       
        buttonUnir.classList.remove("blue");
    } 
    else{
        e.target.value=1;
        
        buttonUnir.classList.add("blue");
    }
    exp(button,buttonUnir);
    // if(e.target.value==1 & button.value==0){
    //     explicacion.children[0].
    //     textContent="Clickea entre los nodos para crear arista";
    // }
    
})

const unir =()=>{
    if(buttonUnir.value==1){
        return true;
    }
    else return false;
}

const disponible =()=>{
   
    if(button.value==1){
        return true;
    }
    else return false;
}

let cont=0;

let NextJoin=false;



var aristas=[];
var peso=0;

// const lastId=()=>{
//     if(circles.length==0){
//         return 0;
//     }
//     else{
//         return circles[circles.length-1].id;
//     }
// }

var rect = canvas.getBoundingClientRect();
canvas.addEventListener('click', (e)=>{

  
    const pos = {
        x:(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
        y:(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
    };
    // console.log(pos);
    if(disponible()){

        const circle=new Circle(cont++,pos.x,pos.y);
        circle.draw();
       
        
        circles.push(circle);
      
    }
    else if(!disponible()& unir() & NextJoin==false){
        
        circles.forEach((circle) =>{
            if(isIntersect(pos,circle)){
              
                NextJoin=true;
               
                aristas.push(circle);

            }
        })
    }
    else if(!disponible()& unir() & NextJoin==true){
        
        
        circles.forEach((circle) =>{
            if(isIntersect(pos,circle)){
                NextJoin=false;
                
                aristas.push(circle);
                

                do {
                    peso=parseInt(prompt("Escribe el peso de la arista"));
                } while (isNaN(peso));
                
                
                
            }
        })
        
        //Si comento este condicional cuando seleccione un nodo para posteriormente unirlo
        //en el caso en que falle el click al nodo destino se queda guardado y se unira con 
        //el proximo en todo momento

        if(aristas.length==1){
        
            NextJoin=false;
     
            aristas=[];
        }
       
        if (aristas.length==2){

                const line=new Line(aristas[0],aristas[1],peso);

            lines.push(line);
            // line.draw();
            actualizar()
            aristas=[]
        }

    }
    else{

        circles.forEach((circle) =>{
            if(isIntersect(pos,circle)){
                console.log(circle.id);
            }
        })
        
    }

})

var posible={
    x: 0,
    y: 0
}

canvas.addEventListener('auxclick', (e)=>{
    e.preventDefault();
    const pos = {
        x:(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
        y:(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
    };

    document.onclick = hideMenu;
    document.oncontextmenu = rightClick;
      
    function hideMenu() {
        
        document.getElementById("contextMenu")
                .style.display = "none"

        document.getElementById("contextMenuLine")
        .style.display = "none"
    }
    
  
    function rightClick(e) {
        e.preventDefault();
  
        if (document.getElementById("contextMenu")
                .style.display == "block")
            hideMenu();
        else if(document.getElementById("contextMenuLine")
                .style.display == "block")
            hideMenu();
        else{
            circles.forEach((circle)=>{
                if(disponible()==false & isIntersect(pos,circle)==true){
                    
                    posible={
                        x:(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
                        y:(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
                    }
                    var menu = document.getElementById("contextMenu")
                    menu.style.display = 'block';
                    menu.style.left = e.clientX + "px";
                    menu.style.top = e.clientY + "px";
                    
                    
                }
            })
            lines.forEach((line) => {
                if(disponible()==false & isIntersectLine(pos,line)==true){
                    
                    posible={
                        x:(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
                        y:(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
                    }
                    var menu = document.getElementById("contextMenuLine")
                    menu.style.display = 'block';
                    menu.style.left = e.clientX + "px";
                    menu.style.top = e.clientY + "px";
                    
                    
                }

            })
            
        }
    }
})
var circleToDelete=0;
var linesToDelete=[];

const deleteCircleInLines=(circle)=>{

    lines.forEach((line)=>{
        
        if(circle.id==line.idFrom.id | circle.id==line.idTo.id ){
            linesToDelete.push(line);
        }
    })

    linesToDelete.forEach((line)=>{
        lines.splice(lines.indexOf(line), 1);
    })
    linesToDelete=[];
}

//botones del los vertices
buttonEliminar.addEventListener('click',(e)=>{
     
    circles.forEach((circle)=>{
        if(isIntersect(posible ,circle)){
            
         
            deleteCircleInLines(circle);
            circles.splice(circles.indexOf(circle),1);
        }
    })

    actualizar();
    
})

buttonEditar.addEventListener('click',(e)=>{
    circles.forEach((circle)=>{
        if(isIntersect(posible ,circle)){
            

            circle.name=prompt("Renombra el vertice");
            
        }
    })

    
    actualizar();
   
})

//botones del las aristas

buttonEliminarArist.addEventListener('click',(e)=>{
     
    lines.forEach((line)=>{
        if(isIntersectLine(posible ,line)){
            
            lines.splice(lines.indexOf(line),1);
           
        }
    })

    actualizar();
    
})

buttonEditarArist.addEventListener('click',(e)=>{
    lines.forEach((line)=>{
        if(isIntersectLine(posible ,line)){
            
            do {
                line.peso=parseInt(prompt("Edite el peso"));
            } while (isNaN(line.peso));
           
        }
    })

    actualizar();
   
})



let startX, startY,dragOK;

var posi={
    x:0,
    y:0
}

canvas.addEventListener('mousedown',(e)=>{

    if(!disponible() && !unir()){
        posi={
            x:(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
            y:(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
        }
        

        dragOK=false;

    
        circles.forEach((circle)=>{
            circle.isDragging=false;
      
            if (isIntersect(posi ,circle)){
                circle.isDragging=true;
                dragOK=true;
                startX=posi.x;
                startY=posi.y;
            }
        })
        
    }
})

canvas.addEventListener('mousemove', (e)=>{
  
    
    if(dragOK){
     
        
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle)=>{
     
            
            if (circle.isDragging){

                circle.x=(e.clientX- rect.left) / (rect.right - rect.left) * canvas.width,
                circle.y=(e.clientY- rect.top) / (rect.bottom - rect.top) * canvas.height
                

                lines.forEach((line)=>{
                    if(circle.id==line.idFrom.id ){
            
                        line.fromx=circle.x;
                        line.fromy=circle.y;
                    }
                   
                    else if(circle.id==line.idTo.id) {
                        line.tox=circle.x;
                        line.toy=circle.y;
                    }
                    
                })
              
            }
        })

        actualizar();

    }
})


canvas.addEventListener('mouseup',(e)=>{

    e.preventDefault();
    e.stopPropagation();

    dragOK = false;
    circles.forEach((circle)=>{
       
        circle.isDragging = false;
      
    })

})

document.addEventListener('dblclick',(e)=>{
    console.log(lines);
    
    console.log(circles);

})

const posicionesAleatorias =()=>{
    Aleatorias={
        x:Math.round(Math.random() * (760 - 27)+27),
        y:Math.round(Math.random() * (388 - 28)+28)
    }
    return  Aleatorias;
}

botonAleatorio=document.getElementById("aleatorio");

const isIntersect2=(point, circle)=>{
    
    return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < 35;
}

const sobrePuesto =(array,posi)=>{
   
    for (i=0;i<array.length;i++){


        if(isIntersect2(array[i],posi)){
      
            return true;
        }
    }
    return false;
     
}
var VecPosiciones=[]

var VecAristas=[]

const estaArista =(vecAristas, circle1,circle2)=>{
    for(let i=0;i<vecAristas.length;i++){
        if((vecAristas[i][0]==circle1 & vecAristas[i][1]==circle2)
         | (vecAristas[i][1]==circle1 & vecAristas[i][0]==circle2) ){
             return true;
         }
    }
    return false;
}

const buscarObjCircle=(id)=>{

    for (let i=0;i<circles.length; i++){
        if(id==circles[i].id){
          
            return i;
        }
    }
}


botonAleatorio.addEventListener('click',(e)=>{
    cont=0;
    cantidadVertices=Math.round(Math.random() * (5 - 3)+3);
   
    circles=[];
    lines=[];
    VecPosiciones=[];

    for(let i=0;i<cantidadVertices;i++){
        posiAleatoria=posicionesAleatorias();
        while(sobrePuesto(VecPosiciones,posiAleatoria)){
            posiAleatoria=posicionesAleatorias();
        }
        VecPosiciones.push(posiAleatoria)
    }
    for (let  i=0; i<VecPosiciones.length;i++){

        // circles.push(new Circle(i,VecPosiciones[i].x,VecPosiciones[i].y));
        circles.push(new Circle(cont++,VecPosiciones[i].x,VecPosiciones[i].y));
    }


    //aristas!

    cantidadAristas=Math.round(Math.random() * (cantidadVertices - 3)+3);

    VecAristas=[];

    

    for(let i=0;i<cantidadAristas;i++){

        circle1=Math.round(Math.random() * ((circles.length-1) - 0)+0);
        circle2=Math.round(Math.random() * ((circles.length-1) - 0)+0);
        

        
        while((circles[circle1].id== circles[circle2].id) || estaArista(VecAristas,circle1,circle2) ){

            circle1=Math.round(Math.random() * ((circles.length-1) - 0)+0);
            circle2=Math.round(Math.random() * ((circles.length-1) - 0)+0);

        }
        VecAristas.push([circle1,circle2]);

    }
  
    VecAristas.forEach((arista)=>{
    
        
        lines.push(new Line(circles[buscarObjCircle(arista[0])],circles[buscarObjCircle(arista[1])],
        Math.round(Math.random() * (8 - 1)+1)));
        
    })
    actualizar();
 
})


//Matriz

var unicos=[];

// botonMatriz=document.getElementById("matriz_a");
botonMatriz=document.getElementById("matriz_a");


const thead=document.getElementById('head')

const tbody=document.getElementById('body')

var mat=[]
const saberCirculo_idFrom = (circle_id)=>{
    var Aristas_circle=[];
    for(let i=0; i<lines.length; i++) {
        if(circle_id==lines[i].idFrom.id){
            Aristas_circle.push(lines[i])
        }
      
    }
    return Aristas_circle;
}

const quePosMat = (id)=>{
    // console.log(mat.length);
    for(let i=0;i<mat.length;i++){
        
        if(mat[i][0]==id){
           
            // console.log(mat.length);
            // console.log(mat[i][0], " - ",id);
            return i;
        }
    }

}

var linez=[];
botonMatriz.addEventListener('click',(e)=>{



    mat=[];
  
    //cabecera
    thead.innerHTML=" ";

    unicos=[]
    const tr=document.createElement("tr");


    circles.forEach((circle,i) => {
        // console.log(circle.id,i);
        if(!unicos.includes(circle)){
            unicos.push(circle);
        }
    })

    //un espacio corrido
    const tInput=document.createElement("input");
    tInput.value = "#";
    tInput.classList.add("cabecera","col-md-1");
    tInput.disabled=true;
    tr.appendChild(tInput);

    unicos.forEach((unico)=>{
        const tInput=document.createElement("input");
        tInput.classList.add("cabecera","col-md-1")
        tInput.value = unico.id;
        tInput.disabled=true;
     
        tr.appendChild(tInput);
    })
    thead.appendChild(tr);

    // acaba cabecera

    
    //Matriz de adyacencia
    let list=[]
    circles.forEach((circle) => {
        list=[]
        list.push(circle.id);
        for(let i=0;i<circles.length;i++) {
            list.push(0);
        }

        mat.push(list);
      
    })
  
    
    var p=0
    for(i=0;i<circles.length;i++) {
        linez=[]
        
        if(linez= saberCirculo_idFrom(circles[i].id)){
            
            
            for(let h = 0; h < linez.length; h++){
                
                p=quePosMat(linez[h].idTo.id);
                
                mat[i].splice(p+1,1,linez[h].peso);
                
            }
        }
    }

    //empieza el body
  

    tbody.innerHTML = " ";
    for(let i=0; i<mat.length; i++){
        const tr2=document.createElement('tr');
        for(let j=0; j<mat[i].length; j++){
            const tInput=document.createElement('input');
            tInput.classList.add("col-md-1");
            if(j==0){
                tInput.classList.add("cabecera");
                tInput.disabled=true;
            }
            
            tInput.value = mat[i][j];
            tr2.appendChild(tInput);
        }
        tbody.appendChild(tr2);
       
    }
    console.dir(tbody);

    console.log(mat);
    
})


//guardar cambios de matriz y mostrar en graph

const guardarMat=document.getElementById("guardarMatriz");

guardarMat.addEventListener("click",(e)=>{
    if(tbody.children.length>0){
        for(i=0; i<tbody.children.length; i++){
        
            for(j=1;j<tbody.children[i].children.length;j++){
                console.log("Tabla:",tbody.children[i].children[j].value,"matriz : ",mat[i][j]);
                if(tbody.children[i].children[j].value!=mat[i][j]){
                    console.log(`se hace cambios ${tbody.children[i].children[j].value} con ${mat[i][j]}`)
                    // mat[i][j] = parseInt(tbody.children[i].children[j].value);
                    if(mat[i][j]!=0 & tbody.children[i].children[j].value==0){

                        lines.forEach((line) =>{
        
                            
                            if(line.idFrom.id==mat[i][0] & line.idTo.id==mat[j-1][0]){

                                lines.splice(lines.indexOf(line),1);
                            }
                        })
                        
                    }
                    else if(mat[i][j]==0 & tbody.children[i].children[j].value!=0){

                        var cir=[]

                        circles.forEach((circle)=>{
                            if(mat[i][0]==circle.id ){
                                cir.push(circle);
                            }
                        })

                        circles.forEach((circle)=>{
                            if(mat[j-1][0]==circle.id){
                                cir.push(circle);
                            }
                        })
                     
                        lines.push(new Line(cir[0],cir[1],parseInt(tbody.children[i].children[j].value)))

                    }
                    else{
                        lines.forEach((line) =>{
                            if(line.idFrom.id==mat[i][0] & line.idTo.id==mat[j-1][0]){

                                line.peso=parseInt(tbody.children[i].children[j].value);
                            }
                        })
                    }
                    mat[i][j]=parseInt(tbody.children[i].children[j].value);
                }
            }
    
        }
        console.log(mat);
        actualizar();
    }
})


//EXPORTAR 

//Exporta a un excel

const btnExportExcel=document.getElementById("ExportExcel");

btnExportExcel.addEventListener("click",(e)=>{
    
    console.log(mat);
    var he=[];

    for(let i = 0; i <thead.children[0].children.length; i++){
        he.push(thead.children[0].children[i].value)
    }

    let wb = XLSX.utils.book_new();

    wb.Props = {

    CreatedDate: new Date(),

    };

    let wsName = 'newSheet';

    let wsData = [
        he,
    ];

    let ws = XLSX.utils.aoa_to_sheet(wsData);

    for(let i = 0; i < mat.length; i++){
        XLSX.utils.sheet_add_aoa(ws,[mat[i]],{origin:-1});
    }
 

    XLSX.utils.book_append_sheet(wb, ws, wsName);

    XLSX.writeFile(wb, 'Grafo.xlsx');

})

//Exporta a un PNG

const btnPng=document.getElementById("ExportPng");

btnPng.addEventListener("click",(e)=>{
    let enlace = document.createElement('a');
    // El título
    enlace.download = "Grafo.png";
    enlace.href = canvas.toDataURL();

    enlace.click();
})

//Exporta a un JPG
const btnJpg=document.getElementById("ExportJpg");

btnJpg.addEventListener("click",(e)=>{
    let enlace = document.createElement('a');
    // El título
    enlace.download = "Grafo.jpg";
    enlace.href = canvas.toDataURL();
 
    enlace.click();
})

ExportPdf
//Exporta a un PDF document
const btnPdf=document.getElementById("ExportPdf");

btnPdf.addEventListener("click",(e)=>{
    // only jpeg is supported by jsPDF
    var imgData = canvas.toDataURL("image/png", 1.0);
    var pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");
},false);




//obtener de JSON

//pregunta si el circulo existe
const circleExists = (id)=>{

    
    for(let i = 0; i <circles.length;i++){
        if(circles[i].id == id){

            return true;
        }
    }
    return false;
}
//retorna el circulo que necesitamos
const returnCircle = (id)=>{
    for(let i = 0; i <circles.length;i++){
        if(circles[i].id == id){

            return circles[i];
        }
    }

}

async function obtenerDatos(){
    // const response= await fetch("http://127.0.0.1:5500/datos.json");
    const response= await fetch("http://127.0.0.1:5500/grafos.json");
    const json = await response.json();
    // console.log(json);
    // json.direcciones.diametro=2;
    // console.log(json.direcciones);
    // json.direcciones.pago_agua[1].fecha="marzo 2021"
    // console.log(json.direcciones.pago_agua[1]);
    // console.log(json.experiencia[1].empresas);
    // json.experiencia.push({
    //     "empresas": "apple",
    //     "antiguedad":5
    // });

    // json.experiencia.forEach((obj)=>{
    //     if(obj.empresas=="google"){
    //         json.experiencia.splice(json.experiencia.indexOf(obj),1);
    //     }

    //     // console.log(obj.empresas);
    // })
    // json.experiencia.splice(1,1);

    // json.direcciones.pago_agua.forEach((element)=>{
    //     if(element.id>1){
    //         element.fecha="diciembre 2021"

    //     }
    //     console.log(element.fecha);
    // })

    // console.log(json.experiencia);

    // console.log(json.graph[0].data[0]);

    // console.log(json.graph[0].data);

    // json.graph[0].data.forEach((element)=>{
    //     // console.log(element.linkedTo);
    //     element.linkedTo.push({
    //         nodeId:4444,
    //         distance:2222
    //     })
    // })

    // json.graph[0].data.forEach((element)=>{
    //     console.log(element.linkedTo);
       
    // })
    
    // json.graph[0].data.forEach((element)=>{
    //     // console.log(element.linkedTo);

    //     element.linkedTo.forEach((ligado)=>{
    //         console.log(`${element.id} ligado a ${ligado.nodeId}`);
    //     })
    // })
 
}


// obtenerDatos()
var q=0;
//importando json de cualquier archivo
const graficarJSON=(jsonImp)=>{
    console.log(jsonImp)
    // console.log(json.graph.length);
    do {
        queGrafo=parseInt(prompt("Que grafo desea visualizar"));
        console.log(queGrafo);
        queGrafo--;
    } while (isNaN(queGrafo) | queGrafo<0 | queGrafo>=jsonImp.graph.length);
    // console.log(json.graph[queGrafo]);
    
    cantidadVertices=jsonImp.graph[queGrafo].data.length
    circles=[];
    lines=[];
    VecPosiciones=[];
    for(let i=0; i<cantidadVertices; i++){
        // console.log(json.graph[0].data[i]);
        posiAleatoria=posicionesAleatorias();
        while(sobrePuesto(VecPosiciones,posiAleatoria)){
            posiAleatoria=posicionesAleatorias();
        }
        VecPosiciones.push(posiAleatoria)
    }
    //crear los nodos del json
    for (let  i=0; i<VecPosiciones.length;i++){

        // console.log(json.graph[0].data[i].id)
        circles.push(new Circle(jsonImp.graph[queGrafo].data[i].id,VecPosiciones[i].x,VecPosiciones[i].y));
    }
    q=0;
   
    for (let  i=0; i<VecPosiciones.length;i++){

        q=0;

        while(q<jsonImp.graph[queGrafo].data[i].linkedTo.length){

            if(circleExists(jsonImp.graph[queGrafo].data[i].linkedTo[q].nodeId)) {
                lines.push(new Line(returnCircle(jsonImp.graph[queGrafo].data[i].id),
                returnCircle(jsonImp.graph[queGrafo].data[i].linkedTo[q].nodeId),jsonImp.graph[queGrafo].data[i].linkedTo[q].peso ))

            }
            q++;
        }
    }
    actualizar();
}


function onChange(event) {
    //crea objeto filereader para obtener info del archivo
    var reader = new FileReader();
    //llama a la funcion onRoaderLoad
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
 
}

function onReaderLoad(event){
    // console.log(event.target.result);
    //convierte el event.target.result que es el json pero en formato de
    //texto en un objeto json 
    var obj = JSON.parse(event.target.result);
    //se envia dicho objeto json a la funcion graficarJSON
    graficarJSON(obj);
   
}
//traemos el btn de abrir el explorador de archivos
//y le asignamos el evento por si se selecciona un archivo
//y llama a la funcion onchange para iniciar importación
btnImport=document.getElementById('fileUpload');
btnImport.addEventListener('change', onChange);


////////////////////////////////


//Exportar a un archivo json



function exportToJsonFile(jsonData,n) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = n+'.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

var json={};
const exportJson=(n)=>{
    // var json={};
    json={};
    json.graph=[];
    
    json.graph.push({
        name:"graph",
        data:[]
    });

    for(let i=0;i<circles.length;i++){
        json.graph[0].data.push({
            id:circles[i].id,
            name: circles[i].name,
            data: { },
            linkedTo:[]
        });

        lines.forEach((line)=>{
            if(line.idFrom.id==circles[i].id){
                json.graph[0].data[i].linkedTo.push({
                    nodeId:line.idTo.id,
                    peso:line.peso
                })
            }
        })

    }
    exportToJsonFile(json,n)

}
    

//función del botón abrir para el xml
btnXml=document.getElementById("fileXml");

function onChange2(event) {
    //crea objeto filereader para obtener info del archivo
    var reader = new FileReader();
    //llama a la funcion onRoaderLoad
    reader.onload = onReaderLoad2;
    reader.readAsText(event.target.files[0]);

}

function onReaderLoad2(event){
    // console.log(event.target.result);
    var parser = new DOMParser(),
    xmlDom = parser.parseFromString(event.target.result, "text/xml");
    console.log(xmlDom);

    var graph=xmlDom.getElementsByTagName("graph");

    do {
        queGrafo=parseInt(prompt("Que grafo desea visualizar"));
        queGrafo--;
    } while (isNaN(queGrafo) | queGrafo<0 | queGrafo>=graph.length);

    cantidadVertices=graph[queGrafo].children.length-1;


    circles=[];
    lines=[];
    VecPosiciones=[];
    for(let i=0; i<cantidadVertices; i++){
        // console.log(json.graph[0].data[i]);
        posiAleatoria=posicionesAleatorias();
        while(sobrePuesto(VecPosiciones,posiAleatoria)){
            posiAleatoria=posicionesAleatorias();
        }
        VecPosiciones.push(posiAleatoria)
    }

    //crear los nodos del xml
    for (let  i=1; i<=VecPosiciones.length;i++){

        circles.push(new Circle(parseInt(graph[queGrafo].children[i].getElementsByTagName("id")[0].textContent),
        VecPosiciones[i-1].x, VecPosiciones[i-1].y));
    }

    q=0;
   
    for (let  i=1; i<=VecPosiciones.length;i++){
        q=0;
        
        while(q<graph[queGrafo].children[i].getElementsByTagName("linkedTo").length){
            
            if(graph[queGrafo].children[i].getElementsByTagName("linkedTo")[q].children.length>0){
                if(circleExists(graph[queGrafo].children[i].getElementsByTagName("linkedTo")[q].getElementsByTagName("nodeId")[0].textContent)) {

                        lines.push(new Line(returnCircle(parseInt(graph[queGrafo].children[i].getElementsByTagName("id")[0].textContent)),
                        returnCircle(parseInt(graph[queGrafo].children[i].getElementsByTagName("linkedTo")[q].getElementsByTagName("nodeId")[0].textContent)),
                        parseInt(parseInt(graph[queGrafo].children[i].getElementsByTagName("linkedTo")[q].getElementsByTagName("peso")[0].textContent)) ))
                    }
            }
            q++;
        }
    }
    actualizar();

}
//traemos el btn de abrir el explorador de archivos
//y le asignamos el evento por si se selecciona un archivo
//y llama a la funcion onchange para iniciar importación

btnXml.addEventListener('change', onChange2);


//guardar en XML
var aris=[]
const retLine=(id)=>{
    aris=[]
    for(let i=0; i<lines.length; i++){
        if(id==lines[i].idFrom.id){
            aris.push(lines[i]);
        }
    }
    return aris;
}

function exportToXmlFile(xmlD,n) {
    var xmlText = new XMLSerializer().serializeToString(xmlD);

    let dataUri = 'data:application/xml;charset=utf-8,'+ encodeURIComponent(xmlText);

    let exportFileDefaultName = n+'.xml';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}


const exportXml=(n)=>{
    xmlString="<root></root>"
    var xmlD = new DOMParser(),
    xmlD = xmlD.parseFromString(xmlString, "text/xml");

    root=xmlD.getElementsByTagName("root")[0];
    
    root.appendChild(xmlD.createElement("graph"));
    root.children[0].appendChild(xmlD.createElement("nameG"));
    root.children[0].getElementsByTagName("nameG")[0].textContent ="graph 1"


    for(let i=1; i<=circles.length; i++){
        root.children[0].appendChild(xmlD.createElement("data"));

        root.children[0].children[i].appendChild(xmlD.createElement("id"));
        root.children[0].children[i].getElementsByTagName("id")[0].textContent=circles[i-1].id

        root.children[0].children[i].appendChild(xmlD.createElement("name"));
        root.children[0].children[i].getElementsByTagName("name")[0].textContent=circles[i-1].name

        root.children[0].children[i].appendChild(xmlD.createElement("data"));


        root.children[0].children[i].appendChild(xmlD.createElement("linkedTo"));

        for(let j=0; j<lines.length; j++){
            
            if(circles[i-1].id==lines[j].idFrom.id){
            
                root.children[0].children[i].getElementsByTagName("linkedTo")[0].appendChild(xmlD.createElement("nodeId"));
               
                root.children[0].children[i].getElementsByTagName("linkedTo")[0].appendChild(xmlD.createElement("peso"));
            }

        }

    }
    
    var u=0;
    for(let i=1; i<root.children[0].children.length; i++){


        var cantidadArist=retLine(root.children[0].children[i].getElementsByTagName("id")[0].textContent)
      
        u=0;
        while(u<cantidadArist.length){

            root.children[0].children[i].getElementsByTagName("linkedTo")[0].getElementsByTagName("nodeId")[u].textContent=
            cantidadArist[u].idTo.id;

            root.children[0].children[i].getElementsByTagName("linkedTo")[0].getElementsByTagName("peso")[u].textContent=
            cantidadArist[u].peso;
            u++;
        }

    }

    exportToXmlFile(xmlD,n);

}
    

const jsonxml=(n)=>{
    exportJson(n);
    exportXml(n);
    guardarBD();
}

btnGuardarComoSubmit=document.getElementById("guardarComoSubmit")

btnGuardarComoSubmit.addEventListener("click",(e)=>{
    nombre_archivo= document.getElementById("nombre-archivo");

    jsonxml(nombre_archivo.value);
})

btnPersonalizado=document.getElementById("personalizado");

btnPersonalizado.addEventListener('click',(e)=>{
    circles=[];
    lines=[];
    actualizar();
})

btnCerrar=document.getElementById("btnCerrar");
btnCerrar.addEventListener('click',(e)=>{
    window.close()
})


formularioCanvas=document.getElementById("formularioCanvas");


const guardarBD=()=>{
    var inp=document.createElement("input");
    inp.type="hidden";
    inp.value=JSON.stringify(json);
    inp.id="textCircles";
    inp.name="textCircles";
    console.dir(inp);
    formularioCanvas.appendChild(inp);
}







//https://stackoverflow.com/questions/53141763/how-to-delete-shapes-in-html-5-canvas





