export const getCurrentUser = () => localStorage.getItem('currentUser');
export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || {};
export const saveStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
