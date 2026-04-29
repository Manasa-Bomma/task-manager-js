let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("empty-state");

// Initial Load
function init() {
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    checkEmpty();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
        const li = document.createElement("li");
        li.className = "task";

        const now = new Date(taskObj.date);
        const day = now.toLocaleDateString("en-US", { weekday: "short" });
        const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        li.innerHTML = `
            <div class="task-main">
                <input type="checkbox" ${taskObj.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                <p class="task-text ${taskObj.completed ? 'completed' : ''}">${taskObj.text}</p>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
            <div class="dateSpan today">${day}, ${time}</div>
        `;
        taskList.appendChild(li);
    });
    checkEmpty();
}

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({
        text: text,
        completed: false,
        date: new Date().toISOString()
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function checkEmpty() {
    emptyState.style.display = tasks.length === 0 ? "block" : "none";
}

// Event Listeners
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

init();
