// Portfolio Projects dynamic loader

const repoOwner = 'Masamune-dxd';
const repoName = 'WebDevelopment_Projects';
const projectsList = document.getElementById('projects-list');

async function fetchProjects() {
  // Get directories from the repo root
  const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`);
  const items = await res.json();
  if (!Array.isArray(items)) return [];

  // Only directories (each project)
  const projects = items.filter(item => item.type === 'dir');

  return Promise.all(projects.map(async (proj) => {
    let description = '';
    let repoUrl = `https://github.com/${repoOwner}/${repoName}/tree/main/${proj.name}`;

    // Try reading README.md from each project folder
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${proj.name}/README.md`);
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        if (readmeData.content) {
          description = atob(readmeData.content).split('\n').slice(0, 8).join(' '); // First 8 lines max
        }
      }
    } catch(e) {
      description = '';
    }
    return {
      name: proj.name,
      url: repoUrl,
      description: description || 'No description available.'
    };
  }));
}

function renderProjects(projects) {
  projectsList.innerHTML = '';
  projects.forEach(proj => {
    const el = document.createElement('div');
    el.className = 'project-card';
    el.innerHTML = `
      <h3>${proj.name}</h3>
      <p>${proj.description}</p>
      <a href="${proj.url}" target="_blank">View Repository</a>
    `;
    projectsList.appendChild(el);
  });
}

// On page load
fetchProjects().then(renderProjects);

// Optional: Contact form handler (no backend, just thank you alert)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message!');
  this.reset();
});