const timeoutMinutes = 10;

function updateActivity() {
  localStorage.setItem('lastActive', Date.now());
}

export function sessionTimeout() {
  const now = Date.now();
  const last = parseInt(localStorage.getItem('lastActive')) || now;
  if (now - last > timeoutMinutes * 60 * 1000) {
    alert("Session expired, please log in again!");
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
}