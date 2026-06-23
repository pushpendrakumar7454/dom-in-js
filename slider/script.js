const imgDiv = document.querySelector('.img_div');
const images = document.querySelectorAll('.img_div img');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let current = 0;

next.addEventListener('click', () => {
    current++;
    if(current >= images.length){
        current = 0;
    }

    imgDiv.style.transform = `translateX(-${current * 100}%)`;
});

prev.addEventListener('click', () => {
    current--;
    if(current < 0){
        current = images.length - 1;
    }
    imgDiv.style.transform = `translateX(-${current * 100}%)`;
});