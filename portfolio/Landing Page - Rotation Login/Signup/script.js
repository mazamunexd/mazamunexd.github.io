// Create animated background elements
function createBackgroundElements() {
    const container = document.getElementById('backgroundAnimation');
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.classList.add('background-element');
        
        // Random properties
        const size = Math.random() * 200 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 15;
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        container.appendChild(element);
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundElements();
    
    // Navigation links
    const navLinks = document.querySelectorAll('nav a[data-section]');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Add scroll animation to background
    let scrollPosition = 0;
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        const elements = document.querySelectorAll('.background-element');
        elements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrollPosition * speed / 10);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});