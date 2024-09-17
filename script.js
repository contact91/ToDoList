const form = document.querySelector("form");
const input = document.getElementById("input");
const button = document.getElementById("button");

function addOnList(event) {
  event.preventDefault();

  const newTask = document.createElement("div");
  newTask.innerText = `${input.value}`;

  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");
  newTask.append(trash);

  const checked = document.createElement("i");
  checked.classList.add("fa-solid", "fa-check");
  newTask.append(checked);

  form.append(newTask);

  input.value = "";
  trash.addEventListener("click", function () {
    newTask.remove();
  });
  checked.addEventListener(`click`, () => {
    if (newTask.style.textDecoration === "line-through") {
      newTask.style.textDecoration = "none";
    } else {
      newTask.style.textDecoration = "line-through";
    }
  });
}
button.addEventListener(`click`, addOnList);
