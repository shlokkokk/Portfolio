// Main Portfolio Logic

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Boot Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    if (!bootScreen) return;

    // Stagger boot lines
    const lines = bootScreen.querySelectorAll('.boot-log p');
    lines.forEach((line, i) => {
        line.style.animationDelay = (i * 0.4) + 's';
    });

    const dismiss = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => { bootScreen.style.display = 'none'; }, 800);
    };

    setTimeout(dismiss, 5500);
    document.addEventListener('keydown', dismiss, { once: true });
    bootScreen.addEventListener('click', dismiss, { once: true });
});

// Particle Network Background
(function initParticles() {
    if (reducedMotion) return;
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, particles = [], mouse = { x: -999, y: -999 };
    const CONNECT_DIST = 140;
    const PARTICLE_COUNT = () => Math.min(Math.floor((w * h) / 18000), 80);

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = PARTICLE_COUNT();
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;

            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            // Mouse repulsion
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                p.x += dx * 0.01;
                p.y += dy * 0.01;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 140, 0.35)';
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                if (d < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 140, ${0.08 * (1 - d / CONNECT_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    let animId;
    let isVisible = true;

    function loop() {
        if (!isVisible) return;
        draw();
        animId = requestAnimationFrame(loop);
    }

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible) loop();
        else cancelAnimationFrame(animId);
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX; mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('resize', () => { resize(); createParticles(); });

    resize();
    createParticles();
    loop();
})();

// Custom Glowing Cursor
(function initCursor() {
    if (isTouchDevice || reducedMotion) {
        document.body.classList.add('no-cursor');
        return;
    }

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    }, { passive: true });

    // Ring follows with lerp
    function lerpRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(lerpRing);
    }
    lerpRing();

    // Hover state
    document.addEventListener('mouseover', (e) => {
        const t = e.target;
        if (t.matches('a, button, .pcard, .btn, .cert-card, .contact-item, .blog-card, .project-card, .submit-btn, input, textarea, [onclick]')) {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        const t = e.target;
        if (t.matches('a, button, .pcard, .btn, .cert-card, .contact-item, .blog-card, .project-card, .submit-btn, input, textarea, [onclick]')) {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        }
    }, { passive: true });

    // Hide cursor on body style
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.style.cursor = 'none';
    });
})();

// Scroll Progress Bar
(function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
})();

// Scroll-to-Top Button
(function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// Navigation Highlighting
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
})();

// Element Fade-in Observer
(function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    if (reducedMotion) {
        elements.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger children within the same parent
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.fade-in')) : [];
                const idx = siblings.indexOf(entry.target);
                const delay = idx >= 0 ? idx * 80 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
})();

// Skill Bar Animation Logic
(function initSkillBars() {
    const categories = document.querySelectorAll('.skill-category');
    if (!categories.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach((bar, i) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => { bar.style.width = width; }, 150 + i * 120);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    categories.forEach(c => observer.observe(c));
})();

// Stats Counter Animation
(function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)/);

                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 30));
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        el.textContent = current + suffix;
                    }, 40);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
})();

// ═══════════════════════════════════════
// SECTION HEADING GLITCH REVEAL
// ═══════════════════════════════════════
(function initGlitchHeadings() {
    if (reducedMotion) return;
    const headings = document.querySelectorAll('.glitch');
    if (!headings.length) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target;
                const original = h2.textContent;
                let iterations = 0;

                const scramble = setInterval(() => {
                    h2.textContent = original.split('').map((ch, i) => {
                        if (ch === ' ' || ch === '#') return ch;
                        if (i < iterations) return original[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');

                    iterations += 1.5;
                    if (iterations >= original.length) {
                        clearInterval(scramble);
                        h2.textContent = original;
                    }
                }, 35);

                observer.unobserve(h2);
            }
        });
    }, { threshold: 0.1 });

    headings.forEach(h => observer.observe(h));
})();

// Lazy Section Reveal
document.addEventListener('DOMContentLoaded', () => {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('lazy-section');
        lazyObserver.observe(section);
    });
});

// Anchor Smooth Scrolling
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Mobile Menu Handlers
function toggleMenu() {
    document.getElementById('navLinks')?.classList.toggle('active');
}

function closeMenu() {
    document.getElementById('navLinks')?.classList.remove('active');
}

// Modal/Dossier Handling
function openDossier(card) {
    const overlay = document.getElementById('dossierOverlay');
    const body = document.getElementById('dossierBody');
    const pathEl = document.getElementById('dossierPath');

    const detail = card.querySelector('.pcard-detail');
    if (!detail) return;

    const fullname = detail.querySelector('.pcard-detail-fullname')?.textContent || '';
    const path = detail.querySelector('.pcard-detail-path')?.textContent || '~/projects/';
    const desc = detail.querySelector('.pcard-detail-desc')?.innerHTML || '';
    const pointsEl = detail.querySelector('.pcard-detail-points');
    const linksEl = detail.querySelector('.pcard-detail-links');
    const icon = card.querySelector('.pcard-icon')?.textContent || '';
    const tagsEl = card.querySelector('.pcard-tags');

    let html = '<div class="pdossier-title-row">';
    html += '<span class="pdossier-icon">' + icon + '</span>';
    html += '<h3 class="pdossier-name">' + fullname + '</h3>';
    html += '</div>';

    if (tagsEl) html += '<div class="pdossier-tags">' + tagsEl.innerHTML + '</div>';
    html += '<div class="pdossier-divider"></div>';
    html += '<div class="pdossier-desc">' + desc + '</div>';

    if (pointsEl && pointsEl.children.length > 0) {
        html += '<ul class="pdossier-points">' + pointsEl.innerHTML + '</ul>';
    }
    if (linksEl) html += '<div class="pdossier-links">' + linksEl.innerHTML + '</div>';

    body.innerHTML = html;
    pathEl.textContent = path;
    body.scrollTop = 0;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => { document.getElementById('dossierClose')?.focus(); }, 100);
}

function closeDossier() {
    document.getElementById('dossierOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('dossierClose');
    if (closeBtn) closeBtn.addEventListener('click', closeDossier);

    const overlay = document.getElementById('dossierOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeDossier();
        });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDossier();
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.querySelector('#form-status');
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = '✔ Message sent successfully!';
                form.reset();
            } else {
                status.textContent = '⚠ Something went wrong — try again.';
            }
        } catch {
            status.textContent = '⚠ Network error — try again.';
        }

        setTimeout(() => { status.textContent = ''; }, 4000);
    });
});

// Text Typing Logic
(function initTyping() {
    const typingEls = document.querySelectorAll('.terminal-typing');
    if (!typingEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const fullText = el.getAttribute('data-text') || el.textContent;
                el.textContent = '';
                el.classList.add('typing-active');
                
                let i = 0;
                const type = () => {
                    if (i < fullText.length) {
                        el.textContent += fullText.charAt(i);
                        i++;
                        setTimeout(type, Math.random() * 50 + 30);
                    } else {
                        el.classList.remove('typing-active');
                    }
                };
                type();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    typingEls.forEach(el => observer.observe(el));
})();

// Update year
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Navbar Decoding Effect
(function initNavScramble() {
    const links = document.querySelectorAll('.nav-links a');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    links.forEach(link => {
        const originalText = link.textContent;
        let interval = null;

        link.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(interval);
            
            interval = setInterval(() => {
                link.textContent = link.textContent
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });

        link.addEventListener('mouseleave', () => {
            clearInterval(interval);
            link.textContent = originalText;
        });
    });
})();

