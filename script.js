document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor Spotlight Effect
    const spotlight = document.getElementById('cursor-spotlight');
    
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            // Position the spotlight centered on the mouse cursor
            spotlight.style.left = `${e.clientX}px`;
            spotlight.style.top = `${e.clientY}px`;
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a nav item is clicked
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Scroll Header Effect (compact pill navbar adds scrolled class)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Scroll Active Link Highlighter
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 5. Contact Form Submission simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('btn-submit-form');
            const originalText = submitBtn.innerHTML;
            
            // Set sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <span class="submit-glow"></span>';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // Simulate server network latency
            setTimeout(() => {
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show success status
                formStatus.textContent = 'Message sent successfully! Joyel will reach out to you shortly.';
                formStatus.className = 'form-status success';
                
                // Reset form fields
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.style.opacity = '1';
                        formStatus.className = 'form-status';
                    }, 400);
                }, 5000);

            }, 1800);
        });
    }
});
