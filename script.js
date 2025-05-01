// Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                animateElements();
            }
        });
    });

    // Theme Toggle
    const themeSwitch = document.querySelectorAll('.theme-switch');
    themeSwitch.forEach(button => {
        button.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            document.body.classList.toggle('light');
            
            // Save preference to localStorage
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            // Update Three.js particles color
            updateParticlesColor();
        });
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    function animateElements() {
        const fadeUpElements = document.querySelectorAll('.fade-up');
        
        fadeUpElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }

    // Interactive particles
    document.addEventListener('mousemove', (e) => {
        const particlesContainer = document.getElementById('particles');
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });

    // Update Three.js particles color based on theme
    function updateParticlesColor() {
        const particlesMaterial = scene.children.find(child => child instanceof THREE.Points).material;
        particlesMaterial.color.setHex(document.body.classList.contains('dark') ? 0x3b82f6 : 0x1d4ed8);
    }
});