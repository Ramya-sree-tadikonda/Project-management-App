import { getCurrentUser, getStorage, saveStorage } from './utils.js';
import { enableDragAndDrop } from './taskDragDrop.js';


export const getUserTasks = (projectId) => {
  if (!projectId) return [];
  const allTasks = getStorage('tasks');
  const user = getCurrentUser();
  return (allTasks[user] && allTasks[user][projectId]) || [];
};

export const saveUserTasks = (projectId, tasks) => {
  if (!projectId) return;
  const allTasks = getStorage('tasks');
  const user = getCurrentUser();
  if (!allTasks[user]) allTasks[user] = {};
  allTasks[user][projectId] = tasks;
  saveStorage('tasks', allTasks);
};
export function renderTasks(projectId) {
  const taskList = document.getElementById('taskList');
  const template = document.getElementById('task-item-template');
   if (!taskList || !template) return;
taskList.innerHTML = '';

 const tasks = getUserTasks(projectId);
 if (!tasks || tasks.length === 0) {  
    taskList.textContent = 'No tasks are added ';
    return;
  }
  tasks.forEach((task, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');  
    const id = task.id || `t${Date.now()}${index}`;
    const name = task.name || 'Untitled Task';
    const status = task.status || 'Pending';
    const dueDate = task.dueDate || 'N/A';
    const priority = task.priority || 'Low';
    li.dataset.taskId = id;
    li.querySelector('.task-name').textContent = name;
    li.querySelector('.task-status').textContent = `Status: ${status}`;;
    li.querySelector('.task-dueDate').textContent = `(Due: ${dueDate})`;
    li.querySelector('.task-priority').textContent = `Priority: ${priority}`;

    taskList.appendChild(clone);
  });
  enableDragAndDrop('#taskList');
}
