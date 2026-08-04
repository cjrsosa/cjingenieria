// ── CJ Ingeniería y Diseño Mecánico — script.js ──────────────

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar: scroll behaviour ─────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
        toggleScrollTop();
    }, { passive: true });


    // ── Mobile menu toggle ───────────────────────────────────
    const menuToggle  = document.getElementById('menu-toggle');
    const navLinks    = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ── Smooth scrolling ─────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();

            const headerOffset = navbar.offsetHeight + 10;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    // ── Active nav link on scroll ────────────────────────────
    const sections  = document.querySelectorAll('section[id], footer[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }


    // ── Scroll-triggered animations ──────────────────────────
    const animatedEls = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.style.animationDelay || '0s';
                // Use a small timeout to respect animation-delay style on element
                setTimeout(() => {
                    el.classList.add('animated');
                }, parseFloat(delay) * 1000);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedEls.forEach(el => observer.observe(el));


    // ── Scroll-to-top button ─────────────────────────────────
    const scrollTopBtn = document.getElementById('scroll-top');

    function toggleScrollTop() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ── Service card hover: icon colour transition ───────────
    // (handled via CSS, no extra JS needed)


    // ── Pricing card: ripple on button click ─────────────────
    document.querySelectorAll('.btn-plan-primary, .btn-plan-outline, .btn-primary, .btn-hero-primary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255,255,255,0.25);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleAnim 0.55s linear;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow  = 'hidden';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // Add ripple keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);


    // ── WhatsApp button ───────────────────────────────────────
    // Make sure the whatsapp CTA opens correctly
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });


    // ── Initial call for nav active state ────────────────────
    updateActiveNavLink();
    toggleScrollTop();
});
