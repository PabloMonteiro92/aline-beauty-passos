// ===== GLOBAL VARIABLES =====
let currentTestimonial = 1;
let portfolioItems = [];
let currentPortfolioFilter = 'all';
let portfolioItemsLoaded = 6;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== WEBSITE INITIALIZATION =====
function initializeWebsite() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize counters
    initCounters();
    
    // Initialize portfolio
    initPortfolio();
    
    // Initialize forms
    initForms();
    
    // Initialize modals
    initModals();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize date picker
    initDatePicker();
    
    // Initialize VIP plans
    initVIPPlans();
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// ===== PORTFOLIO =====
function initPortfolio() {
    generatePortfolioItems();
    renderPortfolio();
    initPortfolioFilters();
    initPortfolioLoadMore();
}

function generatePortfolioItems() {
    // Sample portfolio data - in a real application, this would come from a database
    portfolioItems = [
        {
            id: 1,
            category: 'manicure',
            title: 'Manicure Francesa Elegante',
            image: 'assets/images/manicure-elegant.jpeg',
            description: 'Manicure francesa com acabamento perfeito'
        },
        {
            id: 2,
            category: 'pedicure',
            title: 'Pedicure Relaxante',
            image: 'assets/images/nails-minimalist.jpg',
            description: 'Pedicure completa com tratamento relaxante'
        },
        {
            id: 3,
            category: 'alongamentos',
            title: 'Alongamento Fibra de Vidro',
            image: 'assets/images/salon-interior-pink.jpg',
            description: 'Alongamento com fibra de vidro e nail art'
        },
        {
            id: 4,
            category: 'plastica',
            title: 'Plástica dos Pés',
            image: 'assets/images/salon-reception.jpg',
            description: 'Tratamento completo para pés ressecados'
        },
        {
            id: 5,
            category: 'manicure',
            title: 'Nail Art Personalizada',
            image: 'assets/images/manicure-elegant.jpeg',
            description: 'Arte personalizada nas unhas'
        },
        {
            id: 6,
            category: 'spa',
            title: 'SPA dos Pés Completo',
            image: 'assets/images/nails-minimalist.jpg',
            description: 'Experiência completa de relaxamento'
        },
        {
            id: 7,
            category: 'alongamentos',
            title: 'Soft Gel Premium',
            image: 'assets/images/salon-interior-pink.jpg',
            description: 'Alongamento com soft gel e decoração'
        },
        {
            id: 8,
            category: 'pedicure',
            title: 'Pedicure com Gel',
            image: 'assets/images/salon-reception.jpg',
            description: 'Pedicure com esmaltação em gel'
        },
        {
            id: 9,
            category: 'spa',
            title: 'Massagem Relaxante',
            image: 'assets/images/manicure-elegant.jpeg',
            description: 'Massagem terapêutica para relaxamento'
        }
    ];
}

function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filteredItems = currentPortfolioFilter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === currentPortfolioFilter);
    
    const itemsToShow = filteredItems.slice(0, portfolioItemsLoaded);
    
    portfolioGrid.innerHTML = '';
    
    itemsToShow.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Update load more button visibility
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (itemsToShow.length >= filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.setAttribute('data-aos', 'fade-up');
    div.setAttribute('data-aos-delay', (index % 3) * 100);
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="portfolio-overlay">
            <div class="portfolio-info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `;
    
    div.addEventListener('click', () => {
        openPortfolioModal(item);
    });
    
    return div;
}

function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current filter
            currentPortfolioFilter = btn.getAttribute('data-filter');
            portfolioItemsLoaded = 6; // Reset items loaded
            
            // Re-render portfolio
            renderPortfolio();
            
            // Re-initialize AOS for new items
            AOS.refresh();
        });
    });
}

function initPortfolioLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            portfolioItemsLoaded += 3;
            renderPortfolio();
            AOS.refresh();
        });
    }
}

function openPortfolioModal(item) {
    // Create and show portfolio modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="portfolio-modal-content">
                <img src="${item.image}" alt="${item.title}" style="width: 100%; max-width: 600px; border-radius: 12px;">
                <div style="text-align: center; margin-top: 1rem;">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ===== VIP PLANS =====
function initVIPPlans() {
    const planBtns = document.querySelectorAll('.plan-btn');
    
    planBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const planCard = btn.closest('.vip-plan');
            const planName = planCard.querySelector('h4').textContent;
            const planPrice = planCard.querySelector('.plan-price').textContent;
            
            // Track VIP plan interest
            trackEvent('vip_plan_interest', {
                plan_name: planName,
                plan_price: planPrice
            });
            
            // Pre-fill booking form with VIP plan
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                // Find matching option in service select
                const options = serviceSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent.toLowerCase().includes(planName.toLowerCase())) {
                        option.selected = true;
                    }
                });
            }
            
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show success message
            showVIPInterestMessage(planName);
        });
    });
}

