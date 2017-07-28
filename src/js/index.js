// Import SCSS and Images for Webpack
import '../sass/app.scss';
import '../images/node-icon.svg';


const navigationToggle = document.getElementById('nav-control');
const navigationMenu = document.getElementById('navigation-container');
let menuOpen = false;

navigationToggle.addEventListener('touchend', () => {
    if (menuOpen === true) {
        navigationMenu.style.maxHeight = '0';
        navigationToggle.textContent = 'Menu';
    } else {
        navigationMenu.style.maxHeight = '1000px';
        navigationToggle.textContent = 'Hide Menu';
    }
    menuOpen = !menuOpen;
});

