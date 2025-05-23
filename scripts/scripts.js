const sampleProjects=[
    {id:'p1',name:'personalwebsite'},
    {id:'p2',name:'Finance compaign'},
    {id:'p3',name:'Dashboard redesign'}
];

const project1=document.getElementById('projects-lists');
const dashboard=document.getElementById('Dashboard');

//this function is about adding all li under ul 
function renderProjects(projects){
   project1.innerHTML=''; // Clear previous items
   projects.forEach(project => {
    const li=document.createElement('li');
    li.textContent=project.name;
    li.dataset.projectId=project.id;//project.id helps identify which project this list item represents.
    //and are a way to store extra information directly on HTML elements.
    li.classList.add('project-item');//assigns a class for styling and interaction.
    project1.appendChild(li);//inserts the elements li on the web page
   });
}
function highlightSelectedProject(selectID){
    const allItems=document.querySelectorAll('.project-item');//projectItem=it selects all li's that have class Name =project item
    allItems.forEach(item=>{
     item.classList.remove('active');
     if(item.dataset.projectId === selectID){
        item.classList.add('active');
     }
    });
    }
function showProjectDashboard(project){ //defined the function that recieves that object
dashboard.innerHTML=`<h2>${project.name}</h2>
<p>Tasks for this project will appear here.</p>`;
}

project1.addEventListener('click',(e)=>{ //this is used when user cliscks on 
    //any of the project the corresponding project information is shown and instead of using addeventlisteners on each li 
    //I was using for <ul id="projects-list">so that if any clicks happened individually it detects 
    //this is event delegation
    if(e.target.matches('.project-item')){//responds only user clicked on on a valid project item not any other clicks
       const selectID=e.target.dataset.projectId; //retrives specific projectID that was stored in dataset and tells which project clicked
       const selectedProject=sampleProjects.find(p=>p.id===selectID);
       highlightSelectedProject(selectID);
       showProjectDashboard(selectedProject);//calls the function
    }
    });
  
renderProjects(sampleProjects);