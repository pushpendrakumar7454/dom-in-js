const bgImage = document.querySelector("#bgImage");
const greeting = document.querySelector("#greeting");
const weatherIcon = document.getElementById("weatherIcon");
const weatherText = document.querySelector("#weatherText");
const time = document.querySelector("#time");
const ampm = document.querySelector("#ampm");
const dayName = document.querySelector("#dayName");
const date = document.querySelector("#date");
const todolist = document.querySelector("#todolist");
const section = document.querySelector("section");
const overlay1 = document.querySelector("#overlay1");
const homebtn = document.querySelector(".homebtn");
const overlaygoals5 = document.querySelector("#overlaygoals5");
const homebtn1 = document.querySelector("#homebtn1");
const overlay4 = document.querySelector(".overlay4");
const backbtnhome = document.querySelector(".backhome");
const backhomebtn = document.querySelector(".backhomebtn5");

homebtn.addEventListener("click", () => {
  overlay1.style.display = "none";
  section.style.display = "initial";
});

backbtnhome.addEventListener("click", () => {
  overlay4.style.display = "none";
  section.style.display = "initial";
});

backhomebtn.addEventListener("click", () => {
  overlaygoals5.style.display = "none";
  section.style.display = "initial";
});

function updateDashboard() {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dayName.innerHTML = days[now.getDay()];
  date.innerHTML = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  let h = hour % 12;
  if (h === 0) h = 12;

  time.innerHTML = `
        ${String(h).padStart(2, "0")}:
        ${String(minute).padStart(2, "0")}:
        ${String(second).padStart(2, "0")}
        <span>${hour >= 12 ? "PM" : "AM"}</span>
    `;

  if (hour >= 5 && hour < 12) {
    bgImage.src = "./fonts/moring.png";
    greeting.innerHTML = "🌅 Good Morning";
    weatherIcon.innerHTML = "☀️";
    weatherText.innerHTML = "Morning";
  } else if (hour >= 12 && hour < 17) {
    bgImage.src = "./fonts/sunset.webp";
    greeting.innerHTML = "☀️ Good Afternoon";
    weatherIcon.innerHTML = "🌤";
    weatherText.innerHTML = "Afternoon";
  } else if (hour >= 17 && hour < 20) {
    bgImage.src = "./fonts/chand.gif";
    greeting.innerHTML = "🌇 Good Evening";
    weatherIcon.innerHTML = "🌇";
    weatherText.innerHTML = "Evening";
  } else {
    bgImage.src = "./fonts/night2.png";
    greeting.innerHTML = "🌙 Good Night";
    weatherIcon.innerHTML = "🌙";
    weatherText.innerHTML = "Night";
  }
}

updateDashboard();
setInterval(updateDashboard, 1000);
const locationname = document.querySelector("#cityname");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

async function getWeather() {
  const city = "atrauli";
  const apiKey = "f08f5635af50e7bb140f0987a044ebef";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    weatherText.textContent = data.weather[0].main;
    locationname.innerHTML = `<i class="ri-map-pin-line"></i> ${data.name}, ${data.sys.country}`;

    const condition = data.weather[0].main;

    switch (condition) {
      case "Clear":
        weatherIcon.setAttribute("src", "./fonts/sun.png");
        break;

      case "Clouds":
        weatherIcon.setAttribute("src", "./fonts/cloud.png");
        break;

      case "Rain":
        weatherIcon.setAttribute("src", "./fonts/rain.png");
        break;

      case "Thunderstorm":
        weatherIcon.setAttribute("src", "./fonts/than.png");
        break;

      case "Fog":
        weatherIcon.setAttribute("src", "./fonts/fog.png");
        break;

      default:
        weatherIcon.setAttribute("src", "./fonts/sun.png");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to fetch weather.");
  }
}

getWeather();

const todoImage = document.getElementById("todoImage");
const todoVideo = document.getElementById("todoVideo");
const todolistdiv = document.querySelector(".todolistdiv");

todoVideo.addEventListener("click", () => {
  section.style.display = "none";
  overlay1.style.display = "flex";
});

