let enterBtn = document.querySelector('button#enter');
let nav = document.querySelector('nav');
let eventWrapper = document.querySelector('#events')

enterBtn.addEventListener('click', (e) => {
    enterBtn.classList.add('hidden');
    nav.classList.remove('hidden');
    eventWrapper.classList.remove('hidden')
})

// van evenementen
let eventsArticles = document.querySelectorAll('#events article');
let openBtns = document.querySelectorAll('#events article>button.open');


eventsArticles.forEach(article => {
    let openBtn = article.querySelector('button.open');
    let closeBtn = article.querySelector('button.close');
    let section = article.querySelector('section');

    openBtn.addEventListener('click', (e) => {
        openSection(section)
    })
    closeBtn.addEventListener('click', (e) => {
        closeSection(section)
    })
});    


function openSection(section) {
    openBtns.forEach(openBtn => {
        openBtn.classList.add('hidden');
    });
    
    section.classList.remove('hidden');
}

function closeSection(section) {
    openBtns.forEach(openBtn => {
        openBtn.classList.remove('hidden');
    });
    section.classList.add('hidden');
}
