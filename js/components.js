// Reusable UI Components for Ascension Lutheran Church PWA

class ComponentLibrary {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupFormValidation();
        this.setupImageOptimization();
        this.setupAccessibilityEnhancements();
    }

    // Lazy loading for images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Form validation utilities
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        input.classList.remove('error');
        this.removeErrorMessage(input);

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Show error if invalid
        if (!isValid) {
            this.showInputError(input, errorMessage);
        }

        return isValid;
    }

    showInputError(input, message) {
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            margin-bottom: 0.5rem;
        `;
        
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    removeErrorMessage(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Image optimization and placeholder management
    setupImageOptimization() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading attribute for native lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Handle image load errors with placeholder
            img.addEventListener('error', () => {
                this.handleImageError(img);
            });

            // Add loading state
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    handleImageError(img) {
        // Create a placeholder SVG
        const placeholder = this.createImagePlaceholder(img.alt || 'Image');
        img.src = placeholder;
        img.classList.add('placeholder');
    }

    createImagePlaceholder(altText = 'Image', width = 300, height = 200) {
        const svg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f7fafc"/>
                <rect x="20%" y="20%" width="60%" height="60%" fill="#e2e8f0" rx="8"/>
                <circle cx="35%" cy="35%" r="8%" fill="#a0aec0"/>
                <polygon points="45%,55% 55%,45% 65%,55% 55%,65%" fill="#a0aec0"/>
                <text x="50%" y="80%" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#718096">
                    ${altText}
                </text>
            </svg>
        `;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    // Accessibility enhancements
    setupAccessibilityEnhancements() {
        this.enhanceButtonAccessibility();
        this.addSkipLinks();
        this.manageFocusOutlines();
        this.announcePageChanges();
    }

    enhanceButtonAccessibility() {
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(button => {
            // Ensure buttons have proper ARIA labels
            if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
                console.warn('Button missing accessible text:', button);
            }

            // Add proper ARIA states for toggle buttons
            if (button.classList.contains('mobile-menu-toggle')) {
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-controls', 'nav-menu');
            }
        });
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.2s ease;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add ID to main content area
        const mainContent = document.getElementById('page-container');
        if (mainContent) {
            mainContent.setAttribute('id', 'main-content');
        }
    }

    manageFocusOutlines() {
        let hadKeyboardEvent = true;
        let keyboardThrottleTimeout;

        const handleKeyDown = () => {
            hadKeyboardEvent = true;
            if (keyboardThrottleTimeout) {
                clearTimeout(keyboardThrottleTimeout);
            }
        };

        const handlePointerDown = () => {
            hadKeyboardEvent = false;
            keyboardThrottleTimeout = setTimeout(() => {
                hadKeyboardEvent = true;
            }, 1000);
        };

        const handleFocus = (e) => {
            if (hadKeyboardEvent) {
                e.target.classList.add('focus-visible');
            }
        };

        const handleBlur = (e) => {
            e.target.classList.remove('focus-visible');
        };

        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('mousedown', handlePointerDown, true);
        document.addEventListener('touchstart', handlePointerDown, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
    }

    announcePageChanges() {
        // Create ARIA live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'page-announcements';
        document.body.appendChild(liveRegion);

        // Announce page changes
        window.announcePageChange = (pageName) => {
            const announcements = {
                home: 'Welcome page loaded',
                church: 'Church information page loaded',
                family: 'Family ministry page loaded',
                school: 'School information page loaded',
                worship: 'Worship times page loaded',
                contact: 'Contact information page loaded'
            };

            liveRegion.textContent = announcements[pageName] || `${pageName} page loaded`;
        };
    }

    // Modal component
    createModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            showCloseButton = true,
            onClose = null,
            className = ''
        } = options;

        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title" class="modal-title">${title}</h2>
                    ${showCloseButton ? '<button class="modal-close" aria-label="Close modal">&times;</button>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        `;

        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: white;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        // Close functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
            if (onClose) onClose();
        };

        // Event listeners
        if (showCloseButton) {
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
        }
        
        backdrop.addEventListener('click', closeModal);
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Show modal
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        });

        // Focus first focusable element
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        return modal;
    }

    // Toast notification component
    showToast(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const colors = {
            info: 'var(--primary-color)',
            success: 'var(--accent-color)',
            warning: 'var(--secondary-color)',
            error: '#e53e3e'
        };

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;

        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);

        return toast;
    }

    // Loading spinner component
    createLoadingSpinner(container = document.body) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner-overlay';
        spinner.innerHTML = `
            <div class="loading-spinner-content">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;

        spinner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        container.style.position = 'relative';
        container.appendChild(spinner);

        return {
            remove: () => {
                if (container.contains(spinner)) {
                    container.removeChild(spinner);
                }
            }
        };
    }

    // Utility: Debounce function
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.components = new ComponentLibrary();
    
    // Make utility functions available globally
    window.showToast = (message, type, duration) => 
        window.components.showToast(message, type, duration);
    
    window.createModal = (options) => 
        window.components.createModal(options);
        
    window.createLoadingSpinner = (container) => 
        window.components.createLoadingSpinner(container);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLibrary;
}
