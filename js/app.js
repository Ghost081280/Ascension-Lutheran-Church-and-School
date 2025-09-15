// Fixed app.js - Complete Mobile & Desktop Solution
console.log('🏛️ Fixed app.js loading...');

// PAGE CONTENT OBJECT - With Proper Mobile Layouts
const pages = {
    home: `
        <div class="page-content">
            <section class="hero-section" style="background-image: linear-gradient(rgba(139, 0, 0, 0.7), rgba(102, 0, 0, 0.7)), url('./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
                <div class="hero-content">
                    <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
                    <p class="hero-subtitle">Join our family in worshipping and serving our glorious God in Fort Wayne, Indiana</p>
                    <div class="hero-cta">
                        <button class="btn btn-primary" onclick="loadPage('worship')">Join Us for Worship</button>
                        <button class="btn btn-secondary" onclick="loadPage('church')">Learn More</button>
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
                            <img src="./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg" alt="Church Building" class="card-image">
                            <div class="card-content">
                                <h3 class="card-title">Church</h3>
                                <p class="card-text">Ascension follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ.</p>
                                <button class="card-link" onclick="loadPage('church')">Learn About Our Church →</button>
                            </div>
                        </div>
                        <div class="card">
                            <img src="./images/families.jpg" alt="Church Families" class="card-image">
                            <div class="card-content">
                                <h3 class="card-title">Family</h3>
                                <p class="card-text">Ascension is a place for families with many opportunities to study God's Word together. We offer programs for all ages to grow in faith.</p>
                                <button class="card-link" onclick="loadPage('family')">Explore Family Programs →</button>
                            </div>
                        </div>
                        <div class="card">
                            <img src="./images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp" alt="Lutheran School" class="card-image">
                            <div class="card-content">
                                <h3 class="card-title">School</h3>
                                <p class="card-text">Providing traditional, Christian education to students in Preschool through 8th grade with academic excellence within our Christ-centered Lutheran worldview.</p>
                                <button class="card-link" onclick="loadPage('school')">Learn About Our School →</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="info-section">
                    <div class="section-header">
                        <h2 class="section-title">Meet Our Pastor</h2>
                        <p class="section-subtitle">Shepherding our congregation with wisdom and faith</p>
                    </div>
                    <div class="pastor-section">
                        <div class="pastor-image-wrapper">
                            <img src="./images/Pastor.png" alt="Rev. James Gier" class="pastor-photo">
                        </div>
                        <div class="pastor-info">
                            <h3 class="pastor-name">Rev. James Gier</h3>
                            <p class="pastor-role">Senior Pastor</p>
                            <div class="pastor-bio">
                                <p>Pastor Gier was a licensed architect prior to entering the Holy Ministry and is a graduate of Concordia Theological Seminary in Fort Wayne. He brings a unique perspective to ministry, combining his background in design with his passion for God's Word.</p>
                                <p>Pastor Gier has been faithfully serving our congregation, providing pastoral care, preaching God's Word, and administering the sacraments with dedication and love.</p>
                            </div>
                            <button class="pastor-contact" onclick="loadPage('contact')">Contact Pastor Gier →</button>
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
                <section class="stewardship-quote">
                    <p>Luke 15:2 – "And the Pharisees and the scribes grumbled, saying, 'This man receives sinners and eats with them.'"</p>
                    <p>Thanks be to God: Jesus receives us sinners! What the Pharisees can't understand, we praise with all our being. We give thanks for the grace of God, and we live by that grace.</p>
                    <p class="stewardship-reference">LCMS Stewardship Bulletin Sentences</p>
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
                        <div class="hero-cta">
                            <a href="tel:+12604862226" class="btn btn-primary">Call for Information</a>
                            <a href="mailto:office@alcsfw.org" class="btn btn-secondary">Email Us</a>
                        </div>
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
                        <div class="time-item">
                            <span class="time-label">Lent & Advent Services</span>
                            <span class="time-value">Wednesdays 6:30 PM</span>
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
                            <p>Don't miss the Order of Service links to follow along in the bulletin during online worship.</p>
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
                        <div class="contact-info">
                            <h3>Pastor Information</h3>
                            <div class="contact-item">
                                <div>
                                    <p class="contact-text"><strong>Rev. James Gier</strong><br>
                                    Senior Pastor</p>
                                    <p class="contact-text">Pastor Gier was a licensed architect prior to entering the Holy Ministry and is a graduate of Concordia Theological Seminary in Fort Wayne.</p>
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
                        <div class="time-item">
                            <span class="time-label">Saturday - Sunday</span>
                            <span class="time-value">By Appointment</span>
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

// CURRENT PAGE TRACKING
let currentPage = 'home';

// MOBILE MENU FUNCTIONALITY - COMPLETE FIX
function toggleMobileMenu() {
    console.log('🏛️ toggleMobileMenu called');
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) {
        console.error('🏛️ Mobile menu elements not found!');
        return;
    }
    
    const isOpen = navMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) return;
    
    console.log('🏛️ Opening mobile menu');
    navMenu.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstLink = navMenu.querySelector('.nav-link');
    if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) return;
    
    console.log('🏛️ Closing mobile menu');
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// MAIN LOAD PAGE FUNCTION - ENHANCED
function loadPage(pageName) {
    console.log('🏛️ loadPage called:', pageName);
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Find container
    const container = document.getElementById('page-container');
    if (!container) {
        console.error('🏛️ Container not found!');
        return;
    }
    
    // Get content
    const content = pages[pageName];
    if (!content) {
        console.error('🏛️ Page not found:', pageName);
        container.innerHTML = `
            <div class="page-content">
                <div class="container">
                    <div class="hero-section">
                        <div class="hero-content">
                            <h1 class="hero-title">Page Not Found</h1>
                            <p class="hero-subtitle">Sorry, the page "${pageName}" could not be found.</p>
                            <div class="hero-cta">
                                <button class="btn btn-primary" onclick="loadPage('home')">Go Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    // Load content with fade effect
    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = content;
        container.style.opacity = '1';
        currentPage = pageName;
        
        // Update navigation
        updateNavigation(pageName);
        
        // Update URL
        window.location.hash = pageName;
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Announce page change for screen readers
        if (window.announcePageChange) {
            window.announcePageChange(pageName);
        }
        
        // Initialize any new components on the page
        initializePageComponents();
        
        console.log('🏛️ Page loaded successfully:', pageName);
    }, 150);
}

