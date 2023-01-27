function main() {
  let inputText = document.querySelector("#text");
  let root = document.querySelector("ul");

  let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  let all = document.querySelector(".all");
  let active = document.querySelector(".active");
  let completed = document.querySelector(".completed");
  let clear = document.querySelector(".clear");

  function handelInput(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      let todo = {
        name: value,
        isDone: false,
      };
      allTodos.push(todo);
      event.target.value = "";
      handelSubmit();
    }
    setLocalStorage();
  }
  function handelDelete(event) {
    let id = event.target.dataset.id;
    allTodos.splice(id, 1);
    handelSubmit();
    setLocalStorage();

  }
  function handelToggle(event) {
    let id = event.target.dataset.id;
    allTodos[id].isDone = !allTodos[id].isDone;
    setLocalStorage();
    handelSubmit();
    createButton();
  }
  function handelSubmit(data = allTodos) {
    root.innerHTML = "";
    data.forEach((todo, index) => {
      let li = document.createElement("li");
      let div = document.createElement("div");
      div.className = "flex div";
      let input = document.createElement("input");
      input.type = "checkbox";
      input.addEventListener("click", handelToggle);
      input.setAttribute("data-id", index);
      input.checked = todo.isDone;

      let p = document.createElement("p");
      p.innerText = todo.name;
      let span = document.createElement("h2");
      span.className = "cross"
      span.innerText = "X";
      span.setAttribute("data-id", index);
      span.addEventListener("click", handelDelete);
      div.append(input, p);
      li.append(div, span);
      root.append(li);
    });
  }

  clear.addEventListener("click", () => {
    allTodos = allTodos.filter((todo) => !todo.isDone);
    handelSubmit();
  });

  active.addEventListener("click", () => {
    let notCompleted = allTodos.filter((todo) => !todo.isDone);
    handelSubmit(notCompleted);
  });

  completed.addEventListener("click", () => {
    let notActive = allTodos.filter((todo) => todo.isDone);
    handelSubmit(notActive);
  });

  all.addEventListener('click' , ()=>{
     handelSubmit(allTodos)
  })

  inputText.addEventListener("keyup", handelInput);

  function setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }
}
main();
