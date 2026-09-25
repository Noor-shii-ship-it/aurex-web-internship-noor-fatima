console.log("Week 4 JavaScript is working!");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskError = document.getElementById("task-error");
let tasks = [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
    taskError.textContent = "Please enter a task.";
    return;
}

taskError.textContent = "";
    const taskItem = document.createElement("li");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", function () {
        taskTextElement.classList.toggle("completed");
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
        const updatedTask = prompt(
            "Edit your task:",
            taskTextElement.textContent
        );

        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskTextElement.textContent = updatedTask.trim();
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        taskItem.remove();

        if (taskList.children.length === 0) {
            emptyMessage.style.display = "block";
        }
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
tasks.push({
    text: taskText,
    completed: false
});

saveTasks();
    taskList.appendChild(taskItem);

    taskInput.value = "";
    emptyMessage.style.display = "none";
});
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    tasks.forEach(function (task, index) {
        const taskItem = document.createElement("li");

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = task.text;

        if (task.completed) {
            taskTextElement.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            const updatedTask = prompt(
                "Edit your task:",
                task.text
            );

            if (updatedTask !== null && updatedTask.trim() !== "") {
                task.text = updatedTask.trim();
                saveTasks();
                renderTasks();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(completeButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}
loadTasks();
renderTasks();
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        const tasks = taskList.querySelectorAll("li");

        tasks.forEach(function (task) {
            const taskTextElement = task.querySelector("span");
            const isCompleted =
                taskTextElement.classList.contains("completed");

            if (filter === "all") {
                task.style.display = "";
            } else if (filter === "active") {
                task.style.display = isCompleted ? "none" : "";
            } else if (filter === "completed") {
                task.style.display = isCompleted ? "" : "none";
            }
        });

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});