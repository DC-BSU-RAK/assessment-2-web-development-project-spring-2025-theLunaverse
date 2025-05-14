document.addEventListener('DOMContentLoaded', () => {
    // navigation functionality (for all pages)
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        // set hamburger icon
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
    
    // stars functionality (only for the home page)
    const container = document.getElementById('container');
    const video = document.getElementById('moonVideo'); // element only on home page
    
    // only create stars if we're on the home page (checking for the video element)
    let stars = [];
    if (container && video) {
        function createStar() {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
            container.appendChild(star);
            return star;
        }
    
