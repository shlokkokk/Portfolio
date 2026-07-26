
// Safe DOM Ready Helper
function onDOMReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// Boot Screen Animation
onDOMReady(() => {
    const bootScreen = document.getElementById('bootScreen');
    if (!bootScreen) return;
    
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

onDOMReady(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Auto-staggering for grids and timelines
onDOMReady(() => {
    const staggerContainers = [
        '.certifications-grid',
        '.skills-grid',
        '.timeline',
        '.project-showcase'
    ];

    staggerContainers.forEach(selector => {
        document.querySelectorAll(selector).forEach(container => {
            const items = container.querySelectorAll('.fade-in');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    });
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

onDOMReady(() => {
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

onDOMReady(() => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
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
    const icon = card.querySelector('.pcard-icon')?.innerHTML || '';
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
        document.getElementById('dossierClose')?.focus({ preventScroll: true });
    }, 100);
}

function closeDossier() {
    const overlay = document.getElementById('dossierOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close button
onDOMReady(() => {
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

const GITHUB_USERNAME = 'shlokkokk';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const FALLBACK_GITHUB_STATS = [
    { value: '12+', label: 'Public repos', accent: true },
    { value: 'Security', label: 'Main focus' },
    { value: 'Labs', label: 'Build style' },
    { value: 'Live', label: 'When online' }
];

const FALLBACK_GITHUB_CARDS = [
    {
        type: 'Featured Build',
        eyebrow: 'Fraud Defense',
        title: 'KAVACH',
        summary: 'Multi-modal cyber fraud defense with voice, job, and SIM-based protection layers designed around real-world abuse patterns.',
        meta: 'Python / FastAPI / Security',
        url: 'https://github.com/shlokkokk/kavach',
        linkLabel: 'Open repo',
        featured: true
    },
    {
        type: 'Simulator',
        eyebrow: 'AI Systems',
        title: 'PRAXIS',
        summary: 'AI-native financial simulator built around multi-agent council debates, risk modeling, and decision pressure testing.',
        meta: 'Agents / Strategy / Finance',
        url: 'https://github.com/shlokkokk/PRAXIS',
        linkLabel: 'Open repo'
    },
    {
        type: 'Detection',
        eyebrow: 'Blue Team',
        title: 'ZeroRisk Sentinel',
        summary: 'Hybrid threat detection with YARA scanning, reputation checks, DNS and TLS analysis, and AI-assisted explanations.',
        meta: 'YARA / Python / Threat Intel',
        url: 'https://github.com/shlokkokk/zerorisk-sentinel',
        linkLabel: 'Open repo'
    },
    {
        type: 'Toolkit',
        eyebrow: 'OffSec',
        title: 'ShellStack',
        summary: 'A consolidated offensive security reference with 280+ tools and over 1,000 commands organized for fast execution.',
        meta: 'Kali / Reference / Workflow',
        url: 'https://github.com/shlokkokk/ShellStack',
        linkLabel: 'Open repo'
    },
    {
        type: 'Learning',
        eyebrow: 'OSINT',
        title: 'OSINT Academy',
        summary: 'Interactive OSINT learning with guided workflows, Google dork generation, and a cleaner investigative interface.',
        meta: 'Web / OSINT / Training',
        url: 'https://github.com/shlokkokk/osint-academy',
        linkLabel: 'Open repo'
    }
];

onDOMReady(() => {
    initGithubPulse();
    initActiveSectionTracking();
});

function initActiveSectionTracking() {
    const sections = ['about', 'skills', 'experience', 'education', 'certifications', 'projects', 'blog', 'contact'];
    const sectionActiveStates = {};
    
    // Initialize all sections as inactive
    sections.forEach(id => {
        sectionActiveStates[id] = false;
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            sectionActiveStates[entry.target.id] = entry.isIntersecting && entry.intersectionRatio > 0.1;
        });
        
        // Find the most visible section (first one that's intersecting)
        let activeSection = null;
        for (const id of sections) {
            if (sectionActiveStates[id]) {
                activeSection = id;
                break;
            }
        }
        
        if (activeSection) {
            // Remove active from all links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            // Add active to current section link
            const navLink = document.querySelector(`.nav-links a[href="#${activeSection}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    }, {
        threshold: [0, 0.1, 0.5],
        rootMargin: '-90px 0px -60% 0px'
    });
    
    sections.forEach(sectionId => {
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
            sectionObserver.observe(sectionEl);
        }
    });
}

async function initGithubPulse() {
    const statusEl = document.getElementById('githubStatus');
    const feedEl = document.getElementById('githubFeed');
    const viewportEl = document.getElementById('commitViewport');

    if (!statusEl || !feedEl || !viewportEl) {
        return;
    }

    try {
        statusEl.textContent = 'Loading...';

        const repos = await fetchGitHubJson(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
        const latestRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 4);

        const commitGroups = await Promise.allSettled(latestRepos.map(repo => fetchRepoCommits(repo)));
        const commits = commitGroups
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value)
            .filter(Boolean)
            .slice(0, 20);

        renderCommitTicker({ feedEl, commits, statusEl, viewportEl });

        statusEl.textContent = `Updated ${formatRelativeTime(new Date())}`;
        statusEl.classList.add('is-live');
    } catch (error) {
        console.error('Commit ticker failed:', error);
        statusEl.textContent = 'Feed unavailable';
        feedEl.innerHTML = `
            <div class="commit-empty github-empty-state">
                <div class="github-empty-icon">⌛</div>
                <h3>GitHub activity is not loading right now</h3>
                <p>This usually happens from local file access, rate limits, or a temporary network issue.</p>
            </div>
        `;
    }
}

async function fetchGitHubJson(path) {
    const targetUrl = `${GITHUB_API_BASE}${path}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                Accept: 'application/vnd.github+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub request failed: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        const fallbackUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        const fallbackResponse = await fetch(fallbackUrl);

        if (!fallbackResponse.ok) {
            throw error;
        }

        return fallbackResponse.json();
    }
}

async function fetchRepoCommits(repo) {
    const commits = await fetchGitHubJson(`/repos/${repo.full_name}/commits?per_page=6`);

    return (commits || []).map(commit => ({
        message: commit.commit?.message || 'Updated code',
        repoName: repo.name,
        repoUrl: repo.html_url,
        branch: repo.default_branch || 'main',
        author: commit.commit?.author?.name || commit.author?.login || 'Unknown',
        date: commit.commit?.author?.date || commit.commit?.committer?.date || repo.pushed_at,
        sha: commit.sha?.slice(0, 7) || ''
    }));
}

function renderCommitTicker({ feedEl, commits, statusEl, viewportEl }) {
    const sortedCommits = commits
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 20);

    if (!sortedCommits.length) {
        feedEl.innerHTML = `
            <div class="commit-empty github-empty-state">
                <div class="github-empty-icon">⌛</div>
                <h3>No recent public commits</h3>
                <p>The API responded, but there is nothing recent to show yet.</p>
            </div>
        `;
        statusEl.textContent = 'No recent commits';
        return;
    }

    const repeatedCommits = [...sortedCommits, ...sortedCommits];
    feedEl.innerHTML = repeatedCommits.map((commit, index) => `
        <article class="commit-item ${index >= sortedCommits.length ? 'is-duplicate' : ''}">
            <div class="commit-copy">
                <h3>${escapeHtml(commit.message)}</h3>
                <div class="commit-message">${escapeHtml(commit.author)} pushed to ${escapeHtml(commit.repoName)}</div>
                <div class="commit-meta">
                    <span class="commit-pill">${escapeHtml(commit.branch)}</span>
                    <span>${escapeHtml(commit.sha)}</span>
                    <span>${escapeHtml(commit.repoName)}</span>
                </div>
            </div>
            <div class="commit-time">${escapeHtml(formatRelativeTime(commit.date))}</div>
        </article>
    `).join('');

    const trackHeight = feedEl.scrollHeight / 2;
    const duration = Math.max(26, Math.min(70, Math.round(trackHeight / 22)));
    feedEl.style.setProperty('--commit-scroll-duration', `${duration}s`);
    feedEl.classList.add('is-scrolling');
    viewportEl.scrollTop = 0;
}

function formatRelativeTime(value) {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'just now';
    }

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    if (diffMinutes < 1) {
        return 'just now';
    }

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
        return `${diffHours}h ago`;
    }

    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) {
        return `${diffDays}d ago`;
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

async function initGithubPulse() {
    const statusEl = document.getElementById('githubStatus');
    const statsEl = document.getElementById('githubStats');
    const feedGridEl = document.getElementById('githubFeedGrid');
    const headlineEl = document.getElementById('githubHeadline');
    const summaryEl = document.getElementById('githubSummary');
    const avatarEl = document.getElementById('githubAvatar');
    const liveDotEl = document.getElementById('githubLiveDot');

    if (!statusEl || !statsEl || !feedGridEl || !headlineEl || !summaryEl || !avatarEl || !liveDotEl) {
        return;
    }

    renderGithubStats(statsEl, FALLBACK_GITHUB_STATS);
    renderGithubCards(feedGridEl, FALLBACK_GITHUB_CARDS);
    setGithubStatus(statusEl, 'Curated view loaded. Live GitHub data appears when available.', 'fallback');
    setLiveIndicator(liveDotEl, false);

    try {
        setGithubStatus(statusEl, 'Fetching live GitHub data...', 'loading');

        const [profile, repoResponse] = await Promise.all([
            fetchGitHubJson(`/users/${GITHUB_USERNAME}`),
            fetchGitHubJson(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`)
        ]);

        const repos = (repoResponse || [])
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        const commitGroups = await Promise.allSettled(repos.slice(0, 4).map(repo => fetchRepoCommits(repo)));
        const commits = commitGroups
            .filter(result => result.status === 'fulfilled')
            .flatMap(result => result.value)
            .filter(Boolean)
            .slice(0, 20);

        renderGithubStats(statsEl, buildLiveStats({ profile, repos, commits }));
        renderGithubCards(feedGridEl, buildLiveCards({ repos, commits }));
        renderGithubProfile({
            avatarEl,
            headlineEl,
            summaryEl,
            profile,
            repos,
            commits
        });
        setGithubStatus(statusEl, `Live GitHub data - updated ${formatRelativeTime(new Date())}`, 'live');
        setLiveIndicator(liveDotEl, true);
    } catch (error) {
        console.error('Commit board failed:', error);
        const fallbackMessage = window.location.protocol === 'file:'
            ? 'Curated view loaded. Live GitHub is usually blocked on local file previews.'
            : 'Curated view loaded. Live GitHub is unavailable right now.';

        summaryEl.textContent = 'Featured repositories stay visible here even when the live GitHub API is sleeping.';
        setGithubStatus(statusEl, fallbackMessage, 'fallback');
        setLiveIndicator(liveDotEl, false);
    }
}

async function fetchRepoCommits(repo) {
    const commits = await fetchGitHubJson(`/repos/${repo.full_name}/commits?per_page=6`);

    return (commits || []).map(commit => ({
        message: commit.commit?.message || 'Updated code',
        repoName: repo.name,
        repoUrl: repo.html_url,
        commitUrl: commit.html_url || repo.html_url,
        branch: repo.default_branch || 'main',
        author: commit.commit?.author?.name || commit.author?.login || 'Unknown',
        date: commit.commit?.author?.date || commit.commit?.committer?.date || repo.pushed_at,
        sha: commit.sha?.slice(0, 7) || ''
    }));
}

function renderGithubProfile({ avatarEl, headlineEl, summaryEl, profile, repos, commits }) {
    const latestRepo = repos[0];
    const latestCommit = commits[0];
    const displayName = profile?.name || GITHUB_USERNAME;

    headlineEl.textContent = `${displayName} on GitHub`;
    summaryEl.textContent = latestCommit
        ? `Recent public pushes from ${humanizeRepoName(latestCommit.repoName)} are live below, alongside featured repositories from the wider build stack.`
        : `Recent public repository activity is layered into this board whenever GitHub is available.`;

    if (latestRepo?.pushed_at) {
        summaryEl.textContent += ` Last visible repo push: ${formatRelativeTime(latestRepo.pushed_at)}.`;
    }

    if (profile?.avatar_url) {
        avatarEl.innerHTML = `<img class="github-avatar" src="${escapeHtml(profile.avatar_url)}" alt="${escapeHtml(displayName)} GitHub avatar" loading="lazy">`;
    }
}

function buildLiveStats({ profile, repos, commits }) {
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const latestDate = repos[0]?.pushed_at || commits[0]?.date || profile?.updated_at;

    return [
        { value: String(repos.length), label: 'Public repos', accent: true },
        { value: String(totalStars), label: 'Stars collected' },
        { value: getTopLanguage(repos) || 'Mixed', label: 'Most used' },
        { value: latestDate ? formatRelativeTime(latestDate) : 'Recently', label: 'Last push' }
    ];
}

function buildLiveCards({ repos, commits }) {
    const commitCards = commits
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        .map((commit, index) => ({
            type: 'Recent Push',
            eyebrow: formatRelativeTime(commit.date),
            title: trimText(commit.message, index === 0 ? 84 : 66),
            summary: `${commit.author} updated ${humanizeRepoName(commit.repoName)} on ${commit.branch}.`,
            meta: `${commit.repoName} / ${commit.sha}`,
            url: commit.commitUrl || commit.repoUrl,
            linkLabel: 'View commit',
            featured: index === 0
        }));

    const repoCards = repos
        .slice(0, 4)
        .map(repo => ({
            type: 'Repository',
            eyebrow: repo.language || 'Codebase',
            title: humanizeRepoName(repo.name),
            summary: repo.description || 'Public repository currently in active rotation.',
            meta: buildRepoMeta(repo),
            url: repo.html_url || GITHUB_PROFILE_URL,
            linkLabel: 'Open repo'
        }));

    return dedupeCards([...commitCards, ...repoCards, ...FALLBACK_GITHUB_CARDS]).slice(0, 5);
}

function renderGithubStats(container, stats) {
    container.innerHTML = stats.map(stat => `
        <div class="github-stat-card ${stat.accent ? 'github-stat-card-soft' : ''}">
            <span class="github-stat-value">${escapeHtml(stat.value)}</span>
            <span class="github-stat-label">${escapeHtml(stat.label)}</span>
        </div>
    `).join('');
}

function renderGithubCards(container, cards) {
    container.innerHTML = cards.map(card => `
        <article class="github-card ${card.featured ? 'github-card-featured' : ''}">
            <div class="github-card-top">
                <span class="github-card-type">${escapeHtml(card.type)}</span>
                <span class="github-card-eyebrow">${escapeHtml(card.eyebrow)}</span>
            </div>
            <h4>${escapeHtml(card.title)}</h4>
            <p>${escapeHtml(card.summary)}</p>
            <div class="github-card-meta">${escapeHtml(card.meta)}</div>
            <a href="${escapeHtml(card.url)}" target="_blank" rel="noopener" class="github-card-link">${escapeHtml(card.linkLabel || 'Open repo')}</a>
        </article>
    `).join('');
}

function setGithubStatus(statusEl, message, mode) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-live', 'is-loading', 'is-fallback');

    if (mode) {
        statusEl.classList.add(`is-${mode}`);
    }
}

function setLiveIndicator(liveDotEl, isLive) {
    liveDotEl.classList.toggle('is-offline', !isLive);
}

function buildRepoMeta(repo) {
    const parts = [];

    if (repo.pushed_at) {
        parts.push(`Updated ${formatRelativeTime(repo.pushed_at)}`);
    }

    if (repo.stargazers_count) {
        parts.push(`${repo.stargazers_count} star${repo.stargazers_count === 1 ? '' : 's'}`);
    }

    if (!parts.length) {
        parts.push('Public repository');
    }

    return parts.join(' / ');
}

function getTopLanguage(repos) {
    const languageCount = new Map();

    repos.forEach(repo => {
        if (!repo.language) {
            return;
        }

        languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1);
    });

    return [...languageCount.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0] || '';
}

function humanizeRepoName(name) {
    return String(name)
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

function trimText(value, maxLength) {
    const text = String(value || '').trim();

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

function dedupeCards(cards) {
    const seen = new Set();

    return cards.filter(card => {
        const key = `${card.title}|${card.url}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

const FALLBACK_ACTIVITY_ITEMS = [
    {
        title: 'Preview stream active',
        message: 'Live commit data is still syncing, so the stream is holding a local preview state.',
        branch: 'preview',
        repoName: 'activity feed',
        sha: 'local',
        date: new Date().toISOString()
    },
    {
        title: 'KAVACH staged for the stream',
        message: 'Fraud defense work and current build notes stay in rotation while the live feed syncs.',
        branch: 'main',
        repoName: 'kavach',
        sha: 'static',
        date: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
        title: 'ShellStack references refreshed',
        message: 'Tooling notes, command updates, and offsec workflow changes are queued into the activity lane.',
        branch: 'main',
        repoName: 'ShellStack',
        sha: 'static',
        date: new Date(Date.now() - 40 * 60 * 1000).toISOString()
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initActivityStream();
});

async function initActivityStream() {
    const statusEl = document.getElementById('activityStatus');
    const feedEl = document.getElementById('activityFeed');
    const viewportEl = document.getElementById('commitViewport');

    if (!statusEl || !feedEl || !viewportEl) {
        return;
    }

    renderActivityStream({
        feedEl,
        items: FALLBACK_ACTIVITY_ITEMS,
        viewportEl
    });

    setActivityStatus(statusEl, 'Connecting live feed...', 'loading');

    try {
        const items = await fetchRecentActivity();

        if (!items.length) {
            throw new Error('No recent activity returned');
        }

        renderActivityStream({
            feedEl,
            items,
            viewportEl
        });

        setActivityStatus(statusEl, `Live now - updated ${formatRelativeTime(new Date())}`, 'live');
    } catch (error) {
        console.error('Activity stream failed:', error);

        const fallbackMessage = formatActivityError(error);

        setActivityStatus(statusEl, fallbackMessage, 'fallback');
    }
}

async function fetchRecentActivity() {
    try {
        const events = await fetchGitHubJson(`/users/${GITHUB_USERNAME}/events/public?per_page=100`);
        const pushEvents = (events || []).filter(event => event.type === 'PushEvent');

        const eventItems = pushEvents.flatMap(event => {
            const repoName = event.repo?.name?.split('/').pop() || 'repository';
            const branch = event.payload?.ref?.split('/').pop() || 'main';
            const author = event.actor?.display_login || GITHUB_USERNAME;

            return (event.payload?.commits || []).map(commit => ({
                title: commit.message || 'Updated code',
                message: `${author} pushed to ${repoName}`,
                branch,
                repoName,
                sha: (commit.sha || '').slice(0, 7),
                date: event.created_at
            }));
        }).filter(item => item.title);

        if (eventItems.length >= 8) {
            return eventItems
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 18);
        }
    } catch (error) {
        console.warn('Public events endpoint failed, falling back to repo commits.', error);
    }

    return fetchActivityRepoCommits();
}

async function fetchActivityRepoCommits() {
    const repos = await fetchGitHubJson(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
    const latestRepos = (repos || [])
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 4);

    const commitGroups = await Promise.allSettled(latestRepos.map(repo => fetchRepoCommits(repo)));

    return commitGroups
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .map(item => ({
            title: item.title || item.message || 'Updated code',
            message: item.message || `${GITHUB_USERNAME} pushed to ${item.repoName || 'repository'}`,
            branch: item.branch || 'main',
            repoName: item.repoName || 'repository',
            sha: item.sha || 'latest',
            date: item.date
        }))
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 18);
}

function renderActivityStream({ feedEl, items, viewportEl }) {
    const activityItems = (items || [])
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    feedEl.classList.remove('is-scrolling');

    if (!activityItems.length) {
        feedEl.innerHTML = `
            <div class="commit-empty-state">
                <div class="commit-empty-icon">&gt;_</div>
                <h3>No activity yet</h3>
                <p>The stream is online, but there are no recent public commit entries to show right now.</p>
            </div>
        `;
        return;
    }

    const repeatedItems = [...activityItems, ...activityItems];
    feedEl.innerHTML = repeatedItems.map((item, index) => `
        <article class="commit-item ${index >= activityItems.length ? 'is-duplicate' : ''}">
            <div class="commit-icon">&gt;</div>
            <div class="commit-copy">
                <h3>${escapeHtml(item.title)}</h3>
                <div class="commit-message">${escapeHtml(item.message)}</div>
                <div class="commit-meta">
                    <span class="commit-pill">${escapeHtml(item.branch || 'main')}</span>
                    <span>${escapeHtml(item.sha || 'latest')}</span>
                    <span class="commit-source">${escapeHtml(item.repoName || 'activity feed')}</span>
                </div>
            </div>
            <div class="commit-time">${escapeHtml(formatRelativeTime(item.date))}</div>
        </article>
    `).join('');

    const trackHeight = Math.max(feedEl.scrollHeight / 2, 1);
    const duration = Math.max(24, Math.min(72, Math.round(trackHeight / 20)));

    feedEl.style.setProperty('--commit-scroll-duration', `${duration}s`);
    feedEl.classList.add('is-scrolling');
    viewportEl.scrollTop = 0;
}

function setActivityStatus(statusEl, message, mode) {
    statusEl.textContent = message;
    statusEl.classList.remove('is-loading', 'is-live', 'is-fallback');
    statusEl.classList.add(`is-${mode}`);
}

function formatActivityError(error) {
    if (window.location.protocol === 'file:') {
        return 'Preview mode - use a live server for real commits';
    }

    const message = String(error?.message || error || '');

    if (message.includes('403')) {
        return 'GitHub rate limit hit - showing preview stream';
    }

    if (message.includes('404')) {
        return 'GitHub feed not found - showing preview stream';
    }

    return 'Live feed unavailable - showing preview stream';
}


const CREDENTIAL_DB = {
    "award-biothon": {
        name: "BIOTHON_2026.dossier",
        type: "Classified Mission Dossier",
        size: "2.80 MB (Twin Accreditation)",
        date: "Jul 2026",
        issuer: "Marwadi University (NAAC A+) · DST Govt of Gujarat · IEEE EMBS",
        title: "National Finalist — BIOTHON 2026",
        description: "Qualified as a <strong>National Finalist</strong> at <strong>BIOTHON 2026</strong> — a prestigious Bio-Hackathon by the Department of Bioinformatics, <strong>Marwadi University</strong> (NAAC A+), Rajkot. Co-hosted by <strong>DST Govt of Gujarat</strong>, <strong>IEEE EMBS</strong>, <strong>GSBTM</strong>, and <strong>Royal Society of Biology</strong>. Grand Finale held <strong>July 22, 2026</strong> — both Individual & Team Meridian accreditations awarded.",
        link: "https://drive.google.com/file/d/1BISeaAhiouegwPqUx4nR8Ni4rgR5PA_H/view?usp=sharing",
        icon: "fas fa-folder-open",
        category: "Awards_and_CTFs",
        credibilityBadges: ["NATIONAL FINALIST", "DST GOVT OF GUJARAT", "IEEE EMBS", "ROYAL SOC BIOLOGY", "NAAC A+"],

        // ── Generic Multi-Certificate Dossier Schema ──
        // Set isDossier: true on any entry to render a tabbed dossier viewer
        // instead of a single certificate.  All fields below are data-driven —
        // the renderer reads them directly; nothing is hardcoded in functions.
        isDossier:       true,
        childFileIds:    ["award-biothon-shlok", "award-biothon-team"],
        dossierTag:      "CLASSIFIED \u00b7 BIOTHON 2026 \u00b7 NATIONAL FINALIST",
        dossierIcon:     "\ud83e\uddec",
        dossierHeadline: "BIOTHON",
        dossierYear:     "2026",
        dossierSubtitle: "National Level Bio-Hackathon \u00b7 Grand Finale \u00b7 July 22, 2026",

        // Endorsement strip pills: { icon, label, highlight? }
        endorsements: [
            { icon: "fas fa-landmark",   label: "DST \u00b7 Govt of Gujarat" },
            { icon: "fas fa-microchip",  label: "IEEE EMBS",              highlight: true },
            { icon: "fas fa-leaf",       label: "Royal Society of Biology" },
            { icon: "fas fa-university", label: "Marwadi Univ \u00b7 NAAC A+" },
            { icon: "fas fa-flask",      label: "GSBTM" },
        ],

        // Certificate slides: { driveId, link, labelClass, labelIcon, labelText, caption, dotLabel, targetFileId }
        slides: [
            {
                driveId:      "1BISeaAhiouegwPqUx4nR8Ni4rgR5PA_H",
                link:         "https://drive.google.com/file/d/1BISeaAhiouegwPqUx4nR8Ni4rgR5PA_H/view?usp=sharing",
                labelClass:   "individual",
                labelIcon:    "fas fa-user-shield",
                labelText:    "Individual Accreditation \u00b7 Shlok Shah",
                caption:      "<strong>Certificate of Round 2 Qualification</strong> \u2014 Shlok Shah selected as a Finalist to compete in the Grand Finale, evaluated on innovation, technical depth, and solution communication.",
                dotLabel:     "Shlok Shah",
                targetFileId: "award-biothon-shlok"
            },
            {
                driveId:      "1Rp7Q6cG-puZmGQcoqhAs0-QuBP3klwRy",
                link:         "https://drive.google.com/file/d/1Rp7Q6cG-puZmGQcoqhAs0-QuBP3klwRy/view?usp=sharing",
                labelClass:   "team",
                labelIcon:    "fas fa-users",
                labelText:    "Team Accreditation \u00b7 Team Meridian",
                caption:      "<strong>Certificate of Appreciation</strong> \u2014 Team Meridian awarded for qualifying as Grand Finale Finalists and presenting their solution with dedication, innovation, and enthusiastic participation.",
                dotLabel:     "Team Meridian",
                targetFileId: "award-biothon-team"
            },
        ],
    },

    "award-biothon-shlok": {
        name: "Biothon2026_Finalist_Shlok.jpg",
        type: "JPEG Image (image/jpeg)",
        size: "1.42 MB",
        date: "Jul 2026",
        issuer: "Marwadi University · DST Govt of Gujarat · IEEE EMBS",
        title: "National Finalist — BIOTHON 2026 (Shlok Shah)",
        description: "Qualified <strong>Round 2 & Selected as a National Finalist</strong> at <strong>BIOTHON 2026</strong>, a prestigious National Level Bio-Hackathon organized by the Department of Bioinformatics, Faculty of Engineering & Technology, <strong>Marwadi University</strong> (NAAC A+), Rajkot. Supported & sponsored by the <strong>Department of Science & Technology (DST), Govt. of Gujarat</strong>, <strong>GSBTM</strong>, <strong>IEEE EMBS</strong>, and the <strong>Royal Society of Biology</strong>. Evaluated on technical innovation and solution execution at the Grand Finale on July 22, 2026.",
        link: "https://drive.google.com/file/d/1BISeaAhiouegwPqUx4nR8Ni4rgR5PA_H/view?usp=sharing",
        previewLink: "https://drive.google.com/file/d/1BISeaAhiouegwPqUx4nR8Ni4rgR5PA_H/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs",
        parentDossierId: "award-biothon",
        credibilityBadges: ["INDIVIDUAL FINALIST", "DST GOVT OF GUJARAT", "IEEE EMBS", "ROYAL SOC BIOLOGY"]
    },

    "award-biothon-team": {
        name: "Biothon2026_Finalist_Team_Meridian.jpg",
        type: "JPEG Image (image/jpeg)",
        size: "1.38 MB",
        date: "Jul 2026",
        issuer: "Marwadi University · DST Govt of Gujarat · IEEE EMBS",
        title: "Grand Finale Team Finalist — BIOTHON 2026 (Team Meridian)",
        description: "Certificate of Appreciation presented to <strong>Team Meridian</strong> for qualifying as a <strong>Grand Finale Finalist</strong> and presenting their solution at <strong>BIOTHON 2026</strong>, a National Level Bio-Hackathon hosted by <strong>Marwadi University</strong> (NAAC A+), Rajkot. Sponsored and endorsed by <strong>DST Govt of Gujarat</strong>, <strong>GSBTM</strong>, <strong>IEEE EMBS</strong>, and <strong>Royal Society of Biology</strong>.",
        link: "https://drive.google.com/file/d/1Rp7Q6cG-puZmGQcoqhAs0-QuBP3klwRy/view?usp=sharing",
        previewLink: "https://drive.google.com/file/d/1Rp7Q6cG-puZmGQcoqhAs0-QuBP3klwRy/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs",
        parentDossierId: "award-biothon",
        credibilityBadges: ["TEAM MERIDIAN", "NATIONAL FINALIST", "DST GOVT OF GUJARAT", "IEEE EMBS"]
    },

    "award-cyberthon": {
        name: "Cyberthon_First_Prize.jpg",
        type: "JPEG Image (image/jpeg)",
        size: "1.24 MB",
        date: "Feb 2026",
        issuer: "MSU Baroda",
        title: "First Prize — Cyberthon 2026",
        description: "Awarded First Prize at Cyberthon 2026, a timed cybersecurity hackathon hosted by <a href=\"https://www.msubaroda.ac.in/\" target=\"_blank\" rel=\"noopener\" style=\"color:#FFD700; text-decoration:underline; font-weight:700;\">MSU Baroda</a>, for developing ZeroRisk Sentinel — evaluated on architecture, accuracy, innovation, and real-world security relevance.",
        link: "https://drive.google.com/file/d/190yb8qAw68UhKCgwUrOyhkWLQRnMNdMr/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs"
    },
    "award-offsec": {
        name: "OffSec_Build_With_AI.pdf",
        type: "PDF Document (application/pdf)",
        size: "450 KB",
        date: "Apr 2026",
        issuer: "OffSec",
        title: "Winner — OffSec BUILD WITH AI Challenge",
        description: "Secured a winning spot in the <strong>\"BUILD WITH AI: MCPs FOR THE COMMUNITY\"</strong> challenge by OffSec. Recognized for contributing innovative AI-driven tools to the offensive security community. Awarded 3 months of Proving Grounds Practice.",
        link: "", // No link
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Awards_and_CTFs"
    },
    "award-nextgen": {
        name: "NextGenHacks_Finalist.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.12 MB",
        date: "Jun 2026",
        issuer: "Devpost",
        title: "Top 9 Finalists — NextGenHacks",
        description: "Honored as one of the <strong>Top 9 Finalists</strong> out of 1,345 global participants in the NextGenHacks Hackathon. Recognized by an expert industry panel of judges (representing Microsoft, T-Mobile, and others) for outstanding engineering quality, innovation, robust technical execution, and intuitive user experience.",
        link: "https://drive.google.com/file/d/1PscMp-yzslYdtipVVZ_7v6vHmvb5tDFp/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Awards_and_CTFs"
    },
    "award-elevate": {
        name: "Elevate_Participant.jpg",
        type: "JPEG Image (image/jpeg)",
        size: "956 KB",
        date: "Jun 2026",
        issuer: "Ideakode",
        title: "Participant — ELEVATE 2026 Hackathon",
        description: "Participated in <strong>ELEVATE 2026</strong>, an online hackathon organized by Ideakode. Represented Maharaja Sayajirao University of Baroda (MSU), Vadodara, as part of <strong>Team Meridian</strong>, collaborating to conceptualize, design, and prototype a software solution.",
        link: "https://drive.google.com/file/d/1ghsj7Os-o2CZ03AgcESeBtYg8Ve0FVVh/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs"
    },
    "award-cyberchallenge": {
        name: "Cybersecurity_Winner.jpg",
        type: "JPEG Image (image/jpeg)",
        size: "1.05 MB",
        date: "2026",
        issuer: "SS Hacker Team",
        title: "1st Place Winner — Cybersecurity Challenge 2026",
        description: "Crowned Champion (1st Place Winner) in the Cybersecurity Challenge 2026. Evaluated on offensive security exercises, system exploitation, and penetration testing methodologies.<br><strong style=\"color: #ff6600; display: inline-block; margin-top: 5px;\"><i class=\"fas fa-gift\"></i> Prize: 1-Year Burp Suite Professional License</strong>",
        link: "https://drive.google.com/file/d/10TEIFVVk_gCfe8T1L3jc-fXulQvqqjRS/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs"
    },
    "award-webgathon": {
        name: "Webgathon_Runner_Up.pdf",
        type: "PDF Document (application/pdf)",
        size: "820 KB",
        date: "Dec 2025",
        issuer: "KISMATI",
        title: "Second Runner-Up — Webgathon 2025",
        description: "Secured Second Runner-Up at Webgathon 2025, an international online hackathon by KISMATI. Built and deployed <strong>CyberGuard</strong> — evaluated on innovation, technical implementation, UX, real-world impact, and presentation quality.",
        link: "https://drive.google.com/file/d/1jmFwJlLT7r44AXrU3GGIhk__sSBG5cTb/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Awards_and_CTFs"
    },
    "award-quackathon": {
        name: "HackWithIndia_Quackathon_Certificate_Shlok.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.05 MB",
        date: "Jun 2026",
        issuer: "Devnovate · HackWithIndia",
        title: "Certificate of Participation — The Quackathon",
        description: "Participated in <strong>The Quackathon</strong>, a virtual hackathon hosted on the Devnovate platform and organized by HackWithIndia. Placed in the <strong>top 1,000 teams out of 3,000 participating teams</strong> globally, demonstrating skills in software development, collaborative engineering, and rapid prototyping.",
        link: "https://drive.google.com/file/d/19NtwiPLuM8dR33DqDqPb0QmpEMbtT3xC/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Awards_and_CTFs"
    },
    "award-webnova": {
        name: "Webnova_2026.png",
        type: "PNG Image (image/png)",
        size: "228 KB",
        date: "May 2026",
        issuer: "IMS Engineering College",
        title: "WEBNOVA 2026 — Round I Selection",
        description: "Successfully selected for Round I (PPT & Idea Submission) of <strong>WEBNOVA 2026</strong>, a National Level Web Development Hackathon organized by IMS Engineering College, Ghaziabad in collaboration with the HackerRank Campus Crew.",
        link: "https://drive.google.com/file/d/12AJ0BX-DfYLYcjLIm7GbRpYjyyq6xvKn/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs"
    },
    "cert-udemy-airedteam": {
        name: "Udemy_AI_RAG_Jailbreak_RedTeaming.png",
        type: "PNG Image (image/png)",
        size: "1.18 MB",
        date: "Jul 2026",
        issuer: "Udemy · Armaan Sidana",
        title: "Full MasterClass AI, RAG, Jailbreak Red Teaming 2026",
        description: "Advanced offensive AI security masterclass by Armaan Sidana (OSCP, Founder of Nexus Security). Completed 11 intensive modules and 28 practical labs executing full-spectrum AI red team operations: <strong>Prompt Injections &amp; Persona Jailbreaks</strong> (Many-Shot, token smuggling, vision injections), <strong>RAG Pipeline Exploitation</strong> (zero-click document poisoning, embedding corruption, Agentic SSRF Confused Deputy exfiltration), <strong>Adversarial ML Evasion</strong> (FGSM, PGD, Carlini &amp; Wagner attacks via IBM ART), <strong>Sleeper Agent Data Poisoning</strong>, and <strong>Model Theft &amp; Supply Chain Exploitation</strong> (Pickle RCE, membership inference). Applied the <strong>C2C (Concept &rarr; Chain &rarr; Compromise) Framework</strong> using NVIDIA Garak, Microsoft PyRIT, Promptfoo, Ollama, and TruffleHog, and engineered <strong>4-Gate Defense Architectures</strong> aligned with MITRE ATLAS &amp; NIST AI RMF.",
        link: "https://ude.my/UC-44ce5321-76b5-44e7-92be-267c2084faf3",
        previewLink: "https://drive.google.com/file/d/1dh7scOBra1Px_MEBpcoIQ3t1m5Fc3qvg/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Professional_Certs"
    },
    "cert-cllmse": {
        name: "RedTeam_CLLMSE.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.25 MB",
        date: "Jul 2026",
        issuer: "Red Team Leaders",
        title: "Certified LLM Security Expert (CLLMSE)",
        description: "Passed the rigorous, hands-on <strong>Certified LLM Security Expert (CLLMSE)</strong> certification. Validated practical expertise in attacking and securing AI applications by exploiting and securing vulnerabilities in live labs (including <strong>indirect prompt injection</strong>, <strong>RAG poisoning</strong>, <strong>SSRF</strong> via LLM URLs, <strong>excessive agency</strong>, and <strong>MCP supply-chain attacks</strong>). Covered <strong>OWASP LLM Top 10</strong>, <strong>MITRE ATLAS</strong>, and <strong>NIST AI RMF</strong> frameworks.",
        link: "https://courses.redteamleaders.com/exam-completion/a88dd8cd3c2d98f4",
        previewLink: "https://drive.google.com/file/d/1nAefqAogOMTqD1r6vLOuxj7XfNisyK9t/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-cba": {
        name: "CBA_Cybersecurity.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.48 MB",
        date: "May 2026",
        issuer: "Commonwealth Bank · Forage",
        title: "Introduction to Cybersecurity",
        description: "Completed an industry job simulation as a cybersecurity generalist on Commonwealth Bank's Cybersecurity team, specialising in fraud detection and prevention. Built data visualisation dashboards in <strong>Splunk</strong>, responded to live incident scenarios, designed security-awareness infographics aligned with ACSC guidelines, and conducted web application pentesting.",
        link: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/x52Jy9s26xNbZkTQ7_2sNmYuurxgpFYawco_6a05810953d773130e6a0c37_1779630194457_completion_certificate.pdf",
        previewLink: "https://drive.google.com/file/d/1EKILN87ppnR6cVVtnUkHyIgzcUhOjbew/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-genai": {
        name: "Microsoft_Generative_AI.pdf",
        type: "PDF Document (application/pdf)",
        size: "720 KB",
        date: "Jun 2026",
        issuer: "LinkedIn Learning · Microsoft",
        title: "What Is Generative AI?",
        description: "Completed the course by Pinar Seyhan Demirdag (AI Director at Cuebric). Covered AI taxonomy (differentiating subcategories), prompt-based content generation, and natural language model mechanics. Explored advanced concepts including <strong>VAEs</strong> for anomaly detection and strategic AI implementation. Part of Microsoft's professional path, earning 2.00 CPE credits.",
        link: "https://www.linkedin.com/learning/certificates/098319810ab84feb95f68475c3b771df7f39c66ffe5c2218845f902deb1be609?trk=share_certificate",
        previewLink: "https://drive.google.com/file/d/1HGiR5ePTF_8GuVsyVLvaka3HMrhVS_JH/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-csharp": {
        name: "Educative_CSharp_Guide.pdf",
        type: "PDF Document (application/pdf)",
        size: "680 KB",
        date: "Jun 2026",
        issuer: "Educative",
        title: "C# for Programmers: A Practical Guide",
        description: "Mastered core C# architecture and Object-Oriented Programming (OOP) paradigms. Built deep competencies in data structures, recursion, robust exception handling, custom methods, classes, and delegates to engineer highly structured and type-safe applications.",
        link: "https://www.educative.io/verify-certificate/ERJYPH08PU",
        previewLink: "https://drive.google.com/file/d/1OP1NNTbsZwIlbNB2SJ0SPE6AmUMWqJyB/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-react": {
        name: "Educative_React19_Guide.pdf",
        type: "PDF Document (application/pdf)",
        size: "910 KB",
        date: "Jun 2026",
        issuer: "Educative",
        title: "Learn React 19: The Complete Guide",
        description: "Mastered React 19 <strong>concurrency</strong> (transitions), <strong>rendering internals</strong>, and <strong>feature-based architecture</strong>. Built production-ready UIs with <strong>TanStack Query</strong>, <strong>Suspense streaming</strong>, <strong>optimistic updates</strong>, and <strong>offline-first workflows</strong> across two major projects.",
        link: "https://www.educative.io/verify-certificate/BJYPEN3ME2",
        previewLink: "https://drive.google.com/file/d/1tZ-5nQpjdmIpye5Z8vPbVBViyx-XnEUq/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-android": {
        name: "Educative_Android_Java.pdf",
        type: "PDF Document (application/pdf)",
        size: "810 KB",
        date: "May 2026",
        issuer: "Educative",
        title: "Modern Android Development with Java",
        description: "Mastered building robust Android applications using Java. Covered Activity lifecycles, UI design with XML, Fragments, Intents, and data persistence, focusing on modern development patterns and performance optimization.",
        link: "https://www.educative.io/verify-certificate/EHAQB5FME8",
        previewLink: "https://drive.google.com/file/d/1PH3OK9_z_DJu09sRwOo-fS0dDsN2AXq7/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-crtom": {
        name: "RedTeam_CRTOM.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.15 MB",
        date: "Dec 2025",
        issuer: "Red Team Leaders",
        title: "Certified Red Team Operations Management",
        description: "Completed the CRTOM program — planning, coordinating, and managing red team engagements. Gained insight into workflows, operational reporting, assessment management, and aligning offensive security with organizational objectives.",
        link: "https://drive.google.com/file/d/1KDL_D8uvrSsttFiuppq59Lplf9xV2Qke/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-capie": {
        name: "CAPIE_API_Hacking.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.34 MB",
        date: "Dec 2025",
        issuer: "CAPIE Program",
        title: "CAPIE – Certified API Hacking Expert",
        description: "Advanced, hands-on API security training covering reconnaissance, endpoint discovery, BOLA/IDOR exploitation, auth bypasses, mass assignment, business logic flaws, rate-limit evasion using Burp Suite, Postman, and Python.",
        link: "https://drive.google.com/file/d/1S9xb7dus2DJpb1BcrBmv4B9OHnAYEBkL/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-advent": {
        name: "Advent_Of_Cyber_2025.pdf",
        type: "PDF Document (application/pdf)",
        size: "2.10 MB",
        date: "Dec 2025",
        issuer: "TryHackMe",
        title: "Advent of Cyber 2025",
        description: "Completed 24 hands-on cybersecurity challenges centered around realistic attack and defense scenarios. Gained practical exposure to malware behaviour, system monitoring, and core attack technique identification in a structured daily lab format.",
        link: "https://drive.google.com/file/d/1nFtzPBjKRxcB6wfyO261wCU2z5DxfA3S/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-kali": {
        name: "Kali_Linux_Masterclass.pdf",
        type: "PDF Document (application/pdf)",
        size: "790 KB",
        date: "Oct 2025",
        issuer: "CMS",
        title: "Kali Linux Masterclass",
        description: "Covered practical Kali Linux operations: file system navigation, privilege escalation basics, Nmap scanning, service enumeration, and working with essential penetration testing tools and lab workflows.",
        link: "https://drive.google.com/file/d/1C9ycz6SP5F4N_j2uc811_tDORFpmy--n/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-androidhack": {
        name: "Android_Hacking.pdf",
        type: "PDF Document (application/pdf)",
        size: "860 KB",
        date: "Oct 2025",
        issuer: "CMS",
        title: "Android Hacking Masterclass",
        description: "Introduction to Android application security, APK structure, basic analysis concepts, and understanding common mobile vulnerabilities and attack surfaces in real-world Android environments.",
        link: "https://drive.google.com/file/d/1fxwD35qy7IISTyxyWPSixLws-1GXgYX2/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-cisco": {
        name: "Cisco_Ethical_Hacker.pdf",
        type: "PDF Document (application/pdf)",
        size: "0 KB", // Ongoing
        date: "Ongoing",
        issuer: "Cisco Networking Academy",
        title: "Cisco Ethical Hacker",
        description: "Training in reconnaissance, scanning, enumeration, vulnerability assessment, and simulated attack scenarios using Cisco cybersecurity labs and tools — ongoing structured certification program.",
        link: "https://www.netacad.com/courses/ethical-hacker",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-webdev": {
        name: "Web_Dev_Full.pdf",
        type: "PDF Document (application/pdf)",
        size: "1.75 MB",
        date: "2025",
        issuer: "Web X",
        title: "Full Web Development Certification",
        description: "Completed the full Web X Web Development Certification — HTML, CSS, JavaScript, responsive design, and practical project-based learning to build modern web interfaces from scratch.",
        link: "https://drive.google.com/file/d/18J5CqMBzFhzTfD0lGID3o7AFCKZxQCQS/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    },
    "cert-git": {
        name: "Git_GitHub_Essentials.pdf",
        type: "PDF Document (application/pdf)",
        size: "540 KB",
        date: "Dec 2025",
        issuer: "WsCube Tech",
        title: "Git & GitHub Essentials",
        description: "Covered the fundamentals of Git version control — creating commits, pushing changes, basic branching, and using GitHub for repository hosting and collaborative development workflows.",
        link: "https://drive.google.com/file/d/17hOZHkx_rFgBnLcH5l2o7TJ3nlCY-pNk/view?usp=sharing",
        icon: "far fa-file-pdf file-icon-pdf",
        category: "Professional_Certs"
    }
};

function toggleIdeFolder(folderId) {
    const arrow = document.getElementById(`arrow-${folderId}`);
    let target = null;
    
    if (folderId === 'all') {
        target = document.getElementById('folder-all');
    } else if (folderId === 'awards') {
        target = document.getElementById('folder-contents-awards');
    } else if (folderId === 'certs') {
        target = document.getElementById('folder-contents-certs');
    }
    
    if (target) {
        if (target.style.display === 'none') {
            target.style.display = 'block';
            if (arrow) arrow.classList.remove('collapsed');
        } else {
            target.style.display = 'none';
            if (arrow) arrow.classList.add('collapsed');
        }
    }
}

function generateCertMockup(fileId, fileData) {
    const isAward = fileData.category === 'Awards_and_CTFs';

    // ══════════════════════════════════════════════════════════════════════════
    // GENERIC CINEMATIC DOSSIER VIEWER
    // Renders automatically for any entry with isDossier: true.
    // All content is read from the data object — nothing is hardcoded here.
    // ══════════════════════════════════════════════════════════════════════════
    if (fileData.isDossier && fileData.slides && fileData.slides.length > 0) {
        const slides      = fileData.slides;
        const endorses    = fileData.endorsements || [];
        const tag         = fileData.dossierTag      || fileData.title.toUpperCase();
        const icon        = fileData.dossierIcon     || '🏆';
        const headline    = fileData.dossierHeadline || fileData.title;
        const year        = fileData.dossierYear     || fileData.date;
        const subtitle    = fileData.dossierSubtitle || fileData.issuer;

        // Build endorsement strip HTML
        const endorseHTML = endorses.map(e => `
            <span class="dossier-endorse-badge${e.highlight ? ' highlight' : ''}">
                <i class="${e.icon}"></i> ${e.label}
            </span>`).join('');

        // Build slides HTML
        const slidesHTML = slides.map((s, i) => `
            <div class="dossier-slide" id="dossierSlide${i}"${i > 0 ? ' style="display:none;"' : ''}>
                <div class="dossier-cert-frame" onclick="${s.targetFileId ? `switchIdeTab('${s.targetFileId}')` : `window.open('${s.link}','_blank')`}" title="Click to view tab detail">
                    <div class="dossier-cert-label ${s.labelClass || ''}">
                        <i class="${s.labelIcon || 'fas fa-certificate'}"></i> ${s.labelText}
                    </div>
                    <img
                        src="https://lh3.googleusercontent.com/d/${s.driveId}=w1200"
                        referrerpolicy="no-referrer"
                        class="dossier-cert-img"
                        alt="${s.labelText}"
                        onerror="this.style.opacity='0.15'"
                    />
                    <div class="dossier-cert-overlay">
                        <i class="fas ${s.targetFileId ? 'fa-folder-open' : 'fa-external-link-alt'}"></i>
                        <span>${s.targetFileId ? 'Open Tab View' : 'Open Certificate'}</span>
                    </div>
                </div>
                <div class="dossier-cert-caption">${s.caption || ''}</div>
            </div>`).join('');

        // Build nav dots HTML
        const dotsHTML = slides.map((s, i) => `
            <button class="dossier-dot${i === 0 ? ' active' : ''}" id="dossierDot${i}"
                onclick="dossierGoTo(${i})" aria-label="${s.dotLabel || s.labelText}">
                <span class="dot-label">${s.dotLabel || `Slide ${i + 1}`}</span>
            </button>`).join('');

        // Update the live slide count so the carousel wraps correctly
        _dossierTotal = slides.length;

        return `
            <div class="biothon-dossier" id="certDossier">
                <div class="dossier-scanlines" aria-hidden="true"></div>

                <div class="dossier-header">
                    <div class="dossier-tag">
                        <span class="dossier-pulse"></span>
                        ${tag}
                    </div>
                    <div class="dossier-title-row">
                        <span class="dossier-icon-trophy">${icon}</span>
                        <h2 class="dossier-headline">${headline} <span class="dossier-year">${year}</span></h2>
                    </div>
                    <p class="dossier-sub">${subtitle}</p>
                </div>

                ${endorseHTML ? `<div class="dossier-endorsement-strip">${endorseHTML}</div>` : ''}

                <div class="dossier-carousel" id="dossierCarousel">
                    ${slidesHTML}
                </div>

                <div class="dossier-nav">
                    <button class="dossier-nav-btn prev" id="dossierPrev" onclick="dossierNavigate(-1)" aria-label="Previous certificate">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="dossier-nav-dots">
                        ${dotsHTML}
                    </div>
                    <button class="dossier-nav-btn next" id="dossierNext" onclick="dossierNavigate(1)" aria-label="Next certificate">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div class="dossier-footer-seal">
                    <i class="fas fa-shield-alt"></i>
                    <span>INTEGRITY VERIFIED · SHA256 SIGNED · NATIONAL LEVEL ACCREDITATION</span>
                </div>
            </div>
        `;
    }

    // ── Standard single certificate viewer ──
    const driveUrl = fileData.previewLink || fileData.link;
    const driveId = getDriveId(driveUrl);

    if (driveId) {
        const redirectUrl = fileData.link || driveUrl;
        const isOfficialRedirect = !!fileData.previewLink;
        const overlayText = isOfficialRedirect ? 'Verify Credential Official Link' : 'Open Original in Google Drive';
        return `
            <div class="viewer-img-container" onclick="window.open('${redirectUrl}', '_blank')" title="Click to verify credential">
                <img src="https://lh3.googleusercontent.com/d/${driveId}=w1000" referrerpolicy="no-referrer" class="cert-real-img" alt="${fileData.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="cert-fallback-card" style="display:none;">
                    ${generateCSSMockupHTML(isAward, fileData)}
                </div>
                <div class="viewer-hover-overlay">
                    <i class="fas fa-external-link-alt"></i>
                    <span>${overlayText}</span>
                </div>
            </div>
        `;
    }
    return generateCSSMockupHTML(isAward, fileData);
}

// Dossier carousel state — _dossierTotal is updated dynamically from slides.length
let _dossierIndex = 0;
let _dossierTotal = 2;


function dossierGoTo(index) {
    const prev = document.getElementById(`dossierSlide${_dossierIndex}`);
    const prevDot = document.getElementById(`dossierDot${_dossierIndex}`);
    if (prev) { prev.classList.add('slide-exit'); setTimeout(() => { prev.style.display = 'none'; prev.classList.remove('slide-exit'); }, 280); }
    if (prevDot) prevDot.classList.remove('active');

    _dossierIndex = ((index % _dossierTotal) + _dossierTotal) % _dossierTotal;

    const next = document.getElementById(`dossierSlide${_dossierIndex}`);
    const nextDot = document.getElementById(`dossierDot${_dossierIndex}`);
    if (next) { next.style.display = 'flex'; next.classList.add('slide-enter'); setTimeout(() => next.classList.remove('slide-enter'), 320); }
    if (nextDot) nextDot.classList.add('active');
}

function dossierNavigate(dir) {
    dossierGoTo(_dossierIndex + dir);
}

function getDriveId(url) {
    if (!url) return null;
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}


function generateCSSMockupHTML(isAward, fileData) {
    const awardClass = isAward ? 'award-variant' : '';
    const crestIcon = isAward ? '🏆' : '📜';
    
    // Custom branding based on issuer
    let brandHeader = isAward ? 'OFFICIAL COMPETITION AWARD' : 'CREDENTIAL CERTIFICATE OF COMPLETION';
    let brandClass = '';
    
    if (fileData.issuer.includes('Microsoft') || fileData.issuer.includes('LinkedIn')) {
        brandClass = 'brand-microsoft';
        brandHeader = 'MICROSOFT PROFESSIONAL CREDENTIAL';
    } else if (fileData.issuer.includes('Educative')) {
        brandClass = 'brand-educative';
        brandHeader = 'EDUCATIVE COURSE ACCOMPLISHMENT';
    } else if (fileData.issuer.includes('Cisco')) {
        brandClass = 'brand-cisco';
        brandHeader = 'CISCO NETWORKING ACADEMY ATTESTATION';
    } else if (fileData.issuer.includes('Commonwealth')) {
        brandClass = 'brand-cba';
        brandHeader = 'COMMONWEALTH BANK JOB SIMULATION RECORD';
    } else if (fileData.issuer.includes('Udemy')) {
        brandClass = 'brand-udemy';
        brandHeader = 'UDEMY MASTERCLASS ACCOMPLISHMENT';
    }
    
    return `
        <div class="cert-mockup-card ${awardClass} ${brandClass}">
            <div class="mock-hdr">
                <span class="mock-crest">${crestIcon}</span>
                <span class="mock-badge">${fileData.issuer.toUpperCase()}</span>
            </div>
            <div class="mock-body">
                <div class="mock-body-label">${brandHeader}</div>
                <div class="mock-body-title">${fileData.title}</div>
                <div class="mock-body-subtitle">// ACQUIRED ON ${fileData.date.toUpperCase()}</div>
                <div class="mock-body-recipient">THIS ATTESTS THAT SHLOK SHAH IS ACCREDITED</div>
            </div>
            <div class="mock-ftr">
                <div class="mock-date-box">
                    DATE ACQUIRED
                    <span>${fileData.date}</span>
                </div>
                <div class="mock-validation-seal">
                    <i class="fas fa-circle-notch seal-icon"></i>
                    <div class="seal-hash">SECURE<br>VALID</div>
                </div>
            </div>
        </div>
    `;
}

// ══════════════════════════════════════════════════════════════════════════
// DYNAMIC MULTI-TAB & FILE VIEWER ENGINE
// ══════════════════════════════════════════════════════════════════════════
let openTabs = [];
let currentActiveFileId = 'award-biothon';

let ctxTargetFileId = null;

function renderIdeTabs() {
    const tabRow = document.getElementById('ideTabRow');
    if (!tabRow) return;

    if (openTabs.length === 0) {
        tabRow.innerHTML = '';
        return;
    }

    const tabsHtml = openTabs.map(id => {
        const file = CREDENTIAL_DB[id];
        if (!file) return '';
        const isActive = id === currentActiveFileId;
        
        let iconHtml = '';
        if (file.isDossier) {
            iconHtml = '<i class="fas fa-folder-open" style="color:#a78bfa;"></i>';
        } else if (file.name.endsWith('.jpg') || file.name.endsWith('.png')) {
            iconHtml = '<i class="far fa-image file-icon-jpg"></i>';
        } else {
            iconHtml = '<i class="far fa-file-pdf file-icon-pdf"></i>';
        }

        const activeClass = isActive ? ' active' : '';
        return `
            <div class="editor-tab${activeClass}" id="tab-${id}" onclick="switchIdeTab('${id}')" oncontextmenu="openTabContextMenu(event, '${id}')" title="${file.title}">
                ${iconHtml}
                <span>${file.name}</span>
                <span class="tab-close-btn" onclick="closeIdeTab(event, '${id}')">&times;</span>
            </div>
        `;
    }).join('');

    const clearAllBtn = openTabs.length > 1 ? `
        <div class="editor-tab-actions" onclick="closeAllTabs()" title="Close All Open Tabs">
            <i class="fas fa-times-circle"></i>
            <span>Clear All</span>
        </div>
    ` : '';

    tabRow.innerHTML = tabsHtml + clearAllBtn;

    setTimeout(() => {
        const activeTabEl = document.getElementById(`tab-${currentActiveFileId}`);
        if (activeTabEl && tabRow) {
            const targetLeft = activeTabEl.offsetLeft - tabRow.offsetLeft - 24;
            if (window.gsap) {
                gsap.to(tabRow, {
                    scrollLeft: Math.max(0, targetLeft),
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            } else {
                activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        }
    }, 40);
}

function openTabContextMenu(event, fileId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    ctxTargetFileId = fileId;
    
    let ctxMenu = document.getElementById('tabContextMenu');
    if (!ctxMenu) {
        ctxMenu = document.createElement('div');
        ctxMenu.id = 'tabContextMenu';
        ctxMenu.className = 'tab-context-menu';
        document.body.appendChild(ctxMenu);
    }
    
    const file = CREDENTIAL_DB[fileId];
    const fileLabel = file ? file.name : 'Tab';

    ctxMenu.innerHTML = `
        <div class="ctx-item" data-action="close">
            <i class="fas fa-times"></i> Close Tab
        </div>
        <div class="ctx-item" data-action="closeOthers">
            <i class="fas fa-minus-circle"></i> Close Others
        </div>
        <div class="ctx-divider"></div>
        <div class="ctx-item" data-action="closeAll">
            <i class="fas fa-trash-alt"></i> Close All Tabs
        </div>
    `;

    const menuWidth = 180;
    const menuHeight = 120;
    const posX = Math.min(event.clientX, window.innerWidth - menuWidth - 10);
    const posY = Math.min(event.clientY, window.innerHeight - menuHeight - 10);

    ctxMenu.style.left = `${posX}px`;
    ctxMenu.style.top = `${posY}px`;
    ctxMenu.style.display = 'block';

    ctxMenu.onclick = (e) => {
        e.stopPropagation();
        const item = e.target.closest('.ctx-item');
        if (!item) return;
        const action = item.getAttribute('data-action');
        executeCtxAction(action, ctxTargetFileId);
    };
}

function executeCtxAction(action, targetId) {
    hideTabContextMenu();
    if (action === 'close') {
        if (targetId) closeIdeTab(null, targetId);
    } else if (action === 'closeOthers') {
        if (targetId) closeOtherTabs(targetId);
    } else if (action === 'closeAll') {
        closeAllTabs();
    }
}

function hideTabContextMenu() {
    const ctxMenu = document.getElementById('tabContextMenu');
    if (ctxMenu) ctxMenu.style.display = 'none';
}

document.addEventListener('click', (e) => {
    const ctxMenu = document.getElementById('tabContextMenu');
    if (ctxMenu && ctxMenu.style.display === 'block') {
        if (!ctxMenu.contains(e.target)) {
            hideTabContextMenu();
        }
    }
});

document.addEventListener('scroll', hideTabContextMenu, true);

function closeOtherTabs(fileId) {
    if (!fileId) return;
    openTabs = [fileId];
    openFileInIde(fileId);
}

function closeAllTabs() {
    resetIdeEmptyState();
}

function resetIdeEmptyState() {
    openTabs = [];
    currentActiveFileId = null;
    renderIdeTabs();

    document.querySelectorAll('.tree-file').forEach(el => el.classList.remove('active'));

    const viewport = document.getElementById('renderViewport');
    const renderPane = document.querySelector('.editor-render-pane');
    if (viewport) viewport.classList.remove('dossier-mode');
    if (renderPane) renderPane.classList.remove('dossier-mode');
    if (viewport) {
        viewport.innerHTML = `
            <div class="empty-viewport-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 1.5rem; box-sizing: border-box;">
                <i class="far fa-folder-open empty-icon" style="font-size: 2.5rem; color: #858585; margin-bottom: 0.75rem;"></i>
                <h3 style="color: #ffffff; font-family: 'Chakra Petch', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.35rem;">No File Open</h3>
                <p style="color: #858585; font-size: 0.8rem; line-height: 1.5; text-align: center; max-width: 280px; margin: 0 auto;">Select a certificate or award file from the explorer sidebar to view its contents.</p>
            </div>
        `;
    }

    const propName = document.getElementById('propFileName');
    const propType = document.getElementById('propFileType');
    const propSize = document.getElementById('propFileSize');
    const metaDate = document.getElementById('metaDateBadge');
    const metaIssuer = document.getElementById('metaCertIssuer');
    const metaTitle = document.getElementById('metaCertTitle');
    const metaDesc = document.getElementById('metaCertDesc');
    const verifyBtn = document.getElementById('verifyBtn');

    if (propName) propName.textContent = '--';
    if (propType) propType.textContent = '--';
    if (propSize) propSize.textContent = '--';
    if (metaDate) metaDate.textContent = 'NONE';
    if (metaIssuer) metaIssuer.textContent = 'No active document';
    if (metaTitle) metaTitle.textContent = 'No Active File';
    if (metaDesc) metaDesc.textContent = 'Select a certificate or award file from the explorer tree in the sidebar to inspect its file integrity, metadata details, and accreditation information.';

    if (verifyBtn) {
        verifyBtn.removeAttribute('href');
        verifyBtn.classList.add('disabled');
        verifyBtn.innerHTML = '<i class="fas fa-lock"></i> SELECT FILE';
    }

    const credBadgesContainer = document.getElementById('metaCredBadges');
    if (credBadgesContainer) credBadgesContainer.style.display = 'none';

    const terminal = document.getElementById('ideTerminalConsole');
    if (terminal) {
        terminal.innerHTML = `
            <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ close_session</p>
            <p class="term-log term-log-cyan">[~] Unmounting session volume. Connection closed.</p>
            <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ <span class="term-cursor-blink"></span></p>
        `;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

function openFileInIde(fileId) {
    const fileData = CREDENTIAL_DB[fileId];
    if (!fileData) return;

    _dossierIndex = 0;
    currentActiveFileId = fileId;

    // 1. Ensure fileId is present in openTabs
    if (!openTabs.includes(fileId)) {
        if (fileData.parentDossierId && openTabs.includes(fileData.parentDossierId)) {
            const pIdx = openTabs.indexOf(fileData.parentDossierId);
            openTabs.splice(pIdx + 1, 0, fileId);
        } else {
            openTabs.push(fileId);
        }
    }

    // 2. If opening a dossier, automatically open its child files as sibling tabs right next to it!
    if (fileData.isDossier && fileData.childFileIds) {
        const dossierIdx = openTabs.indexOf(fileId);
        fileData.childFileIds.forEach((childId, idx) => {
            if (!openTabs.includes(childId)) {
                openTabs.splice(dossierIdx + 1 + idx, 0, childId);
            }
        });
    }

    // 3. Highlight sidebar file item
    document.querySelectorAll('.tree-file').forEach(el => {
        const id = el.getAttribute('data-id');
        if (id === fileId || (fileData.parentDossierId && id === fileData.parentDossierId)) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // 4. Re-render top tabs bar
    renderIdeTabs();

    // 5. Render graphical mockup inside viewport
    const viewport = document.getElementById('renderViewport');
    const renderPane = document.querySelector('.editor-render-pane');
    if (fileData.isDossier) {
        if (viewport) viewport.classList.add('dossier-mode');
        if (renderPane) renderPane.classList.add('dossier-mode');
    } else {
        if (viewport) viewport.classList.remove('dossier-mode');
        if (renderPane) renderPane.classList.remove('dossier-mode');
    }
    if (viewport) {
        viewport.innerHTML = generateCertMockup(fileId, fileData);
    }

    // 6. Update file metadata panel properties
    const propName = document.getElementById('propFileName');
    const propType = document.getElementById('propFileType');
    const propSize = document.getElementById('propFileSize');
    const metaDate = document.getElementById('metaDateBadge');
    const metaIssuer = document.getElementById('metaCertIssuer');
    const metaTitle = document.getElementById('metaCertTitle');
    const metaDesc = document.getElementById('metaCertDesc');
    const verifyBtn = document.getElementById('verifyBtn');

    if (propName) propName.textContent = fileData.name;
    if (propType) propType.textContent = fileData.type;
    if (propSize) propSize.textContent = fileData.size;
    if (metaDate) metaDate.textContent = fileData.date;
    if (metaIssuer) metaIssuer.textContent = fileData.issuer;
    if (metaTitle) metaTitle.textContent = fileData.title;
    if (metaDesc) metaDesc.innerHTML = fileData.description;

    if (verifyBtn) {
        if (fileData.link) {
            verifyBtn.href = fileData.link;
            verifyBtn.classList.remove('disabled');
            verifyBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> VERIFY CREDENTIAL';
        } else {
            verifyBtn.removeAttribute('href');
            verifyBtn.classList.add('disabled');
            verifyBtn.innerHTML = '<i class="fas fa-lock"></i> VERIFICATION SECURE';
        }
    }

    // 7. Render credibility badges if available
    let credBadgesContainer = document.getElementById('metaCredBadges');
    if (!credBadgesContainer) {
        const badgeRow = document.getElementById('metaBadgeRow');
        if (badgeRow) {
            credBadgesContainer = document.createElement('div');
            credBadgesContainer.id = 'metaCredBadges';
            credBadgesContainer.className = 'meta-credibility-strip';
            badgeRow.parentNode.insertBefore(credBadgesContainer, badgeRow.nextSibling);
        }
    }
    if (credBadgesContainer) {
        if (fileData.credibilityBadges && fileData.credibilityBadges.length > 0) {
            credBadgesContainer.style.display = 'flex';
            credBadgesContainer.innerHTML = fileData.credibilityBadges.map(b => `<span class="cred-badge"><i class="fas fa-shield-alt"></i> ${b}</span>`).join('');
        } else {
            credBadgesContainer.style.display = 'none';
        }
    }

    // 8. Reset panel scroll positions back to top
    if (renderPane) renderPane.scrollTop = 0;
    const metaPane = document.querySelector('.editor-meta-pane');
    if (metaPane) metaPane.scrollTop = 0;

    // 9. Update terminal console command output
    const terminal = document.getElementById('ideTerminalConsole');
    if (terminal) {
        if (fileData.isDossier && fileData.slides) {
            const slideLines = fileData.slides.map(s =>
                `  ${s === fileData.slides[fileData.slides.length - 1] ? '└' : '├'}── ${s.labelText.split(' · ').pop()}.jpg    [${s.labelText}]`
            ).join('\n');
            terminal.innerHTML = `
                <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/awards</span>$ ls -la ${fileData.name}/</p>
                <p class="term-log term-log-cyan">[~] Extracting classified mission dossier (${fileData.slides.length} accreditations)...</p>
                <p class="term-log">${slideLines}</p>
                <p class="term-log">Issuer: ${fileData.issuer}</p>
                <p class="term-log term-log-green">[+] Dossier integrity check: PASSED — All ${fileData.slides.length} accreditations VERIFIED.</p>
                <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/awards</span>$ <span class="term-cursor-blink"></span></p>
            `;
        } else {
            const fileTool = fileData.name.endsWith('.jpg') || fileData.name.endsWith('.png') ? 'exiftool' : 'pdfinfo';
            const filePath = fileData.category === 'Awards_and_CTFs' ? 'awards' : 'certifications';
            let hash = 0;
            for (let i = 0; i < fileData.title.length; i++) { hash = fileData.title.charCodeAt(i) + ((hash << 5) - hash); }
            const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
            let detailsLog = (fileData.name.endsWith('.jpg') || fileData.name.endsWith('.png'))
                ? `File size: ${fileData.size} | Format: High-Res Image | Quality: 98%\nEXIF Signature Hash: SHA256::${hex}2aef9\nEXIF Organization Stamp: ${fileData.issuer}`
                : `File size: ${fileData.size} | Format: PDF-1.5 | Pages: 1\nPDF Signature Hash: SHA256::${hex}7f82b\nPDF Producer: Adobe Acrobat Reader 64-bit`;
            terminal.innerHTML = `
                <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ ${fileTool} ./${filePath}/${fileData.name}</p>
                <p class="term-log term-log-cyan">[~] Inspecting header metadata...</p>
                <p class="term-log">${detailsLog}</p>
                <p class="term-log">Acquisition Date: ${fileData.date}</p>
                <p class="term-log term-log-green">[+] Validation: Security clearance status [VERIFIED].</p>
                <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ <span class="term-cursor-blink"></span></p>
            `;
        }
    }

    if (window.innerWidth < 992) {
        const editor = document.querySelector('.ide-editor');
        if (editor) {
            editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function selectIdeFile(element) {
    const fileId = element.getAttribute('data-id');
    openFileInIde(fileId);
}

function switchIdeTab(fileId) {
    openFileInIde(fileId);
}

function closeIdeTab(event, fileId) {
    if (event) event.stopPropagation();
    const idx = openTabs.indexOf(fileId);
    if (idx !== -1) {
        openTabs.splice(idx, 1);
    }
    
    if (openTabs.length === 0) {
        resetIdeEmptyState();
    } else {
        if (fileId === currentActiveFileId) {
            const nextActive = openTabs[Math.min(idx, openTabs.length - 1)];
            openFileInIde(nextActive);
        } else {
            renderIdeTabs();
        }
    }
}

function closeIdeFile(event) {
    if (event) event.stopPropagation();
    closeIdeTab(event, currentActiveFileId);
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultFile = document.querySelector('.tree-file.active') || document.querySelector('.tree-file');
    if (defaultFile) {
        selectIdeFile(defaultFile);
    }

    const tabRow = document.getElementById('ideTabRow');
    if (tabRow) {
        let tabScrollPos = tabRow.scrollLeft;

        tabRow.addEventListener('wheel', (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                tabScrollPos += evt.deltaY * 1.35;
                const maxScroll = tabRow.scrollWidth - tabRow.clientWidth;
                tabScrollPos = Math.max(0, Math.min(tabScrollPos, maxScroll));

                if (window.gsap) {
                    gsap.to(tabRow, {
                        scrollLeft: tabScrollPos,
                        duration: 0.45,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                } else {
                    tabRow.scrollBy({
                        left: evt.deltaY * 1.5,
                        behavior: 'smooth'
                    });
                }
            }
        }, { passive: false });
    }
});


