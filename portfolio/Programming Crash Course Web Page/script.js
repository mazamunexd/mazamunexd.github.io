document.addEventListener('DOMContentLoaded', () => {
    // Show the HTML content by default
    showContent('html');
});

function showContent(language) {
    // Hide all sections
    document.querySelectorAll('.course-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(`${language}-content`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

function filterContent(language) {
    const searchInput = document.getElementById(`${language}-search`);
    const filter = searchInput.value.toLowerCase();
    const syntaxList = document.getElementById(`${language}-syntax-list`);
    const syntaxItems = syntaxList.querySelectorAll('.syntax-item');

    syntaxItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(filter)) {
            item.style.display = ''; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
}