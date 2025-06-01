export function filterTasks(tasks = [], query = "", status = "All", priority = "All") {
  if (!Array.isArray(tasks)) {
    console.warn("⚠️ filterTasks called with non-array:", tasks);
    return [];
  }

  return tasks.filter(task =>
    task.name.toLowerCase().includes(query.toLowerCase()) &&
    (status === "All" || task.status === status) &&
    (priority === "All" || task.priority === priority)
  );
}
