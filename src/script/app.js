let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
let todoButton = document.querySelector('.todo-button');
let filterOption  = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', createTodo)
todoList.addEventListener('click', deleteTodo)

function createTodo(event) {
    event.preventDefault()

    if(todoInput.value.length == 0) return alert('One mistake... you can\'t create a worthless stain.')

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);

    saveLocalTodo(todoInput.value);

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-button');
    todoDiv.appendChild(checkButton)

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
    todoInput.value = "";
}

function deleteTodo(event) {
    const item = event.target
    if(item.classList[0] === "trash-button") {
        item.parentElement.classList.toggle("fall")
        removeLocalTodos(item.parentElement)
        item.parentElement.addEventListener("transitionend", function () {
            item.parentElement.remove()
        }) 
    } else if(item.classList[0] === "check-button") {
        item.parentElement.classList.toggle("completed")
    }
}

function saveLocalTodo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
    
        const newTodo = document.createElement("li");
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
    
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add('check-button');
        todoDiv.appendChild(checkButton)
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton)
    
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}
