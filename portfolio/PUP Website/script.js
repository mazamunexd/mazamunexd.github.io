// Navigation menu functions
var navLinks = document.getElementById("navLinks");
    
function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

// DOMContentLoaded event listener for see more button
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const hiddenCampuses = document.querySelectorAll('.campus-col.hidden');
    let isExpanded = false;

    seeMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Show hidden campuses
            hiddenCampuses.forEach(campus => {
                campus.classList.remove('hidden');
            });
            seeMoreBtn.textContent = 'See Less';
        } else {
            // Hide campuses
            hiddenCampuses.forEach(campus => {
                campus.classList.add('hidden');
            });
            seeMoreBtn.textContent = 'See More';
        }
        isExpanded = !isExpanded;
    });
});

