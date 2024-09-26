// находим элементы на странице

const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `
    
                  <li id = '${task.id}'class="list-group-item d-flex justify-content-between task-item">
                      <span class="${cssClass}">${task.text}</span>
                      <div class="task-item__buttons">
                          <button type="button" data-action="done" class="btn-action">
                              <img src="./img/tick.svg" alt="Done" width="18" height="18">
                          </button>
                          <button type="button" data-action="delete" class="btn-action">
                              <img src="./img/cross.svg" alt="Done" width="18" height="18">
                          </button>
                      </div>
                  </li>
    `;
  taskList.insertAdjacentHTML("beforeend", taskHtml);
});

saveLocalSrorage();

form.addEventListener("submit", addTask);

checkEmptyList();

function addTask(event) {
  event.preventDefault();

  const taskText = input.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  console.log(tasks);

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `
  
				<li id = '${newTask.id}'class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
  `;
  taskList.insertAdjacentHTML("beforeend", taskHtml);

  input.value = "";
  input.focus();
  checkEmptyList();
  saveLocalSrorage();
}

taskList.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    parentNode.remove();

    const id = parentNode.id;

    const index = tasks.findIndex(function (task) {
      return task.id == id;
    });

    tasks.splice(index, 1);
  }
  checkEmptyList();
  saveLocalSrorage();
}

taskList.addEventListener("click", doneTask);

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  const id = parentNode.id;

  const task = tasks.find(function (task) {
    if (task.id == id) {
      return true;
    }
  });

  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
  saveLocalSrorage();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListElem = `
        <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
    taskList.insertAdjacentHTML("afterbegin", emptyListElem);

    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl.classList.add("border_none");
  }
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveLocalSrorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
