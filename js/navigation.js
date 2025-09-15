// Navigation functionality for Ascension Lutheran Church PWA
// Version: 2025011410 - Simplified for mobile menu only

console.log('🏛️ navigation.js loading... v2025011410');

class NavigationController {
    constructor() {
        this.mobileMenuOpen = false;
        this.version = '2025011410';
        this.init();
    }

    init() {
        console.log('🏛️ NavigationController init v2025011410');
        this.setupMobileMenu();
        this.setupScrollEffects();
    }

    setupMobileMenu() {
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
    }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏛️ Navigation DOM ready, initializing...');
    window.navigation = new NavigationController();
});

console.log('🏛️ ALC PWA Navigation.js Version: 2025011410');
