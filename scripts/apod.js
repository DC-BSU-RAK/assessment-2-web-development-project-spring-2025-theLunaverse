document.addEventListener('DOMContentLoaded', () => {
    // navigation functionality
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        // set initial hamburger icon
        navToggle.innerHTML = '☰';
        
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // change icon based on menu state
            navToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            // reset icon when closing menu
            if (navToggle) {
                navToggle.innerHTML = '☰';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const apodContainer = document.getElementById('apod-container');
    const dateInput = document.getElementById('apod-date');
    const viewDateBtn = document.getElementById('view-date-btn');
    const randomBtn = document.getElementById('random-btn');
    const loadingEl = document.getElementById('loading');
});