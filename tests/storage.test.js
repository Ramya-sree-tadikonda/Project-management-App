import { storage } from '../scripts/storage.js';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('currentUser', 'user1');
});

test('saveProjects and getProjects work', () => {
  const data = [{ id: 'p1', name: 'Test' }];
  storage.saveProjects('user1', data);
  expect(storage.getProjects('user1')).toEqual(data);
});