todolistdiv.addEventListener("mouseenter", () => {
  todoImage.style.display = "none";
  todoVideo.style.display = "block";
  todoVideo.play();
});

todolistdiv.addEventListener("mouseleave", () => {
  todoVideo.pause();
  todoVideo.currentTime = 0;
  todoVideo.style.display = "none";
  todoImage.style.display = "block";
});

const plandaydiv = document.querySelector(".plandaydiv");
const planimg = document.querySelector("#planimg");
const planVideo = document.querySelector("#planVideo");
const plannerCard = document.querySelector(".plandaydiv");
const plannerOverlay = document.querySelector("#plannerOverlay");
const plannerHome = document.querySelector("#plannerHome");

plandaydiv.addEventListener("mouseenter", () => {
  planimg.style.display = "none";
  planVideo.style.display = "block";
  planVideo.play();
});
plannerCard.addEventListener("click", () => {
  section.style.display = "none";
  plannerOverlay.style.display = "flex";
});

plannerHome.addEventListener("click", () => {
  plannerOverlay.style.display = "none";
  section.style.display = "block";
});

const plannerInputs = document.querySelectorAll(".plannerInput");
const saveButtons = document.querySelectorAll(".savePlanner");

let plannerData = JSON.parse(localStorage.getItem("planner")) || {};

plannerInputs.forEach((input) => {
  const hour = input.dataset.hour;

  if (plannerData[hour]) {
    input.value = plannerData[hour];
  }
});

saveButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const input = plannerInputs[index];
    const hour = input.dataset.hour;
    plannerData[hour] = input.value;
    localStorage.setItem("planner", JSON.stringify(plannerData));
    btn.innerText = "Saved ✓";
    setTimeout(() => {
      btn.innerText = "Save";
    }, 3000);
  });
});

function highlightCurrentHour() {
  const currentHour = new Date().getHours();

  document
    .querySelectorAll(".planner-row")
    .forEach((row) => row.classList.remove("current-slot"));

  plannerInputs.forEach((input) => {
    if (Number(input.dataset.hour) === currentHour) {
      input.parentElement.classList.add("current-slot");
    }
  });
}

highlightCurrentHour();
setInterval(highlightCurrentHour, 60000);

plandaydiv.addEventListener("mouseleave", () => {
  planVideo.pause();
  planVideo.currentTime = 0;
  planimg.style.display = "block";
  planVideo.style.display = "none";
});

const mylifediv = document.querySelector(".mylifediv");
const lifeimg = document.querySelector("#lifeimg");
const lifevideo = document.querySelector("#lifevideo");

const quoteOverlay = document.querySelector("#quoteOverlay");
const quoteHome = document.querySelector("#quoteHome");

const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const newQuote = document.querySelector("#newQuote");

const quoteCard = document.querySelector(".mylifediv");

quoteCard.addEventListener("click", () => {
  section.style.display = "none";

  quoteOverlay.style.display = "flex";

  getQuote();
});

quoteHome.addEventListener("click", () => {
  quoteOverlay.style.display = "none";

  section.style.display = "block";
});

async function getQuote() {
  quoteText.innerText = "Loading...";

  quoteAuthor.innerText = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quoteText.innerText = data.quote;
    quoteAuthor.innerText = "- " + data.author;
  } catch (error) {
    quoteText.innerText = "Unable to load quote.";

    quoteAuthor.innerText = "Please try again.";
  }
}

newQuote.addEventListener("click", getQuote);

mylifediv.addEventListener("mouseenter", () => {
  lifeimg.style.display = "none";
  lifevideo.style.display = "block";
  lifevideo.play();
});

mylifediv.addEventListener("mouseleave", () => {
  lifevideo.pause();
  lifevideo.currentTime = 0;
  lifevideo.style.display = "none";
  lifeimg.style.display = "block";
});

const timesessiondiv = document.querySelector(".timesessiondiv");
const timeimg = document.querySelector("#sessionimg");
const timevideo = document.querySelector("#sessionvdo");

timesessiondiv.addEventListener("mouseenter", () => {
  timeimg.style.display = "none";
  timevideo.style.display = "block";
  timevideo.play();
});

