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
    
        stars = Array(200).fill().map(() => createStar());
    
        // parallax effect for stars (only on home page)
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const moonRect = video.getBoundingClientRect();
            const moonCenterX = moonRect.left + moonRect.width / 2;
            const moonCenterY = moonRect.top + moonRect.height / 2;
    
            stars.forEach(star => {
                const speed = parseFloat(star.style.width) / 10;
                const cursorXOffset = (mouseX - window.innerWidth / 2) * speed;
                const cursorYOffset = (mouseY - window.innerHeight / 2) * speed;
                
                const starRect = star.getBoundingClientRect();
                const starX = starRect.left + starRect.width / 2;
                const starY = starRect.top + starRect.height / 2;
                const moonPullStrength = 0.05;
                const moonXOffset = (moonCenterX - starX) * moonPullStrength;
                const moonYOffset = (moonCenterY - starY) * moonPullStrength;
    
                const finalXOffset = cursorXOffset + moonXOffset;
                const finalYOffset = cursorYOffset + moonYOffset;
    
                star.style.transform = `translate(${finalXOffset}px, ${finalYOffset}px)`;
            });
        });
    }
    
    if (video) {
        // video hover functionality
        video.addEventListener('mouseover', () => video.play());
        video.addEventListener('mouseout', () => video.pause());
        video.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (video.paused) video.play();
            else video.pause();
        });
    
        // carousel functionality
        initCarousel();
    }
    
    // about page specific functionality
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        // timeline animation
        function animateTimeline() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                if (isElementInViewport(item)) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });
        }
    
        window.addEventListener('scroll', animateTimeline);
        window.addEventListener('load', animateTimeline);
    
        // stats counter
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
    
            observer.observe(statsSection);
        }
    }
});
        }
    }
});
