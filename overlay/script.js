let icon = document.querySelector('.icon');
let pmenu = document.querySelector('.pmenu');

icon.addEventListener('click', () => {
    if (pmenu.style.display === 'flex') {
        pmenu.style.display = 'none';
    } else {
        pmenu.style.display = 'flex';
    }
});