timesessiondiv.addEventListener("mouseleave", () => {
  timevideo.pause();
  timevideo.currentTime = 0;
  timevideo.style.display = "none";
  timeimg.style.display = "block";
});

timevideo.addEventListener("click", () => {
  section.style.display = "none";
  overlay4.style.display = "block";
});

const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let minutes = 25;
let seconds = 0;

let interval = null;

function updateTimer() {
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
      interval = null;
      alert("Session Completed 🎉");
      return;
    }

    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    updateTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  minutes = 25;
  seconds = 0;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimer();

const goalsdiv = document.querySelector(".goalsdiv");
const goalsimg = document.querySelector("#goalsimg");
const goalsvideo = document.querySelector("#goalsvvdo");

goalsvideo.addEventListener("click", () => {
  section.style.display = "none";
  overlaygoals5.style.display = "flex";
});

goalsdiv.addEventListener("mouseenter", () => {
  goalsimg.style.display = "none";
  goalsvideo.style.display = "block";
  goalsvideo.play();
});

goalsdiv.addEventListener("mouseleave", () => {
  goalsvideo.pause();
  goalsvideo.currentTime = 0;
  goalsvideo.style.display = "none";
  goalsimg.style.display = "block";
});

const todoForm = document.querySelector("#todoForm");
const parenttask = document.querySelector(".parenttask");
const input = document.querySelector("#todoinput");
const totalTask = document.querySelector(".totalTask");
let completed = document.querySelector(".comletes");
const pending = document.querySelector(".pending");
const goalTextarea = document.querySelector("#todotextarea");
let totalmark = document.querySelector(".totalmark");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  parenttask.innerHTML = "";
  tasks.forEach((elem, idx) => {
    parenttask.innerHTML += ` <div class="taskcom" id="cardTask">
            <div class="task">
                <h2>${elem.id}</h2>
                <h3 class="${elem.completed ? "completed" : ""} ${elem.important ? "important" : ""}">${elem.value}</h3>
                <h3 class="${elem.completed ? "completed" : ""} ${elem.important ? "important" : ""}" id="textareateext">
                    ${elem.textareaValue}
                </h3>
            </div>
            <div class="task-btn buttntop">
                <div class="twobtn">
                <button  class="clickbtnli"  id="allbtnclick1" onclick="completeTask(${idx})" > ${elem.completed ? "Undo" : "Complete"}</button>
                <button class="clickbtnli" id="allbtnclick2" onclick="editTask(${idx})">Edit</button>
                </div>
               <div class="twobtn">
                <button class="clickbtnli" id="allbtnclick3" onclick="deleteTask(${idx})"> Delete</button>
               <button class="clickbtnli" id="allbtnclick4" onclick="markTask(${idx})">${elem.important ? "Unmark" : "Mark"}</button>
               </div>
            </div>
        </div>
    `;
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let value = input.value;
  let textareaValue = goalTextarea.value;

  let id = Math.floor(Math.random() * 100);
  if (value == null || value.trim() === "") return;
  tasks.push({
    value,
    textareaValue,
    id,
    completed: false,
    important: false,
  });
  console.log(textareaValue);
  addTask();
  totalTaskall();
  completedTaskAll();
  pendingTaskAll();
  saveTask();
  updateUI();

  todoForm.reset();
});

function deleteTask(idx) {
  tasks.splice(idx, 1);
  addTask();
  saveTask();
  updateUI();
}

function editTask(idx) {
  if (tasks[idx].completed) {
    alert("Task is allready completed. it can not be edit!");
    return;
  }
  let newValue = prompt("Edit task", tasks[idx].value);
  let newText=prompt("edit detail",tasks[idx].textareaValue)
  if (newValue === null || newValue.trim() === "") return;
  tasks[idx].value = newValue;
  tasks[idx].textareaValue=newText
  addTask();
  saveTask();
  updateUI();
}

function completeTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  addTask();
  completedTaskAll();
  saveTask();
  updateUI();
}

function totalTaskall() {
  let task = tasks.length;
  totalTask.textContent = task;
  addTask();
  saveTask();
}

