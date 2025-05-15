document.addEventListener('DOMContentLoaded', function() {
    // tab switching functionality
    const missionButtons = document.querySelectorAll('.mission-button');
    const missionSections = document.querySelectorAll('.mission-section');
    
    // function to pause all videos when not on the tab
    function pauseAllVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
        });
    }
    
    pauseAllVideos();
    
    // play the video for the active section (on page load)
    const initialActiveSection = document.querySelector('.mission-section.active');
    if (initialActiveSection) {
        const initialVideo = initialActiveSection.querySelector('video');
        if (initialVideo) {
            // reset to beginning and play
            initialVideo.currentTime = 0;
            initialVideo.play().catch(error => {
                console.warn('Auto-play was prevented:', error);
                // add a play button overlay if autoplay is blocked
                addPlayButtonOverlay(initialActiveSection, initialVideo);
            });
        }
    }
    
    // add click event listeners to tab buttons
    missionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // remove active class from all buttons
            missionButtons.forEach(btn => btn.classList.remove('active'));
            // add active class to clicked button
            this.classList.add('active');
            
            // pause all videos
            pauseAllVideos();
            
});

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
