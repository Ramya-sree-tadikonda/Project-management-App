import { getUserTasks, saveUserTasks, renderTasks } from './tasks.js';
import { getCurrentUser } from './utils.js';

function getCurrentProjectId() {
  const selected = document.querySelector('.project-item.selected');
  return selected?.dataset.projectId || null;
}
export function setupTaskActions() {
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  if (!addTaskBtn || !taskList) return;
  addTaskBtn.addEventListener('click', () => {
    const projectId = getCurrentProjectId();
    if (!projectId) {
      alert('Select a project first.');
      return;
    }
    const taskNameInput = document.getElementById('newTaskName');
    const taskStatusInput = document.getElementById('taskStatus');
    const taskDueDateInput = document.getElementById('taskDueDate');
    const taskPriorityInput = document.getElementById('taskPriority');

    const taskName = taskNameInput.value.trim();
    const status = taskStatusInput.value ;
    const dueDate = taskDueDateInput.value;
    const priority = taskPriorityInput.value ;

if (!taskName || !status || !priority || !dueDate) {
  alert('Please enter all task details: Name, Status, Priority, and Due Date.');
  return;
}
    const newTask = {
  id: `t${Date.now()}`,
  name: taskName.trim(),
  status: status,
  dueDate: dueDate,
  priority: priority  
};
  alert("Task added successfully");
    const tasks = getUserTasks(projectId);
    tasks.push(newTask);
    saveUserTasks(projectId, tasks);
    renderTasks(projectId);
    // Clear input fields
    taskNameInput.value = '';
    taskStatusInput.value = 'status';
    taskDueDateInput.value = '';
    taskPriorityInput.value = 'priority';
  });
  document.addEventListener('click', function (e) {
    const projectId = getCurrentProjectId();
    if (!projectId) return;
    let tasks = getUserTasks(projectId);   
    if (e.target.classList.contains('edit-task')) {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;
   // Prevent multiple edit forms
      if (taskItem.querySelector('.edit-form')) return;
      const taskId = taskItem.dataset.taskId;
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      // Create editable form fields
      const editForm = document.createElement('div');
      editForm.classList.add('edit-form');
      editForm.style.marginTop = '10px';
      editForm.innerHTML = `
        <select class="edit-status">
          <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
        <input type="date" class="edit-date" value="${task.dueDate !== 'N/A' ? task.dueDate : ''}">
        <select class="edit-priority">
          <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
          <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
          <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
        </select>
        <button class="save-edit">Save</button>
        <button class="cancel-edit">Cancel</button>
      `;
      taskItem.appendChild(editForm);
    }
    // Save edited task
    if (e.target.classList.contains('save-edit')) {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;
      const taskId = taskItem.dataset.taskId;
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      const newStatus = taskItem.querySelector('.edit-status').value;
      const newDate = taskItem.querySelector('.edit-date').value || 'N/A';
      const newPriority = taskItem.querySelector('.edit-priority').value;
      // Update task object
      task.status = newStatus;
      task.dueDate = newDate;
      task.priority = newPriority;
      // Save updated tasks list
      saveUserTasks(projectId, tasks);
      // Re-render tasks to reflect changes
      renderTasks(projectId);
    } 
    if (e.target.classList.contains('cancel-edit')) {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;
      const editForm = taskItem.querySelector('.edit-form');
      if (editForm) editForm.remove();
    }
    if (e.target.classList.contains('delete-task')) {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) return;
      const taskId = taskItem.dataset.taskId;
      if (confirm('Delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveUserTasks(projectId, tasks);
        renderTasks(projectId);
      }
    }
  });
}
