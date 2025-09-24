class SpotifyClone {
    constructor() {
        this.songs = [
            {
                id: 1,
                title: "Blinding Lights",
                artist: "The Weeknd",
                album: "After Hours",
                duration: "3:20",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            },
            {
                id: 2,
                title: "Shape of You",
                artist: "Ed Sheeran",
                album: "÷ (Divide)",
                duration: "3:53",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
            },
            {
                id: 3,
                title: "Watermelon Sugar",
                artist: "Harry Styles",
                album: "Fine Line",
                duration: "2:54",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            },
            {
                id: 4,
                title: "Levitating",
                artist: "Dua Lipa",
                album: "Future Nostalgia",
                duration: "3:23",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
            },
            {
                id: 5,
                title: "Good 4 U",
                artist: "Olivia Rodrigo",
                album: "SOUR",
                duration: "2:58",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
            },
            {
                id: 6,
                title: "Stay",
                artist: "The Kid LAROI & Justin Bieber",
                album: "Stay",
                duration: "2:21",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
            }
        ];
        
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        this.volume = 0.7;
        
        this.audioPlayer = document.getElementById('audio-player');
        this.initializeEventListeners();
        this.loadSongs();
        this.loadFromLocalStorage();
    }
    
    initializeEventListeners() {
        // Play/Pause button
        document.getElementById('play-pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Previous/Next buttons
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousSong();
        });
        
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextSong();
        });
        
        // Shuffle and Repeat buttons
        document.getElementById('shuffle-btn').addEventListener('click', () => {
            this.toggleShuffle();
        });
        
        document.getElementById('repeat-btn').addEventListener('click', () => {
            this.toggleRepeat();
        });
        
        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('click', (e) => {
            this.seekTo(e);
        });
        
        // Volume control
        const volumeBar = document.querySelector('.volume-bar');
        volumeBar.addEventListener('click', (e) => {
            this.setVolume(e);
        });
        
        // Audio player events
        this.audioPlayer.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audioPlayer.addEventListener('ended', () => {
            this.nextSong();
        });
        
        this.audioPlayer.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });
        
        // Upload modal
        document.getElementById('upload-btn').addEventListener('click', () => {
            this.openUploadModal();
        });
        
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeUploadModal();
        });
        
        document.getElementById('upload-form').addEventListener('submit', (e) => {
            this.handleUpload(e);
        });
        
        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchSongs(e.target.value);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    loadSongs() {
        this.renderRecentlyPlayed();
        this.renderSongList();
    }
    
    renderRecentlyPlayed() {
        const container = document.getElementById('recently-played');
        const recentSongs = this.songs.slice(0, 6);
        
        container.innerHTML = recentSongs.map(song => `
            <div class="music-card fade-in" onclick="spotifyClone.playSong(${song.id})">
                <img src="${song.image}" alt="${song.title}">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `).join('');
    }
    
    renderSongList() {
        const container = document.getElementById('song-list');
        
        container.innerHTML = this.songs.map((song, index) => `
            <div class="song-item ${index === this.currentSongIndex ? 'active' : ''}" 
                 onclick="spotifyClone.playSong(${song.id})">
                                 <span class="song-number">${index + 1}</span>
                <img src="${song.image}" alt="${song.title}">
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist} • ${song.album}</p>
                </div>
                <span class="song-duration">${song.duration}</span>
            </div>
        `).join('');
    }
    
    playSong(songId) {
        const songIndex = this.songs.findIndex(song => song.id === songId);
        if (songIndex !== -1) {
            this.currentSongIndex = songIndex;
            this.loadCurrentSong();
            this.play();
            this.updateNowPlaying();
            this.renderSongList();
        }
    }
    
    loadCurrentSong() {
        const currentSong = this.songs[this.currentSongIndex];
        this.audioPlayer.src = currentSong.src;
        this.audioPlayer.volume = this.volume;
    }
    
    play() {
        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    }
    
    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (!this.audioPlayer.src) {
                this.loadCurrentSong();
            }
            this.play();
        }
    }
    
    previousSong() {
        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = this.currentSongIndex > 0 ? 
                this.currentSongIndex - 1 : this.songs.length - 1;
        }
        this.loadCurrentSong();
        if (this.isPlaying) {
            this.play();
        }
        this.updateNowPlaying();
        this.renderSongList();
    }
    
    nextSong() {
        if (this.isRepeating) {
            // Repeat current song
            this.audioPlayer.currentTime = 0;
            if (this.isPlaying) {
                this.play();
            }
            return;
        }
        
        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = this.currentSongIndex < this.songs.length - 1 ? 
                this.currentSongIndex + 1 : 0;
        }
        this.loadCurrentSong();
        if (this.isPlaying) {
            this.play();
        }
        this.updateNowPlaying();
        this.renderSongList();
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffle-btn');
        shuffleBtn.style.color = this.isShuffled ? '#1db954' : '#b3b3b3';
    }
    
    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        const repeatBtn = document.getElementById('repeat-btn');
        repeatBtn.style.color = this.isRepeating ? '#1db954' : '#b3b3b3';
    }
    
    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const icon = playPauseBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    
    updateNowPlaying() {
        const currentSong = this.songs[this.currentSongIndex];
        document.getElementById('current-album-art').src = currentSong.image;
        document.getElementById('current-song-title').textContent = currentSong.title;
        document.getElementById('current-artist-name').textContent = currentSong.artist;
    }
    
    updateProgress() {
        const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-handle').style.left = `${progress}%`;
        
        const currentTime = this.formatTime(this.audioPlayer.currentTime);
        document.getElementById('current-time').textContent = currentTime;
    }
    
    updateDuration() {
        const totalTime = this.formatTime(this.audioPlayer.duration);
        document.getElementById('total-time').textContent = totalTime;
    }
    
    seekTo(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * this.audioPlayer.duration;
        this.audioPlayer.currentTime = newTime;
    }
    
    setVolume(e) {
        const volumeBar = e.currentTarget;
        const rect = volumeBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.volume = Math.max(0, Math.min(1, percent));
        this.audioPlayer.volume = this.volume;
        
        document.getElementById('volume-fill').style.width = `${this.volume * 100}%`;
        document.getElementById('volume-handle').style.right = `${(1 - this.volume) * 100}%`;
        
        // Update volume icon
        const volumeBtn = document.getElementById('volume-btn');
        const icon = volumeBtn.querySelector('i');
        if (this.volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (this.volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    openUploadModal() {
        document.getElementById('upload-modal').classList.add('active');
    }
    
    closeUploadModal() {
        document.getElementById('upload-modal').classList.remove('active');
        document.getElementById('upload-form').reset();
    }
    
    handleUpload(e) {
        e.preventDefault();
        
        const formData = new FormData();
        const title = document.getElementById('song-title-input').value;
        const artist = document.getElementById('artist-input').value;
        const album = document.getElementById('album-input').value || 'Unknown Album';
        const musicFile = document.getElementById('music-file').files[0];
        const albumArt = document.getElementById('album-art').files[0];
        
        if (!musicFile) {
            alert('Please select a music file');
            return;
        }
        
        // Create URL for the uploaded music file
        const musicUrl = URL.createObjectURL(musicFile);
        
        // Create URL for album art or use default
        let imageUrl = 'https://via.placeholder.com/300x300?text=♪';
        if (albumArt) {
            imageUrl = URL.createObjectURL(albumArt);
        }
        
        // Get audio duration
        const audio = new Audio(musicUrl);
        audio.addEventListener('loadedmetadata', () => {
            const duration = this.formatTime(audio.duration);
            
            // Create new song object
            const newSong = {
                id: Date.now(), // Simple ID generation
                title: title,
                artist: artist,
                album: album,
                duration: duration,
                src: musicUrl,
                image: imageUrl
            };
            
            // Add to songs array
            this.songs.unshift(newSong);
            
            // Re-render the UI
            this.renderRecentlyPlayed();
            this.renderSongList();
            
            // Save to localStorage
            this.saveToLocalStorage();
            
            // Close modal
            this.closeUploadModal();
            
            // Show success message
            this.showNotification('Song uploaded successfully!');
        });
    }
    
    searchSongs(query) {
        if (!query.trim()) {
            this.renderSongList();
            return;
        }
        
        const filteredSongs = this.songs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.album.toLowerCase().includes(query.toLowerCase())
        );
        
        const container = document.getElementById('song-list');
        container.innerHTML = filteredSongs.map((song, index) => `
            <div class="song-item" onclick="spotifyClone.playSong(${song.id})">
                <span class="song-number">${index + 1}</span>
                <img src="${song.image}" alt="${song.title}">
                <div class="song-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist} • ${song.album}</p>
                </div>
                <span class="song-duration">${song.duration}</span>
            </div>
        `).join('');
    }
    
    handleKeyboardShortcuts(e) {
        // Prevent shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.volume = Math.min(1, this.volume + 0.1);
                this.audioPlayer.volume = this.volume;
                this.updateVolumeDisplay();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.volume = Math.max(0, this.volume - 0.1);
                this.audioPlayer.volume = this.volume;
                this.updateVolumeDisplay();
                break;
        }
    }
    
    updateVolumeDisplay() {
        document.getElementById('volume-fill').style.width = `${this.volume * 100}%`;
        document.getElementById('volume-handle').style.right = `${(1 - this.volume) * 100}%`;
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(90deg, #1db954 0%, #1ed760 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    saveToLocalStorage() {
        const data = {
            songs: this.songs,
            currentSongIndex: this.currentSongIndex,
            volume: this.volume,
            isShuffled: this.isShuffled,
            isRepeating: this.isRepeating
        };
        localStorage.setItem('spotifyCloneData', JSON.stringify(data));
    }
    
    loadFromLocalStorage() {
        const data = localStorage.getItem('spotifyCloneData');
        if (data) {
            const parsed = JSON.parse(data);
            if (parsed.songs && parsed.songs.length > 0) {
                // Only load user uploaded songs, keep default songs
                const uploadedSongs = parsed.songs.filter(song => song.id > 1000);
                this.songs = [...this.songs, ...uploadedSongs];
            }
            this.volume = parsed.volume || 0.7;
            this.isShuffled = parsed.isShuffled || false;
            this.isRepeating = parsed.isRepeating || false;
            
            // Update UI
            this.updateVolumeDisplay();
            document.getElementById('shuffle-btn').style.color = this.isShuffled ? '#1db954' : '#b3b3b3';
            document.getElementById('repeat-btn').style.color = this.isRepeating ? '#1db954' : '#b3b3b3';
        }
    }
    
    // Auto-save periodically
    startAutoSave() {
        setInterval(() => {
            this.saveToLocalStorage();
        }, 30000); // Save every 30 seconds
    }
}

// Initialize the app
const spotifyClone = new SpotifyClone();

// Start auto-save
spotifyClone.startAutoSave();

// Additional features for enhanced user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease-out;
    `;
    
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="text-align: center;">
            <i class="fab fa-spotify" style="font-size: 60px; color: #1db954; margin-bottom: 20px; animation: pulse 2s infinite;"></i>
            <div style="font-size: 24px; font-weight: bold;">Loading Spotify Clone...</div>
        </div>
    `;
    
    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add right-click context menu for songs
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.song-item')) {
            e.preventDefault();
            // You can add custom context menu here
        }
    });
    
    // Add drag and drop functionality for file uploads
    const uploadModal = document.getElementById('upload-modal');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadModal.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadModal.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadModal.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        uploadModal.classList.add('drag-over');
    }
    
    function unhighlight(e) {
        uploadModal.classList.remove('drag-over');
    }
    
    uploadModal.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const musicFile = Array.from(files).find(file => file.type.startsWith('audio/'));
            const imageFile = Array.from(files).find(file => file.type.startsWith('image/'));
            
            if (musicFile) {
                document.getElementById('music-file').files = createFileList([musicFile]);
            }
            if (imageFile) {
                document.getElementById('album-art').files = createFileList([imageFile]);
            }
        }
    }
    
    function createFileList(files) {
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        return dt.files;
    }
});

// Add CSS for drag and drop
const dragDropStyles = document.createElement('style');
dragDropStyles.textContent = `
    .drag-over .modal {
        border: 2px dashed #1db954;
        background: rgba(29, 185, 84, 0.1);
    }
    
    .loading-spinner {
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 3px solid #1db954;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(dragDropStyles);

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

