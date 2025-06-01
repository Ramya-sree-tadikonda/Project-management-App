import { setupProjectHandlers } from '../dashboard/projects.js';
import { storage } from './storage.js';
import { getCurrentUser } from '../dashboard/utils.js';
import { renderTasks } from '../dashboard/tasks.js'; 


console.log("scripts.js loaded");
export function initScripts() {
  const projectList = document.getElementById('projectList');
  const dashboard = document.getElementById('currentProjectName');
  const addBtn = document.getElementById('addProjectBtn');
  const header = document.querySelector('header');
  const authSection = document.getElementById('auth-section');
  const container = document.querySelector('.container');
  const logoutBtn = document.getElementById('btn-logout');
  const togglebutton=document.getElementById('btn-toggle-dark');
  let userProjects = [];

  function currentUser() {
    return getCurrentUser(); // fetche the latest user
  }

  function renderProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
      const li = document.createElement('li');
      li.className = 'project-item';
      li.dataset.projectId = project.id;
      li.innerHTML = `
        <span class="project-name">${project.name}</span>
        <button class="edit-project-btn">✏️</button>
        <button class="delete-project-btn">🗑️</button>
      `;
      projectList.appendChild(li);
    });
  }

  function highlightSelectedProject(selectedId) {
    const items = document.querySelectorAll('.project-item');
    items.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.projectId === selectedId) {
        item.classList.add('active');
      }
    });
  }
  function showProjectDashboard(project) {
    dashboard.innerHTML = `<h2>${project.name}</h2>`;

  }

  function clearTaskList() {
  const taskList = document.getElementById('taskList');
  if (taskList) taskList.innerHTML = '';
}

  function loadUserProjects() {
    if (!currentUser()) {
      userProjects = [];
      renderProjects(userProjects);
      dashboard.innerHTML = '<h2>Welcome!</h2><p>Select a project to view tasks.</p>';
      clearTaskList();
      return;
    }
    userProjects = storage.getProjects(currentUser()) || [];
    renderProjects(userProjects);
    dashboard.innerHTML = '<h2>Welcome!!</h2><p>Select a project to view tasks.</p>';
    clearTaskList();
  }
  projectList.addEventListener('click', e => {
    const li = e.target.closest('.project-item');
    if (!li) return;
    const selectedId = li.dataset.projectId;
    const selectedProject = userProjects.find(p => p.id === selectedId);
    if (selectedProject) {
      highlightSelectedProject(selectedId);
      showProjectDashboard(selectedProject);
    }
  });
  addBtn.addEventListener('click', () => {
    if (!currentUser()) {
      alert("Please login to add projects.");
      return;
    }
    const projectName = prompt("Enter project name:");
    if (!projectName || projectName.trim() === '') {
      alert("Project name cannot be empty.");
      return;
    }
    const newProject = {
  id: 'p' + Date.now().toString(),
  name: projectName.trim(),
  tasks: [] 
};

    userProjects = storage.getProjects(currentUser()) || [];
    userProjects.push(newProject);
    storage.saveProjects(currentUser(), userProjects);

    renderProjects(userProjects);
    highlightSelectedProject(newProject.id);
    showProjectDashboard(newProject);
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    authSection.style.display = 'flex';
    container.style.display = 'none';
    header.style.display = 'none';
    dashboard.innerHTML = '<h2>Please log in</h2>';
    projectList.innerHTML = '';
    alert('Logged out successfully.');
  });


  
  setupProjectHandlers(
    (selectedProjectId) => {
      const selectedProject = userProjects.find(p => p.id === selectedProjectId);
      if (selectedProject) {
        highlightSelectedProject(selectedProjectId);
        showProjectDashboard(selectedProject);
        renderTasks(selectedProjectId);
      }
    },
    () => {
      loadUserProjects();  // reload projects list after delete and edit
      dashboard.innerHTML = '<h2>Welcome!!</h2><p>Select a project to view tasks.</p>';
    }
  );

  

  if (currentUser()) {
    authSection.style.display = 'none';
    container.style.display = 'flex';
    header.style.display = 'flex';
    loadUserProjects();
  } else {
    authSection.style.display = 'flex';
    container.style.display = 'none';
    header.style.display = 'none';
  }


  togglebutton?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Optional: Save preference
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// On load, apply saved theme
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

  window.renderProjects = renderProjects;
}
