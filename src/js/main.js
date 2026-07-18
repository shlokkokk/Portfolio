
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


const CREDENTIAL_DB = {
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
        date: "Dec 2025",
        issuer: "IMS Engineering College",
        title: "WEBNOVA 2026 — Round I Selection",
        description: "Successfully selected for Round I (PPT & Idea Submission) of <strong>WEBNOVA 2026</strong>, a National Level Web Development Hackathon organized by IMS Engineering College, Ghaziabad in collaboration with the HackerRank Campus Crew.",
        link: "https://drive.google.com/file/d/12AJ0BX-DfYLYcjLIm7GbRpYjyyq6xvKn/view?usp=sharing",
        icon: "far fa-image file-icon-jpg",
        category: "Awards_and_CTFs"
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
    
    // Check if we have a previewLink (Drive link) or if the main link itself is a Drive link
    const driveUrl = fileData.previewLink || fileData.link;
    const driveId = getDriveId(driveUrl);
    
    if (driveId) {
        const redirectUrl = fileData.link || driveUrl;
        const isOfficialRedirect = fileData.previewLink ? true : false;
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
    
    // Fallback: Custom branded mockup UI for external/no-link platforms
    return generateCSSMockupHTML(isAward, fileData);
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

function selectIdeFile(element) {
    const fileId = element.getAttribute('data-id');
    const fileData = CREDENTIAL_DB[fileId];
    if (!fileData) return;
    
    // Ensure active tab is visible
    const activeTab = document.getElementById('ideActiveTab');
    if (activeTab) activeTab.style.display = 'inline-flex';
    
    // 1. Remove active state from other files in sidebar explorer
    document.querySelectorAll('.tree-file').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    
    // 2. Update editor tab
    const tabTitle = document.getElementById('tabTitle');
    const tabIcon = document.getElementById('tabIcon');
    if (tabTitle) tabTitle.textContent = fileData.name;
    if (tabIcon) {
        tabIcon.className = (fileData.name.endsWith('.jpg') || fileData.name.endsWith('.png')) ? 'far fa-image file-icon-jpg' : 'far fa-file-pdf file-icon-pdf';
    }
    
    // 3. Render graphical mockup inside viewport
    const viewport = document.getElementById('renderViewport');
    if (viewport) {
        viewport.innerHTML = generateCertMockup(fileId, fileData);
    }
    
    // 4. Update file metadata panel properties
    const propName = document.getElementById('propFileName');
    const propType = document.getElementById('propFileType');
    const propSize = document.getElementById('propFileSize');
    const metaDate = document.getElementById('metaDateBadge');
    const metaIssuer = document.getElementById('metaCertIssuer');
    const propIntegrity = document.getElementById('propIntegrity');
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
    
    // 4.5. Reset panel scroll positions back to the top
    const renderPane = document.querySelector('.editor-render-pane');
    const metaPane = document.querySelector('.editor-meta-pane');
    if (renderPane) renderPane.scrollTop = 0;
    if (metaPane) metaPane.scrollTop = 0;
    
    // 5. Update terminal console command output
    const terminal = document.getElementById('ideTerminalConsole');
    if (terminal) {
        const filePath = fileData.category === 'Awards_and_CTFs' ? 'awards' : 'certifications';
        const fileTool = fileData.name.endsWith('.jpg') ? 'exiftool' : 'pdfinfo';
        
        // Generate pseudo unique md5 or check sum
        let hash = 0;
        for (let i = 0; i < fileData.title.length; i++) {
            hash = fileData.title.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
        
        let detailsLog = '';
        if (fileData.name.endsWith('.jpg')) {
            detailsLog = `File size: ${fileData.size} | Format: JFIF JPEG | Quality: 98%
EXIF Signature Hash: SHA256::${hex}2aef9
EXIF Organization Stamp: ${fileData.issuer}`;
        } else {
            detailsLog = `File size: ${fileData.size} | Format: PDF-1.5 | Pages: 1
PDF Signature Hash: SHA256::${hex}7f82b
PDF Producer: Adobe Acrobat Reader 64-bit`;
        }
        
        terminal.innerHTML = `
            <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ ${fileTool} ./${filePath}/${fileData.name}</p>
            <p class="term-log term-log-cyan">[~] Inspecting header metadata...</p>
            <p class="term-log">${detailsLog}</p>
            <p class="term-log">Acquisition Date: ${fileData.date}</p>
            <p class="term-log term-log-green">[+] Validation: Security clearance status [VERIFIED].</p>
            <p class="term-prompt-line"><span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ <span class="term-cursor-blink"></span></p>
        `;
        terminal.scrollTop = terminal.scrollHeight;
    }
    
    // 6. Responsive support: smooth-scroll to editor panel on mobile screens
    if (window.innerWidth < 992) {
        const editor = document.querySelector('.ide-editor');
        if (editor) {
            editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the default first item
    const firstFile = document.querySelector('.tree-file');
    if (firstFile) {
        selectIdeFile(firstFile);
    }
});

function closeIdeFile(event) {
    if (event) event.stopPropagation(); // prevent triggering parent clicks
    
    // 1. Hide active tab
    const activeTab = document.getElementById('ideActiveTab');
    if (activeTab) activeTab.style.display = 'none';
    
    // 2. Remove active state from sidebar file list
    document.querySelectorAll('.tree-file').forEach(el => el.classList.remove('active'));
    
    // 3. Render empty viewport state with checkerboard backdrop
    const viewport = document.getElementById('renderViewport');
    if (viewport) {
        viewport.innerHTML = `
            <div class="empty-viewport-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 1.5rem; box-sizing: border-box;">
                <i class="far fa-folder-open empty-icon" style="font-size: 2.5rem; color: #858585; margin-bottom: 0.75rem;"></i>
                <h3 style="color: #ffffff; font-family: 'Chakra Petch', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.35rem;">No File Open</h3>
                <p style="color: #858585; font-size: 0.8rem; line-height: 1.5; text-align: center; max-width: 280px; margin: 0 auto;">Select a certificate or award file from the explorer sidebar to view its contents.</p>
            </div>
        `;
    }
    
    // 4. Reset metadata sidepane to placeholder state
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
    
    // 5. Output session close message to terminal
    const terminal = document.getElementById('ideTerminalConsole');
    if (terminal) {
        const newPrompt = document.createElement('p');
        newPrompt.className = 'term-prompt-line';
        newPrompt.innerHTML = `<span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ close_session`;
        terminal.appendChild(newPrompt);
        
        const newLog = document.createElement('p');
        newLog.className = 'term-log term-log-cyan';
        newLog.textContent = `[~] Unmounting session volume. Connection closed.`;
        terminal.appendChild(newLog);
        
        const nextPrompt = document.createElement('p');
        nextPrompt.className = 'term-prompt-line';
        nextPrompt.innerHTML = `<span class="term-user">shlok@sec-node</span>:<span class="term-path">~/portfolio/credentials</span>$ <span class="term-cursor-blink"></span>`;
        terminal.appendChild(nextPrompt);
        
        terminal.scrollTop = terminal.scrollHeight;
    }
}


