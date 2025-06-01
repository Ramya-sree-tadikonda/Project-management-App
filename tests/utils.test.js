import { getCurrentUser, getStorage, saveStorage } from '../dashboard/utils.js';

beforeEach(() => localStorage.clear());

test('getCurrentUser returns correct user', () => {
  localStorage.setItem('currentUser', 'demo');
  expect(getCurrentUser()).toBe('demo');
});

test('saveStorage and getStorage work correctly', () => {
  saveStorage('key', { a: 1 });
  expect(getStorage('key')).toEqual({ a: 1 });
});
