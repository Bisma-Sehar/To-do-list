const body = document.body;
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const categoryInput = document.getElementById('category');

window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) taskList.innerHTML = saved;
};

function addTask() {
  const task = taskInput.value.trim();
  const date = dueDateInput.value;
  const category = categoryInput.value;

  if (task === '') return;

  const li = document.createElement('li');

  li.innerHTML = `
    <div class="task-top">
      <span class="task-text">${task}</span>
      <div class="task-controls">
        <button class="done-btn" onclick="toggleDone(this)">✓</button>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      </div>
    </div>
    <div class="task-info">
      ${category ? `📁 ${category}` : ''} ${date ? `| 📅 ${date}` : ''}
    </div>
  `;
  taskList.appendChild(li);

  taskInput.value = '';
  dueDateInput.value = '';
  categoryInput.value = '';
  saveTasks();
}

function deleteTask(btn) {
  btn.closest('li').remove();
  saveTasks();
}

function toggleDone(btn) {
  btn.closest('li').classList.toggle('done');
  saveTasks();
}

function editTask(btn) {
  const li = btn.closest('li');
  const textSpan = li.querySelector('.task-text');
  const currentText = textSpan.textContent;

  const newText = prompt("Edit your task:", currentText);
  if (newText !== null && newText.trim() !== "") {
    textSpan.textContent = newText.trim();
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function toggleTheme() {
  body.classList.toggle('dark-mode');
}