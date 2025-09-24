// Website Database
const websites = [
    // Tech Giants
    {
        name: "Google",
        url: "https://www.google.com",
        description: "Search engine and technology company",
        category: "tech",
        icon: "fab fa-google",
        color: "#4285f4"
    },
    {
        name: "Apple",
        url: "https://www.apple.com",
        description: "Technology and consumer electronics",
        category: "tech",
        icon: "fab fa-apple",
        color: "#000000"
    },
    {
        name: "Microsoft",
        url: "https://www.microsoft.com",
        description: "Software and cloud computing",
        category: "tech",
        icon: "fab fa-microsoft",
        color: "#00a1f1"
    },
    {
        name: "Amazon",
        url: "https://www.amazon.com",
        description: "E-commerce and cloud services",
        category: "shopping",
        icon: "fab fa-amazon",
        color: "#ff9900"
    },
    {
        name: "Meta (Facebook)",
        url: "https://www.facebook.com",
        description: "Social networking platform",
        category: "social",
        icon: "fab fa-facebook",
        color: "#1877f2"
    },

    // Social Media
    {
        name: "Instagram",
        url: "https://www.instagram.com",
        description: "Photo and video sharing platform",
        category: "social",
        icon: "fab fa-instagram",
        color: "#e4405f"
    },
    {
        name: "Twitter (X)",
        url: "https://www.twitter.com",
        description: "Microblogging and social networking",
        category: "social",
        icon: "fab fa-twitter",
        color: "#1da1f2"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        description: "Professional networking platform",
        category: "social",
        icon: "fab fa-linkedin",
        color: "#0077b5"
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com",
        description: "Short-form video platform",
        category: "social",
        icon: "fab fa-tiktok",
        color: "#000000"
    },
    {
        name: "Snapchat",
        url: "https://www.snapchat.com",
        description: "Multimedia messaging app",
        category: "social",
        icon: "fab fa-snapchat",
        color: "#fffc00"
    },
    {
        name: "Discord",
        url: "https://www.discord.com",
        description: "Voice, video and text communication",
        category: "social",
        icon: "fab fa-discord",
        color: "#5865f2"
    },
    {
        name: "Reddit",
        url: "https://www.reddit.com",
        description: "Social news aggregation platform",
        category: "social",
        icon: "fab fa-reddit",
        color: "#ff4500"
    },
    {
        name: "Telegram",
        url: "https://www.telegram.org",
        description: "Cloud-based messaging app",
        category: "social",
        icon: "fab fa-telegram",
        color: "#0088cc"
    },
    {
        name: "WhatsApp",
        url: "https://www.whatsapp.com",
        description: "Messaging and calling app",
        category: "social",
        icon: "fab fa-whatsapp",
        color: "#25d366"
    },

    // Art & Design
    {
        name: "Behance",
        url: "https://www.behance.net",
        description: "Creative portfolio platform",
        category: "art",
        icon: "fab fa-behance",
        color: "#1769ff"
    },
    {
        name: "Dribbble",
        url: "https://www.dribbble.com",
        description: "Design community and portfolio",
        category: "art",
        icon: "fab fa-dribbble",
        color: "#ea4c89"
    },
    {
        name: "Pinterest",
        url: "https://www.pinterest.com",
        description: "Visual discovery and idea platform",
        category: "art",
        icon: "fab fa-pinterest",
        color: "#bd081c"
    },
    {
        name: "Pixiv",
        url: "https://www.pixiv.net",
        description: "Japanese art community platform",
        category: "art",
        icon: "fas fa-palette",
        color: "#0096fa"
    },
    {
        name: "DeviantArt",
        url: "https://www.deviantart.com",
        description: "Online art gallery and community",
        category: "art",
        icon: "fab fa-deviantart",
        color: "#05cc47"
    },
    {
        name: "ArtStation",
        url: "https://www.artstation.com",
        description: "Portfolio platform for game artists",
        category: "art",
        icon: "fab fa-artstation",
        color: "#13aff0"
    },
    {
        name: "Figma",
        url: "https://www.figma.com",
        description: "Collaborative design tool",
        category: "art",
        icon: "fab fa-figma",
        color: "#f24e1e"
    },
    {
        name: "Adobe Creative Cloud",
        url: "https://www.adobe.com",
        description: "Creative software suite",
        category: "art",
        icon: "fas fa-paint-brush",
        color: "#ff0000"
    },

    // Entertainment
    {
        name: "YouTube",
        url: "https://www.youtube.com",
        description: "Video sharing platform",
        category: "entertainment",
        icon: "fab fa-youtube",
        color: "#ff0000"
    },
    {
        name: "Netflix",
        url: "https://www.netflix.com",
        description: "Streaming entertainment service",
        category: "entertainment",
        icon: "fas fa-film",
        color: "#e50914"
    },
    {
        name: "Spotify",
        url: "https://www.spotify.com",
        description: "Music streaming platform",
        category: "entertainment",
        icon: "fab fa-spotify",
        color: "#1db954"
    },
    {
        name: "Twitch",
        url: "https://www.twitch.tv",
        description: "Live streaming platform",
        category: "entertainment",
        icon: "fab fa-twitch",
        color: "#9146ff"
    },
    {
        name: "Disney+",
        url: "https://www.disneyplus.com",
        description: "Disney streaming service",
        category: "entertainment",
        icon: "fas fa-magic",
        color: "#113ccf"
    },
    {
        name: "Hulu",
        url: "https://www.hulu.com",
        description: "TV and movie streaming",
        category: "entertainment",
        icon: "fas fa-tv",
        color: "#1ce783"
    },
    {
        name: "Prime Video",
        url: "https://www.primevideo.com",
        description: "Amazon's streaming service",
        category: "entertainment",
        icon: "fas fa-play-circle",
        color: "#00a8e1"
    },

    // Education
    {
        name: "Wikipedia",
        url: "https://www.wikipedia.org",
        description: "Free online encyclopedia",
        category: "education",
        icon: "fab fa-wikipedia-w",
        color: "#000000"
    },
    {
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        description: "Free online learning platform",
        category: "education",
        icon: "fas fa-graduation-cap",
        color: "#14bf96"
    },
    {
        name: "Coursera",
        url: "https://www.coursera.org",
        description: "Online courses and degrees",
        category: "education",
        icon: "fas fa-book",
        color: "#0056d3"
    },
    {
        name: "edX",
        url: "https://www.edx.org",
        description: "Online learning platform",
        category: "education",
        icon: "fas fa-university",
        color: "#02262b"
    },
    {
        name: "Udemy",
        url: "https://www.udemy.com",
        description: "Online learning marketplace",
        category: "education",
        icon: "fas fa-chalkboard-teacher",
        color: "#a435f0"
    },
    {
        name: "Duolingo",
        url: "https://www.duolingo.com",
        description: "Language learning platform",
        category: "education",
        icon: "fas fa-language",
        color: "#58cc02"
    },

    // Shopping
    {
        name: "eBay",
        url: "https://www.ebay.com",
        description: "Online marketplace and auctions",
        category: "shopping",
        icon: "fab fa-ebay",
        color: "#e53238"
    },
    {
        name: "Etsy",
        url: "https://www.etsy.com",
        description: "Handmade and vintage marketplace",
        category: "shopping",
        icon: "fab fa-etsy",
        color: "#f16521"
    },
    {
        name: "Alibaba",
        url: "https://www.alibaba.com",
        description: "Global wholesale marketplace",
        category: "shopping",
        icon: "fas fa-store",
        color: "#ff6a00"
    },
    {
        name: "Shopify",
        url: "https://www.shopify.com",
        description: "E-commerce platform",
        category: "shopping",
        icon: "fas fa-shopping-cart",
        color: "#96bf48"
    },
    {
        name: "AliExpress",
        url: "https://www.aliexpress.com",
        description: "Global online retail marketplace",
        category: "shopping",
        icon: "fas fa-box",
        color: "#ff4747"
    },

    // News
    {
        name: "BBC News",
        url: "https://www.bbc.com/news",
        description: "British broadcasting news",
        category: "news",
        icon: "fas fa-newspaper",
        color: "#bb1919"
    },
    {
        name: "CNN",
        url: "https://www.cnn.com",
        description: "Cable news network",
        category: "news",
        icon: "fas fa-broadcast-tower",
        color: "#cc0000"
    },
    {
        name: "Reuters",
        url: "https://www.reuters.com",
        description: "International news agency",
        category: "news",
        icon: "fas fa-globe-americas",
        color: "#ff8000"
    },
    {
        name: "The Guardian",
        url: "https://www.theguardian.com",
        description: "British daily newspaper",
        category: "news",
        icon: "fas fa-newspaper",
        color: "#052962"
    },
    {
        name: "New York Times",
        url: "https://www.nytimes.com",
        description: "American newspaper",
        category: "news",
        icon: "fas fa-newspaper",
        color: "#000000"
    },

    // Productivity
    {
        name: "GitHub",
        url: "https://www.github.com",
        description: "Code hosting and collaboration",
        category: "productivity",
        icon: "fab fa-github",
        color: "#181717"
    },
    {
        name: "GitLab",
        url: "https://www.gitlab.com",
        description: "DevOps platform",
        category: "productivity",
        icon: "fab fa-gitlab",
        color: "#fc6d26"
    },
    {
        name: "Stack Overflow",
        url: "https://www.stackoverflow.com",
        description: "Programming Q&A community",
        category: "productivity",
        icon: "fab fa-stack-overflow",
        color: "#f48024"
    },
    {
        name: "Notion",
        url: "https://www.notion.so",
        description: "All-in-one workspace",
        category: "productivity",
        icon: "fas fa-sticky-note",
        color: "#000000"
    },
    {
        name: "Trello",
        url: "https://www.trello.com",
        description: "Project management tool",
        category: "productivity",
        icon: "fab fa-trello",
        color: "#0079bf"
    },
    {
        name: "Slack",
        url: "https://www.slack.com",
        description: "Business communication platform",
        category: "productivity",
        icon: "fab fa-slack",
        color: "#4a154b"
    },
    {
        name: "Zoom",
        url: "https://www.zoom.us",
        description: "Video conferencing platform",
        category: "productivity",
        icon: "fas fa-video",
        color: "#2d8cff"
    },
    {
        name: "Google Drive",
        url: "https://drive.google.com",
        description: "Cloud storage and collaboration",
        category: "productivity",
        icon: "fab fa-google-drive",
        color: "#4285f4"
    },
    {
        name: "Dropbox",
        url: "https://www.dropbox.com",
        description: "Cloud storage service",
        category: "productivity",
        icon: "fab fa-dropbox",
        color: "#0061ff"
    },

    // Gaming
    {
        name: "Steam",
        url: "https://store.steampowered.com",
        description: "Digital game distribution platform",
        category: "gaming",
        icon: "fab fa-steam",
        color: "#171a21"
    },
    {
        name: "Epic Games",
        url: "https://www.epicgames.com",
        description: "Game development and publishing",
        category: "gaming",
        icon: "fas fa-gamepad",
        color: "#313131"
    },
    {
        name: "PlayStation",
        url: "https://www.playstation.com",
        description: "Gaming console and services",
        category: "gaming",
        icon: "fab fa-playstation",
        color: "#003791"
    },
    {
        name: "Xbox",
        url: "https://www.xbox.com",
        description: "Gaming console and services",
        category: "gaming",
        icon: "fab fa-xbox",
        color: "#107c10"
    },
    {
        name: "Nintendo",
        url: "https://www.nintendo.com",
        description: "Gaming console manufacturer",
        category: "gaming",
        icon: "fas fa-gamepad",
        color: "#e60012"
    },
    {
        name: "Riot Games",
        url: "https://www.riotgames.com",
        description: "Game developer and publisher (League of Legends, VALORANT, etc.)",
        category: "gaming",
        icon: "fas fa-gamepad",
        color: "#e81c4f"
    },
    // {
    //     name: "AdultFriendFinder",
    //     url: "https://www.adultfriendfinder.com",
    //     description: "Adult dating and social networking",
    //     category: "adult",
    //     icon: "fas fa-user-friends",
    //     color: "#ff0000"
    // },
    // {
    //     name: "Xvideos",
    //     url: "https://www.xvideos.com",
    //     description: "Adult video sharing platform",
    //     category: "adult",
    //     icon: "fas fa-video",
    //     color: "#ff0000"
    // },
    // {
    //     name: "Pornhub",
    //     url: "https://www.pornhub.com",
    //     description: "Adult video sharing platform",
    //     category: "adult",
    //     icon: "fas fa-video",
    //     color: "#ff0000"
    // },
    // {
    //     name: "OnlyFans",
    //     url: "https://www.onlyfans.com",
    //     description: "Subscription-based adult content platform",
    //     category: "adult",
    //     icon: "fas fa-user-lock",
    //     color: "#ff0000"
    // },

];

