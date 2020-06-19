const dateElement=document.getElementById("date");
const taskInput=document.querySelector(".task-input");
const taskButton=document.querySelector(".task-button");
const taskList=document.querySelector(".task-list");
const filterOption=document.querySelector(".filter-task");

document.addEventListener("DOMContentLoaded",getTasks);
taskButton.addEventListener("click",addTask);
taskList.addEventListener("click",deletecheck);
filterOption.addEventListener("click",filterTask);

//show todays date
const options = {weekday:"long",month:"short",day:"numeric"};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);

function addTask(event){
    event.preventDefault();
    //div section
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //li part
    const newTask = document.createElement("li");
    newTask.innerText=taskInput.value;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    //button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    //button trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    taskDiv.appendChild(trashButton);
    //append to the list
    taskList.appendChild(taskDiv);
    //clear input value
    taskInput.value="";
}
function deletecheck(e){
    const item = e.target;
    //for delete
    if(item.classList[0] == 'trash-btn'){
        const task = item.parentElement;
        task.classList.add("fall");
        removeLocalTasks(task);
        task.addEventListener("transitioned",function(){
            task.remove()
        });
    }
    if(item.classList[0] == 'complete-btn'){
        const task = item.parentElement;
        task.classList.toggle('completed');
    }

}
function filterTask(e){
    const tasks = taskList.childNodes;
    tasks.forEach(function(task){
       switch(e.target.value){
           case "all":
                task.style.display = "flex";
                break;
            case "completed":
                if(task.classList.contains("completed")){
                    task.style.display = "flex";
                }else{
                    task.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!task.classList.contains("completed")){
                    task.style.display = "flex";
                }else{
                    task.style.display = "none";
                }
                break;       
       } 
    });
}
//save localstorage process
function saveLocalTask(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
         //to add div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //li part
    const newTask = document.createElement("li");
    newTask.innerText=task;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);
    //button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);
    //button trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    taskDiv.appendChild(trashButton);
    //append to the list
    taskList.appendChild(taskDiv);
    });
}
function removeLocalTasks(task){
    let tasks;
    if(localStorage.getItem("tasks")==null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex),1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
