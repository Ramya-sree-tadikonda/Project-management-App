const auth=document.getElementById('auth-section');
const appContainer = document.querySelector('.container');
const header = document.querySelector('header');
const logoutBtn = document.getElementById('btn-logout');

const loginCard = document.getElementById('login-card');
const signupCard = document.getElementById('signup-card');

const confirmPassword=document.getElementById('confirm-password');

const loginButton=document.getElementById('login');
const signupButton=document.getElementById('signup');
const linktosignup=document.getElementById('link-to-signup');
const linktologin=document.getElementById('link-to-login');

linktosignup.addEventListener('click',()=>{
    loginCard.style.display='none';
    signupCard.style.display='block';
});

linktologin.addEventListener('click',()=>{
    loginCard.style.display='block';
    signupCard.style.display='none';
});

loginButton.addEventListener('click',()=>{
    const username=document.getElementById('lUsername').value;
    const password=document.getElementById('lPassword').value;
    if(username&&password){
        loginSuccess(username);//calls this function

    }else{
        alert("enter valid username and password");
    }
});

signupButton.addEventListener('click', () => {
    const username = document.getElementById('sUsername').value;
    const password = document.getElementById('sPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (username && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
        } else {
            alert("Signup successful! Please login.");
            loginCard.style.display = 'block';
            signupCard.style.display = 'none';
        }
    } else {
        alert("Please fill all fields.");
    }
});
 
function loginSuccess(username){
    if(username){
        localStorage.setItem('currentUser',username);
        auth.style.display='none';
        header.style.display = 'flex';
        appContainer.style.display = 'flex';
        logoutBtn.style.display = 'inline-block';

    }
}

logoutBtn.addEventListener('click',()=>{
    localStorage.removeItem('currentUser'); //local storage is built in object in js and is used in webstorageAPI and also store data in the browser
    //This effectively logs out the user by clearing the saved login info (username).
    location.reload();//Refreshes the current webpage

});

//auto login
window.addEventListener('DOMContentLoaded',()=>{
    const user=localStorage.getItem('currentUser');
    if(user){
       loginSuccess(user);
    }else{
        auth.style.display='flex';
        header.style.display = 'none';
        appContainer.style.display = 'none';
      

    }
});


