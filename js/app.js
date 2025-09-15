// Ascension Lutheran Church App - Clean Rebuild
console.log('🏛️ App.js loading...');

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
    }

    // Navigation clicks
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
    if (!navMenu || !this.content) return;

    const navLinks = this.content.navigation.map(item => 
      `<a href="javascript:void(0)" class="nav-link" data-page="${item.id}">${item.label}</a>`
    ).join('');

    const donateButton = `<a href="${this.content.external.donate}" target="_blank" rel="noopener" class="nav-link donate-link">
      <span class="donate-heart">♥</span> Give
    </a>`;

    navMenu.innerHTML = navLinks + donateButton;

    // Set home as active
    const homeLink = navMenu.querySelector('[data-page="home"]');
    if (homeLink) homeLink.classList.add('active');
  }

  populateFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer || !this.content) return;

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

    const container = document.getElementById('page-container');
    if (container) {
      container.style.opacity = '0.5';
      setTimeout(() => {
        container.innerHTML = pageHTML;
        container.style.opacity = '1';
        this.currentPage = pageName;
        this.updateNavigation(pageName);
        this.updateURL(pageName);
        this.setupPageEventListeners();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
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
        <img src="${card.image}" alt="${card.title}" class="card-image">
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
            <img src="${pastor.image}" alt="${pastor.name}" class="pastor-photo">
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
            <h4>What we believe:</h4>
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
    const buttons = document.querySelectorAll('[data-page]');
    buttons.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        const page = newButton.getAttribute('data-page');
        this.loadPage(page);
      });
    });
  }

  showFallbackContent() {
    const container = document.getElementById('page-container');
    if (container) {
      container.innerHTML = `
        <div class="page-content">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="hero-title">Welcome to Ascension Lutheran Church</h1>
              <p class="hero-subtitle">Church & School • Fort Wayne, Indiana</p>
              <p>Sunday Services: 8:00 AM & 10:45 AM</p>
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
