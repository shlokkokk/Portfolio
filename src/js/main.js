
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

// Auto-staggering for grids and timelines
document.addEventListener('DOMContentLoaded', () => {
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

document.addEventListener('DOMContentLoaded', () => {
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


