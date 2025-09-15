// Simple, Direct App for Ascension Lutheran Church PWA
// Version: 2025011403 - Simplified for reliability

console.log('🏛️ Simple app.js loading... v2025011403');

// Simple page content object
const PAGE_CONTENT = {
    home: `
        <div class="page-content">
            <section class="hero-section" style="background-image: linear-gradient(135deg, rgba(139, 0, 0, 0.8) 0%, rgba(102, 0, 0, 0.9) 100%), url('./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg'); background-size: cover; background-position: center;">
                <div class="hero-content">
                    <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
                    <p class="hero-subtitle">Join our family in worshipping and serving our glorious God in Fort Wayne, Indiana</p>
                    <div class="hero-cta">
                        <a href="#worship" class="btn btn-primary" onclick="loadPage('worship')">Join Us for Worship</a>
                        <a href="#church" class="btn btn-secondary" onclick="loadPage('church')">Learn More</a>
                    </div>
                </div>
            </section>
            <div class="container">
                <section class="info-section">
                    <div class="worship-times">
                        <h3>Divine Worship</h3>
                        <div class="time-item">
                            <span class="time-label">Sunday Morning Services</span>
                            <span class="time-value">8:00 AM & 10:45 AM</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    
    church: `
        <div class="page-content">
            <div class="container">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Our Church</h1>
                        <p class="hero-subtitle">Faithful to the Gospel of Christ since 1977</p>
                    </div>
                </section>
                <section class="info-section">
                    <div class="section-header">
                        <h2 class="section-title">What We Believe</h2>
                        <p class="section-subtitle">As Evangelical Lutherans, we are loyal to the Gospel of Christ</p>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <p>Ascension Lutheran Church and School follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ, our Lord and Savior. Ascension is a member of the Lutheran Church Missouri Synod.</p>
                            <p>We are guided in our interpretation of the Scriptures by the Lutheran Confessions as contained in the Book of Concord, to which we unconditionally subscribe.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    
    family: `
        <div class="page-content">
            <div class="container">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Family Ministry</h1>
                        <p class="hero-subtitle">Ascension is a place for families with many opportunities to grow in faith together</p>
                    </div>
                </section>
                <section class="info-section">
                    <div class="card">
                        <div class="card-content">
                            <h3>Family Programs</h3>
                            <p>Ascension Lutheran Church is a place for families. Ascension offers many opportunities to study God's Word together.</p>
                            <p>As the school year approaches, remember that Jesus is going with you and your family there, too.</p>
                        </div>
                    </div>
                </section>
                <section class="verse-display">
                    <p class="verse-text">"Train up a child in the way he should go; even when he is old he will not depart from it."</p>
                    <p class="verse-reference">Proverbs 22:6 (ESV)</p>
                </section>
            </div>
        </div>
    `,
    
    school: `
        <div class="page-content">
            <div class="container">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Ascension Lutheran School</h1>
                        <p class="hero-subtitle">Providing traditional, Christian education from Preschool through 8th grade</p>
                        <div class="hero-cta">
                            <a href="tel:+12604862226" class="btn btn-primary">Call for Information</a>
                            <a href="mailto:office@alcsfw.org" class="btn btn-secondary">Email Us</a>
                        </div>
                    </div>
                </section>
                <section class="info-section">
                    <div class="card">
                        <div class="card-content">
                            <h3>Our Mission</h3>
                            <p>Ascension Lutheran Church has established this school to proclaim the Gospel to the next generation and to provide a quality education so children can grow spiritually, academically, socially, emotionally, and physically.</p>
                            <p>Ascension Lutheran School will continue to provide its students with an education that emphasizes academic excellence within our Christ-centered Lutheran worldview.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    
    worship: `
        <div class="page-content">
            <div class="container">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Worship With Us</h1>
                        <p class="hero-subtitle">Traditional Lutheran worship services every Sunday</p>
                    </div>
                </section>
                <section class="info-section">
                    <div class="worship-times">
                        <h3>Sunday Worship Schedule</h3>
                        <div class="time-item">
                            <span class="time-label">Divine Service</span>
                            <span class="time-value">8:00 AM & 10:45 AM</span>
                        </div>
                        <div class="time-item">
                            <span class="time-label">Holy Communion</span>
                            <span class="time-value">Offered at both services</span>
                        </div>
                        <div class="time-item">
                            <span class="time-label">Adult Discipleship Class</span>
                            <span class="time-value">9:30 AM</span>
                        </div>
                        <div class="time-item">
                            <span class="time-label">Children's Sunday School</span>
                            <span class="time-value">9:30 AM</span>
                        </div>
                    </div>
                </section>
                <section class="verse-display">
                    <p class="verse-text">"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another."</p>
                    <p class="verse-reference">Hebrews 10:25 (NIV)</p>
                </section>
            </div>
        </div>
    `,
    
    contact: `
        <div class="page-content">
            <div class="container">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Contact Us</h1>
                        <p class="hero-subtitle">We'd love to hear from you and answer any questions</p>
                    </div>
                </section>
                <section class="info-section">
                    <div class="contact-info">
                        <h3>Church Office</h3>
                        <div class="contact-item">
                            <p class="contact-text"><strong>Address:</strong><br>
                            8811 St. Joe Road<br>
                            Fort Wayne, IN 46835</p>
                        </div>
                        <div class="contact-item">
                            <p class="contact-text"><strong>Phone:</strong><br>
                            <a href="tel:+12604862226">(260) 486-2226</a></p>
                        </div>
                        <div class="contact-item">
                            <p class="contact-text"><strong>Email:</strong><br>
                            <a href="mailto:office@alcsfw.org">office@alcsfw.org</a></p>
                        </div>
                    </div>
                </section>
                <section class="verse-display">
                    <p class="verse-text">"Come to me, all you who are weary and burdened, and I will give you rest."</p>
                    <p class="verse-reference">Matthew 11:28 (NIV)</p>
                </section>
            </div>
        </div>
    `
};

// Simple global functions
let currentPage = 'home';

function loadPage(pageName) {
    console.log('🏛️ LOADING PAGE:', pageName);
    
    const container = document.getElementById('page-container');
    if (!container) {
        console.error('🏛️ No page container found!');
        return;
    }
    
    const content = PAGE_CONTENT[pageName] || PAGE_CONTENT.home;
    console.log('🏛️ Content found for', pageName, ':', content.substring(0, 50));
    
    container.innerHTML = content;
    currentPage = pageName;
    
    // Update navigation
    updateActiveNav(pageName);
    
    // Update URL
    window.location.hash = '#' + pageName;
    
    console.log('🏛️ Page loaded successfully:', pageName);
}

function updateActiveNav(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ DOM loaded, setting up simple navigation');
    
    // Set up navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            console.log('🏛️ Nav clicked:', page);
            loadPage(page);
        });
    });
    
    // Load initial page
    const hash = window.location.hash.substring(1);
    const initialPage = hash && PAGE_CONTENT[hash] ? hash : 'home';
    console.log('🏛️ Loading initial page:', initialPage);
    loadPage(initialPage);
    
    // Handle loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainApp) {
            mainApp.classList.remove('hidden');
            mainApp.style.opacity = '1';
        }
        
        console.log('🏛️ App fully loaded');
    }, 1500);
});

// Make loadPage available globally
window.loadPage = loadPage;
window.currentPage = currentPage;

console.log('🏛️ Simple app.js loaded successfully v2025011403');
