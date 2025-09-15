// Main Application JavaScript for Ascension Lutheran Church PWA

class ChurchApp {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.installPrompt = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupLoadingScreen();
        this.setupPWAFeatures();
        this.setupSocialSharing();
        this.setupNavigation();
        this.loadInitialPage();
        
        console.log('🏛️ Ascension Lutheran Church PWA initialized');
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        // Simulate app loading time
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                mainApp.style.opacity = '0';
                mainApp.style.transform = 'translateY(20px)';
                
                // Animate in main app
                requestAnimationFrame(() => {
                    mainApp.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    mainApp.style.opacity = '1';
                    mainApp.style.transform = 'translateY(0)';
                });
            }, 300);
        }, 2500);
    }

    setupNavigation() {
        // Main navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    this.loadPage(page);
                }
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.toggle('active');
            });
        }
    }

    setupPWAFeatures() {
        // Install prompt handling
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
            this.showInstallButton();
        });

        // Install button click handler
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => this.installApp());
        }

        // App installed handler
        window.addEventListener('appinstalled', () => {
            this.hideInstallButton();
            this.showToast('App installed successfully!', 'success');
        });
    }

    setupSocialSharing() {
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareContent());
        }
    }

    showInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.style.display = 'flex';
            installBtn.style.opacity = '0';
            installBtn.style.transform = 'scale(0.8)';
            
            requestAnimationFrame(() => {
                installBtn.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                installBtn.style.opacity = '1';
                installBtn.style.transform = 'scale(1)';
            });
        }
    }

    hideInstallButton() {
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.style.opacity = '0';
            installBtn.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                installBtn.style.display = 'none';
            }, 300);
        }
    }

    async installApp() {
        if (!this.installPrompt) return;

        try {
            const result = await this.installPrompt.prompt();
            console.log('Install prompt result:', result.outcome);
            
            if (result.outcome === 'accepted') {
                this.hideInstallButton();
            }
        } catch (error) {
            console.error('Install prompt error:', error);
        }

        this.installPrompt = null;
    }

    async shareContent() {
        const shareData = {
            title: 'Ascension Lutheran Church & School',
            text: 'Join our family in worshipping and serving our glorious God at Ascension Lutheran Church in Fort Wayne, Indiana.',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log('Content shared successfully');
            } else {
                // Fallback to Facebook share
                this.shareFacebook(shareData);
            }
        } catch (error) {
            console.log('Error sharing content:', error);
            // Fallback to Facebook share
            this.shareFacebook(shareData);
        }
    }

    shareFacebook(shareData) {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
        window.open(fbUrl, 'facebook-share', 'width=580,height=400');
    }

    loadInitialPage() {
        // Load home page content
        this.loadPage('home');
    }

    async loadPage(pageName) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.currentPage = pageName;
        
        try {
            const content = await this.getPageContent(pageName);
            this.renderPage(content);
            this.updateActiveNavigation(pageName);
            this.updatePageTitle(pageName);
            
            // Update URL hash
            window.location.hash = `#${pageName}`;
            
            // Announce page change for accessibility
            if (window.announcePageChange) {
                window.announcePageChange(pageName);
            }
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page content');
        } finally {
            this.isLoading = false;
        }
    }

    async getPageContent(pageName) {
        // In a real app, this would fetch from an API or load from files
        // For now, we'll return static content based on the page
        
        const pages = {
            home: this.getHomeContent(),
            church: this.getChurchContent(),
            family: this.getFamilyContent(),
            school: this.getSchoolContent(),
            worship: this.getWorshipContent(),
            contact: this.getContactContent()
        };

        return pages[pageName] || pages.home;
    }

    getHomeContent() {
        return `
            <div class="page-content">
                <section class="hero-section">
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
                        <div class="section-header">
                            <h2 class="section-title">Church • Family • School</h2>
                            <p class="section-subtitle">At Ascension, new life finds its expression in a three-fold fellowship and ministry where you will encounter and know the Lord Jesus Christ for your forgiveness, life, and salvation!</p>
                        </div>

                        <div class="card-grid">
                            <div class="card">
                                <img src="./images/worship-service.jpg" alt="Worship Service" class="card-image">
                                <div class="card-content">
                                    <h3 class="card-title">Divine Worship</h3>
                                    <p class="card-text">Join us for traditional Lutheran worship services every Sunday at 8:00 AM and 10:45 AM.</p>
                                    <a href="#worship" class="card-link" data-page="worship">
                                        View Service Times
                                        <svg class="card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8.636 3.5a.5.5 0 0 0-.5.5v6.5a.5.5 0 0 0 .854.354l3-3a.5.5 0 0 0 0-.708l-3-3A.5.5 0 0 0 8.636 3.5z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div class="card">
                                <img src="./images/family-activities.jpg" alt="Family Activities" class="card-image">
                                <div class="card-content">
                                    <h3 class="card-title">Family Ministry</h3>
                                    <p class="card-text">Ascension is a place for families with many opportunities to study God's Word together.</p>
                                    <a href="#family" class="card-link" data-page="family">
                                        Explore Programs
                                        <svg class="card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8.636 3.5a.5.5 0 0 0-.5.5v6.5a.5.5 0 0 0 .854.354l3-3a.5.5 0 0 0 0-.708l-3-3A.5.5 0 0 0 8.636 3.5z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div class="card">
                                <img src="./images/school-students.jpg" alt="School Students" class="card-image">
                                <div class="card-content">
                                    <h3 class="card-title">Lutheran School</h3>
                                    <p class="card-text">Providing traditional Christian education to students in Preschool through 8th grade.</p>
                                    <a href="#school" class="card-link" data-page="school">
                                        Learn About School
                                        <svg class="card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8.636 3.5a.5.5 0 0 0-.5.5v6.5a.5.5 0 0 0 .854.354l3-3a.5.5 0 0 0 0-.708l-3-3A.5.5 0 0 0 8.636 3.5z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="verse-display">
                        <p class="verse-text">"I am the way, and the truth, and the life. No one comes to the Father except through me."</p>
                        <p class="verse-reference">John 14:6 (ESV)</p>
                    </section>

                    <section class="info-section">
                        <div class="worship-times">
                            <h3>Worship Schedule</h3>
                            <div class="time-item">
                                <span class="time-label">Sunday Divine Worship</span>
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
                </div>
            </div>
        `;
    }

    getChurchContent() {
        return `
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
                                <p>In the Gospel of St. John (14:6), Jesus said "I am the way, and the truth, and the life. No one comes to the Father except through me." Jesus is our way back to our Father in heaven. He is the Gospel (Good News) of God to the world.</p>
                                
                                <p>As Evangelical Lutherans, we are loyal to the Gospel of Christ, "for there is no other name under heaven given among men by which we must be saved" (Acts 4:12).</p>
                                
                                <p>This Gospel ministry and mission of the Christian Church is to seek, make, and mature disciples for God's eternal kingdom through preaching, baptizing, teaching, and communing.</p>
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
                                    <p>Ascension Lutheran Church started as a mission outreach to northeast Fort Wayne, Indiana, in the summer of 1977. First service was held on June 5, 1977.</p>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-year">1980</div>
                                <div class="timeline-content">
                                    <h4>First Pastor</h4>
                                    <p>Rev. David Dubbelde became Ascension's first pastor in September 1980, faithfully serving until 1989.</p>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-year">1989</div>
                                <div class="timeline-content">
                                    <h4>School Established</h4>
                                    <p>Rev. Dr. John Stube arrived as the second pastor. Under his leadership, Ascension added a Lutheran school and the campus greatly expanded.</p>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-year">2019</div>
                                <div class="timeline-content">
                                    <h4>Current Leadership</h4>
                                    <p>Rev. James Gier was installed as Ascension's third senior pastor, bringing architectural background and seminary training to serve our congregation.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="verse-display">
                        <p class="verse-text">"And the third day, He rose again according to the Scriptures and ascended into heaven and sits at the right hand of the Father."</p>
                        <p class="verse-reference">The Nicene Creed</p>
                    </section>
                </div>
            </div>
        `;
    }

    getFamilyContent() {
        return `
            <div class="page-content">
                <div class="container">
                    <section class="hero-section">
                        <div class="hero-content">
                            <h1 class="hero-title">Family Ministry</h1>
                            <p class="hero-subtitle">Ascension is a place for families with many opportunities to grow in faith together</p>
                        </div>
                    </section>

                    <section class="info-section">
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.64 7 14.31 7.14 14.06 7.36L13 8.5V7C13 6.45 12.55 6 12 6S11 6.45 11 7V14.5L7.91 15.64C7.66 15.74 7.5 15.97 7.5 16.25C7.5 16.66 7.84 17 8.25 17H10.5V22H12.5V17H15.5V22H17.5V17H19.75C20.16 17 20.5 16.66 20.5 16.25C20.5 15.97 20.34 15.74 20.09 15.64L21 9Z"/>
                                    </svg>
                                </div>
                                <h3>Children's Sunday School</h3>
                                <p>Every Sunday at 9:30 AM, children learn Bible stories and Christian values in age-appropriate classes.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L1 9L12 15L21 11.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                                    </svg>
                                </div>
                                <h3>Adult Discipleship</h3>
                                <p>Adult Bible study classes at 9:30 AM provide deeper understanding of Scripture and Christian living.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                                    </svg>
                                </div>
                                <h3>Family Events</h3>
                                <p>Special seasonal celebrations, family fun nights, and community outreach opportunities throughout the year.</p>
                            </div>
                        </div>
                    </section>

                    <section class="verse-display">
                        <p class="verse-text">"Train up a child in the way he should go; even when he is old he will not depart from it."</p>
                        <p class="verse-reference">Proverbs 22:6 (ESV)</p>
                    </section>
                </div>
            </div>
        `;
    }

    getSchoolContent() {
        return `
            <div class="page-content">
                <div class="container">
                    <section class="hero-section">
                        <div class="hero-content">
                            <h1 class="hero-title">Ascension Lutheran School</h1>
                            <p class="hero-subtitle">Providing traditional Christian education from Preschool through 8th grade</p>
                            <div class="hero-cta">
                                <a href="tel:+12604862226" class="btn btn-primary">Call for Information</a>
                                <a href="mailto:office@alcsfw.org" class="btn btn-secondary">Email Us</a>
                            </div>
                        </div>
                    </section>

                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Excellence in Christian Education</h2>
                            <p class="section-subtitle">Preparing students spiritually, academically, socially, emotionally, and physically</p>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <h3>Enrollment Information</h3>
                                <p>Ascension Lutheran School serves 110 students from Preschool through 8th grade. We provide a well-rounded, faith-based education in a safe environment that amplifies the values taught at home.</p>
                                
                                <p><strong>Programs Available:</strong></p>
                                <ul style="margin-left: 2rem; margin-bottom: 1rem;">
                                    <li>Preschool (3-4 years old)</li>
                                    <li>Kindergarten through 8th Grade</li>
                                    <li>Before and After School Care</li>
                                    <li>Hot Lunch Program</li>
                                </ul>

                                <p><strong>Extracurricular Activities:</strong></p>
                                <ul style="margin-left: 2rem;">
                                    <li>Athletics: Basketball, Volleyball, Soccer, Track & Field, Cross Country</li>
                                    <li>Music: Band, Choir, Handbells, Strings Program</li>
                                    <li>Clubs: Crochet Club, Girls Who Code, Trail Life</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    getWorshipContent() {
        return `
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
                                <span class="time-label">Early Service</span>
                                <span class="time-value">8:00 AM</span>
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
                                <span class="time-label">Late Service</span>
                                <span class="time-value">10:45 AM</span>
                            </div>
                        </div>
                    </section>

                    <section class="verse-display">
                        <p class="verse-text">"Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another."</p>
                        <p class="verse-reference">Hebrews 10:25 (NIV)</p>
                    </section>
                </div>
            </div>
        `;
    }

    getContactContent() {
        return `
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
                        </div>
                    </section>

                    <section class="verse-display">
                        <p class="verse-text">"Come to me, all you who are weary and burdened, and I will give you rest."</p>
                        <p class="verse-reference">Matthew 11:28 (NIV)</p>
                    </section>
                </div>
            </div>
        `;
    }

    renderPage(content) {
        const container = document.getElementById('page-container');
        
        if (!container) {
            console.error('Page container not found');
            return;
        }
        
        // Add fade out animation
        container.style.opacity = '0';
        container.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            container.innerHTML = content;
            
            // Add event listeners to any dynamic content
            this.attachPageEventListeners();
            
            // Animate in new content
            container.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 150);
    }

    attachPageEventListeners() {
        // Add click listeners to any internal navigation links
        const pageLinks = document.querySelectorAll('[data-page]');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
            });
        });
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

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease-out;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    showError(message) {
        this.showToast(message, 'error');
    }
}

// Initialize the app and make it globally available
const app = new ChurchApp();
window.app = app;
