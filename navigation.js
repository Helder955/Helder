let enterBtn = document.querySelector('button#enter');
let nav = document.querySelector('nav');

enterBtn.addEventListener('click', (e) => {
    enterBtn.classList.add('hidden');
    nav.classList.remove('hidden');
})