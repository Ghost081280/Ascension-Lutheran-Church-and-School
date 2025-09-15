// Ascension Lutheran Church PWA - Completely Rebuilt App.js
// Version: 2025011411 - BULLETPROOF CONTENT LOADING

console.log('🏛️ REBUILT app.js loading... v2025011411');

// IMMEDIATE EXECUTION - NO WAITING FOR DOM
(function() {
    'use strict';
    
    console.log('🏛️ IIFE executing immediately');
    
    // PAGE CONTENT - DEFINED IMMEDIATELY
    const PAGE_CONTENT = {
        home: `
            <div class="page-content">
                <section class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
                        <p class="hero-subtitle">Join our family in worshipping and serving our glorious God in Fort Wayne, Indiana</p>
                        <div class="hero-cta">
                            <button onclick="loadPage('worship')" class="btn btn-primary">Join Us for Worship</button>
                            <button onclick="loadPage('church')" class="btn btn-secondary">Learn More</button>
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
                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Church • Family • School</h2>
                            <p class="section-subtitle">At Ascension, new life finds its expression in a three-fold fellowship and ministry where you will encounter and know the Lord Jesus Christ for your forgiveness, life, and salvation!</p>
                        </div>
                        <div class="card-grid">
                            <div class="card">
                                <div class="card-content">
                                    <h3 class="card-title">Church</h3>
                                    <p class="card-text">Ascension follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ.</p>
                                    <button onclick="loadPage('church')" class="card-link">Learn About Our Church →</button>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <h3 class="card-title">Family</h3>
                                    <p class="card-text">Ascension is a place for families with many opportunities to study God's Word together. We offer programs for all ages to grow in faith.</p>
                                    <button onclick="loadPage('family')" class="card-link">Explore Family Programs →</button>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <h3 class="card-title">School</h3>
                                    <p class="card-text">Providing traditional, Christian education to students in Preschool through 8th grade with academic excellence within our Christ-centered Lutheran worldview.</p>
                                    <button onclick="loadPage('school')" class="card-link">Learn About Our School →</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="verse-display">
                        <p class="verse-text">"I am the way, and the truth, and the life. No one comes to the Father except through me."</p>
                        <p class="verse-reference">John 14:6 (ESV)</p>
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
                                <h4>More specifically, here's what we believe:</h4>
                                <ul class="content-list">
                                    <li>Holy Scripture reveals one God in three persons: Father, Son and Holy Spirit. The three persons are equal in power, authority, and majesty.</li>
                                    <li>God the Father is the Eternal Father of God the Son. God the Father has made us and all creatures. He provides for all by giving us what we need for this body and life.</li>
                                    <li>Because of our inherited sin we need to be saved from what we are and what our actions deserve. Salvation is found in our Savior, Jesus Christ.</li>
                                    <li>By His death on the cross and resurrection He paid the penalty of all sin and guilt.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section class="verse-display">
                        <p class="verse-text">"Jesus Christ Is the Great Shepherd of His Sheep."</p>
                        <p class="verse-reference">Luke 15:4</p>
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
                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Learn by Heart</h2>
                            <p class="section-subtitle">Weekly Bible and Catechism study and devotion for the whole family</p>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <p><strong>Learn by Heart</strong> is updated weekly and includes:</p>
                                <ul class="content-list">
                                    <li>Bible Verse of the Week</li>
                                    <li>Catechism Memory Work</li>
                                    <li>Hymn of the Week</li>
                                    <li>Psalm Meditation of the Week</li>
                                    <li>Daily Bible/Catechism Meditations of the Week</li>
                                </ul>
                                <p>The Hymn of the Week will be sung in Chapel and is encouraged for use in family daily devotions.</p>
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
                        </div>
                    </section>
                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Excellence in Christian Education</h2>
                            <p class="section-subtitle">We proclaim the Gospel to the next generation and provide a quality education so children can grow spiritually, academically, socially, emotionally, and physically</p>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <h3>Our Mission</h3>
                                <p>Ascension Lutheran Church has established this school to proclaim the Gospel to the next generation and to provide a quality education so children can grow spiritually, academically, socially, emotionally, and physically.</p>
                                <p>Ascension Lutheran School will continue to provide its students with an education that emphasizes academic excellence within our Christ-centered Lutheran worldview, so that its graduates are effective thinkers, readers, writers, and problem-solvers who become the next generation of leaders in their home, church, and community.</p>
                            </div>
                        </div>
                    </section>
                    <section class="verse-display">
                        <p class="verse-text">"But in your hearts honor Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect."</p>
                        <p class="verse-reference">1 Peter 3:15 (ESV)</p>
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
                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Online Worship</h2>
                            <p class="section-subtitle">Can't make it in person? Join us online</p>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <h3>YouTube Live Services</h3>
                                <p>Sunday morning worship services and Adult Discipleship classes are available for viewing on our YouTube channel.</p>
                                <div style="margin: 2rem 0;">
                                    <a href="https://www.youtube.com/c/alcsfw" target="_blank" rel="noopener" class="btn btn-primary">
                                        Watch on YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="verse-display">
                        <p class="verse-text">"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching."</p>
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
                        <div class="card-grid">
                            <div class="contact-info">
                                <h3>Church Office</h3>
                                <div class="contact-item">
                                    <div>
                                        <p class="contact-text"><strong>Address:</strong><br>
                                        8811 St. Joe Road<br>
                                        Fort Wayne, IN 46835</p>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <div>
                                        <p class="contact-text"><strong>Phone:</strong><br>
                                        <a href="tel:+12604862226">(260) 486-2226</a></p>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <div>
                                        <p class="contact-text"><strong>Email:</strong><br>
                                        <a href="mailto:office@alcsfw.org">office@alcsfw.org</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Office Hours</h2>
                        </div>
                        <div class="worship-times">
                            <div class="time-item">
                                <span class="time-label">Monday - Thursday</span>
                                <span class="time-value">9:00 AM - 3:00 PM</span>
                            </div>
                            <div class="time-item">
                                <span class="time-label">Friday</span>
                                <span class="time-value">9:00 AM - 12:00 PM</span>
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
    
    console.log('🏛️ PAGE_CONTENT defined with', Object.keys(PAGE_CONTENT).length, 'pages');
    
    // CURRENT PAGE TRACKER
    let currentPage = 'home';
    
    // MAIN CONTENT LOADING FUNCTION - GLOBAL SCOPE
    window.loadPage = function(pageName) {
        console.log('🏛️ loadPage called with:', pageName);
        
        // Get the container - multiple fallback attempts
        let container = document.getElementById('page-container');
        if (!container) {
            container = document.querySelector('.page-container');
        }
        if (!container) {
            container = document.querySelector('main');
        }
        if (!container) {
            console.error('🏛️ NO CONTAINER FOUND!');
            return;
        }
        
        console.log('🏛️ Container found:', container);
        
        // Get content
        const content = PAGE_CONTENT[pageName];
        if (!content) {
            console.error('🏛️ No content for page:', pageName);
            container.innerHTML = '<div class="page-content"><div class="container"><h1>Page Not Found</h1><p>Content for "' + pageName + '" not available.</p></div></div>';
            return;
        }
        
        console.log('🏛️ Content found, length:', content.length);
        
        // UPDATE CONTENT IMMEDIATELY
        container.innerHTML = content;
        currentPage = pageName;
        
        // Update navigation
        updateNavigation(pageName);
        
        // Update URL
        if (window.location.hash !== '#' + pageName) {
            window.history.pushState(null, null, '#' + pageName);
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log('🏛️ Page loaded successfully:', pageName);
    };
    
    // NAVIGATION UPDATE
    function updateNavigation(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
    }
    
    // SETUP NAVIGATION - IMMEDIATE
    function setupNavigation() {
        console.log('🏛️ Setting up navigation');
        
        // Handle navigation clicks
        document.addEventListener('click', function(e) {
            const navLink = e.target.closest('[data-page]');
            if (navLink && !navLink.classList.contains('donate-link')) {
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                console.log('🏛️ Nav click:', page);
                window.loadPage(page);
            }
        });
        
        // Handle hash changes
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            const page = hash || 'home';
            if (page !== currentPage) {
                console.log('🏛️ Hash change:', page);
                window.loadPage(page);
            }
        });
        
        console.log('🏛️ Navigation setup complete');
    }
    
    // INITIALIZATION FUNCTION
    function initialize() {
        console.log('🏛️ Initializing app...');
        
        // Setup navigation immediately
        setupNavigation();
        
        // Load initial page
        const hash = window.location.hash.substring(1);
        const initialPage = hash || 'home';
        console.log('🏛️ Loading initial page:', initialPage);
        
        // FORCE LOAD HOME PAGE CONTENT IMMEDIATELY
        setTimeout(function() {
            window.loadPage(initialPage);
        }, 100);
        
        console.log('🏛️ App initialized');
    }
    
    // MULTIPLE INITIALIZATION ATTEMPTS
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // ALSO TRY AFTER A SHORT DELAY
    setTimeout(initialize, 500);
    
    // AND WHEN WINDOW LOADS
    window.addEventListener('load', initialize);
    
    console.log('🏛️ REBUILT app.js setup complete');
    
})();

// FALLBACK - ENSURE CONTENT LOADS NO MATTER WHAT
setTimeout(function() {
    console.log('🏛️ FALLBACK: Attempting to load home page');
    if (window.loadPage && typeof window.loadPage === 'function') {
        window.loadPage('home');
    }
}, 2000);
