// JavaScript functionality for the Masamune Gaming website

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    const isExpanded = navLinks.classList.contains('active');
    
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Update icon
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fa fa-times' : 'fa fa-bars';
});

// Close mobile menu when clicking on a link
const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fa fa-bars';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fa fa-bars';
    }
});

// Form submission handlers
const registrationForm = document.querySelector('.registration-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('participant-name').value;
        const email = document.getElementById('participant-email').value;
        
        if (name && email) {
            alert(`Thank you, ${name}! Your registration has been submitted. We'll send confirmation details to ${email}.`);
            registrationForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        
        if (email) {
            alert(`Thank you! You've been subscribed to our newsletter at ${email}.`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Scroll effect for header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const cards = document.querySelectorAll('.game-card, .product-card, .contact-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fa fa-bars';
        menuToggle.focus();
    }
});

// Focus management for mobile menu
const firstNavLink = navLinks.querySelector('a');
const lastNavLink = navLinks.querySelector('a:last-child');

navLinks.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstNavLink) {
                e.preventDefault();
                lastNavLink.focus();
            }
        } else {
            if (document.activeElement === lastNavLink) {
                e.preventDefault();
                firstNavLink.focus();
            }
        }
    }
});