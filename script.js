let tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

function updateTimeDate(){
    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleTimeString("en-IN");
    document.getElementById("date").innerText = now.toLocaleDateString("en-IN", { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateTimeDate, 1000);

function addTask() {
    let subject = document.getElementById("subject").value;
    let task = document.getElementById("task").value;
    let time = document.getElementById("times").value;

    if(!subject || !task || !time) return alert("Fill all fields!");

    const newTask = {
        id: Date.now(),
        subject,
        task,
        time,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    
    // Clear inputs
    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("times").value = "";
}

function saveAndRender() {
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const history = document.getElementById("taskHistory");
    list.innerHTML = "";
    history.innerHTML = "";

    let completedCount = 0;

    tasks.forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${t.subject}</strong><br>
                <small>${t.task} (${t.time}m)</small>
            </div>
            <div>
                ${!t.completed ? `<button onclick="toggleTask(${t.id})" style="background:#22c55e; margin-right:5px">✔️</button>` : ''}
                <button onclick="deleteTask(${t.id})" style="background:#ef4444">❌</button>
            </div>
        `;

        if(t.completed) {
            completedCount++;
            history.appendChild(li);
        } else {
            list.appendChild(li);
        }
    });

    const total = tasks.length;
    document.getElementById("progress").innerText = `Completed ${completedCount} / ${total}`;
    const percent = total === 0 ? 0 : (completedCount / total) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = true;
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// Initial Load
renderTasks();
updateTimeDate();