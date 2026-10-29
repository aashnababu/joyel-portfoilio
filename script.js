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

    // 5. Contact Form Submission & Success Popup Modal
    const contactForm   = document.getElementById('contact-form');
    const formStatus    = document.getElementById('form-status');
    const successModal  = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOkBtn    = document.getElementById('modal-ok-btn');

    const openSuccessModal = () => {
        if (successModal) {
            successModal.classList.add('active');
            successModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
        }
    };

    const closeSuccessModal = () => {
        if (successModal) {
            successModal.classList.remove('active');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSuccessModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeSuccessModal);

    // Close when clicking the dark backdrop
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            closeSuccessModal();
        }
    });

    // Web3Forms Access Key
    // Get your free key instantly at https://web3forms.com (no password/account needed, just enter joyelroy10@gmail.com)
    const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn    = document.getElementById('btn-submit-form');
            const originalHTML = submitBtn.innerHTML;

            const nameInput    = document.getElementById('name');
            const emailInput   = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name    = nameInput.value.trim();
            const email   = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all fields before submitting.';
                formStatus.className   = 'form-status error';
                return;
            }

            // Set sending state
            submitBtn.disabled  = true;
            submitBtn.innerHTML = 'Sending… <span class="submit-glow"></span>';
            formStatus.textContent = '';
            formStatus.className   = 'form-status';

            try {
                let success = false;

                if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
                    // Method 1: Web3Forms (Ultra reliable & fast)
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            access_key: WEB3FORMS_ACCESS_KEY,
                            name: name,
                            email: email,
                            message: message,
                            subject: `New Portfolio Message from ${name}`
                        })
                    });

                    const data = await response.json();
                    if (data.success) {
                        success = true;
                    } else {
                        throw new Error(data.message || 'Web3Forms error');
                    }
                } else {
                    // Method 2: Fallback to FormSubmit.co
                    const response = await fetch('https://formsubmit.co/ajax/joyelroy10@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            message: message,
                            _subject: `New Portfolio Inquiry from ${name}`,
                            _template: 'table',
                            _captcha: 'false'
                        })
                    });

                    const data = await response.json();
                    if (response.ok || (data && data.success === 'true')) {
                        success = true;
                    } else {
                        throw new Error(data.message || 'FormSubmit error');
                    }
                }

                if (success) {
                    // Reset button state
                    submitBtn.disabled  = false;
                    submitBtn.innerHTML = originalHTML;

                    // Clear the form fields completely
                    contactForm.reset();
                    formStatus.textContent = '';
                    formStatus.className   = 'form-status';

                    // Display the popup message
                    openSuccessModal();
                }
            } catch (err) {
                console.error('Submission error:', err);
                submitBtn.disabled  = false;
                submitBtn.innerHTML = originalHTML;

                if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
                    formStatus.innerHTML = 'Form service is temporarily down. Get a free key at <a href="https://web3forms.com" target="_blank" style="color:var(--accent-gold);text-decoration:underline;">web3forms.com</a> and paste it in script.js.';
                } else {
                    formStatus.textContent = 'Could not send message. Please email directly at joyelroy10@gmail.com';
                }
                formStatus.className = 'form-status error';
            }
        });
    }
});
