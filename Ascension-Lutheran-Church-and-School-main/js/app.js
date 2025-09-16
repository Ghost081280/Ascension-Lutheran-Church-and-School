// Ascension Lutheran Church App - COMPLETE DEBUG VERSION
console.log('🏛️ App.js loading - DEBUG VERSION...');

class AscensionApp {
  constructor() {
    this.currentPage = 'home';
    this.mobileMenuOpen = false;
    this.content = null;
    this.init();
  }

  async init() {
    console.log('🏛️ Initializing Ascension App...');
    
    try {
      await this.waitForContent();
      await this.waitForDOM();
      this.setupEventListeners();
      this.populateNavigation();
      this.populateFooter();
      
      // Load home page immediately
      setTimeout(() => {
        this.loadPage('home');
      }, 100);
      
      console.log('🏛️ App initialized successfully');
    } catch (error) {
      console.error('🏛️ App initialization failed:', error);
      this.showFallbackContent();
    }
  }

  async waitForContent() {
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
      if (typeof SITE_CONTENT !== 'undefined') {
        this.content = SITE_CONTENT;
        console.log('🏛️ Content loaded successfully');
        return;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error('Content not available after maximum attempts');
  }

  async waitForDOM() {
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
      const container = document.getElementById('main-content');
      if (container) {
        console.log('🏛️ DOM container found:', container);
        return;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    throw new Error('DOM container not found after maximum attempts');
  }

  setupEventListeners() {
    console.log('🏛️ Setting up event listeners...');
    
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🏛️ Mobile menu toggle clicked');
        this.toggleMobileMenu();
      });
    }

