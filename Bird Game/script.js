 const section = document.querySelector("section");
const bird = document.querySelector(".bird");

let birdTop = 200;
let gravity = 2;
let gameOver = false;

let birdMove = setInterval(() => {

    if(gameOver) return;

    birdTop += gravity;
    bird.style.top = birdTop + "px";

    // Top & Bottom Collision
    if (
        birdTop <= 0 ||
        birdTop + bird.clientHeight >= section.clientHeight
    ) {
        endGame();
    }

}, 20);



window.addEventListener("keydown", (e) => {
    if (gameOver) return;

    if (e.code === "Space") {
        birdTop -= 60;
        if (birdTop < 0) {
            birdTop = 0;
        }
        bird.style.top = birdTop + "px";
    }

});



function renderPipe() {
    if(gameOver) return;

    let pipeTop = document.createElement("div");
    let pipeBottom = document.createElement("div");

    pipeTop.classList.add("pipe");
    pipeBottom.classList.add("pipe");

    let gap = 155;
    let gameHeight = section.clientHeight;
    let topHeight = Math.random() * 250 + 50;

    let bottomHeight = gameHeight - topHeight - gap;

    pipeTop.style.height = topHeight + "px";
    pipeBottom.style.height = bottomHeight + "px";

    pipeTop.style.top = "0px";
    pipeBottom.style.bottom = "0px";

    section.append(pipeTop, pipeBottom);
    let pipeLeft = section.clientWidth;

    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";



    let move = setInterval(() => {

        if(gameOver){
            clearInterval(move);
            return;
        }

        pipeLeft -= 2;

        pipeTop.style.left = pipeLeft + "px";
        pipeBottom.style.left = pipeLeft + "px";

        let birdRect = bird.getBoundingClientRect();
        let topRect = pipeTop.getBoundingClientRect();
        let bottomRect = pipeBottom.getBoundingClientRect();

        if (
            isCollide(birdRect, topRect) ||
            isCollide(birdRect, bottomRect)
        ) {
            endGame();
        }


        if (pipeLeft < -60) {
            clearInterval(move);
            pipeTop.remove();
            pipeBottom.remove();
        }

    }, 20);

}


setInterval(() => {
    renderPipe();
}, 2000);

function isCollide(a, b) {
    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );

}

function endGame(){
    gameOver = true;
    alert("Game Over");
    location.reload();

}