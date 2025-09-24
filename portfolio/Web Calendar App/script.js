class PremiumCalendar {
    constructor() {
        this.daysContainer = document.getElementById('daysContainer');
        this.monthEl = document.getElementById('month');
        this.yearEl = document.getElementById('year');
        this.todayDateEl = document.getElementById('todayDate');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.todayBtn = document.getElementById('todayBtn');
        this.eventsBtn = document.getElementById('eventsBtn');
        this.sidePanel = document.getElementById('sidePanel');
        this.closePanel = document.getElementById('closePanel');
        this.eventsList = document.getElementById('eventsList');

        this.currentDate = new Date();
        this.selectedDate = null;
        this.isAnimating = false;

        this.holidays = {
            "2025-01-01": "New Year's Day",
            "2025-02-14": "Valentine's Day",
            "2025-03-17": "St. Patrick's Day",
            "2025-07-04": "Independence Day",
            "2025-10-31": "Halloween",
            "2025-12-25": "Christmas Day",
            "2025-12-31": "New Year's Eve"
        };

        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalendar();
        this.updateTodayInfo();
        this.populateEvents();
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.navigateMonth(-1));
        this.nextBtn.addEventListener('click', () => this.navigateMonth(1));
        this.todayBtn.addEventListener('click', () => this.goToToday());
        this.eventsBtn.addEventListener('click', () => this.toggleSidePanel());
        this.closePanel.addEventListener('click', () => this.toggleSidePanel());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigateMonth(-1);
            if (e.key === 'ArrowRight') this.navigateMonth(1);
            if (e.key === 'Escape') this.closeSidePanel();
        });
    }

    navigateMonth(direction) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        
        // Add slide animation
        this.daysContainer.style.transform = `translateX(${direction > 0 ? '20px' : '-20px'})`;
        this.daysContainer.style.opacity = '0';
        
        setTimeout(() => {
            this.renderCalendar();
            this.daysContainer.style.transform = `translateX(${direction > 0 ? '-20px' : '20px'})`;
            
            setTimeout(() => {
                this.daysContainer.style.transform = 'translateX(0)';
                this.daysContainer.style.opacity = '1';
                this.isAnimating = false;
            }, 50);
        }, 150);
    }

    goToToday() {
        this.currentDate = new Date();
        this.renderCalendar();
        this.updateTodayInfo();
    }

    toggleSidePanel() {
        this.sidePanel.classList.toggle('active');
    }

    closeSidePanel() {
        this.sidePanel.classList.remove('active');
    }

    updateTodayInfo() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.todayDateEl.textContent = today.toLocaleDateString('en-US', options);
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update header with animation
        this.monthEl.style.opacity = '0';
        this.yearEl.style.opacity = '0';
        
        setTimeout(() => {
            this.monthEl.textContent = this.monthNames[month];
            this.yearEl.textContent = year;
            this.monthEl.style.opacity = '1';
            this.yearEl.style.opacity = '1';
        }, 100);

        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        this.daysContainer.innerHTML = '';

        // Previous month days
        for (let i = firstDay; i > 0; i--) {
            const dayEl = this.createDayElement(prevMonthLastDay - i + 1, 'prev-month');
            this.daysContainer.appendChild(dayEl);
        }

        // Current month days
        for (let i = 1; i <= lastDay; i++) {
            const dayEl = this.createDayElement(i, 'current-month');
            
            // Check for today
            const today = new Date();
            if (i === today.getDate() && 
                month === today.getMonth() && 
                year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            // Check for holidays
            const holidayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            if (this.holidays[holidayKey]) {
                dayEl.classList.add('holiday');
                dayEl.setAttribute('title', this.holidays[holidayKey]);
            }

            this.daysContainer.appendChild(dayEl);
        }

        // Next month days
        const totalDays = firstDay + lastDay;
        const remainingDays = 42 - totalDays;
        for (let i = 1; i <= remainingDays; i++) {
            const dayEl = this.createDayElement(i, 'next-month');
            this.daysContainer.appendChild(dayEl);
        }

        // Animate days appearance
        this.animateDaysAppearance();
    }

    createDayElement(day, monthClass) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day', monthClass);
        dayEl.textContent = day;
        
        dayEl.addEventListener('click', () => {
            if (monthClass === 'current-month') {
                this.selectDate(dayEl);
            }
        });

        return dayEl;
    }

    selectDate(dayEl) {
        // Remove previous selection
        document.querySelectorAll('.day.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked day
        dayEl.classList.add('selected');
        this.selectedDate = dayEl.textContent;

        // Add selection animation
        dayEl.style.transform = 'scale(0.9)';
        setTimeout(() => {
            dayEl.style.transform = '';
        }, 150);
    }

    animateDaysAppearance() {
        const days = this.daysContainer.querySelectorAll('.day');
        days.forEach((day, index) => {
            day.style.opacity = '0';
            day.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                day.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                day.style.opacity = '1';
                day.style.transform = 'translateY(0)';
            }, index * 20);
        });
    }

    populateEvents() {
        const events = [
            { title: "Team Meeting", date: "Today, 2:00 PM", type: "work" },
            { title: "Birthday Party", date: "Tomorrow, 6:00 PM", type: "personal" },
            { title: "Project Deadline", date: "Dec 15, 2024", type: "work" },
            { title: "Vacation Trip", date: "Dec 20-25, 2024", type: "personal" },
            { title: "New Year's Eve", date: "Dec 31, 2024", type: "holiday" }
        ];

        this.eventsList.innerHTML = events.map(event => `
            <div class="event-item" style="animation: slideInRight 0.5s ease-out ${events.indexOf(event) * 0.1}s both">
                <div class="event-title">${event.title}</div>
                <div class="event-date">${event.date}</div>
            </div>
        `).join('');
    }
}

// Add CSS animations for events
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize the calendar
document.addEventListener('DOMContentLoaded', () => {
    new PremiumCalendar();
});
