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
            
            // hide all mission sections
            missionSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // show the corresponding mission section
            const missionId = this.getAttribute('data-mission');
            const activeSection = document.getElementById(`${missionId}-section`);
            activeSection.classList.add('active');
            
            // play the video for the selected section
            const activeVideo = activeSection.querySelector('video');
            if (activeVideo) {
                // reset to beginning and play
                activeVideo.currentTime = 0;
                activeVideo.play().catch(error => {
                    console.warn('Auto-play was prevented:', error);
                    // add a play button overlay if autoplay is blocked
                    addPlayButtonOverlay(activeSection, activeVideo);
                });
            }
        });
    });
    
    // add a small animation effect when hovering over statistics
    const statisticItems = document.querySelectorAll('.statistic-item');
    statisticItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // scale up slightly and add a glow effect
            this.querySelector('.statistic-number').style.transform = 'scale(1.05)';
            this.querySelector('.statistic-number').style.textShadow = '0 0 15px rgba(255, 215, 0, 0.7)';
        });
        
        item.addEventListener('mouseleave', function() {
            // return to normal
            this.querySelector('.statistic-number').style.transform = 'scale(1)';
            this.querySelector('.statistic-number').style.textShadow = 'none';
        });
    });
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
