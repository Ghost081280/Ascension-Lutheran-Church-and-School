// UPDATED app.js - Enhanced Mobile Navigation & Logo Click Handler with Deep Fixes
console.log('🏛️ Content-driven app.js loading...');

class AscensionApp {
  constructor() {
    this.currentPage = 'home';
    this.mobileMenuOpen = false;
    this.content = null;
    this.init();
  }

  async init() {
    console.log('🏛️ Initializing Ascension App...');
    
    await this.loadContent();
    this.setupEventListeners();
    this.loadInitialPage();
    
    console.log('🏛️ App initialized successfully');
  }

  async loadContent() {
    if (typeof SITE_CONTENT !== 'undefined') {
      this.content = SITE_CONTENT;
      console.log('🏛️ Content loaded successfully');
    } else {
      console.error('🏛️ Content not available - make sure content.js is loaded');
      try {
        const script = document.createElement('script');
        script.src = './content/content.js';
        document.head.appendChild(script);
        
        await new Promise(resolve => {
          script.onload = () => {
            this.content = window.SITE_CONTENT;
            resolve();
          };
        });
      } catch (error) {
        console.error('🏛️ Failed to load content:', error);
      }
    }
  }

  setupEventListeners() {
    // DEEP FIX: Enhanced mobile menu toggle with comprehensive event handling
    this.setupMobileMenuToggle();
    
    // Enhanced navigation link handling
    this.setupNavigationLinks();
    
    // DEEP FIX: Enhanced logo click handler
    this.setupLogoHandler();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        console.log('🏛️ Escape key pressed - closing mobile menu');
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

    // Window resize - close mobile menu on desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && this.mobileMenuOpen) {
        console.log('🏛️ Window resized to desktop - closing mobile menu');
        this.closeMobileMenu();
      }
    });

    // Orientation change handling
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (this.mobileMenuOpen) {
          console.log('🏛️ Orientation changed - adjusting mobile menu');
          this.closeMobileMenu();
        }
      }, 100);
    });
  }

  setupMobileMenuToggle() {
    // DEEP FIX: Enhanced mobile menu toggle setup
    const setupToggle = () => {
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      if (mobileToggle) {
        console.log('🏛️ Setting up mobile menu toggle');
        
        // Remove any existing listeners
        const newToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
        
        // Add comprehensive event listeners
        newToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🏛️ Mobile toggle clicked');
          this.toggleMobileMenu();
        });
        
        newToggle.addEventListener('touchstart', (e) => {
          e.preventDefault();
          console.log('🏛️ Mobile toggle touched');
        }, { passive: false });
        
        newToggle.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🏛️ Mobile toggle touch ended - toggling menu');
          this.toggleMobileMenu();
        }, { passive: false });
        
        // Keyboard support
        newToggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            console.log('🏛️ Mobile toggle keyboard activated');
            this.toggleMobileMenu();
          }
        });
        
        console.log('🏛️ Mobile toggle setup complete');
      } else {
        console.warn('🏛️ Mobile toggle not found, retrying...');
        setTimeout(setupToggle, 100);
      }
    };
    
    setupToggle();
  }

  setupNavigationLinks() {
    // Enhanced navigation link handling with delegation
    document.addEventListener('click', (e) => {
      // Handle page navigation buttons/links
      if (e.target.hasAttribute('data-page')) {
        e.preventDefault();
        e.stopPropagation();
        const page = e.target.getAttribute('data-page');
        console.log('🏛️ Navigation link clicked:', page);
        this.loadPage(page);
      }
      
      // Handle nav links specifically
      if (e.target.classList.contains('nav-link') && e.target.hasAttribute('data-page')) {
        e.preventDefault();
        e.stopPropagation();
        const page = e.target.getAttribute('data-page');
        console.log('🏛️ Nav link clicked:', page);
        this.loadPage(page);
      }

      // Close mobile menu on outside click
      if (this.mobileMenuOpen && 
          !e.target.closest('.nav-menu') && 
          !e.target.closest('.mobile-menu-toggle')) {
        console.log('🏛️ Outside click detected - closing mobile menu');
        this.closeMobileMenu();
      }
    });
  }

  setupLogoHandler() {
    // DEEP FIX: Enhanced logo click handler with comprehensive setup
    const setupLogo = () => {
      const logoBrand = document.getElementById('nav-brand-home');
      if (logoBrand) {
        console.log('🏛️ Setting up logo click handler');
        
        // Create comprehensive click handler
        const handleLogoActivation = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🏛️ Logo activated - navigating to home');
          this.loadPage('home');
        };
        
        // Remove existing listeners by cloning
        const newLogoBrand = logoBrand.cloneNode(true);
        logoBrand.parentNode.replaceChild(newLogoBrand, logoBrand);
        
        // Add multiple event types for comprehensive coverage
        newLogoBrand.addEventListener('click', handleLogoActivation);
        newLogoBrand.addEventListener('touchend', handleLogoActivation);
        
        // Keyboard support
        newLogoBrand.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            console.log('🏛️ Logo keyboard activated');
            this.loadPage('home');
          }
        });
        
        // Visual feedback
        newLogoBrand.style.cursor = 'pointer';
        newLogoBrand.style.transition = 'transform 0.2s ease';
        
        // Hover effects
        newLogoBrand.addEventListener('mouseenter', () => {
          newLogoBrand.style.transform = 'scale(1.02)';
        });
        
        newLogoBrand.addEventListener('mouseleave', () => {
          newLogoBrand.style.transform = 'scale(1)';
        });
        
        // Touch feedback
        newLogoBrand.addEventListener('touchstart', () => {
          newLogoBrand.style.transform = 'scale(0.98)';
        });
        
        newLogoBrand.addEventListener('touchend', () => {
          newLogoBrand.style.transform = 'scale(1)';
        });
        
        console.log('🏛️ Logo handler setup complete');
      } else {
        console.warn('🏛️ Logo brand element not found, retrying...');
        setTimeout(setupLogo, 200);
      }
    };
    
    // Setup with delay to ensure DOM is ready
    setTimeout(setupLogo, 100);
  }

  loadInitialPage() {
    const hash = window.location.hash.substring(1);
    const initialPage = hash && this.content && this.content.pages[hash] ? hash : 'home';
    this.loadPage(initialPage);
  }

  loadPage(pageName) {
    console.log('🏛️ Loading page:', pageName);

    if (!this.content || !this.content.pages[pageName]) {
      console.error('🏛️ Page not found:', pageName);
      return;
    }

    // Close mobile menu when loading a page
    this.closeMobileMenu();

    // Get page content
    const pageData = this.content.pages[pageName];
    const pageHTML = this.generatePageHTML(pageName, pageData);

    // Update page container with smooth transition
    const container = document.getElementById('page-container');
    if (container) {
      container.style.opacity = '0.3';
      setTimeout(() => {
        container.innerHTML = pageHTML;
        container.style.opacity = '1';
        this.currentPage = pageName;
        this.updateNavigation(pageName);
        this.updateURL(pageName);
        this.setupPageEventListeners();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
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
          ${this.generateStewardshipQuote(data.stewardshipQuote)}
          ${this.generateBeliefsSection(data.beliefs)}
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
          ${this.generateVerseDisplay(data.verse)}
        </div>
      </div>
    `;
  }

  // Component Generators
  generateHeroSection(hero) {
    if (!hero) return '';

    const backgroundStyle = hero.backgroundImage ? 
      `style="background-image: linear-gradient(rgba(139, 0, 0, 0.7), rgba(102, 0, 0, 0.7)), url('${hero.backgroundImage}'); background-size: cover; background-position: center; background-attachment: fixed;"` : '';

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
        <img src="${card.image}" alt="${card.title}" class="card-image" 
             onerror="this.src='${this.content.images.placeholders[card.title.toLowerCase()]}'">
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
    if (!section || !this.content.pastor) return '';

    const pastor = this.content.pastor;
    const bio = pastor.bio.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${section.title}</h2>
          <p class="section-subtitle">${section.subtitle}</p>
        </div>
        <div class="pastor-section">
          <div class="pastor-image-wrapper">
            <img src="${pastor.image}" alt="${pastor.name}" class="pastor-photo" 
                 onerror="this.src='${this.content.images.placeholders.pastor}'">
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

  generateStewardshipQuote(quote) {
    if (!quote) return '';

    const verses = quote.verses.map(verse => `<p>${verse}</p>`).join('');

    return `
      <section class="stewardship-quote">
        ${verses}
        <p class="stewardship-reference">${quote.reference}</p>
      </section>
    `;
  }

  generateBeliefsSection(beliefs) {
    if (!beliefs) return '';

    const content = beliefs.content.map(p => `<p>${p}</p>`).join('');
    const points = beliefs.points.map(point => `<li>${point}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${beliefs.title}</h2>
          <p class="section-subtitle">${beliefs.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            ${content}
            <h4>More specifically, here's what we believe:</h4>
            <ul class="content-list">
              ${points}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  generateFamilyPrograms(programs) {
    if (!programs) return '';

    const content = programs.content.map(p => `<p>${p}</p>`).join('');

    return `
      <section class="info-section">
        <div class="card">
          <div class="card-content">
            <h3>${programs.title}</h3>
            ${content}
          </div>
        </div>
      </section>
    `;
  }

  generateLearnByHeart(learn) {
    if (!learn) return '';

    const items = learn.items.map(item => `<li>${item}</li>`).join('');

    return `
      <section class="info-section">
        <div class="section-header">
          <h2 class="section-title">${learn.title}</h2>
          <p class="section-subtitle">${learn.subtitle}</p>
        </div>
        <div class="card">
          <div class="card-content">
            <p><strong>${learn.description}</strong></p>
            <ul class="content-list">
              ${items}
            </ul>
            <p>${learn.note}</p>
          </div>
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
            <h3>Our Mission</h3>
            ${content}
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

  // DEEP FIX: Enhanced Mobile Menu Functions
  toggleMobileMenu() {
    console.log('🏛️ Toggle mobile menu - current state:', this.mobileMenuOpen);
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) {
      console.warn('🏛️ Mobile menu elements not found');
      return;
    }

    console.log('🏛️ Opening mobile menu');
    this.mobileMenuOpen = true;
    
    // Add active classes
    navMenu.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll with multiple methods
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Focus first nav link for accessibility
    setTimeout(() => {
      const firstNavLink = navMenu.querySelector('.nav-link');
      if (firstNavLink) {
        firstNavLink.focus();
      }
    }, 100);
  }

  closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (!navMenu || !mobileToggle) {
      console.warn('🏛️ Mobile menu elements not found');
      return;
    }

    console.log('🏛️ Closing mobile menu');
    this.mobileMenuOpen = false;
    
    // Remove active classes
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  // Navigation Updates
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
    // Re-setup event listeners for new page content
    const buttons = document.querySelectorAll('[data-page]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const page = button.getAttribute('data-page');
        this.loadPage(page);
      });
    });

    // Setup logo handler again after page load
    this.setupLogoHandler();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ DOM ready, starting Ascension App...');
  window.ascensionApp = new AscensionApp();
});

// Make functions available globally for backwards compatibility
window.loadPage = (page) => window.ascensionApp?.loadPage(page);
window.toggleMobileMenu = () => window.ascensionApp?.toggleMobileMenu();
