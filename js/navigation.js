// Navigation functionality for Ascension Lutheran Church PWA

class NavigationController {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupNavigationListeners();
        this.setupMobileMenu();
        this.setupKeyboardNavigation();
        this.setupScrollEffects();
    }

    setupNavigationListeners() {
        // Main navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page && window.app) {
                    window.app.loadPage(page);
                    this.closeMobileMenu();
                }
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const path = window.location.hash.substring(1) || 'home';
            if (window.app) {
                window.app.loadPage(path);
            }
        });

        // Update URL hash when navigating
        this.setupHashNavigation();
    }

    setupHashNavigation() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            const validPages = ['home', 'church', 'family', 'school', 'worship', 'contact'];
            
            if (validPages.includes(hash)) {
                if (window.app && window.app.currentPage !== hash) {
                    window.app.loadPage(hash);
                }
            }
        });

        // Set initial hash if none exists
        if (!window.location.hash) {
            window.location.hash = '#home';
        }
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.mobileMenuOpen && 
                    !navMenu.contains(e.target) && 
                    !mobileToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close mobile menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
        
        this.mobileMenuOpen = true;
        navMenu.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Animate hamburger to X
        hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgerLines[1].style.opacity = '0';
        hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item for accessibility
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
        
        this.mobileMenuOpen = false;
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger animation
        hamburgerLines[0].style.transform = 'none';
        hamburgerLines[1].style.opacity = '1';
        hamburgerLines[2].style.transform = 'none';
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    setupKeyboardNavigation() {
        // Handle arrow key navigation in menu
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                let nextIndex;
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        nextIndex = (index + 1) % navLinks.length;
                        navLinks[nextIndex].focus();
                        break;
                        
                    case 'ArrowUp':
                        e.preventDefault();
                        nextIndex = (index - 1 + navLinks.length) % navLinks.length;
                        navLinks[nextIndex].focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        navLinks[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        navLinks[navLinks.length - 1].focus();
                        break;
                }
            });
        });
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.main-header');
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
                
                // Hide header when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Add CSS for scroll effects
        this.addScrollStyles();
    }

    addScrollStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .main-header {
                transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
            }
            
            .main-header.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            @media (max-width: 768px) {
                .main-header {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Public method to programmatically navigate
    navigateTo(page) {
        if (window.app) {
            window.location.hash = `#${page}`;
            window.app.loadPage(page);
            this.closeMobileMenu();
        }
    }

    // Get current page
    getCurrentPage() {
        return window.location.hash.substring(1) || 'home';
    }

    // Highlight active navigation item
    updateActiveNavigation(activePage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === activePage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // Breadcrumb navigation
    createBreadcrumb(currentPage) {
        const breadcrumbData = {
            home: ['Home'],
            church: ['Home', 'Church'],
            family: ['Home', 'Family'],
            school: ['Home', 'School'],
            worship: ['Home', 'Worship'],
            contact: ['Home', 'Contact']
        };

        const breadcrumbs = breadcrumbData[currentPage] || ['Home'];
        return breadcrumbs;
    }

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add loading state to navigation
    setNavigationLoading(isLoading) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (isLoading) {
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.7';
            } else {
                link.style.pointerEvents = '';
                link.style.opacity = '';
            }
        });
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new NavigationController();
    
    // Make navigation available globally
    window.navigateTo = (page) => window.navigation.navigateTo(page);
});

// Handle page visibility changes (PWA optimization)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible - could refresh content if needed
        console.log('🏛️ Page visible - church app active');
    } else {
        // Page hidden - could pause non-essential operations
        console.log('🏛️ Page hidden - church app in background');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationController;
}