    // Logo click handler
    const logoContainer = document.getElementById('nav-logo-home');
    if (logoContainer) {
      logoContainer.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🏛️ Logo clicked - loading home');
        this.loadPage('home');
      });
      
      logoContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.loadPage('home');
        }
      });
    }

    // FIXED: Document-level navigation clicks with better debugging
    document.addEventListener('click', (e) => {
      console.log('🏛️ Document click:', e.target);
      
      if (e.target.hasAttribute('data-page')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        console.log('🏛️ Navigation click detected for page:', page);
        this.loadPage(page);
      }

      // Close mobile menu on outside click
      if (this.mobileMenuOpen && 
          !e.target.closest('.nav-menu') && 
          !e.target.closest('.mobile-menu-toggle')) {
        this.closeMobileMenu();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Hash change handling
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash && this.content && this.content.pages[hash]) {
        this.loadPage(hash);
      }
    });
    
    console.log('🏛️ Event listeners set up successfully');
  }

  populateNavigation() {
    console.log('🏛️ Populating navigation...');
    
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) {
      console.error('🏛️ Navigation menu not found!');
      return;
    }
    
    if (!this.content) {
      console.error('🏛️ Content not available for navigation!');
      return;
    }

    // FIXED: Generate navigation with proper data-page attributes
    const navLinks = this.content.navigation.map(item => {
      console.log('🏛️ Creating nav link for:', item.id);
      return `<a href="#${item.id}" class="nav-link" data-page="${item.id}" role="menuitem">${item.label}</a>`;
    }).join('');

    const donateButton = `<a href="${this.content.external.donate}" target="_blank" rel="noopener" class="nav-link donate-link" role="menuitem">
      <span class="donate-heart">♥</span> Give
    </a>`;

    navMenu.innerHTML = navLinks + donateButton;

    // Set home as active
    const homeLink = navMenu.querySelector('[data-page="home"]');
    if (homeLink) {
      homeLink.classList.add('active');
      console.log('🏛️ Home link set as active');
    }
    
    console.log('🏛️ Navigation populated successfully with', this.content.navigation.length, 'links');
  }

  populateFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer || !this.content) {
      console.warn('🏛️ Footer or content not found');
      return;
    }

    const footerData = this.content.footer;
    const socialData = this.content.social;

    const sections = footerData.sections.map(section => {
      if (section.social) {
        return `
          <div class="footer-section">
            <h3>${section.title}</h3>
            <div class="social-links">
              <a href="${socialData.facebook}" target="_blank" rel="noopener" class="social-link facebook">
                Facebook
              </a>
              <a href="${socialData.youtube}" target="_blank" rel="noopener" class="social-link youtube">
                YouTube
              </a>
            </div>
          </div>
        `;
      } else {
        const content = section.content.map(item => `<p>${item}</p>`).join('');
        return `
          <div class="footer-section">
            <h3>${section.title}</h3>
            ${content}
          </div>
        `;
      }
    }).join('');

    const bottom = footerData.bottom.map(text => `<p>${text}</p>`).join('');

    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-container">
          ${sections}
        </div>
        <div class="footer-bottom">
          ${bottom}
        </div>
      </div>
    `;
    
    console.log('🏛️ Footer populated successfully');
  }

  loadPage(pageName) {
    console.log('🏛️ Loading page:', pageName);

    if (!this.content) {
      console.error('🏛️ No content available!');
      this.showFallbackContent();
      return;
    }
    
    if (!this.content.pages[pageName]) {
      console.error('🏛️ Page not found:', pageName);
      this.showFallbackContent();
      return;
    }

    this.closeMobileMenu();

    const pageData = this.content.pages[pageName];
    console.log('🏛️ Page data found:', pageData);
    
    const pageHTML = this.generatePageHTML(pageName, pageData);
    console.log('🏛️ Generated HTML length:', pageHTML.length);

    // FIXED: Find container with better error handling
    const container = document.getElementById('main-content');
    if (!container) {
      console.error('🏛️ CRITICAL: main-content container not found!');
      // Try alternative container names
      const altContainer = document.querySelector('.page-container');
      if (altContainer) {
        console.log('🏛️ Found alternative container');
        altContainer.innerHTML = pageHTML;
        return;
      }
      return;
    }

    console.log('🏛️ Container found, updating content...');
    
    // Smooth transition
    container.style.opacity = '0.5';
    setTimeout(() => {
      container.innerHTML = pageHTML;
      container.style.opacity = '1';
      this.currentPage = pageName;
      this.updateNavigation(pageName);
      this.updateURL(pageName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      console.log('🏛️ Page loaded successfully:', pageName);
      
      // Announce page change for accessibility
      if (window.announcePageChange) {
        window.announcePageChange(pageName);
      }
    }, 100);
  }

  generatePageHTML(pageName, pageData) {
    console.log('🏛️ Generating HTML for page:', pageName);
    
    switch (pageName) {
      case 'home':
        return this.generateHomePage(pageData);
      case 'church':
        return this.generateChurchPage(pageData);
      case 'family':
        return this.generateFamilyPage(pageData);
      case 'school':
        return this.generateSchoolPage(pageData);
      case 'worship':
        return this.generateWorshipPage(pageData);
      case 'contact':
        return this.generateContactPage(pageData);
      default:
        return this.generateErrorPage(pageName);
    }
  }

  generateHomePage(data) {
    console.log('🏛️ Generating home page');
    return `
      <div class="page-content">
        ${this.generateHeroSection(data.hero)}
        <div class="container">
          ${this.generateWorshipTimesSection(data.sections.worshipTimes)}
          ${this.generateMinistrySection(data.sections.ministry)}
          ${this.generatePastorSection(data.sections.pastor)}
          ${this.generateMissionStatement(data.mission)}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateChurchPage(data) {
    return `
      <div class="page-content">
        <div class="container">
          ${this.generateHeroSection(data.hero)}
          ${this.generateBeliefsSection(data.beliefs)}
          ${this.generateHistorySection(data.history)}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateFamilyPage(data) {
    return `
      <div class="page-content">
        <div class="container">
          ${this.generateHeroSection(data.hero)}
          ${this.generateFamilyPrograms(data.programs)}
          ${this.generateLearnByHeart(data.learnByHeart)}
          ${this.generateSpecialPrograms(data.specialPrograms)}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateSchoolPage(data) {
    return `
      <div class="page-content">
        <div class="container">
          ${this.generateHeroSection(data.hero)}
          ${this.generateMissionSection(data.mission)}
          ${this.generateSchoolStats(data.stats)}
          ${this.generateSchoolPrograms(data.programs)}
          ${this.generateAdmissionsInfo(data.admissions)}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateWorshipPage(data) {
    return `
      <div class="page-content">
        <div class="container">
          ${this.generateHeroSection(data.hero)}
          ${this.generateScheduleSection(data.schedule)}
          ${this.generateOnlineWorshipSection(data.online)}
          ${this.generateMusicMinistry(data.musicMinistry)}
          ${this.generateEducationMinistry(data.education)}
          ${this.generateMissionsMinistry(data.missions)}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateContactPage(data) {
    return `
      <div class="page-content">
        <div class="container">
          ${this.generateHeroSection(data.hero)}
          ${this.generateContactSections(data.sections)}
          ${this.generateOfficeHours(data.officeHours)}
          ${this.generateMembershipInfo(data.membership)}
          ${this.generateLeadershipSection(data.leadership)}
          ${this.generateStaffDirectory()}
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  generateHeroSection(hero) {
    if (!hero) return '';

    const backgroundStyle = hero.backgroundImage ? 
      `style="background-image: linear-gradient(rgba(139, 0, 0, 0.7), rgba(102, 0, 0, 0.7)), url('${hero.backgroundImage}'); background-size: cover; background-position: center;"` : '';

    const buttons = hero.buttons ? hero.buttons.map(btn => 
      btn.link ? 
        `<a href="${btn.link}" class="btn btn-${btn.style}">${btn.text}</a>` :
        `<button class="btn btn-${btn.style}" data-page="${btn.page}">${btn.text}</button>`
    ).join('') : '';

    return `
      <section class="hero-section" ${backgroundStyle}>
        <div class="hero-content">
          <h1 class="hero-title">${hero.title}</h1>
          <p class="hero-subtitle">${hero.subtitle}</p>
          ${buttons ? `<div class="hero-cta">${buttons}</div>` : ''}
        </div>
      </section>
    `;
  }

  generateWorshipTimesSection(section) {
    if (!section) return '';

    const items = section.items.map(item => `
      <div class="time-item">
        <span class="time-label">${item.label}</span>
        <span class="time-value">${item.value}</span>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="worship-times">
          <h3>${section.title}</h3>
          ${items}
        </div>
      </section>
    `;
  }

  generateMinistrySection(section) {
    if (!section) return '';

    const cards = section.cards.map(card => `
      <div class="card">
        <img src="${card.image}" alt="${card.title}" class="card-image" loading="lazy">
        <div class="card-content">
          <h3 class="card-title">${card.title}</h3>
          <p class="card-text">${card.text}</p>
          <button class="card-link" data-page="${card.buttonPage}">${card.buttonText}</button>
        </div>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${section.title}</h2>
          <p class="section-subtitle">${section.subtitle}</p>
        </div>
        <div class="card-grid">
          ${cards}
        </div>
      </section>
    `;
  }

  generatePastorSection(section) {
    if (!section || !this.content.staff.seniorPastor) return '';

    const pastor = this.content.staff.seniorPastor;
    const bio = pastor.bio.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${section.title}</h2>
          <p class="section-subtitle">${section.subtitle}</p>
        </div>
        <div class="pastor-section">
          <div class="pastor-image-wrapper">
            <img src="${pastor.image}" alt="${pastor.name}" class="pastor-photo" loading="lazy">
          </div>
          <div class="pastor-info">
            <h3 class="pastor-name">${pastor.name}</h3>
            <p class="pastor-role">${pastor.title}</p>
            <div class="pastor-bio">
              ${bio}
            </div>
            <button class="pastor-contact" data-page="contact">Contact Pastor Gier →</button>
          </div>
        </div>
      </section>
    `;
  }

  generateMissionStatement(mission) {
    if (!mission) return '';

    return `
      <section class="info-section">
        <div class="card">
          <div class="card-content">
            <h3>Our Mission</h3>
            <p>${mission.statement}</p>
          </div>
        </div>
      </section>
    `;
  }

  generateBeliefsSection(beliefs) {
    if (!beliefs) return '';

    const content = beliefs.content.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${beliefs.title}</h2>
          <p class="section-subtitle">${beliefs.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            ${content}
            <div class="stewardship-quote">
              <p><em>${beliefs.niceneCreed}</em></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateHistorySection(history) {
    if (!history) return '';

    return `
      <section class="info-section">
        <div class="card">
          <div class="card-content">
            <h3>Our History</h3>
            <p><strong>Founded:</strong> ${history.founded}</p>
            <p><strong>Joined LCMS:</strong> ${history.lcmsJoined}</p>
            <p>${history.description}</p>
          </div>
        </div>
      </section>
    `;
  }

  generateFamilyPrograms(programs) {
    if (!programs) return '';

    const content = programs.content.map(p => `<p>${p}</p>`).join('');
    const offerings = programs.offerings.map(offering => `
      <div class="card">
        <div class="card-content">
          <h4>${offering.name}</h4>
          <p><strong>Schedule:</strong> ${offering.schedule}</p>
          <p>${offering.description}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${programs.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            ${content}
          </div>
        </div>
        <div class="card-grid">
          ${offerings}
        </div>
      </section>
    `;
  }

  generateLearnByHeart(learn) {
    if (!learn) return '';

    const practices = learn.practices.map(practice => `<li>${practice}</li>`).join('');
    const items = learn.items.map(item => `<li>${item}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${learn.title}</h2>
          <p class="section-subtitle">${learn.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            <p>${learn.description}</p>
            <h4>Four Key Faith Practices:</h4>
            <ul class="content-list">
              ${practices}
            </ul>
            <h4>Weekly Materials Include:</h4>
            <ul class="content-list">
              ${items}
            </ul>
            <p><em>${learn.note}</em></p>
          </div>
        </div>
      </section>
    `;
  }

  generateSpecialPrograms(special) {
    if (!special) return '';

    const programs = special.programs.map(program => `
      <div class="card">
        <div class="card-content">
          <h4>${program.name}</h4>
          <p>${program.description}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${special.title}</h2>
        </div>
        <div class="card-grid">
          ${programs}
        </div>
      </section>
    `;
  }

  generateMissionSection(mission) {
    if (!mission) return '';

    const content = mission.content.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${mission.title}</h2>
          <p class="section-subtitle">${mission.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            ${content}
          </div>
        </div>
      </section>
    `;
  }

  generateSchoolStats(stats) {
    if (!stats) return '';

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${stats.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div><strong>Enrollment:</strong> ${stats.enrollment} students</div>
              <div><strong>Student-Teacher Ratio:</strong> ${stats.studentTeacherRatio}</div>
              <div><strong>Minority Enrollment:</strong> ${stats.minorityEnrollment}</div>
              <div><strong>Tuition:</strong> ${stats.tuition}</div>
              <div><strong>Acceptance Rate:</strong> ${stats.acceptanceRate}</div>
              <div><strong>Application Deadline:</strong> ${stats.applicationDeadline}</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateSchoolPrograms(programs) {
    if (!programs) return '';

    const academics = programs.academics.map(item => `<li>${item}</li>`).join('');
    const arts = programs.arts.map(item => `<li>${item}</li>`).join('');
    const clubs = programs.clubs.map(item => `<li>${item}</li>`).join('');
    const sports = programs.sports.map(item => `<li>${item}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${programs.title}</h2>
        </div>
        <div class="card-grid">
          <div class="card">
            <div class="card-content">
              <h4>Academics</h4>
              <ul class="content-list">${academics}</ul>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <h4>Arts & Music</h4>
              <ul class="content-list">${arts}</ul>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <h4>Clubs</h4>
              <ul class="content-list">${clubs}</ul>
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              <h4>Sports</h4>
              <ul class="content-list">${sports}</ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateAdmissionsInfo(admissions) {
    if (!admissions) return '';

    const requirements = admissions.requirements.map(req => `<li>${req}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${admissions.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <ul class="content-list">${requirements}</ul>
            <p><em>${admissions.note}</em></p>
          </div>
        </div>
      </section>
    `;
  }

  generateScheduleSection(schedule) {
    if (!schedule) return '';

    const items = schedule.items.map(item => `
      <div class="time-item">
        <span class="time-label">${item.label}</span>
        <span class="time-value">${item.value}</span>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="worship-times">
          <h3>${schedule.title}</h3>
          ${items}
        </div>
      </section>
    `;
  }

  generateOnlineWorshipSection(online) {
    if (!online) return '';

    const content = online.content.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${online.title}</h2>
          <p class="section-subtitle">${online.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>YouTube Live Services</h3>
            ${content}
            <div style="margin: 2rem 0;">
              <a href="${online.button.link}" target="_blank" rel="noopener" class="btn btn-primary">
                ${online.button.text}
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateMusicMinistry(music) {
    if (!music) return '';

    const ensembles = music.ensembles.map(ensemble => `<li>${ensemble}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${music.title}</h2>
          <p class="section-subtitle">${music.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            <h4>Musical Ensembles</h4>
            <ul class="content-list">${ensembles}</ul>
            <p><em>${music.invitation}</em></p>
          </div>
        </div>
      </section>
    `;
  }

  generateEducationMinistry(education) {
    if (!education) return '';

    const programs = education.programs.map(program => `<li>${program}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${education.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <ul class="content-list">${programs}</ul>
          </div>
        </div>
      </section>
    `;
  }

  generateMissionsMinistry(missions) {
    if (!missions) return '';

    const speakers = missions.recentSpeakers.map(speaker => `<li>${speaker}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${missions.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            <p>${missions.focus}</p>
            <h4>Recent Mission Speakers</h4>
            <ul class="content-list">${speakers}</ul>
          </div>
        </div>
      </section>
    `;
  }

  generateContactSections(sections) {
    if (!sections) return '';

    const officeItems = sections.office.items.map(item => `
      <div class="contact-item">
        <div>
          <p class="contact-text"><strong>${item.label}:</strong><br>
          ${item.content}</p>
        </div>
      </div>
    `).join('');

    const pastorContent = sections.pastor.content.map(p => `<p class="contact-text">${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="card-grid">
          <div class="contact-info">
            <h3>${sections.office.title}</h3>
            ${officeItems}
          </div>
          <div class="contact-info">
            <h3>${sections.pastor.title}</h3>
            <div class="contact-item">
              <div>
                ${pastorContent}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateOfficeHours(officeHours) {
    if (!officeHours || !this.content.contact.officeHours) return '';

    const hours = Object.entries(this.content.contact.officeHours).map(([day, time]) => `
      <div class="time-item">
        <span class="time-label">${day}</span>
        <span class="time-value">${time}</span>
      </div>
    `).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${officeHours.title}</h2>
        </div>
        <div class="worship-times">
          ${hours}
        </div>
      </section>
    `;
  }

  generateMembershipInfo(membership) {
    if (!membership) return '';

    const content = membership.content.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${membership.title}</h2>
        </div>
        <div class="card">
          <div class="card-content">
            ${content}
            <p><strong>Note:</strong> ${membership.requirement}</p>
          </div>
        </div>
      </section>
    `;
  }

  generateLeadershipSection(leadership) {
    if (!leadership) return '';

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${leadership.title}</h2>
          <p class="section-subtitle">${leadership.subtitle}</p>
        </div>
      </section>
    `;
  }

  generateStaffDirectory() {
    if (!this.content.staff) return '';

    const staff = this.content.staff;

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">Our Staff</h2>
        </div>
        
        <!-- Senior Pastor -->
        <div class="pastor-section">
          <div class="pastor-image-wrapper">
            <img src="${staff.seniorPastor.image}" alt="${staff.seniorPastor.name}" class="pastor-photo" loading="lazy">
          </div>
          <div class="pastor-info">
            <h3 class="pastor-name">${staff.seniorPastor.name}</h3>
            <p class="pastor-role">${staff.seniorPastor.title}</p>
            <div class="pastor-bio">
              ${staff.seniorPastor.bio.map(p => `<p>${p}</p>`).join('')}
              <p><strong>Installed:</strong> ${staff.seniorPastor.installedDate}</p>
              <p><strong>Education:</strong></p>
              <ul>${staff.seniorPastor.education.map(edu => `<li>${edu}</li>`).join('')}</ul>
            </div>
          </div>
        </div>

        <!-- Other Staff -->
        <div class="card-grid">
          <div class="card">
            <div class="card-content">
              <h4>${staff.associatePastor.name}</h4>
              <p><strong>${staff.associatePastor.title}</strong></p>
              <p>Joined: ${staff.associatePastor.joinedDate}</p>
              <p>${staff.associatePastor.pastoralExperience}</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <h4>${staff.deaconess.name}</h4>
              <p><strong>${staff.deaconess.title}</strong></p>
              <p>Joined: ${staff.deaconess.joinedDate}</p>
              <p><strong>Focus:</strong> ${staff.deaconess.focus}</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <h4>${staff.officeAdministrator.name}</h4>
              <p><strong>${staff.officeAdministrator.title}</strong></p>
              <p>${staff.officeAdministrator.description}</p>
              <blockquote>"${staff.officeAdministrator.quote}"</blockquote>
            </div>
          </div>
          
          <div class="card">
            <div class="card-content">
              <h4>${staff.musicDirector.name}</h4>
              <p><strong>${staff.musicDirector.title}</strong></p>
              <p>Service: ${staff.musicDirector.serviceYears}</p>
              <p>${staff.musicDirector.education}</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateVerseDisplay(verse) {
    if (!verse) return '';

    return `
      <section class="verse-display">
        <p class="verse-text">"${verse.text}"</p>
        <p class="verse-reference">${verse.reference}</p>
      </section>
    `;
  }

  generateErrorPage(pageName) {
    return `
      <div class="page-content">
        <div class="container">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="hero-title">Page Not Found</h1>
              <p class="hero-subtitle">Sorry, the page "${pageName}" could not be found.</p>
              <div class="hero-cta">
                <button class="btn btn-primary" data-page="home">Go Home</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) return;

    this.mobileMenuOpen = true;
    navMenu.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  }

  closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) return;

    this.mobileMenuOpen = false;
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }

  updateNavigation(pageName) {
    const navLinks = document.querySelectorAll('.nav-link:not(.donate-link)');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === pageName) {
        link.classList.add('active');
      }
    });
  }

  updateURL(pageName) {
    if (window.location.hash !== '#' + pageName) {
      history.pushState(null, null, '#' + pageName);
    }
  }

  showFallbackContent() {
    console.log('🏛️ Showing fallback content');
    const container = document.getElementById('main-content') || document.querySelector('.page-container');
    if (container) {
      container.innerHTML = `
        <div class="page-content">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
              <p class="hero-subtitle">Church & School • Fort Wayne, Indiana</p>
              <p>Sunday Services: 8:00 AM & 10:45 AM</p>
              <p>Phone: (260) 486-2226</p>
            </div>
          </section>
        </div>
      `;
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ DOM ready, starting app...');
  window.ascensionApp = new AscensionApp();
});

// Make functions available globally
window.loadPage = (page) => window.ascensionApp?.loadPage(page);
