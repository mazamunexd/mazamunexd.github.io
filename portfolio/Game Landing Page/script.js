// Dynamic Scrollbar Color Change
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const color = section.getAttribute('data-scrollbar-color');
        document.documentElement.style.setProperty('--scrollbar-thumb', color);
      }
    });
  });

  // Optional: Add scroll animations via IntersectionObserver
  const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observers.observe(section);
  });
});
