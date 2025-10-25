// ==========================================
// RESOURCES DATA - Easy to edit!
// ==========================================
// Format for resources:
// {
//   search_link: "youtube video URL to search for",
//   display_title: "Title shown on the card",
//   resources: [
//     { name: "Resource name", link: "URL" },
//     { name: "Another resource", link: "URL" }
//   ]
// }

const resources = [
    {
        search_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        display_title: "Web Development Tutorial",
        resources: [
            { name: "GitHub Repository", link: "https://github.com/example/web-dev" },
            { name: "Documentation", link: "https://docs.example.com" },
            { name: "Starter Template", link: "https://template.example.com" },
            { name: "VSCode Extensions", link: "https://marketplace.visualstudio.com/example" }
        ]
    },
    {
        search_link: "https://www.youtube.com/watch?v=example123",
        display_title: "JavaScript Basics Course",
        resources: [
            { name: "Code Examples", link: "https://github.com/example/js-basics" },
            { name: "Cheat Sheet PDF", link: "https://example.com/cheatsheet.pdf" },
            { name: "Practice Exercises", link: "https://codepen.io/example/js-exercises" }
        ]
    },
    {
        search_link: "https://www.youtube.com/watch?v=abcd1234",
        display_title: "React Complete Guide",
        resources: [
            { name: "React Documentation", link: "https://react.dev" },
            { name: "Project Source Code", link: "https://github.com/example/react-guide" },
            { name: "Component Library", link: "https://ui.example.com" },
            { name: "Deployment Guide", link: "https://example.com/deploy" },
            { name: "Best Practices", link: "https://example.com/react-best-practices" }
        ]
    },
    {
        search_link: "https://www.youtube.com/watch?v=xyz789",
        display_title: "Python for Beginners",
        resources: [
            { name: "Python Installation", link: "https://python.org/downloads" },
            { name: "Course Materials", link: "https://github.com/example/python-course" },
            { name: "Online IDE", link: "https://replit.com/@example/python" }
        ]
    },
    {
        search_link: "https://www.youtube.com/watch?v=node123",
        display_title: "Node.js & Express Tutorial",
        resources: [
            { name: "Express.js Docs", link: "https://expressjs.com" },
            { name: "API Template", link: "https://github.com/example/node-api" },
            { name: "Database Setup", link: "https://example.com/db-setup" },
            { name: "Authentication Guide", link: "https://example.com/auth" }
        ]
    },
    {
        search_link: "https://www.youtube.com/watch?v=css456",
        display_title: "CSS Advanced Techniques",
        resources: [
            { name: "CSS Grid Guide", link: "https://css-tricks.com/grid" },
            { name: "Flexbox Cheatsheet", link: "https://flexbox.example.com" },
            { name: "Animation Examples", link: "https://codepen.io/example/animations" }
        ]
    },
    {
        search_link: "https://youtu.be/v477fvbj3rk?si=E0o3eIrrCupa9q-t",
        display_title: "example lol",
        resources: [
            { name: "1", link: "link 1" },
            { name: "Flexbox Cheatsheet", link: "https://flexbox.example.com" },
            { name: "Animation Examples", link: "https://codepen.io/example/animations" },
            { name: "Animation Examples 2", link: "https://coo/example/animations" }
        ]
    }
];

// ==========================================
// QUICK ACCESS LINKS - Easy to edit!
// ==========================================
// Format:
// {
//   display_name: "Name shown on card",
//   description: "Short description",
//   link: "URL"
// }

const quickLinks = [
    {
        display_name: "MDN Web Docs",
        description: "The ultimate resource for web developers with comprehensive documentation",
        link: "https://developer.mozilla.org"
    },
    {
        display_name: "Stack Overflow",
        description: "Get help from the developer community and find solutions to coding problems",
        link: "https://stackoverflow.com"
    },
    {
        display_name: "GitHub",
        description: "Explore millions of repositories and collaborate on open source projects",
        link: "https://github.com"
    },
    {
        display_name: "CodePen",
        description: "Build, test, and discover front-end code with an online code editor",
        link: "https://codepen.io"
    },
    {
        display_name: "Can I Use",
        description: "Check browser support for HTML, CSS, and JavaScript features",
        link: "https://caniuse.com"
    },
    {
        display_name: "CSS-Tricks",
        description: "Learn CSS and web design with tutorials, guides, and tips",
        link: "https://css-tricks.com"
    }
];

