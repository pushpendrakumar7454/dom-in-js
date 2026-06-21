const input = document.querySelector('input');
let child = document.querySelector('.child');

input.addEventListener('input', () => {
    child.textContent = input.value.length;
});