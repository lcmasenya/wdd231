// Set constants
const navButton = document.querySelector('#nav-button');
const navLinks = document.querySelector('#nav-bar');

// nav button
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});