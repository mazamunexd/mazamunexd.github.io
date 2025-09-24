// Get the navigation element
const nav = document.querySelector('nav');

// Variable to store the last scroll position
let lastScrollY = window.scrollY;

// Listen for the 'scroll' event
window.addEventListener('scroll', () => {
    // Check if the current scroll position is greater than the last one (scrolling down)
    if (lastScrollY < window.scrollY) {
        // Scrolling Down - Add the 'nav-hidden' class
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling Up - Remove the 'nav-hidden' class
        nav.classList.remove('nav-hidden');
    }

    // Update the last scroll position
    lastScrollY = window.scrollY;
});


