let form=document.querySelector('form')
let input=document.querySelector('input')
let allTask=document.querySelector('.parenttask')
let totalTask=document.querySelector('#totaltask')
let completedTask=document.querySelector('#completedtask')
let pendingTask=document.querySelector('#pendingtask');


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let taskCreate=()=>{
    allTask.innerHTML=""
    tasks.forEach((elem,idx)=>{
    allTask.innerHTML+=`
    <div class="taskcom">
            <div class="task">
                <h2>${elem.id}</h2>
                <h3 class="${elem.completed?"completed":''}">${elem.value}</h3>
            </div>
            <div class="task-btn">
                <button onclick="completeTask(${idx})" class="clickbtnli">Complete</button>
                <button  onclick="editTask(${idx})" class="clickbtnl"i>Edit</button>
                <button class="dltbtn" onclick="deleteBtn(${idx})" class="clickbtnli">
                    Delete
                </button>
            </div>
        </div>
    `
})
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let randomId=Math.floor(Math.random()*100)+1
     let value=input.value
     if(value==null || value.trim()==="") return
    tasks.push({
    id: randomId,
    value,
    completed: false
    })

    taskCreate()
    saveTasks();
    alltotalTask()
     allPendingTask()
    allCompletedTask()

    form.reset()
})


let deleteBtn=(idx)=>{
    tasks.splice(idx,1)
    taskCreate()
    alltotalTask()
    allCompletedTask()
     allPendingTask()
     saveTasks();
}

let editTask=(idx)=>{
    if(tasks[idx].completed){
        alert("Task is allready completed. it can not be edit!")
        return
    }
    let newValue=prompt("edit Task",tasks[idx].value)
    if(newValue===null || newValue.trim()==='') return
    tasks[idx].value=newValue
    taskCreate()
    allCompletedTask()
     allPendingTask()
     saveTasks();
}
let completeTask=(idx)=>{
    tasks[idx].completed=!tasks[idx].completed
    taskCreate()
    allCompletedTask()
     allPendingTask()
    saveTasks();
}

let alltotalTask=(idx)=>{
    let task=tasks.length
    totalTask.textContent=task
    taskCreate()
     allPendingTask()
     saveTasks();
}


let allCompletedTask=()=>{
    let completedCount=tasks.filter((task)=>task.completed).length
    completedTask.textContent=completedCount
    taskCreate()
    allPendingTask()
    saveTasks();
}

let allPendingTask=()=>{
    pendingTask.textContent=tasks.length-tasks.filter((task)=>task.completed).length
    saveTasks();
}

taskCreate()

const logContainer =
document.getElementById("logContainer");

function addLog(text){
const div =
document.createElement("div");

div.textContent = text;
logContainer.appendChild(div);
}

document
.getElementById("bubbleBtn")
.addEventListener("click",()=>{

addLog("Child → Parent → Grandparent");
});

document
.getElementById("captureBtn")
.addEventListener("click",()=>{

addLog("Grandparent → Parent → Child");
});

document
.getElementById("clearBtn")
.addEventListener("click",()=>{

logContainer.innerHTML="";
});



let themeBtn = document.getElementById("themeToggle");


if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    themeBtn.textContent = "☀️ Light";
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        localStorage.setItem("theme","light");
        themeBtn.textContent = "☀️ Light";
    }else{
        localStorage.setItem("theme","dark");
        themeBtn.textContent = "🌙 Dark";
    }

});


