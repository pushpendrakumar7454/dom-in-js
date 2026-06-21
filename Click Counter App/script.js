const countEl = document.querySelector('#count');
const button = document.querySelector('button');

let count = 0;

button.addEventListener('click', () => {
    count++;
    countEl.textContent = count;
});