import { getCurrentUser, getStorage, saveStorage } from './utils.js';
const getUserData = (key) => {
  const allData = getStorage(key);
  const user = getCurrentUser();
  return allData[user] || [];
};

const saveUserData = (key, dataForUser) => {
  const allData = getStorage(key);
  const user = getCurrentUser();
  allData[user] = dataForUser;
  saveStorage(key, allData);
};
function showConfirmation(message, onConfirm) {
  if (window.confirm(message)) {
    onConfirm();
  }
}

function editProjectName(projectId, newName) {
  if (!projectId) return;
  const projects = getUserData('projects');
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.name = newName;
    saveUserData('projects', projects);
  }
}
function deleteProject(projectId) {
  if (!projectId) return;
  const user = getCurrentUser();
  let projects = getUserData('projects') || [];
  projects = projects.filter(p => p.id !== projectId);
  saveUserData('projects', projects);
  // Remove associated tasks
  const allTasks = getStorage('tasks') || {};
  if (allTasks[user] && allTasks[user][projectId]) {
    delete allTasks[user][projectId];
    saveStorage('tasks', allTasks);
  }
}

function setupProjectHandlers(onProjectSelected,onProjectChange) {
  const projectList = document.getElementById('projectList');
  if (!projectList) return;

  projectList.addEventListener('click', (e) => {
    const projectItem = e.target.closest('.project-item');
    if (!projectItem) return;

    const projectId = projectItem.dataset.projectId;

    if (e.target.classList.contains('edit-project-btn')) {
      const currentName = projectItem.querySelector('.project-name')?.textContent || projectItem.textContent;
      const newName = prompt('Enter new project name:', currentName);
      if (newName && newName.trim() && newName !== currentName) {
        editProjectName(projectId, newName.trim());
        if (projectItem.querySelector('.project-name')) {
          projectItem.querySelector('.project-name').textContent = newName.trim();
        } else {
          projectItem.textContent = newName.trim();
        }
         if (onProjectChange) onProjectChange();
      }
    } else if (e.target.classList.contains('delete-project-btn')) {
      showConfirmation('Are you sure you want to delete this project?', () => {
        deleteProject(projectId);
        // loadUserProjects();
        projectItem.remove();
        if (onProjectChange) onProjectChange();

        // Optional:task list clear when deleted project is selected
        if (projectItem.classList.contains('selected')) {
          const taskList = document.getElementById('taskList');
          if (taskList) taskList.innerHTML = '';
        }

      });
    } else {
      // Handle project selection
      projectList.querySelectorAll('.project-item.selected').forEach(item => {
        item.classList.remove('selected');
      });
      projectItem.classList.add('selected');
      if (onProjectSelected && typeof onProjectSelected === 'function') {
        onProjectSelected(projectId);
      }
    }
  });
}
export { editProjectName, deleteProject, setupProjectHandlers };
