const canvas=document.getElementById('canvasQ');
const ctx=canvas.getContext('2d');

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
    draw2(){
        
        ctx.fillStyle="red";
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

const circleExists = (id)=>{

    
    for(let i = 0; i <circles.length;i++){
        if(circles[i].id == id){

            return true;
        }
    }
    return false;
}

var circles=[];
var lines = [];

const actualizar=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle)=>{
        
        circle.draw();
    })
    lines.forEach((line)=>{
  
        line.draw();
    })
}

const posicionesAleatorias =()=>{
    Aleatorias={
        x:Math.round(Math.random() * (760 - 27)+27),
        y:Math.round(Math.random() * (388 - 28)+28)
    }
    return  Aleatorias;
}

const returnCircle = (id)=>{
    for(let i = 0; i <circles.length;i++){
        if(circles[i].id == id){

            return circles[i];
        }
    }

}

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

const graficarJSON=(jsonImp)=>{
    console.log(jsonImp)
    
    cantidadVertices=jsonImp.graph[0].data.length

    console.log(cantidadVertices);
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
        circles.push(new Circle(jsonImp.graph[0].data[i].id,VecPosiciones[i].x,VecPosiciones[i].y));
    }
    q=0;
   
    for (let  i=0; i<VecPosiciones.length;i++){

        q=0;

        while(q<jsonImp.graph[0].data[i].linkedTo.length){

            if(circleExists(jsonImp.graph[0].data[i].linkedTo[q].nodeId)) {
                lines.push(new Line(returnCircle(jsonImp.graph[0].data[i].id),
                returnCircle(jsonImp.graph[0].data[i].linkedTo[q].nodeId),jsonImp.graph[0].data[i].linkedTo[q].peso ))

            }
            q++;
        }
    }
    actualizar();
}

const returnArista=(id1,id2)=>{
    // console.log(id1,id2);
    for(let i=0;i<lines.length;i++) {
        // console.log(lines[i].idFrom.id,"==",id1," // ",lines[i].idTo.id," ==",id2)
        if((lines[i].idFrom.id==id1 & lines[i].idTo.id==id2) 
        | (lines[i].idFrom.id==id2 & lines[i].idTo.id==id1)){

            return lines[i];
        }
    }
}

window.addEventListener('load',(e)=>{
    console.log("o");
    miModal=document.getElementById('ModalBDs');
    miModal.style.display = "block";
    graficarJSON(data);
  
    console.log(menorAristas);
    console.log(circles);
    console.log(lines);
    // console.log(returnArista(1,3));
    for(let i = 0 ;i<menorAristas.mAristas[0].length;i+=2){
        // console.log(menorAristas.mAristas[0][i],menorAristas.mAristas[0][i+1]);
        //returnArista(menorAristas.mAristas[0][i],menorAristas.mAristas[0][i+1])
        console.log(returnArista(menorAristas.mAristas[0][i],menorAristas.mAristas[0][i+1]));
        returnArista(menorAristas.mAristas[0][i],menorAristas.mAristas[0][i+1]).draw2();

    }
    
    
})

