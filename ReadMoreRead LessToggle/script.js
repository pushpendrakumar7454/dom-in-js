let h4s = document.querySelectorAll('h4');

h4s.forEach((h4) => {
    h4.addEventListener('click', () => {
        h4.classList.toggle('toggle');
    });
});