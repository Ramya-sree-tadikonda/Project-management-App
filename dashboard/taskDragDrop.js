import { storage } from '../scripts/storage.js';  

export function enableDragAndDrop(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  let draggedElement = null;
  container.addEventListener('dragstart', (e) => {
    draggedElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedElement.dataset.taskId);
    draggedElement.classList.add('dragging');
  });
  container.addEventListener('dragend', (e) => {
    if (draggedElement) {
      draggedElement.classList.remove('dragging');
      draggedElement = null;
    }
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('li.task-item');
    if (!target || target === draggedElement) return;
    const bounding = target.getBoundingClientRect();
    const offset = e.clientY - bounding.top;
    if (offset > bounding.height / 2) {
      target.after(draggedElement);
    } else {
      target.before(draggedElement);
    }
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    updateTaskOrder(container);
  });

  function updateTaskOrder(container) {
    const currentUser = localStorage.getItem('currentUser');
    const projectElement = document.querySelector('.project-item.selected');
    if (!currentUser || !projectElement) return;
    const projectId = projectElement.dataset.projectId;
    if (!projectId) return;
    const projects = storage.getProjects(currentUser);
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    if (!Array.isArray(project.tasks)) {
    project.tasks = [];
  }
    // New order of task IDs from the DOM
    const newOrderIds = Array.from(container.querySelectorAll('li.task-item')).map(li => li.dataset.taskId);
    project.tasks.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
    storage.saveProjects(currentUser, projects);
  }
}
