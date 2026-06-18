let parent=document.querySelector('.parent')
let score=document.querySelector('.score')
let timer=document.querySelector('.timer')
let highscore=document.querySelector('.highscore')
let hitScore=document.querySelector('.newhit')
let start=document.querySelector('.start')
let overlay1=document.querySelector('.overlay1')
let restart=document.querySelector('.restart')
let overlay2=document.querySelector('.overlay2')




let rn=0
let value=JSON.parse(localStorage.getItem('scores')) || 0;
highscore.textContent = value;

let high=()=>{
    localStorage.setItem("scores",JSON.stringify(value))
}
let interval;

const makeBubbl=()=>{
    let cluster=''
    let bubbleCount;

    if(window.innerWidth <= 480){
        bubbleCount = 54; // Mobile
    }
    else if(window.innerWidth <= 768){
        bubbleCount = 65; // Tablet
    }
    else{
        bubbleCount = 85; // Laptop/Desktop
    }
    for(let i=0;i<bubbleCount;i++){
        let rn=Math.floor(Math.random()*10)+1
        cluster+=`
        <div class="goal">${rn}</div> `
        parent.innerHTML=cluster
    }
}

const newhit=()=>{
     rn=Math.floor(Math.random()*10)+1
     hitScore.textContent=rn
}
let time=60;
let timerval=()=>{
   interval= setInterval(()=>{
        if(time>0){
            time--
        timer.textContent=time
        }else{
            clearInterval(interval)
            parent.innerHTML=""
            overlay2.style.display='flex'
        }

    },1000)
}

let scores=0

const newScore=()=>{
    scores+=1
    score.textContent=scores
    if(scores>value){
        value=scores
        highscore.textContent=value
        high()
    }
}




const startBubbleGame = () => {
    time = 60;     
    scores = 0;     
    timer.textContent = time;
    score.textContent = scores;
    overlay1.style.display = "none";
    overlay2.style.display = "none";

    makeBubbl();
    newhit();
    timerval();
}

parent.addEventListener('click',(e)=>{
    let newhitvalue=Number(e.target.textContent)
    if(rn==newhitvalue){
        makeBubbl()
        newhit()
        newScore()
    }

})

start.addEventListener('click',startBubbleGame)
restart.addEventListener('click',startBubbleGame)