function showVIPInterestMessage(planName) {
    const toast = document.createElement('div');
    toast.className = 'vip-toast';
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37 0%, #e8c547 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-crown" style="font-size: 1.2rem;"></i>
            <div>
                <strong>Interesse no ${planName}!</strong>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Preencha o formulário abaixo para mais informações.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// ===== FORMS =====
function initForms() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmission);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Service selection tracking
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                trackEvent('service_selected', {
                    service: e.target.value,
                    service_text: e.target.options[e.target.selectedIndex].text
                });
            }
        });
    }
}

function handleAppointmentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const appointmentData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateAppointmentForm(appointmentData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Track form submission
    trackEvent('appointment_form_submitted', {
        service: appointmentData.service,
        date: appointmentData.date,
        time: appointmentData.time
    });
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        e.target.reset();
        
        // Show success modal
        showSuccessModal();
        
        // In a real application, you would send this data to your backend
        console.log('Appointment data:', appointmentData);
    }, 2000);
}

function validateAppointmentForm(data) {
    const requiredFields = ['name', 'phone', 'email', 'service', 'date', 'time'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showErrorMessage(`Por favor, preencha o campo ${getFieldLabel(field)}.`);
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Por favor, insira um e-mail válido.');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('Por favor, insira um telefone válido.');
        return false;
    }
    
    // Validate date (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showErrorMessage('Por favor, selecione uma data futura.');
        return false;
    }
    
    return true;
}

function getFieldLabel(field) {
    const labels = {
        name: 'Nome',
        phone: 'Telefone',
        email: 'E-mail',
        service: 'Serviço',
        date: 'Data',
        time: 'Horário'
    };
    return labels[field] || field;
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
        } else if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    e.target.value = value;
}

function showErrorMessage(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// ===== MODALS =====
function initModals() {
    // Video modal functionality
    window.openVideoModal = function() {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('video-iframe');
        
        // Set video URL (placeholder)
        iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        
        modal.classList.add('show');
    };
    
    // Close modal functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
        
        // Reset video iframe
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('show');
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
}

// Make function global for HTML onclick handler
window.closeSuccessModal = closeSuccessModal;

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== DATE PICKER =====
function initDatePicker() {
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
        
        // Set maximum date to 3 months from now
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== ANALYTICS INTEGRATION =====
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    }
    
    if (e.target.matches('.whatsapp-btn, .whatsapp-float-btn')) {
        trackEvent('whatsapp_click', {
            source: e.target.closest('section')?.id || 'floating_button'
        });
    }
    
    if (e.target.matches('.service-btn')) {
        const serviceCard = e.target.closest('.service-card');
        const serviceName = serviceCard.querySelector('h4').textContent;
        trackEvent('service_interest', {
            service_name: serviceName
        });
    }
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ===== CONTACT FORM INTEGRATION =====
function initContactIntegration() {
    // WhatsApp integration
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .whatsapp-float-btn, a[href*="wa.me"]');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            trackEvent('whatsapp_click', {
                source: e.target.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('phone_click');
        });
    });
}

// Initialize contact integration
document.addEventListener('DOMContentLoaded', initContactIntegration);

// ===== DYNAMIC CONTENT LOADING =====
function loadDynamicContent() {
    // This function could load content from a CMS or API
    // For now, it's a placeholder for future enhancements
    
    // Example: Load latest blog posts, testimonials, or portfolio items
    // fetch('/api/latest-content')
    //     .then(response => response.json())
    //     .then(data => {
    //         updatePortfolio(data.portfolio);
    //         updateTestimonials(data.testimonials);
    //     });
}

// ===== BROWSER COMPATIBILITY =====
function checkBrowserCompatibility() {
    // Check for required features
    const requiredFeatures = [
        'IntersectionObserver',
        'fetch',
        'Promise',
        'addEventListener'
    ];
    
    const unsupportedFeatures = requiredFeatures.filter(feature => !(feature in window));
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Unsupported features detected:', unsupportedFeatures);
        // You might want to show a browser upgrade message
    }
}

// Check compatibility on load
document.addEventListener('DOMContentLoaded', checkBrowserCompatibility);

// ===== VIP SECTION ANIMATIONS =====
function initVIPAnimations() {
    const vipSection = document.querySelector('.vip-club');
    
    if (vipSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add special animation class when VIP section comes into view
                    entry.target.classList.add('vip-animated');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(vipSection);
    }
}

// Initialize VIP animations
document.addEventListener('DOMContentLoaded', initVIPAnimations);

// ===== CUSTOM ANIMATIONS =====
// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .vip-animated {
        animation: vipGlow 3s ease-in-out infinite alternate;
    }
    
    @keyframes vipGlow {
        from {
            filter: brightness(1);
        }
        to {
            filter: brightness(1.05);
        }
    }
`;
document.head.appendChild(style);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        validateAppointmentForm,
        formatPhoneNumber,
        trackEvent,
        generatePortfolioItems,
        renderPortfolio
    };
}

