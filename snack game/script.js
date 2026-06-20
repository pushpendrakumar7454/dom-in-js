let board=document.querySelector('.board');
let statbtn=document.querySelector('.btn-start')
let modal=document.querySelector('.modal')
let startgamemodal=document.querySelector('.start-game')
let gameovermodal=document.querySelector('.game-over')
let restartbtn=document.querySelector('.btn-restart')
let highscoreElement=document.querySelector('#highscore')
let scoreElement=document.querySelector('#score')
let timeElement=document.querySelector('#time')

let blockWidth = 50;
let blockHeight = 50;
let gameSpeed = 300;

if(window.innerWidth <= 768){
    blockWidth = 30;
    blockHeight = 30;
    gameSpeed = 150;
}
else if(window.innerWidth <= 1024){
    blockWidth = 35;
    blockHeight = 35;
    gameSpeed = 180;
}

let highScore=localStorage.getItem("highscore") || 0
let score=0
let seconds=0
let minutes=0

highscoreElement.innerText=highScore
scoreElement.innerText=score
timeElement.innerText="00:00"

const cols=Math.floor(board.clientWidth/blockWidth)
const rows=Math.floor(board.clientHeight/blockHeight)

board.style.gridTemplateColumns = `repeat(${cols}, ${blockWidth}px)`
board.style.gridTemplateRows = `repeat(${rows}, ${blockHeight}px)`

let intervalid=null
let timeInterval=null

let food={
    x:Math.floor(Math.random()*rows),
    y:Math.floor(Math.random()*cols)
}

const blocks=[]
let snack=[{x:1,y:3}]

let direction='down'

for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){

        const block=document.createElement('div')

        block.classList.add('block')

        block.style.width = blockWidth + 'px'
        block.style.height = blockHeight + 'px'

        board.appendChild(block)

        blocks[`${row}-${col}`]=block
    }
}

function render(){

    let head=null

    if(direction==='left'){
        head={x:snack[0].x,y:snack[0].y-1}
    }
    else if(direction==='right'){
        head={x:snack[0].x,y:snack[0].y+1}
    }
    else if(direction==='down'){
        head={x:snack[0].x+1,y:snack[0].y}
    }
    else if(direction==='up'){
        head={x:snack[0].x-1,y:snack[0].y}
    }

    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        gameOver()
        return
    }

    for(let segment of snack){
        if(segment.x===head.x && segment.y===head.y){
            gameOver()
            return
        }
    }

    let ateFood=false

    if(head.x===food.x && head.y===food.y){

        ateFood=true

        score+=10
        scoreElement.innerText=score

        if(score>highScore){
            highScore=score
            localStorage.setItem("highscore",highScore)
            highscoreElement.innerText=highScore
        }

        blocks[`${food.x}-${food.y}`].classList.remove('food')

        food={
            x:Math.floor(Math.random()*rows),
            y:Math.floor(Math.random()*cols)
        }
    }

    snack.forEach((segment)=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
    })

    snack.unshift(head)

    if(!ateFood){
        snack.pop()
    }

    snack.forEach((segment)=>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill')
    })

    blocks[`${food.x}-${food.y}`].classList.add('food')
}

function gameOver(){

    clearInterval(intervalid)
    clearInterval(timeInterval)

    modal.style.display='flex'
    startgamemodal.style.display='none'
    gameovermodal.style.display='block'
}

function startTimer(){

    timeInterval=setInterval(()=>{

        seconds++

        if(seconds===60){
            minutes++
            seconds=0
        }

        let m=minutes<10 ? "0"+minutes : minutes
        let s=seconds<10 ? "0"+seconds : seconds

        timeElement.innerText=`${m}:${s}`

    },1000)
}

statbtn.addEventListener('click',()=>{

    modal.style.display='none'

    intervalid=setInterval(()=>{
        render()
    },gameSpeed)

    startTimer()
})

restartbtn.addEventListener('click',restartGame)

function restartGame(){

    clearInterval(intervalid)
    clearInterval(timeInterval)

    blocks[`${food.x}-${food.y}`].classList.remove('food')

    snack.forEach((segment)=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
    })

    modal.style.display="none"

    direction="down"

    snack=[{x:1,y:3}]

    food={
        x:Math.floor(Math.random()*rows),
        y:Math.floor(Math.random()*cols)
    }

    score=0
    seconds=0
    minutes=0

    scoreElement.innerText=score
    timeElement.innerText="00:00"

    intervalid=setInterval(()=>{
        render()
    },gameSpeed)

    startTimer()
}

window.addEventListener('keydown',(event)=>{

    if(event.key==="ArrowUp" && direction!=='down'){
        event.preventDefault()
        direction='up'
    }

    else if(event.key==='ArrowRight' && direction!=='left'){
        direction='right'
    }

    else if(event.key==='ArrowLeft' && direction!=='right'){
        direction='left'
    }

    else if(event.key==='ArrowDown' && direction!=='up'){
        event.preventDefault()
        direction='down'
    }
})

let touchStartX = 0;
let touchStartY = 0;

board.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

board.addEventListener("touchend", (e) => {

    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;

    const minSwipeDistance = 30;

    if (
        Math.abs(dx) < minSwipeDistance &&
        Math.abs(dy) < minSwipeDistance
    ) {
        return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {

        if (dx > 0 && direction !== "left") {
            direction = "right";
        }
        else if (dx < 0 && direction !== "right") {
            direction = "left";
        }

    } else {

        if (dy > 0 && direction !== "up") {
            direction = "down";
        }
        else if (dy < 0 && direction !== "down") {
            direction = "up";
        }

    }

}, { passive: true });