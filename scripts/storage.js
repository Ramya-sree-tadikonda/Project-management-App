//localstorage(saveuser,getuser,and get allusers)
//This file handles user data store the user in localstorage,getuser,find username
//these functions will be triggred new users signed in:
console.log("storage.js loaded");
export const storage = {
    getUsers: function () {
       return JSON.parse(localStorage.getItem('users')) || [];
    }, 
    //now we will add new user to users array object:
    addNewUser:function(user1){
        const users=this.getUsers();
        users.push(user1);
        this.saveUsers(users);
    },
    saveUsers:function (users) {
            localStorage.setItem('users', JSON.stringify(users)); // converts array object to string object
    },
    findByUsername:function(username){
        return this.getUsers().find(user => user.username === username);
    },
  getProjects: function (username) {
    const allProjects = JSON.parse(localStorage.getItem('projects')) || {};
    return allProjects[username] || [];
  },
  saveProjects: function (username, projects) {
    const allProjects = JSON.parse(localStorage.getItem('projects')) || {};
    allProjects[username] = projects;
    localStorage.setItem('projects', JSON.stringify(allProjects));
  },
   

  addProject: function (username, project) {
    const projects = this.getProjects(username);
    if (!project.tasks) project.tasks = []; // Ensure 'tasks' array
    projects.push(project);
    this.saveProjects(username, projects);
  }
};

