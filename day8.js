
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let input = document.querySelector(".input");

let arrayOfTasks = []; 
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getData();


tasksDiv.addEventListener("click", (e) => {
    //Delete Button
    if (e.target.classList.contains("del")) {
        deleteByID(e.target.parentElement.getAttribute("data_id"));
      e.target.parentElement.remove();
    }

    // Task Element
    if (e.target.classList.contains("task")) {
      toggleById(e.target.getAttribute("data_id"));
      e.target.classList.toggle("done");
    }
  });


function addTask(taskText){
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    console.log(arrayOfTasks);
    show(arrayOfTasks);
    addLocal(arrayOfTasks);
}


submit.onclick = function (){
    if(input.value != ""){
        addTask(input.value);
        input.value = "";
    }
};

function show(arrayOfTasks){
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach(element => {
     let div = document.createElement("div");
     div.className = "task";

    if(element.completed == true){
       div.className = "task done"
     }
     div.setAttribute("data_id", element.id);
     div.appendChild(document.createTextNode(element.title));
     console.log(div);
     let span = document.createElement("span");
     span.className = "del";
     span.appendChild(document.createTextNode("Delete"));
     div.appendChild(span);
    //  console.log(div);
    tasksDiv.appendChild(div);

});
}
// add to local storage
function addLocal(arrayOfTasks){
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getData(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        show(tasks);

    }
}
function deleteById(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addLocal(arrayOfTasks);
}
function toggleById(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addLocal(arrayOfTasks);
}