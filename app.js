const canvas=document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors= document.querySelectorAll(".jsColor");
const range=document.querySelector("#jsRange");
const mode=document.querySelector("#jsMode");
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE =700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting=false;
let filling=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseUp(event){
    painting=false;
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const range=event.target.value;
    ctx.lineWidth=range;
}

function handleModeClick(){
    if(filling === true){
        filling=false;
        mode.innerText = "Fill";
    } else {
        filling=true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("mousedown", handleCanvasClick);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));