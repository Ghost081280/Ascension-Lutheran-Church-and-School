// Main Application JavaScript for Ascension Lutheran Church PWA
// Version: 2025011404 - With Clickable Logo Navigation

console.log('🏛️ app.js loading... v2025011404');

class ChurchApp {
    constructor() {
        console.log('🏛️ ChurchApp constructor called v2025011404');
        this.currentPage = 'home';
        this.isLoading = false;
        this.version = '2025011404';
        this.pageContent = this.initializePageContent();
        
        this.init();
    }

    init() {
        console.log('🏛️ ChurchApp init called');
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🏛️ ChurchApp setup called');
        
        this.setupLoadingScreen();
        this.setupNavigation();
        this.loadInitialPage();
        
        console.log('🏛️ Ascension Lutheran Church PWA initialized');
    }

    setupLoadingScreen() {
        console.log('🏛️ Setting up loading screen');
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        // Reduced from 4000ms to 3200ms (3.2 seconds) - optimal reading time
        setTimeout(() => {
            console.log('🏛️ Loading screen timeout triggered');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600); // Slightly longer elegant fade
            }
            
            if (mainApp) {
                mainApp.classList.remove('hidden');
                mainApp.style.opacity = '1';
            }
        }, 3200); // Optimized timing for readability without feeling slow
    }

    setupNavigation() {
        console.log('🏛️ Setting up navigation');
        
        // Set up navigation links and logo clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                console.log('🏛️ Navigation clicked:', page);
                this.loadPage(page);
            }
        });

        // Handle keyboard navigation for logo and nav links
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const navElement = e.target.closest('[data-page]');
                if (navElement) {
                    e.preventDefault();
                    const page = navElement.getAttribute('data-page');
                    console.log('🏛️ Keyboard navigation:', page);
                    this.loadPage(page);
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            console.log('🏛️ Popstate event:', hash);
            this.loadPage(hash);
        });
    }

    loadInitialPage() {
        console.log('🏛️ Loading initial page');
        const hash = window.location.hash.substring(1);
        const initialPage = hash && this.pageContent[hash] ? hash : 'home';
        console.log('🏛️ Initial page determined:', initialPage);
        this.loadPage(initialPage);
    }

    loadPage(pageName) {
        console.log('🏛️ Loading page:', pageName);
        
        if (this.isLoading) {
            console.log('🏛️ Already loading, skipping');
            return;
        }
        
        this.isLoading = true;
        this.currentPage = pageName;
        
        try {
            const pageContent = this.getPageContent(pageName);
            console.log('🏛️ Got page content for', pageName);
            this.renderPage(pageContent);
            this.updateActiveNavigation(pageName);
            this.updatePageTitle(pageName);
            
            // Update URL hash
            if (window.location.hash !== `#${pageName}`) {
                window.location.hash = `#${pageName}`;
            }

            // Announce page change for accessibility
            if (window.announcePageChange) {
                window.announcePageChange(pageName);
            }
        } catch (error) {
            console.error('Error loading page:', error);
        } finally {
            this.isLoading = false;
        }
    }

    getPageContent(pageName) {
        console.log('🏛️ Getting content for page:', pageName);
        return this.pageContent[pageName] || this.pageContent.home;
    }

    renderPage(pageContent) {
        console.log('🏛️ Rendering page content');
        const container = document.getElementById('page-container');
        
        if (!container) {
            console.error('🏛️ Page container not found');
            return;
        }
        
        // Smooth transition
        container.style.opacity = '0';
        
        setTimeout(() => {
            container.innerHTML = pageContent;
            container.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 150);
    }

    updateActiveNavigation(pageName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
    }

    updatePageTitle(pageName) {
        const titles = {
            home: 'Ascension Lutheran Church & School | Fort Wayne, IN',
            church: 'Our Church | Ascension Lutheran',
            family: 'Family Ministry | Ascension Lutheran',
            school: 'Lutheran School | Ascension Lutheran',
            worship: 'Worship Times | Ascension Lutheran',
            contact: 'Contact Us | Ascension Lutheran'
        };
        
        document.title = titles[pageName] || titles.home;
    }

    initializePageContent() {
        return {
            home: `
                <div class="page-content">
                    <section class="hero-section" style="background-image: linear-gradient(135deg, rgba(139, 0, 0, 0.8) 0%, rgba(102, 0, 0, 0.9) 100%), url('./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
                        <div class="hero-content">
                            <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
                            <p class="hero-subtitle">Join our family in worshipping and serving our glorious God in Fort Wayne, Indiana</p>
                            <div class="hero-cta">
                                <a href="#worship" class="btn btn-primary" data-page="worship">Join Us for Worship</a>
                                <a href="#church" class="btn btn-secondary" data-page="church">Learn More</a>
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
                                    <img src="./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg" alt="Ascension Lutheran Church Building" class="card-image" style="height: 200px; object-fit: cover;">
                                    <div class="card-content">
                                        <h3 class="card-title">Church</h3>
                                        <p class="card-text">Ascension follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ.</p>
                                        <a href="#church" class="card-link" data-page="church">
                                            Learn About Our Church →
                                        </a>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src="./images/families.jpg" alt="Families at Ascension Lutheran Church" class="card-image" style="height: 200px; object-fit: cover; object-position: center 20%;">
                                    <div class="card-content">
                                        <h3 class="card-title">Family</h3>
                                        <p class="card-text">Ascension is a place for families with many opportunities to study God's Word together. We offer programs for all ages to grow in faith.</p>
                                        <a href="#family" class="card-link" data-page="family">
                                            Explore Family Programs →
                                        </a>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src="./images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp" alt="Ascension Lutheran School Building" class="card-image" style="height: 200px; object-fit: cover;">
                                    <div class="card-content">
                                        <h3 class="card-title">School</h3>
                                        <p class="card-text">Providing traditional, Christian education to students in Preschool through 8th grade with academic excellence within our Christ-centered Lutheran worldview.</p>
                                        <a href="#school" class="card-link" data-page="school">
                                            Learn About Our School →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="info-section">
                            <div class="section-header">
                                <h2 class="section-title">Meet Our Pastor</h2>
                            </div>
                            <div class="card">
                                <div class="card-content" style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
                                    <div style="flex: 0 0 200px;">
                                        <img src="./images/Pastor.png?v=2025011404" alt="Rev. James Gier, Senior Pastor" 
                                             style="width: 200px; height: 250px; object-fit: cover; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
                                    </div>
                                    <div style="flex: 1; min-width: 300px;">
                                        <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">Rev. James Gier</h3>
                                        <p style="color: var(--secondary-color); font-weight: 600; margin-bottom: 1rem;">Senior Pastor</p>
                                        <p>Pastor Gier was installed as Ascension's third senior pastor in 2019. He was a licensed architect prior to entering the Holy Ministry and is a graduate of Concordia Theological Seminary in Fort Wayne.</p>
                                        <p>Pastor Gier brings a unique perspective to ministry, combining his architectural background with his theological training to help build both physical and spiritual communities at Ascension.</p>
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
                        <section class="info-section">
                            <div class="section-header">
                                <h2 class="section-title">Our History</h2>
                            </div>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-year">1977</div>
                                    <div class="timeline-content">
                                        <h4>Mission Begins</h4>
                                        <p>Ascension Lutheran Church started as a mission outreach to northeast Fort Wayne, Indiana, in the summer of 1977.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-year">1997</div>
                                    <div class="timeline-content">
                                        <h4>School Opens</h4>
                                        <p>Ascension Lutheran School opened with grades one through six. Having a Lutheran Day School was a goal of the congregation from the beginning.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-year">2019</div>
                                    <div class="timeline-content">
                                        <h4>Pastor Gier</h4>
                                        <p>Rev. James Gier was installed as Ascension's third senior pastor. Pastor Gier was a licensed architect prior to entering the Holy Ministry.</p>
                                    </div>
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
                        <section class="info-section">
                            <div class="worship-times">
                                <h3>Family Activities Schedule</h3>
                                <div class="time-item">
                                    <span class="time-label">Children's Sunday School</span>
                                    <span class="time-value">9:30 AM</span>
                                </div>
                                <div class="time-item">
                                    <span class="time-label">Adult Discipleship Class</span>
                                    <span class="time-value">9:30 AM</span>
                                </div>
                                <div class="time-item">
                                    <span class="time-label">Family Devotions</span>
                                    <span class="time-value">Daily at Home</span>
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
                        <section class="info-section">
                            <div class="section-header">
                                <h2 class="section-title">Academics & Programs</h2>
                            </div>
                            <div class="card-grid">
                                <div class="card">
                                    <div class="card-content">
                                        <h3>Academic Excellence</h3>
                                        <p>Through daily instruction, our children learn the basic tenets of the Lutheran Confessions, with an emphasis on Luther's Small Catechism.</p>
                                        <p>To support our mission of providing a quality education, our school sets high goals for its faculty and its curriculum. We're accredited by the National Lutheran Schools Accreditation.</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                        <h3>Music Program</h3>
                                        <p>Our school has a strong music program, rich in the traditions of the Lutheran Church. Students learn about music through a variety of experiences.</p>
                                        <p>From the classics to modern technology, Ascension offers students learning opportunities that enrich their lives.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="info-section">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Enrollment Information</h3>
                                    <p>You will find a family-friendly atmosphere at Ascension. When you schedule your initial visit, please plan to spend about an hour to tour our church and school and visit with our staff.</p>
                                    <p><strong>Programs Available:</strong></p>
                                    <ul class="content-list">
                                        <li>Preschool (3-4 years old)</li>
                                        <li>Kindergarten through 8th Grade</li>
                                        <li>Before and After School Care</li>
                                        <li>Hot Lunch Program</li>
                                    </ul>
                                    <p><strong>Leadership:</strong> Mrs. Laurie Behnfeldt serves as principal and teacher. Mrs. Behnfeldt comes with many years of experience teaching in Lutheran schools, including several years at Ascension.</p>
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
                        <section class="info-section">
                            <div class="section-header">
                                <h2 class="section-title">What to Expect</h2>
                            </div>
                            <div class="card">
                                <div class="card-content">
                                    <p><strong>Warm and friendly atmosphere.</strong> We have a new sanctuary that was completed and dedicated on June 13, 2010. Our day school is also part of our building and includes a large gymnasium.</p>
                                    <p><strong>Dress comfortably.</strong> When you step into Ascension you will find people dressed in jeans, suits, skirts, dresses and everything in between. It doesn't matter what you wear - just that you're here.</p>
                                    <p><strong>Service length.</strong> Our worship services generally last about one hour.</p>
                                    <p><strong>Children welcome.</strong> We love having kids in worship, and each week in both services we have many children from our preschool and grade school.</p>
                                    <p><strong>Liturgical worship.</strong> We follow the Order of Service printed in the new Lutheran Service Book (2006) and a printed bulletin with an outline of the service available from an usher.</p>
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
                                        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"/>
                                        </svg>
                                        <div>
                                            <p class="contact-text"><strong>Address:</strong><br>
                                            8811 St. Joe Road<br>
                                            Fort Wayne, IN 46835</p>
                                        </div>
                                    </div>
                                    <div class="contact-item">
                                        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/>
                                        </svg>
                                        <div>
                                            <p class="contact-text"><strong>Phone:</strong><br>
                                            <a href="tel:+12604862226">(260) 486-2226</a></p>
                                        </div>
                                    </div>
                                    <div class="contact-item">
                                        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                                        </svg>
                                        <div>
                                            <p class="contact-text"><strong>Email:</strong><br>
                                            <a href="mailto:office@alcsfw.org">office@alcsfw.org</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="contact-info">
                                    <h3>Pastor Information</h3>
                                    <div class="contact-item">
                                        <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                                        </svg>
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
                        <section class="info-section">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Questions About Membership?</h3>
                                    <p>Interested in becoming a member of Ascension Lutheran Church? Whenever you have any questions about the church, what we believe, or have a special need, please contact the church office at (260) 486-2226 and ask to talk with the pastor.</p>
                                    <p>Pastor Gier conducts instructional classes regularly for those who want to join Ascension or have children in Ascension Lutheran School.</p>
                                </div>
                            </div>
                        </section>
                        <section class="info-section">
                            <div class="card">
                                <div class="card-content">
                                    <h3>Get Directions</h3>
                                    <p>We're located on St. Joe Road in northeast Fort Wayne, easily accessible from major highways.</p>
                                    <div style="margin: 2rem 0;">
                                        <a href="https://maps.google.com/?q=8811+St+Joe+Road+Fort+Wayne+IN+46835" target="_blank" rel="noopener" class="btn btn-primary">
                                            Get Directions
                                        </a>
                                    </div>
                                    <p><strong>Parking:</strong> Free parking is available in our church lot with easy access to the main entrance.</p>
                                    <p><strong>Accessibility:</strong> Our building is wheelchair accessible with ramps and accessible restrooms.</p>
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
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ DOM loaded, initializing ChurchApp');
    window.app = new ChurchApp();
});

console.log('🏛️ ALC PWA App.js Version: 2025011404');
