// Loading screen animation (Responsive implementation)
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    
    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 12 + 3; // Faster loading
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Restore body scroll and reset styles
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                    // Initialize other animations after loading
                    initializeAnimations();
                }, 500);
            }, 800);
        }
    }, 80);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle with improved responsive handling
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Handle window resize to close mobile menu and reset styles
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        document.body.style.overflow = '';
    }
});

// Enhanced header scroll effect with modern styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateActiveNavLink, 100);
});

// Portfolio filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Interior Design Gallery filtering functionality
const galleryFilterButtons = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.interior-gallery-grid .gallery-item');

galleryFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach((item, index) => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.9)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, index * 100 + 150); // Staggered animation
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery item hover effects with enhanced animations
document.querySelectorAll('.interior-gallery-grid .gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Add subtle rotation and scale effect
        this.style.transform = 'translateY(-15px) rotateY(8deg) scale(1.02)';
        this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.25)';
        
        // Animate the overlay
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.95))';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
        this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
        
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.background = 'linear-gradient(transparent, rgba(0,0,0,0.9))';
        }
    });
});

// Brand Partners section animations
const partnerItems = document.querySelectorAll('.partner-item');
partnerItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) rotateX(5deg)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        
        // Animate the logo
        const logo = this.querySelector('.placeholder-logo');
        if (logo) {
            logo.style.transform = 'scale(1.1) rotateY(10deg)';
            logo.style.background = 'linear-gradient(45deg, #d97706, #f59e0b)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        
        const logo = this.querySelector('.placeholder-logo');
        if (logo) {
            logo.style.transform = 'scale(1) rotateY(0deg)';
            logo.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
        }
    });
});

// Partner categories hover effect
document.querySelectorAll('.partner-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.background = 'rgba(255, 255, 255, 0.12)';
        
        // Animate all partner items within this category
        const items = this.querySelectorAll('.partner-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
            }, index * 50);
        });
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        
        const items = this.querySelectorAll('.partner-item');
        items.forEach(item => {
            item.style.transform = 'translateY(0)';
        });
    });
});

// FAQ functionality (Tree Linear's implementation)
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Enhanced contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            company: this.querySelectorAll('input[type="text"]')[1].value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // Enhanced validation
        if (!formData.name || !formData.email || !formData.message || !formData.service) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission with loading state
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            showNotification('Thank you for your inquiry! We will get back to you within 24 hours to discuss your project requirements.', 'success');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('portfolio-item') ||
                entry.target.classList.contains('feature-item')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Initialize animations after loading
function initializeAnimations() {
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .service-card, .portfolio-item, .gallery-item, .feature-item, 
        .stat-item, .team-member, .faq-item, .partner-item, .partner-category
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Gallery lightbox functionality
function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.interior-gallery-grid .gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            const category = this.querySelector('.gallery-tag').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'gallery-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close">×</button>
                    <div class="lightbox-image">
                        <div class="placeholder-image">${title}</div>
                    </div>
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <span class="lightbox-category">${category}</span>
                    </div>
                </div>
            `;
            
            // Add lightbox styles
            lightbox.style.cssText = `
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
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Animate in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close functionality
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const overlay = lightbox.querySelector('.lightbox-overlay');
            
            [closeBtn, overlay].forEach(el => {
                el.addEventListener('click', () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }, 300);
                });
            });
            
            // ESC key to close
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(lightbox)) {
                            document.body.removeChild(lightbox);
                            document.body.style.overflow = 'auto';
                        }
                    }, 300);
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    });
}

// Add lightbox styles to CSS
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    }
    
    .lightbox-content {
        position: relative;
        background: white;
        border-radius: 20px;
        max-width: 800px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        display: grid;
        grid-template-columns: 1fr 1fr;
        z-index: 2;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 3;
        transition: background 0.3s;
    }
    
    .lightbox-close:hover {
        background: rgba(0, 0, 0, 0.9);
    }
    
    .lightbox-image .placeholder-image {
        height: 400px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        text-align: center;
        padding: 2rem;
    }
    
    .lightbox-info {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .lightbox-info h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: #1f2937;
    }
    
    .lightbox-info p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .lightbox-category {
        background: #2563eb;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        align-self: flex-start;
    }
    
    @media (max-width: 768px) {
        .lightbox-content {
            grid-template-columns: 1fr;
            margin: 1rem;
            max-height: 80vh;
        }
        
        .lightbox-info {
            padding: 2rem;
        }
        
        .lightbox-image .placeholder-image {
            height: 250px;
        }
    }
`;
document.head.appendChild(lightboxStyles);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.querySelector('.hero-overlay').style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced hover effects for portfolio and gallery items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateY(5deg)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08) rotateZ(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateZ(0deg)';
    });
});

// Service cards enhanced hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.borderLeftColor = '#f59e0b';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.borderLeftColor = 'transparent';
    });
});

// Button click effects
document.querySelectorAll('button, .cta-button, .filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (this.contains(ripple)) {
                this.removeChild(ripple);
            }
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

// Scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loading screen
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalHTML, 80);
        }, 1000);
    }
}, 3500);

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 50);
    });
}

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Enhanced form validation with real-time feedback
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation logic
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Apply error styling if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Add error styling to CSS
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #ef4444 !important;
        background: rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(errorStyle);

// Initialize gallery lightbox after loading
setTimeout(() => {
    initializeGalleryLightbox();
}, 4000);

console.log('Ultimate Design Studio website loaded successfully! 🎉');
console.log('New features added: Interior Design Gallery & Brand Partners sections');

// Additional Responsive Enhancements
// Touch event handling for better mobile experience
function addTouchSupport() {
    // Add touch class to body for CSS targeting
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Improve touch scrolling on iOS
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
}

// Responsive image loading optimization
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add intersection observer for better lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Responsive font size adjustment based on screen size
function adjustFontSizes() {
    const screenWidth = window.innerWidth;
    const root = document.documentElement;
    
    // Adjust base font size for better readability on different devices
    if (screenWidth < 480) {
        root.style.fontSize = '14px';
    } else if (screenWidth < 768) {
        root.style.fontSize = '15px';
    } else if (screenWidth < 1024) {
        root.style.fontSize = '16px';
    } else {
        root.style.fontSize = '16px';
    }
}

// Handle orientation changes
function handleOrientationChange() {
    // Close mobile menu on orientation change
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
        document.body.style.overflow = '';
    }
    
    // Adjust layout after orientation change
    setTimeout(() => {
        adjustFontSizes();
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

// Responsive performance optimizations
function optimizePerformance() {
    // Reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isLowEndDevice) {
        document.body.classList.add('reduced-motion');
        
        // Add CSS for reduced motion
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
}

// Initialize responsive enhancements
document.addEventListener('DOMContentLoaded', function() {
    addTouchSupport();
    optimizeImages();
    adjustFontSizes();
    optimizePerformance();
});

// Handle window resize and orientation change
window.addEventListener('resize', adjustFontSizes);
window.addEventListener('orientationchange', handleOrientationChange);

// Prevent zoom on double tap for better UX
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add CSS for touch devices
const touchStyles = document.createElement('style');
touchStyles.textContent = `
    .touch-device .cta-button:hover,
    .touch-device .service-card:hover,
    .touch-device .portfolio-item:hover {
        transform: none;
    }
    
    .touch-device .cta-button:active,
    .touch-device .service-card:active,
    .touch-device .portfolio-item:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(touchStyles);