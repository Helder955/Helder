const audioToggle = document.querySelector('#audio-toggle');
const audio = new Audio('media/audio.mp3'); // path to your audio file
audio.loop = true; // optional

let muted = false;

audioToggle.addEventListener('click', () => {
    muted = !muted;
    audio.muted = muted;
    audioToggle.classList.toggle('muted', muted);
});

function playAudio() {
    audio.muted = muted; // respect the toggle if it was clicked before entering
    audio.play().catch((err) => console.warn('Playback failed:', err));
}