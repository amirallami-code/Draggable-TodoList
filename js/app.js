let $ = document;

let btnElem = $.getElementById("add_btn");

let modal = $.getElementById("todo_form");
let modalBtn = $.getElementById("btn");
let modalOverlay = $.getElementById("overlay");
let modalInput = $.getElementById("todo_input");
let modalInputSubmit = $.getElementById("todo_submit");

let TodosParentDiv = $.getElementById("no_status");

let newRandomNum

// functions
function newRandomNumHandler() {
    newRandomNum = Math.floor(Math.random() * 1000)
}

function HasDuplicateNum() {

    document.querySelectorAll('.todo').forEach(function (event) {

        if (event.className.includes(newRandomNum)) {
            newRandomNumHandler()
        }
    })
}

function addTodo() {
    let newTodo = $.createElement("div");
    newTodo.classList = "todo";
    // newTodo.classList.add(newRandomNum)
    newTodo.setAttribute("draggable", "true");
    // newTodo.setAttribute("ondragstart", "onDropHandler(event)");
    //refactor

    newRandomNumHandler()
    HasDuplicateNum()
    newTodo.setAttribute('id', newRandomNum);

    newTodo.setAttribute("ondragstart", "onDragStartHandler(event)");
    newTodo.innerHTML = modalInput.value;

    let newSpan = $.createElement("span");
    newSpan.classList = "close";
    newSpan.setAttribute("onclick", "deleteTodosHandler(event)");
    newSpan.innerHTML = "&times;";

    TodosParentDiv.append(newTodo);

    newTodo.append(newSpan);

    modalInput.value = "";
    closeModal();
}

function addTodowithEnter(event) {
    if (event.keyCode === 13) {
        addTodo();
    }
}

function openModal() {
    modal.style.top = "50%";
    modalOverlay.style.display = "block";
    modalInput.focus();
}

function closeModal() {
    modal.style.top = "-50%";
    modalOverlay.style.display = "none";
}

function deleteTodosHandler(event) {
    let deleteTodo = event.target.parentElement;
    deleteTodo.remove();
}
function onDragStartHandler(event) {
    // event.dataTransfer.setData("ElemClassList", event.target.classList.value);
    // refactor
    event.dataTransfer.setData("ElemId", event.toElement.id);
}

function onDropHandler(event) {
    let ElemTargetId = event.dataTransfer.getData("ElemId");
    // let ElemContent = document.getElementsByClassName(ElemClassListTarget);
    // refactor
    let ElemContent = document.getElementById(ElemTargetId);
    event.target.append(ElemContent);
}

function onDragOverHandler(event) {
    event.preventDefault();
}

modalInput.addEventListener("keypress", addTodowithEnter);
modalInputSubmit.addEventListener("click", addTodo);
btnElem.addEventListener("click", openModal);
modalBtn.addEventListener("click", closeModal);