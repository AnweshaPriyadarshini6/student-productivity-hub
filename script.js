// TASKS

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

function renderTasks(){

const taskList =
document.getElementById("taskList");

taskList.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

if(task.done) completed++;

const li=document.createElement("li");

li.innerHTML=`
<div>
<input
type="checkbox"
${task.done ? "checked" : ""}
onchange="toggleTask(${index})">

<span class="${
task.done ? "completed" : ""
}">
${task.text}
</span>

<small>(${task.category})</small>
</div>

<button onclick="deleteTask(${index})">
❌
</button>
`;

taskList.appendChild(li);

});

document.getElementById("progress").textContent=
`Completed: ${completed} / ${tasks.length}`;
}

function addTask(){

const taskText=
document.getElementById("taskInput").value;

const category=
document.getElementById("category").value;

if(taskText.trim()==="") return;

tasks.push({
text:taskText,
category:category,
done:false
});

saveTasks();
renderTasks();

document.getElementById("taskInput").value="";
}

function toggleTask(index){

tasks[index].done=
!tasks[index].done;

saveTasks();
renderTasks();
}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
renderTasks();
}

function deleteAllTasks(){

if(confirm("Delete all tasks?")){

tasks=[];

saveTasks();
renderTasks();

}
}

// NOTES

const notes =
document.getElementById("notes");

function saveNotes(){

localStorage.setItem(
"notes",
notes.value
);

alert("Notes Saved!");
}

// POMODORO

let time=1500;
let timer;

function updateTimer(){

const minutes=
Math.floor(time/60);

const seconds=
time%60;

document.getElementById("timer").textContent=
`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function startTimer(){

clearInterval(timer);

timer=setInterval(()=>{

if(time>0){

time--;
updateTimer();

}else{

clearInterval(timer);
alert("Time's Up!");

}

},1000);
}

function resetTimer(){

clearInterval(timer);

time=1500;

updateTimer();
}

// EXAM COUNTDOWN

function calculateCountdown(){

const examDate=
new Date(
document.getElementById("examDate").value
);

const today=
new Date();

const diff=
examDate-today;

const days=
Math.ceil(
diff/(1000*60*60*24)
);

document.getElementById(
"countdownResult"
).textContent=
`${days} day(s) remaining`;
}

// DARK MODE

function toggleDarkMode(){

document.body.classList.toggle(
"dark-mode"
);

localStorage.setItem(
"darkMode",
document.body.classList.contains(
"dark-mode"
)
);
}

// ON LOAD

window.onload=()=>{

notes.value=
localStorage.getItem("notes") || "";

if(
localStorage.getItem("darkMode")
==="true"
){
document.body.classList.add(
"dark-mode"
);
}

renderTasks();
updateTimer();
};