// State
let currentCategory = 'all';
let ageVerified = false;

// Render websites
function renderWebsites(list) {
    const grid = document.getElementById('websitesGrid');
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<p style="color:#cbd5e1;">No websites found.</p>';
        return;
    }
    list.forEach(site => {
        // REMOVE: Adult category check
        const card = document.createElement('div');
        card.className = 'website-card' + (site.category === 'adult' ? ' adult' : '');
        card.innerHTML = `
            <div class="website-header">
                <div class="website-icon"><i class="${site.icon}"></i></div>
                <div class="website-info">
                    <h3>${site.name}</h3>
                    <span class="website-category">${capitalize(site.category)}</span>
                </div>
            </div>
            <a href="${site.url}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:1rem;">Visit</a>
        `;
        grid.appendChild(card);
    });
    document.getElementById('websiteCount').textContent = `${list.length}+ Websites`;
}

// Capitalize category
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter by category
function showCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[onclick="showCategory('${category}')"]`).classList.add('active');
    let filtered = category === 'all' ? websites : websites.filter(w => w.category === category);
    renderWebsites(filtered);
}

// Search websites
function searchWebsites() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    let filtered = websites.filter(site => {
        // REMOVE: Adult category check
        return site.name.toLowerCase().includes(query) || site.category.toLowerCase().includes(query);
    });
    renderWebsites(filtered);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    renderWebsites(websites);
    document.getElementById('searchInput').addEventListener('input', searchWebsites);
});

// Helper to check for duplicates by name and url
function isDuplicate(site) {
    return websites.some(w => w.name === site.name || w.url === site.url);
}

