import { getCurrentUser } from './utils.js';
import { renderTasks } from './tasks.js';
function getAllProjects() {
  const allProjects = JSON.parse(localStorage.getItem('projects')) || {};
  return allProjects[getCurrentUser()] || [];
}
function getAllTasks() {
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
  const userTasks = allTasks[getCurrentUser()] || {};
  return userTasks; // { projectId: [taskArray] }
}
export function setupTaskSearch() {
  const searchInput = document.getElementById('searchQuery');
  const suggestionBox = document.getElementById('searchSuggestions');
  if (!searchInput || !suggestionBox) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';
    if (!query) return;
    const projects = getAllProjects();
    const tasks = getAllTasks();
    const results = [];
    for (const project of projects) {
      const taskList = tasks[project.id] || [];
      for (const task of taskList) {
        if (task.name.toLowerCase().includes(query)) {
          results.push({
            projectId: project.id,
            projectName: project.name,
            taskName: task.name
          });
        }
      }
    }

    if (results.length === 0) {
      const noMatch = document.createElement('li');
      noMatch.textContent = 'No matching tasks';
      noMatch.classList.add('suggestion-item');
      suggestionBox.appendChild(noMatch);
      return;
    }
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `${result.projectName} > ${result.taskName}`;
      li.classList.add('suggestion-item');
      li.dataset.projectId = result.projectId;
      suggestionBox.appendChild(li);
    });
  });

  suggestionBox.addEventListener('click', (e) => {
    const li = e.target.closest('.suggestion-item');
    if (!li || !li.dataset.projectId) return;
    const projectId = li.dataset.projectId;
    //select the project in sidebar
    const projectElements = document.querySelectorAll('.project-item');
    projectElements.forEach(p => {
      if (p.dataset.projectId === projectId) {
        p.classList.add('selected');
      } else {
        p.classList.remove('selected');
      }
    });
    // Render tasks for the selected project
    renderTasks(projectId);
    // Clear input and suggestions
    searchInput.value = '';
    suggestionBox.innerHTML = '';
  });
}
