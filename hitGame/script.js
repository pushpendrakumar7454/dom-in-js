let btn=document.querySelector('#btn')
let child=document.querySelector('.child')
let timer=document.querySelector('.timer')
let score=document.querySelector('#score')
let gameOver=document.querySelector('.gameover')
let reStart=document.querySelector('.againstart')
let highScore=document.querySelector('#highscore')

highScore.textContent = localStorage.getItem("highScore") || 0;

let randomColor=()=>{
    let r=Math.floor(Math.random()*256)
    let g=Math.floor(Math.random()*256)
    let b=Math.floor(Math.random()*256)

    child.style.backgroundColor=`rgb(${r},${g},${b})`
}
let canScore = true;
let interval;
let sco=0;
let increageScore=()=>{
    if(!canScore) return
    sco++
    let storedHighScore = Number(localStorage.getItem("highScore")) || 0;
    if(sco > storedHighScore){
        localStorage.setItem("highScore", sco);
        highScore.textContent = sco;
    }
    score.textContent=sco
    canScore=false
}


let startGame=()=>{
    clearInterval(interval);
    let count=0;
    let time=0;
    sco=0
    score.textContent=sco;
    gameOver.style.display='none';
    child.removeEventListener('click', increageScore);
    child.addEventListener('click',increageScore)

    interval=setInterval(()=>{
    canScore=true;
    let maxLeft = child.parentElement.clientWidth - child.offsetWidth;
    let maxTop = child.parentElement.clientHeight - child.offsetHeight;
    let childleft = Math.floor(Math.random() * maxLeft);
    let childtop = Math.floor(Math.random() * maxTop);
    child.style.left = `${childleft}px`;
    child.style.top = `${childtop}px`;
    randomColor()
    count++
    time++
    timer.textContent=time
    if(count===30){
        clearInterval(interval)
       let storedHighScore = Number(localStorage.getItem("highScore")) || 0;
            if(sco > storedHighScore){
                localStorage.setItem("highScore", sco);
                highScore.textContent = sco;
            }else{
                highScore.textContent = storedHighScore;
            }
        gameOver.style.display='flex'
        child.removeEventListener('click',increageScore)
    }
   },1000)
}


btn.addEventListener('click',startGame)
reStart.addEventListener('click',startGame)



