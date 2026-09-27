let enterBtn = document.querySelector('button#enter');
let nav = document.querySelector('nav');
let eventWrapper = document.querySelector('#events');

document.addEventListener('DOMContentLoaded', () => {
    enterBtn.addEventListener('click', (e) => {
        closeAll()
        enterBtn.classList.add('hidden');
        nav.classList.remove('hidden');
        eventWrapper.classList.remove('hidden')
    })      
})

function closeAll() {
    let windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.classList.add('hidden')
    });
}