// ==========================================
// APPLICATION CODE
// ==========================================

let currentResource = null;

function extractYouTubeID(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    
    return url.toLowerCase();
}

function renderQuickLinks() {
    const grid = document.getElementById('quickLinksGrid');
    grid.innerHTML = quickLinks.map(link => `
        <a href="${link.link}" target="_blank" class="quick-link-card">
            <h3>${link.display_name}</h3>
            <p>${link.description}</p>
            <span class="quick-link-url">${link.link}</span>
        </a>
    `).join('');
}

function renderResources(filteredResources = resources) {
    const grid = document.getElementById('resourcesGrid');
    
    if (filteredResources.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>No resources found. Try a different search term.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredResources.map((resource, index) => `
        <div class="resource-card" onclick="openResourceModal(${resources.indexOf(resource)})">
            <h3>${resource.display_title}</h3>
            <div class="resource-meta">
                <span class="resource-count">${resource.resources.length}</span>
                <span>resources available</span>
            </div>
        </div>
    `).join('');
}

function openResourceModal(index) {
    currentResource = resources[index];
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = currentResource.display_title;
    
    resetModal();
    modal.classList.add('active');
}

function resetModal() {
    document.getElementById('unlockScreen').classList.remove('hidden');
    document.getElementById('countdownScreen').classList.add('hidden');
    document.getElementById('resourcesScreen').classList.add('hidden');
    document.getElementById('linksList').classList.add('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentResource = null;
}

function unlockResources() {
    document.getElementById('unlockScreen').classList.add('hidden');
    document.getElementById('countdownScreen').classList.remove('hidden');
    
    let countdown = 10;
    const countdownEl = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            showResourcesScreen();
        }
    }, 1000);
}

function showResourcesScreen() {
    document.getElementById('countdownScreen').classList.add('hidden');
    document.getElementById('resourcesScreen').classList.remove('hidden');
}

function openResources() {
    document.getElementById('resourcesScreen').classList.add('hidden');
    const linksList = document.getElementById('linksList');
    
    linksList.innerHTML = currentResource.resources.map(resource => `
        <div class="link-item">
            <span class="link-name">${resource.name}</span>
            <a href="${resource.link}" target="_blank" class="link-url">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                ${resource.link}
            </a>
        </div>
    `).join('');
    
    linksList.classList.remove('hidden');
}

function searchResources() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        clearSearch();
        return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const searchVideoID = extractYouTubeID(searchTerm);
    
    const filtered = resources.filter(resource => {
        const resourceVideoID = extractYouTubeID(resource.search_link);
        const titleMatch = resource.display_title.toLowerCase().includes(searchTermLower);
        const urlMatch = resource.search_link.toLowerCase().includes(searchTermLower);
        const videoIDMatch = searchVideoID && resourceVideoID && searchVideoID === resourceVideoID;
        
        return titleMatch || urlMatch || videoIDMatch;
    });
    
    document.getElementById('quickLinksSection').classList.add('hidden');
    document.getElementById('backButtonContainer').classList.remove('hidden');
    document.getElementById('resourcesTitle').textContent = 'Search Results';
    document.getElementById('resourcesSubtitle').textContent = `Found ${filtered.length} resource(s) matching "${searchTerm}"`;
    
    renderResources(filtered);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('quickLinksSection').classList.remove('hidden');
    document.getElementById('backButtonContainer').classList.add('hidden');
    document.getElementById('resourcesTitle').textContent = 'Available Resources';
    document.getElementById('resourcesSubtitle').textContent = 'Browse through our collection of video resources';
    renderResources();
}

document.getElementById('searchBtn').addEventListener('click', searchResources);
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchResources();
    }
});
document.getElementById('backBtn').addEventListener('click', clearSearch);

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('unlockBtn').addEventListener('click', unlockResources);
document.getElementById('openBtn').addEventListener('click', openResources);

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const themeBtn = document.getElementById('themeToggle');
    if (document.body.classList.contains('light-mode')) {
        themeBtn.textContent = '🌙';
    } else {
        themeBtn.textContent = '☀️';
    }
});

renderQuickLinks();
renderResources();
