// Ascension Lutheran Church App - FIXED VERSION
console.log('🏛️ App.js loading - FIXED VERSION...');

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
      this.loadPage('home');
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
        console.log('🏛️ DOM container found');
        return;
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    throw new Error('DOM container not found after maximum attempts');
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Logo click handler
    const logoContainer = document.getElementById('nav-logo-home');
    if (logoContainer) {
      logoContainer.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadPage('home');
      });
      
      logoContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.loadPage('home');
        }
      });
    }

    // Document-level navigation clicks - Use event delegation
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-page')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
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
  }

  populateNavigation() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu || !this.content) {
      console.warn('🏛️ Navigation menu or content not found');
      return;
    }

    const navLinks = this.content.navigation.map(item => 
      `<a href="javascript:void(0)" class="nav-link" data-page="${item.id}" role="menuitem">${item.label}</a>`
    ).join('');

    const donateButton = `<a href="${this.content.external.donate}" target="_blank" rel="noopener" class="nav-link donate-link" role="menuitem">
      <span class="donate-heart">♥</span> Give
    </a>`;

    navMenu.innerHTML = navLinks + donateButton;

    // Set home as active
    const homeLink = navMenu.querySelector('[data-page="home"]');
    if (homeLink) homeLink.classList.add('active');
    
    console.log('🏛️ Navigation populated successfully');
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

    if (!this.content || !this.content.pages[pageName]) {
      console.warn('🏛️ Page not found:', pageName);
      this.showFallbackContent();
      return;
    }

    this.closeMobileMenu();

    const pageData = this.content.pages[pageName];
    const pageHTML = this.generatePageHTML(pageName, pageData);

    // FIXED: Use correct container ID
    const container = document.getElementById('main-content');
    if (!container) {
      console.error('🏛️ CRITICAL: main-content container not found!');
      return;
    }

    // Smooth transition
    container.style.opacity = '0.5';
    setTimeout(() => {
      container.innerHTML = pageHTML;
      container.style.opacity = '1';
      this.currentPage = pageName;
      this.updateNavigation(pageName);
      this.updateURL(pageName);
      this.setupPageEventListeners();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Announce page change for accessibility
      if (window.announcePageChange) {
        window.announcePageChange(pageName);
      }
    }, 100);
  }

  generatePageHTML(pageName, pageData) {
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

  setupPageEventListeners() {
    // This method will re-attach event listeners to newly created page elements
    // using event delegation, this should work automatically
    console.log('🏛️ Page event listeners set up');
  }

  showFallbackContent() {
    const container = document.getElementById('main-content');
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
