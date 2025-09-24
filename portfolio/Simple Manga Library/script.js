// Sample manga data
let mangaLibrary = [
    {
        id: 1,
        title: "One Piece",
        description: "Follow Monkey D. Luffy and his swashbuckling crew in their journey to find the ultimate treasure, the One Piece, and become the Pirate King.",
        image: "https://placehold.co/300x400/FF6B35/FFFFFF?text=One+Piece",
        author: "Eiichiro Oda",
        genre: "Adventure, Action",
        rating: 4.9,
        year: 1997,
        status: "Ongoing"
    },
    {
        id: 2,
        title: "Attack on Titan",
        description: "In a world where humanity lives behind walls to protect themselves from giant humanoid Titans, the story follows Eren Yeager and his friends.",
        image: "https://placehold.co/300x400/4A90E2/FFFFFF?text=Attack+on+Titan",
        author: "Hajime Isayama",
        genre: "Action, Drama",
        rating: 4.8,
        year: 2009,
        status: "Completed"
    },
    {
        id: 3,
        title: "Demon Slayer",
        description: "Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister who has been turned into a demon.",
        image: "https://placehold.co/300x400/FF4757/FFFFFF?text=Demon+Slayer",
        author: "Koyoharu Gotouge",
        genre: "Action, Supernatural",
        rating: 4.7,
        year: 2016,
        status: "Completed"
    },
    {
        id: 4,
        title: "Jujutsu Kaisen",
        description: "Yuji Itadori swallows a cursed talisman and becomes entangled in the world of sorcerers and curses.",
        image: "https://placehold.co/300x400/2ED573/FFFFFF?text=Jujutsu+Kaisen",
        author: "Gege Akutami",
        genre: "Action, Horror",
        rating: 4.6,
        year: 2018,
        status: "Ongoing"
    },
    {
        id: 5,
        title: "Chainsaw Man",
        description: "Denji is a young man who works as a devil hunter to pay off his father's debt, alongside his pet devil Pochita.",
        image: "https://placehold.co/300x400/FFA502/FFFFFF?text=Chainsaw+Man",
        author: "Tatsuki Fujimoto",
        genre: "Action, Horror",
        rating: 4.5,
        year: 2018,
        status: "Ongoing"
    },
    {
        id: 6,
        title: "Spy x Family",
        description: "A spy, an assassin, and a telepath form an unconventional family while each hiding their true identities from one another.",
        image: "https://placehold.co/300x400/A55EEA/FFFFFF?text=Spy+x+Family",
        author: "Tatsuya Endo",
        genre: "Comedy, Action",
        rating: 4.4,
        year: 2019,
        status: "Ongoing"
    }
];

// Create animated bubbles
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    const bubbleCount = 30;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size and position
        const size = Math.random() * 40 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 10 + 8;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Display manga cards
function displayManga(mangaArray) {
    const mangaGrid = document.getElementById('mangaGrid');
    mangaGrid.innerHTML = '';
    
    if (mangaArray.length === 0) {
        mangaGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-book"></i>
                <h3>No manga found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
        return;
    }
    
    mangaArray.forEach(manga => {
        const mangaCard = document.createElement('div');
        mangaCard.className = 'manga-card';
        mangaCard.innerHTML = `
            <img src="${manga.image}" alt="${manga.title}" class="manga-image">
            <div class="manga-content">
                <h3 class="manga-title">${manga.title}</h3>
                <p class="manga-description">${manga.description}</p>
                <div class="manga-meta">
                    <span class="manga-author">${manga.author}</span>
                    <div class="manga-rating">
                        <i class="fas fa-star"></i>
                        <span>${manga.rating}</span>
                    </div>
                </div>
                <div class="manga-genre">${manga.genre}</div>
            </div>
        `;
        mangaGrid.appendChild(mangaCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            displayManga(mangaLibrary);
            return;
        }
        
        const filteredManga = mangaLibrary.filter(manga => 
            manga.title.toLowerCase().includes(searchTerm) ||
            manga.author.toLowerCase().includes(searchTerm) ||
            manga.genre.toLowerCase().includes(searchTerm)
        );
        
        displayManga(filteredManga);
    });
}

// Modal functions
function openModal() {
    document.getElementById('addModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('mangaForm').reset();
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Add new manga
function setupForm() {
    const form = document.getElementById('mangaForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newManga = {
            id: mangaLibrary.length + 1,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value || 'Unknown',
            year: document.getElementById('year').value || new Date().getFullYear(),
            status: document.getElementById('status').value,
            rating: parseFloat(document.getElementById('rating').value) || 4.0,
            image: document.getElementById('image').value || `https://placehold.co/300x400/667eea/FFFFFF?text=${encodeURIComponent(document.getElementById('title').value)}`,
            description: document.getElementById('description').value || 'No description available.'
        };
        
        mangaLibrary.push(newManga);
        displayManga(mangaLibrary);
        closeModal();
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createBubbles();
    displayManga(mangaLibrary);
    setupSearch();
    setupForm();
});