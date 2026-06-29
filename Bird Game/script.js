 const section=document.querySelector('section')
const bird=document.querySelector('.bird')


let birdTop=200
let gravity=2

setInterval(()=>{
    birdTop+=gravity
    bird.style.top=birdTop+'px'
},20)

window.addEventListener('keydown',(e)=>{
   if(e.key==" "){
    birdTop=birdTop-60
   }
    
})



function renderPipe() {
    let pipeTop = document.createElement('div');
    let pipeBottom = document.createElement('div');

    pipeTop.classList.add('pipe')
    pipeBottom.classList.add('pipe')
     
    let gap=100
    pipeTop.style.top = "0px";
    pipeBottom.style.bottom = "0px";
    
    let gameHeight=section.clientHeight
    let maxHeight=gameHeight-gap-60

    let topHeight=Math.random()*maxHeight+50
    let bottomHeight=maxHeight-topHeight-gap

    pipeTop.style.height=topHeight+"px"
    pipeBottom.style.height=bottomHeight+'px'

    section.append(pipeTop,pipeBottom)

    let pipeLeft=section.clientWidth

    pipeTop.style.left=pipeLeft+"px"
    pipeBottom.style.left=pipeLeft+'px'

    let move = setInterval(() => {
    pipeLeft -= 2;   
    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";
    if(pipeLeft < -60){
        clearInterval(move);
        pipeTop.remove();
        pipeBottom.remove();
    }

},20);
    
}


setInterval(()=>{
    renderPipe()
},2000) 
