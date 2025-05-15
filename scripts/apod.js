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
    
    // my NASA API Keys
    const API_KEY = '92Z9D31r5LhqTH14qNIbPRBG2GM5HQz8XcleNwvA';
    const NASA_APOD_API = 'https://api.nasa.gov/planetary/apod';
    
    // set date input max to today
    const today = new Date();
    const todayFormatted = formatDateForInput(today);
    dateInput.max = todayFormatted;
    
    // set min date to when APOD started (June 16, 1995)
    dateInput.min = '1995-06-16';
    
    // set default date to January 11, 2006
    const defaultDate = '2006-11-01';
    dateInput.value = defaultDate;
    
    // load the default date's APOD
    getAPOD(defaultDate);
    
    // event Listeners
    viewDateBtn.addEventListener('click', function() {
        getAPOD(dateInput.value);
    });
        
    randomBtn.addEventListener('click', function() {
        // generate random date between APOD start and today
        const start = new Date('1995-06-16');
        const randomDate = new Date(start.getTime() + Math.random() * (today.getTime() - start.getTime()));
        const randomDateFormatted = formatDateForInput(randomDate);
        
        dateInput.value = randomDateFormatted;
        getAPOD(randomDateFormatted);
    });
    
    // functions
    function getAPOD(date) {
        // show loading
        loadingEl.style.display = 'flex';
        
        // clear previous content (except loading indicator)
        Array.from(apodContainer.children).forEach(child => {
            if (child !== loadingEl) {
                child.remove();
            }
        });
        
        // build URL with API key and date
        const url = `${NASA_APOD_API}?api_key=${API_KEY}&date=${date}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // hide loading
                loadingEl.style.display = 'none';
                
                // create APOD content
                const apodContent = document.createElement('div');
                apodContent.className = 'apod-content';
                
                // handle media (image or video)
                if (data.media_type === 'image') {
                    // for images
                    const img = document.createElement('img');
                    img.src = data.hdurl || data.url;
                    img.alt = data.title;
                    img.className = 'apod-media';
                    
                    // add click to view full size
                    img.addEventListener('click', function() {
                        window.open(data.hdurl || data.url, '_blank');
                    });
                    
                    apodContent.appendChild(img);
                } else if (data.media_type === 'video') {
                    // for videos (usually YouTube)
                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'apod-video-container';
                    
                    const iframe = document.createElement('iframe');
                    iframe.src = data.url;
                    iframe.title = data.title;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    
                    videoContainer.appendChild(iframe);
                    apodContent.appendChild(videoContainer);
                }
});