function completedTaskAll() {
  let completedCount = tasks.filter((task) => task.completed).length;
  completed.textContent = completedCount;
  addTask();
  saveTask();
}

function pendingTaskAll() {
  let pendingCount = tasks.filter((task) => !task.completed).length;
  pending.textContent = pendingCount;
  addTask();
  saveTask();
}

function markTask(idx) {
  tasks[idx].important = !tasks[idx].important;
  console.log(tasks[idx]);

  addTask();
  saveTask();
  updateUI();
}

function totalMark() {
  totalmark.textContent =
    tasks.length - tasks.filter((mark) => !mark.important).length;
  addTask();
  saveTask();
}

function updateUI() {
  addTask();
  totalTaskall();
  completedTaskAll();
  pendingTaskAll();
  totalMark();
  saveTask();
}

addTask();
totalTaskall();
completedTaskAll();
pendingTaskAll();

const goalsDiv = document.querySelector("#prentgoals");
const goalsForm = document.querySelector("#goalsForm");
const goalsInput = document.querySelector("#goalsinput");
const totalgoals = document.querySelector(".totalgoals");
const completedgoal = document.querySelector(".comletesgoals");
const pendinggoal = document.querySelector(".pendinggoal");
let goalstextarea = document.querySelector("#goalstextareaaa");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function addGoals() {
  goalsDiv.innerHTML = "";

  goals.forEach((goal, idx) => {
    goalsDiv.innerHTML += `
        <div class="taskcom" id="taskcard">
            <div class="task">
                <h2>${goal.idgoal}</h2>
                <h3 class="${goal.completedgoal ? "completed" : ""}">
                    ${goal.goalValue}
                </h3>
                <h3 class="${goal.completedgoal ? "completed" : ""}" id="textareateext">
                    ${goal.goalText}
                </h3>
            </div>

            <div class="task-btn">
                <button class="clickbtnli" onclick="completeGoal(${idx})">
                    ${goal.completedgoal ? "Undo" : "Complete"}
                </button>

                <button class="clickbtnli" onclick="editGoal(${idx})">
                    Edit
                </button>

                <button class="clickbtnli" onclick="deleteGoal(${idx})">
                    Delete
                </button>
            </div>
        </div>
        `;
  });
}

goalsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let value = goalsInput.value.trim();
  let textValuegoal = goalstextarea.value.trim();

  if (value === "" || textValuegoal === "") return;
  goals.push({
    idgoal: Math.floor(Math.random() * 100),
    goalValue: value,
    goalText: textValuegoal,
    completedgoal: false,
  });

  console.log(textValuegoal);

  updateGoalsUI();
  goalsForm.reset();
});

function deleteGoal(idx) {
  goals.splice(idx, 1);
  updateGoalsUI();
}

function editGoal(idx) {
  if (goals[idx].completedgoal) {
    alert("Completed goal cannot be edited.");
    return;
  }
  let newGoal = prompt("Edit Goal", goals[idx].goalValue);
  let newTextArea=prompt("Edit detail",goals[idx]. goalText)

  if (newGoal === null || newGoal.trim() === "") return;

  goals[idx].goalValue = newGoal;
  goals[idx]. goalText=newTextArea;

  updateGoalsUI();
}

function completeGoal(idx) {
  goals[idx].completedgoal = !goals[idx].completedgoal;
  updateGoalsUI();
}

function totalGoalsAll() {
  totalgoals.textContent = goals.length;
}

function completedGoalsAll() {
  completedgoal.textContent = goals.filter((goal) => goal.completedgoal).length;
}

function pendingGoalsAll() {
  pendinggoal.textContent = goals.filter((goal) => !goal.completedgoal).length;
}

function updateGoalsUI() {
  addGoals();
  totalGoalsAll();
  completedGoalsAll();
  pendingGoalsAll();
  saveGoals();
}

updateGoalsUI();

const themeToggle = document.querySelector("#themeToggle");

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = "🌙";
  } else {
    document.body.classList.remove("dark");

    themeToggle.innerHTML = "☀️";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = "🌙 ";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = "☀️";
  }
}

themeToggle.addEventListener("click", toggleTheme);

loadTheme();

document.body.style.transition = ".3s";
