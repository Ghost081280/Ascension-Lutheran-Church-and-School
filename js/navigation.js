// Navigation functionality for Ascension Lutheran Church PWA
// Version: 2025011402

console.log('🏛️ navigation.js loading... v2025011402');

class NavigationController {
    constructor() {
        this.mobileMenuOpen = false;
        this.version = '2025011402';
        this.init();
    }

    init() {
        console.log('🏛️ NavigationController init v2025011402');
        this.setupNavigationListeners();
        this.setupMobileMenu();
        this.setupKeyboardNavigation();
        this.setupScrollEffects();
    }

    setupNavigationListeners() {
        // Main navigation links - wait a bit for DOM to be fully ready
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            console.log('🏛️ Setting up navigation listeners for', navLinks.length, 'links');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    console.log('🏛️ Navigation click:', page);
                    if (page && window.app) {
                        window.app.loadPage(page);
                        this.closeMobileMenu();
                    }
                });
            });
        }, 100);

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const path = window.location.hash.substring(1) || 'home';
            console.log('🏛️ Popstate event:', path);
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
            
            console.log('🏛️ Hash change:', hash);
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
        // Wait for DOM elements to be available
        setTimeout(() => {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            console.log('🏛️ Setting up mobile menu:', { 
                toggle: !!mobileToggle, 
                menu: !!navMenu 
            });
            
            if (mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', () => {
                    console.log('🏛️ Mobile menu toggle clicked');
                    this.toggleMobileMenu();
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (this.mobileMenuOpen && 
                        !navMenu.contains(e.target) && 
                        !mobileToggle.contains(e.target)) {
                        console.log('🏛️ Closing mobile menu (outside click)');
                        this.closeMobileMenu();
                    }
                });

                // Close mobile menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.mobileMenuOpen) {
                        console.log('🏛️ Closing mobile menu (escape key)');
                        this.closeMobileMenu();
                    }
                });
            }
        }, 100);
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
        
        if (!navMenu || !mobileToggle) return;
        
        const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
        
        console.log('🏛️ Opening mobile menu');
        this.mobileMenuOpen = true;
        navMenu.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        
        // Animate hamburger to X
        if (hamburgerLines.length >= 3) {
            hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerLines[1].style.opacity = '0';
            hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
        
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
        
        if (!navMenu || !mobileToggle) return;
        
        const hamburgerLines = mobileToggle.querySelectorAll('.hamburger-line');
        
        console.log('🏛️ Closing mobile menu');
        this.mobileMenuOpen = false;
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger animation
        if (hamburgerLines.length >= 3) {
            hamburgerLines[0].style.transform = 'none';
            hamburgerLines[1].style.opacity = '1';
            hamburgerLines[2].style.transform = 'none';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    setupKeyboardNavigation() {
        // Handle arrow key navigation in menu
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            
            console.log('🏛️ Setting up keyboard navigation for', navLinks.length, 'links');
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
        }, 100);
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.main-header');
        let ticking = false;

        if (!header) {
            console.warn('🏛️ Main header not found for scroll effects');
            return;
        }

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
        // Check if styles already exist
        if (document.getElementById('navigation-scroll-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'navigation-scroll-styles';
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
        console.log('🏛️ Programmatic navigation to:', page);
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

    // Check if navigation is working
    testNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('🏛️ Navigation test:', {
            linksFound: navLinks.length,
            mobileMenuOpen: this.mobileMenuOpen,
            currentHash: window.location.hash,
            hasApp: !!window.app
        });
        
        return navLinks.length > 0;
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏛️ Navigation DOM ready, initializing...');
    window.navigation = new NavigationController();
    
    // Make navigation available globally
    window.navigateTo = (page) => {
        if (window.navigation) {
            window.navigation.navigateTo(page);
        } else {
            console.warn('🏛️ Navigation not ready yet');
        }
    };
    
    // Test navigation after a short delay
    setTimeout(() => {
        if (window.navigation) {
            window.navigation.testNavigation();
        }
    }, 1000);
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

// Version check for cache verification
console.log('🏛️ ALC PWA Navigation.js Version: 2025011402');
