import { storage } from './storage.js';
console.log("auth.js loaded");
export function initAuth(){
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");

  const bcrypt = dcodeIO.bcrypt;  
  const auth = document.getElementById('auth-section');
  const appContainer = document.querySelector('.container');
  const header = document.querySelector('header');
  const logoutBtn = document.getElementById('btn-logout');
  const loginCard = document.getElementById('login-card');
  const signupCard = document.getElementById('signup-card');
  const usernameInput = document.getElementById('signup-username');
const passwordInput = document.getElementById('signup-password');
const confirmInput = document.getElementById('confirm-password');
  const loginButton = document.getElementById('login');
  const signupButton = document.getElementById('signup');
  const linktosignup = document.getElementById('link-to-signup');
  const linktologin = document.getElementById('link-to-login');

  linktosignup.addEventListener('click', () => {
    loginCard.style.display = 'none';
    signupCard.style.display = 'block';
  });

  linktologin.addEventListener('click', () => {
    loginCard.style.display = 'block';
    signupCard.style.display = 'none';
  });

  // wrap bcrypt.hash in a Promise to use async/await
  function hashPassword(password, saltRounds = 10) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  }

  // wrap bcrypt.compare in a Promise to use async/await
  function comparePassword(password, hashed) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashed, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // LOGIN HANDLER with bcrypt
  loginButton.addEventListener('click', async () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (!username || !password) {
      alert("Enter valid username and password");
      return;
    }
    const user = storage.findByUsername(username);
    if (!user) {
      alert("User not found please signup");
      return;
    }
    try {
      const match = await comparePassword(password, user.password);
      if (!match) {
        alert("Invalid credentials please signup!");
        return;
      }
      loginSuccess(username);
    } catch (err) {
      console.error("Error comparing passwords", err);
      alert("Login failed due to an error.");
    }
  });

  // SIGNUP HANDLER with bcrypt
  signupButton.addEventListener('click', async () => {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (storage.findByUsername(username)) {
      alert("Username already exists.");
      return;
    }
    try {
      const hashedPassword = await hashPassword(password, 10);
      const newUser = {
        id: Date.now().toString(),
        username: username,
        password: hashedPassword
      };

      storage.addNewUser(newUser); 
       // Clear fields
      usernameInput.value = '';
        passwordInput.value = '';
        confirmInput.value = '';
      alert("Signup successful!");
              loginSuccess(username);
      } catch (err) {
        console.error("Error hashing password", err);
        alert("Signup failed due to an error.");
      }
    });

  function loginSuccess(username) {
    if (username) {
      localStorage.setItem('currentUser', username);
      auth.style.display = 'none';
      header.style.display = 'flex';
      appContainer.style.display = 'flex';
      logoutBtn.style.display = 'inline-block';  
      const userProjects = storage.getProjects(username);
      if (typeof window.renderProjects === 'function') {
        window.renderProjects(userProjects);
      } else {
        console.warn("⚠️ renderProjects() not found");
      }
    }
  }

  
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
  });
  // auto login
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    loginSuccess(currentUser);
    console.log("Forced UI to be visible");
  } else {
    auth.style.display = 'flex';
    header.style.display = 'none';
    appContainer.style.display = 'none';
    console.log("Showing login/signup UI");
  }
});
}