// UPDATE NAVIGATION STATES
function updateNavigation(pageName) {
    const navLinks = document.querySelectorAll('.nav-link:not(.donate-link)');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if link matches current page
        const linkText = link.textContent.toLowerCase().trim();
        const linkOnClick = link.getAttribute('onclick');
        
        if (linkText === pageName || 
            (linkOnClick && linkOnClick.includes(`'${pageName}'`))) {
            link.classList.add('active');
        }
    });
}

// INITIALIZE PAGE-SPECIFIC COMPONENTS
function initializePageComponents() {
    // Setup lazy loading for new images
    if (window.components && window.components.setupLazyLoading) {
        window.components.setupLazyLoading();
    }
    
    // Setup form validation for new forms
    if (window.components && window.components.setupFormValidation) {
        window.components.setupFormValidation();
    }
    
    // Add hover effects to new cards
    const cards = document.querySelectorAll('.card:not(.enhanced)');
    cards.forEach(card => {
        card.classList.add('enhanced');
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-4px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Setup button ripple effects
    const buttons = document.querySelectorAll('.btn:not(.ripple-enabled), .card-link:not(.ripple-enabled)');
    buttons.forEach(button => {
        button.classList.add('ripple-enabled');
        button.addEventListener('click', createRippleEffect);
    });
}

// RIPPLE EFFECT FOR BUTTONS
function createRippleEffect(e) {
    if (window.innerWidth <= 768) return; // Skip on mobile for performance
    
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (button.contains(ripple)) {
            button.removeChild(ripple);
        }
    }, 600);
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && mobileToggle && 
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.substring(1);
        if (newHash && pages[newHash] && newHash !== currentPage) {
            loadPage(newHash);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Reset any transforms on resize
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transform = 'translateY(0)';
        });
    }, 250));
    
    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden
            closeMobileMenu();
        }
    });
}

// UTILITY FUNCTIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ADD RIPPLE ANIMATION CSS IF NOT EXISTS
function addRippleAnimation() {
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// PERFORMANCE OPTIMIZATION
function optimizePerformance() {
    // Add will-change to elements that will animate
    const animatedElements = document.querySelectorAll('.card, .btn, .nav-link');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform';
    });
    
    // Setup intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe cards and sections
        const observeElements = document.querySelectorAll('.card, .info-section');
        observeElements.forEach(el => observer.observe(el));
    }
}

// INITIALIZE APPLICATION
function initialize() {
    console.log('🏛️ Initializing application...');
    
    // Add ripple animation CSS
    addRippleAnimation();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial page
    const hash = window.location.hash.substring(1);
    const initialPage = hash && pages[hash] ? hash : 'home';
    loadPage(initialPage);
    
    // Initialize page components
    setTimeout(() => {
        initializePageComponents();
        optimizePerformance();
    }, 500);
    
    // Log successful initialization
    console.log('🏛️ Application initialized successfully');
}

// MAKE FUNCTIONS GLOBALLY AVAILABLE
window.loadPage = loadPage;
window.toggleMobileMenu = toggleMobileMenu;

// INITIALIZE WHEN DOM IS READY
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('🏛️ Application error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🏛️ Unhandled promise rejection:', e.reason);
});

console.log('🏛️ Fixed app.js loaded successfully');
