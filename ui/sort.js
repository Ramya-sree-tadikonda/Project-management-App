import { renderTasks } from '../dashboard/tasks.js';
import { storage } from '../scripts/storage.js';
export function sortTasks(tasks = [], sortBy = "name") {
  if (!Array.isArray(tasks)) return [];
  const sorted = [...tasks]; 
  sorted.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "priority") return a.priority.localeCompare(b.priority);
    return 0;
  });

  return sorted;
}
