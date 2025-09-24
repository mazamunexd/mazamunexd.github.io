class MinecraftNotepad {
    constructor() {
        this.pages = [];
        this.currentPageIndex = 0;
        this.init();
    }

    init() {
        // Create initial page
        this.addPage();
        this.updateDisplay();
        this.loadNotesFromStorage();
        
        // Auto-save functionality
        setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds
    }

    addPage() {
        const pageNumber = this.pages.length + 1;
        const page = {
            id: Date.now(),
            title: `Page ${pageNumber}`,
            content: '',
            timestamp: new Date().toISOString()
        };
        
        this.pages.push(page);
        this.currentPageIndex = this.pages.length - 1;
        this.renderPages();
        this.updateDisplay();
        this.showToast('New page added!', 'success');
        
        // Add page creation animation
        this.animateBookOpen();
    }

    removePage() {
        if (this.pages.length <= 1) {
            this.showToast('Cannot remove the last page!', 'error');
            return;
        }

        this.pages.splice(this.currentPageIndex, 1);
        
        if (this.currentPageIndex >= this.pages.length) {
            this.currentPageIndex = this.pages.length - 1;
        }
        
        this.renderPages();
        this.updateDisplay();
        this.showToast('Page removed!', 'success');
    }

    renderPages() {
        const book = document.getElementById('book');
        book.innerHTML = '';

        this.pages.forEach((page, index) => {
            const pageElement = this.createPageElement(page, index);
            book.appendChild(pageElement);
        });
    }

    createPageElement(page, index) {
        const pageDiv = document.createElement('div');
        pageDiv.className = `page ${index === this.currentPageIndex ? 'active' : ''}`;
        pageDiv.innerHTML = `
            <div class="page-header">
                <input 
                    type="text" 
                    class="page-title" 
                    value="${page.title}" 
                    onchange="notepad.updatePageTitle(${index}, this.value)"
                    placeholder="Enter page title..."
                >
                <div class="page-number">${index + 1}</div>
            </div>
            <textarea 
                class="page-content" 
                placeholder="Start writing your story..."
                onchange="notepad.updatePageContent(${index}, this.value)"
                oninput="notepad.updatePageContent(${index}, this.value)"
            >${page.content}</textarea>
        `;
        return pageDiv;
    }

    updatePageTitle(index, title) {
        if (this.pages[index]) {
            this.pages[index].title = title;
            this.autoSave();
        }
    }

    updatePageContent(index, content) {
        if (this.pages[index]) {
            this.pages[index].content = content;
            this.pages[index].timestamp = new Date().toISOString();
        }
    }

    nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
            this.updateDisplay();
            this.animatePageFlip('next');
        }
    }

    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.updateDisplay();
            this.animatePageFlip('prev');
        }
    }

    updateDisplay() {
        // Update page visibility
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === this.currentPageIndex);
        });

        // Update page counter
        const pageCounter = document.getElementById('pageCounter');
        pageCounter.textContent = `Page ${this.currentPageIndex + 1} of ${this.pages.length}`;

        // Update navigation buttons
        const prevBtn = document.querySelector('.nav-btn:first-child');
        const nextBtn = document.querySelector('.nav-btn:last-child');
        
        prevBtn.disabled = this.currentPageIndex === 0;
        nextBtn.disabled = this.currentPageIndex === this.pages.length - 1;
    }

    saveAllNotes() {
        try {
            const notesData = {
                pages: this.pages,
                currentPageIndex: this.currentPageIndex,
                savedAt: new Date().toISOString()
            };
            
            localStorage.setItem('minecraftNotepadData', JSON.stringify(notesData));
            
            // Also create downloadable backup
            this.downloadBackup(notesData);
            
            this.showToast('All notes saved successfully!', 'success');
        } catch (error) {
            this.showToast('Error saving notes!', 'error');
            console.error('Save error:', error);
        }
    }

    loadNotes() {
        try {
            const savedData = localStorage.getItem('minecraftNotepadData');
            if (savedData) {
                const notesData = JSON.parse(savedData);
                this.pages = notesData.pages || [];
                this.currentPageIndex = notesData.currentPageIndex || 0;
                
                if (this.pages.length === 0) {
                    this.addPage();
                } else {
                    this.renderPages();
                    this.updateDisplay();
                }
                
                this.showToast('Notes loaded successfully!', 'success');
            } else {
                this.showToast('No saved notes found!', 'error');
            }
        } catch (error) {
            this.showToast('Error loading notes!', 'error');
            console.error('Load error:', error);
        }
    }

    loadNotesFromStorage() {
        const savedData = localStorage.getItem('minecraftNotepadData');
        if (savedData) {
            try {
                const notesData = JSON.parse(savedData);
                this.pages = notesData.pages || [];
                this.currentPageIndex = notesData.currentPageIndex || 0;
                
                if (this.pages.length === 0) {
                    this.addPage();
                } else {
                    this.renderPages();
                    this.updateDisplay();
                }
            } catch (error) {
                console.error('Error loading saved notes:', error);
            }
        }
    }

    autoSave() {
        try {
            const notesData = {
                pages: this.pages,
                currentPageIndex: this.currentPageIndex,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('minecraftNotepadData', JSON.stringify(notesData));
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    }

    downloadBackup(data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minecraft-notepad-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    animatePageFlip(direction) {
        const book = document.getElementById('book');
        book.style.transform = direction === 'next' 
            ? 'rotateY(-5deg) scale(0.98)' 
            : 'rotateY(5deg) scale(0.98)';
        
        setTimeout(() => {
            book.style.transform = 'rotateY(0deg) scale(1)';
        }, 300);
    }

    animateBookOpen() {
        const book = document.getElementById('book');
        book.style.transform = 'scale(1.05) rotateX(10deg)';
        
        setTimeout(() => {
            book.style.transform = 'scale(1) rotateX(5deg)';
        }, 500);
    }
}

// Initialize the notepad
const notepad = new MinecraftNotepad();

// Global functions for HTML onclick events
function addPage() {
    notepad.addPage();
}

function removePage() {
    notepad.removePage();
}

function saveAllNotes() {
    notepad.saveAllNotes();
}

function loadNotes() {
    notepad.loadNotes();
}

function nextPage() {
    notepad.nextPage();
}

function previousPage() {
    notepad.previousPage();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 's':
                e.preventDefault();
                saveAllNotes();
                break;
            case 'n':
                e.preventDefault();
                addPage();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousPage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextPage();
                break;
        }
    }
});

// Add some magical particles effect
function createMagicalParticles() {
    const particleContainer = document.querySelector('.particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 70%)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float-up ${Math.random() * 3 + 2}s linear forwards`;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }, 500);
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize magical effects
createMagicalParticles();

// Add window beforeunload event to warn about unsaved changes
window.addEventListener('beforeunload', (e) => {
    // Auto-save before leaving
    notepad.autoSave();
});
