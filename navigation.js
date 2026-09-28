let enterBtn = document.querySelector('button#enter');
let nav = document.querySelector('nav');
let eventWrapper = document.querySelector('#events');

let navArticles = document.querySelectorAll('nav>article');
let navSections = document.querySelectorAll('section')

document.addEventListener('DOMContentLoaded', () => {
    enterBtn.addEventListener('click', (e) => {
        playAudio();
        audioToggle.classList.toggle('muted', muted);
        closeWindows();
        openButtons();
    })      
})

function closeWindows() {
    let windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.classList.add('hidden')
    });
}

function openButtons() {
    enterBtn.classList.add('hidden');
    nav.classList.remove('hidden');
    navSections.forEach(section => {
        section.classList.add('hidden');
    });
    navArticles.forEach(article => {
        let btn = article.querySelector('article>button');
        btn.classList.remove('hidden');
    });

    eventWrapper.classList.remove('hidden');

    let eventBtns = eventWrapper.querySelectorAll('button.open');
    eventBtns.forEach(btn => {
        btn.classList.remove('hidden')
    });

    audioToggle.classList.remove('hidden')
}

function hideButtons() {
    enterBtn.classList.add('hidden');
    navArticles.forEach(article => {
        let btn = article.querySelector('article>button');
        btn.classList.add('hidden');
    });
    eventWrapper.classList.remove('hidden');

    let eventBtns = eventWrapper.querySelectorAll('button.open');
    eventBtns.forEach(btn => {
        btn.classList.add('hidden')
    });

    audioToggle.classList.add('hidden')
}


navArticles.forEach(article => {
    let btn = article.querySelector('article>button');
    let section = article.querySelector('section');
    btn.addEventListener('click', () => {
        section.classList.remove('hidden');
        hideButtons()
    })
    article.addEventListener('click', (e) => {
        const openBtn = e.target.closest('.open');
        if (openBtn) {
            closeWindows();
            hideButtons();
            const section = openBtn.nextElementSibling;
            section.classList.toggle('hidden');
            return;
        }
        const closeBtn = e.target.closest('.close');
        if (closeBtn) {
            closeWindows();
            openButtons();
        }
    });
});



