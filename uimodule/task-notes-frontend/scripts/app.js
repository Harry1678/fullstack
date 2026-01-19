import { getTasks, deleteTask, updateTask } from "./api.js";

const taskList = document.querySelector(".task-list");
const loading = document.querySelector(".loading-state");
const error = document.querySelector(".error-state");

async function loadTasks() {
  loading.hidden = false;
  error.hidden = true;

  try {
    const tasks = await getTasks();
    renderTasks(tasks);
  } catch (err) {
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
}
function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""}`;

    card.innerHTML = `
      <p class="task-title">${task.title}</p>
      <div class="task-actions">
        <button class="btn-icon complete-btn">✓</button>
        <button class="btn-icon danger delete-btn">🗑</button>
      </div>
    `;

    card.querySelector(".complete-btn").addEventListener("click", async () => {
      await updateTask(task.id, { completed: !task.completed });
      loadTasks();
    });

    card.querySelector(".delete-btn").addEventListener("click", async () => {
      const confirmed = confirm("Delete this task?");
      if (!confirmed) return;

      await deleteTask(task.id);
      loadTasks();
    });

    taskList.appendChild(card);
  });
}
loadTasks();
