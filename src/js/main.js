
// Boot Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    
    // Hide boot screen after animation completes
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 6000); // 6 seconds total boot time
    
    // Allow skipping with any key press or click
    const skipBoot = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    };
    
    document.addEventListener('keydown', skipBoot, { once: true });
    bootScreen.addEventListener('click', skipBoot, { once: true });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('lazy-section');
        lazyObserver.observe(section);
    });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        document.body.style.overflowY = 'auto';
    }, 150);
}, { passive: true });


// Terminal Button Scroll Script

// ============================================
// PROJECT DOSSIER MODAL
// ============================================

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

    // Build modal content
    let html = '<div class="pdossier-title-row">';
    html += '<span class="pdossier-icon">' + icon + '</span>';
    html += '<h3 class="pdossier-name">' + fullname + '</h3>';
    html += '</div>';

    if (tagsEl) {
        html += '<div class="pdossier-tags">' + tagsEl.innerHTML + '</div>';
    }

    html += '<div class="pdossier-divider"></div>';
    html += '<div class="pdossier-desc">' + desc + '</div>';

    if (pointsEl && pointsEl.children.length > 0) {
        html += '<ul class="pdossier-points">' + pointsEl.innerHTML + '</ul>';
    }

    if (linksEl) {
        html += '<div class="pdossier-links">' + linksEl.innerHTML + '</div>';
    }

    body.innerHTML = html;
    pathEl.textContent = path;

    // Reset scroll position to top for the new modal
    body.scrollTop = 0;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button
    setTimeout(() => {
        document.getElementById('dossierClose')?.focus();
    }, 100);
}

function closeDossier() {
    const overlay = document.getElementById('dossierOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close button
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

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDossier();
});
