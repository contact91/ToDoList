// const form = document.querySelector("form");
// const input = document.getElementById("input");
// const button = document.getElementById("button");

// function addOnList(event) {
//   event.preventDefault();

//   const newTask = document.createElement("div");
//   newTask.innerText = `${input.value}`;

//   const trash = document.createElement("i");
//   trash.classList.add("fa-solid", "fa-trash");
//   newTask.append(trash);

//   const checked = document.createElement("i");
//   checked.classList.add("fa-solid", "fa-check");
//   newTask.append(checked);

//   form.append(newTask);

//   input.value = "";
//   trash.addEventListener("click", function () {
//     newTask.remove();
//   });
//   checked.addEventListener(`click`, () => {
//     if (newTask.style.textDecoration === "line-through") {
//       newTask.style.textDecoration = "none";
//     } else {
//       newTask.style.textDecoration = "line-through";
//     }
//   });
//   localStorage.setItem(newTask);
// }
// button.addEventListener(`click`, addOnList);

//======================================================================
//======================================================================

const form = document.querySelector("form");
const input = document.getElementById("input");
const button = document.getElementById("button");

// Load tasks from localStorage when the page loads
window.addEventListener("load", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTaskElement(task.text, task.checked);
  });
}

function createTaskElement(taskText, isChecked) {
  const newTask = document.createElement("div");
  newTask.innerText = taskText;

  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");
  newTask.append(trash);

  const checked = document.createElement("i");
  checked.classList.add("fa-solid", "fa-check");
  newTask.append(checked);

  form.append(newTask);

  if (isChecked) {
    newTask.style.textDecoration = "line-through";
  }

  // Trash click event
  trash.addEventListener("click", function () {
    newTask.remove();
    deleteTask(taskText);
  });

  // Check/uncheck event
  checked.addEventListener("click", () => {
    if (newTask.style.textDecoration === "line-through") {
      newTask.style.textDecoration = "none";
      updateTaskStatus(taskText, false);
    } else {
      newTask.style.textDecoration = "line-through";
      updateTaskStatus(taskText, true);
    }
  });
}

function addOnList(event) {
  event.preventDefault();
  const taskText = input.value;

  if (taskText === "") return; // Prevent empty tasks

  createTaskElement(taskText, false);

  // Add new task to localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, checked: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = ""; // Clear input field
}

// Update task checked status in localStorage
function updateTaskStatus(taskText, isChecked) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      return { ...task, checked: isChecked };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Delete task from localStorage
function deleteTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

button.addEventListener("click", addOnList);
