import { getUserTasks, saveUserTasks } from '../dashboard/tasks.js';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('currentUser', 'user1');
});

test('saveUserTasks and getUserTasks work', () => {
  const tasks = [{ id: 't1', name: 'Task 1' }];
  saveUserTasks('p1', tasks);
  expect(getUserTasks('p1')).toEqual(tasks);
});
