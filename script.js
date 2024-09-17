const form = document.querySelector("form");
const input = document.getElementById("input");
const button = document.getElementById("button");

function addOnList(event) {
  event.preventDefault();
  const newTask = document.createElement("div");
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");
  newTask.innerText = `${input.value}`;
  newTask.append(trash);
  form.append(newTask);
  input.value = "";
  trash.addEventListener("click", function () {
    newTask.remove();
  });
}

button.addEventListener(`click`, addOnList);
