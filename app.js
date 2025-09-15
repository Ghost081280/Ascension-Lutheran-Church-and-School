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

    setupPWAFeatures() {
        // Install prompt handling
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
            this.showInstallButton();
        });

        // Install button click handler
        const installBtn = document.getElementById('install-btn');
        installBtn.addEventListener('click', () => this.installApp());

        // App installed handler
        window.addEventListener('appinstalled', () => {
            this.hideInstallButton();
            this.showToast('App installed successfully!', 'success');
        });
    }

    setupSocialSharing() {
        const shareBtn = document.getElementById('share-btn');
        shareBtn.addEventListener('click', () => this.shareContent());
    }

    showInstallButton() {
        const installBtn = document.getElementById('install-btn');
        installBtn.style.display = 'flex';
        installBtn.style.opacity = '0';
        installBtn.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            installBtn.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            installBtn.style.opacity = '1';
            installBtn.style.transform = 'scale(1)';
        });
    }

    hideInstallButton() {
        const installBtn = document.getElementById('install-btn');
        installBtn.style.opacity = '0';
        installBtn.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            installBtn.style.display = 'none';
        }, 300);
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

                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Family Faith Formation</h2>
                            <p class="section-subtitle">Parents are the primary teachers of faith, and we're here to support you</p>
                        </div>

                        <div class="card-grid">
                            <div class="card">
                                <img src="./images/family-bible-study.jpg" alt="Family Bible Study" class="card-image">
                                <div class="card-content">
                                    <h3 class="card-title">Home Devotions</h3>
                                    <p class="card-text">Resources and guidance for families to establish meaningful devotional time at home.</p>
                                </div>
                            </div>

                            <div class="card">
                                <img src="./images/youth-activities.jpg" alt="Youth Activities" class="card-image">
                                <div class="card-content">
                                    <h3 class="card-title">Youth Programs</h3>
                                    <p class="card-text">Age-appropriate activities and learning opportunities for children and teenagers.</p>
                                </div>
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

                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L1 9L12 15L21 11.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                                    </svg>
                                </div>
                                <h3>Academic Excellence</h3>
                                <p>Rigorous curriculum ensuring students are prepared for high school success.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"/>
                                    </svg>
                                </div>
                                <h3>Faith Integration</h3>
                                <p>Gospel message woven throughout all subjects and school activities.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L3.09 8.26L4 21L12 17L20 21L20.91 8.26L12 2Z"/>
                                    </svg>
                                </div>
                                <h3>Small Class Sizes</h3>
                                <p>Individual attention with approximately 110 students across all grades.</p>
                            </div>
                        </div>
                    </section>

                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">School Staff</h2>
                        </div>

                        <div class="staff-grid">
                            <div class="staff-card">
                                <img src="./images/staff-principal.jpg" alt="Principal" class="staff-photo">
                                <h4 class="staff-name">Principal</h4>
                                <p class="staff-title">5th-8th English, 5th-6th Reading, 5th Social Studies</p>
                                <a href="mailto:principal@alcsfw.org" class="staff-email">principal@alcsfw.org</a>
                            </div>

                            <div class="staff-card">
                                <img src="./images/staff-preschool.jpg" alt="Preschool Teacher" class="staff-photo">
                                <h4 class="staff-name">Preschool Teacher</h4>
                                <p class="staff-title">Early Childhood Education</p>
                                <a href="mailto:d.kolter@alcsfw.org" class="staff-email">d.kolter@alcsfw.org</a>
                            </div>

                            <div class="staff-card">
                                <img src="./images/staff-kindergarten.jpg" alt="Kindergarten Teacher" class="staff-photo">
                                <h4 class="staff-name">Kindergarten Teacher</h4>
                                <p class="staff-title">Kindergarten</p>
                                <a href="mailto:a.ruse@alcsfw.org" class="staff-email">a.ruse@alcsfw.org</a>
                            </div>

                            <div class="staff-card">
                                <img src="./images/staff-elementary.jpg" alt="Elementary Teacher" class="staff-photo">
                                <h4 class="staff-name">Elementary Teacher</h4>
                                <p class="staff-title">1st/2nd Grade</p>
                                <a href="mailto:c.schumacher@alcsfw.org" class="staff-email">c.schumacher@alcsfw.org</a>
                            </div>

                            <div class="staff-card">
                                <img src="./images/staff-middle.jpg" alt="Middle School Teacher" class="staff-photo">
                                <h4 class="staff-name">Middle School Teacher</h4>
                                <p class="staff-title">3rd/4th Grade and Athletic Director</p>
                                <a href="mailto:s.parker@alcsfw.org" class="staff-email">s.parker@alcsfw.org</a>
                            </div>

                            <div class="staff-card">
                                <img src="./images/staff-upper.jpg" alt="Upper Grades Teacher" class="staff-photo">
                                <h4 class="staff-name">Upper Grades Teacher</h4>
                                <p class="staff-title">7th/8th homeroom, 6th and 8th Math, 5-8 Science, 5-8 Music</p>
                                <a href="mailto:j.neuman@alcsfw.org" class="staff-email">j.neuman@alcsfw.org</a>
                            </div>
                        </div>
                    </section>

                    <section class="info-section">
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
                                    <a href="https://www.youtube.com/channel/UC_CHANNEL_ID" target="_blank" rel="noopener" class="btn btn-primary">
                                        Watch on YouTube
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </a>
                                </div>

                                <p><strong>What to Expect:</strong></p>
                                <ul style="margin-left: 2rem;">
                                    <li>Traditional Lutheran liturgy</li>
                                    <li>Hymns and contemporary Christian music</li>
                                    <li>Biblical preaching and teaching</li>
                                    <li>Holy Communion (1st and 3rd Sundays)</li>
                                    <li>Warm, welcoming community</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">First Time Visitors</h2>
                        </div>

                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
                                    </svg>
                                </div>
                                <h3>What to Wear</h3>
                                <p>Come as you are! We welcome casual to formal attire. The important thing is that you're here to worship.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"/>
                                    </svg>
                                </div>
                                <h3>Service Length</h3>
                                <p>Our worship services typically last about 60-75 minutes, including music, readings, and sermon.</p>
                            </div>

                            <div class="info-item">
                                <div class="info-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14ZM9 12C10.9 12 12.5 10.4 12.5 8.5S10.9 5 9 5 5.5 6.6 5.5 8.5 7.1 12 9 12ZM9 13.5C6.2 13.5 0.5 14.9 0.5 17.5V19.5H7V17.5C7 16.4 7.6 15.4 8.5 14.7C8.2 14.6 7.9 14.5 7.5 14.5H9Z"/>
                                    </svg>
                                </div>
                                <h3>Children Welcome</h3>
                                <p>Children are always welcome in worship! We have quiet activities and childcare available if needed.</p>
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

                            <div class="contact-info">
                                <h3>Pastor</h3>
                                <div class="contact-item">
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                                    </svg>
                                    <div>
                                        <p class="contact-text"><strong>Rev. James Gier</strong><br>
                                        Senior Pastor</p>
                                    </div>
                                </div>

                                <div class="contact-item">
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                                    </svg>
                                    <div>
                                        <p class="contact-text">For pastoral care, spiritual guidance, or church matters</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="info-section">
                        <div class="section-header">
                            <h2 class="section-title">Get Directions</h2>
                        </div>

                        <div class="card">
                            <div class="card-content">
                                <p>We're located on St. Joe Road in northeast Fort Wayne, easily accessible from major highways.</p>
                                
                                <div style="margin: 2rem 0;">
                                    <a href="https://maps.google.com/?q=8811+St+Joe+Road+Fort+Wayne+IN+46835" target="_blank" rel="noopener" class="btn btn-primary">
                                        Get Directions
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"/>
                                        </svg>
                                    </a>
                                </div>

                                <p><strong>Parking:</strong> Free parking is available in our church lot with easy access to the main entrance.</p>
                                <p><strong>Accessibility:</strong> Our building is wheelchair accessible with ramps and accessible restrooms.</p>
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
        `;
    }

    renderPage(content) {
        const container = document.getElementById('page-container');
        
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
                document.body.removeChild(toast);
            }, 300);
        }, 4000);
    }

    showError(message) {
        this.showToast(message, 'error');
    }
}

// Initialize the app
const app = new ChurchApp();
