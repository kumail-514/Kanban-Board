let tasksData = {};

let todos = document.querySelector("#todos");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let alltodos = document.querySelectorAll(".todo");
let bg = document.querySelector(".bg");
let mainModel = document.querySelector(".main-popup");
let taskButton = document.querySelector("#task-button");
let addtodobtn = document.querySelector(".addBtn")
let inputTitle = document.querySelector("#todo-title");
let todoDescription = document.querySelector("#todo-description");
let alltasks = [todos, progress, done];
let dragElemt = null;
let timer = null;




//localStrogae code-----------------------------------//
if (JSON.parse(localStorage.getItem("taskData"))) {
    let data = JSON.parse(localStorage.getItem("taskData"));

    Object.keys(data).forEach(colId => {
        let column = document.getElementById(colId);

        data[colId].forEach((t) => {
            let todo = document.createElement("div");
            todo.draggable = true;
            todo.classList.add("todo");


            let template = `<div class="title"><span>${t.title}</span></div>
            <div class="todo-description">
            <p>${t.description}</p>
            </div>
            <div class="todo-del"><button>Delete</button></div>
            `
            todo.innerHTML = template;
            todo.addEventListener("drag", () => {
                dragElemt = todo;
            })

            column.appendChild(todo);
        })
    })


    alltasks.forEach(col => {
        let count = col.querySelector(".count");
        count.innerText = col.querySelectorAll(".todo").length;
    });

    let delBtns = document.querySelectorAll('.todo-del');
    delTodos(delBtns);

}
// -------------------------------------------//


bg.addEventListener("click", () => {
    mainModel.style.display = "none"
})

taskButton.addEventListener("click", () => {
    mainModel.style.display = "flex"
})

addtodobtn.addEventListener("click", () => {
    let inputValue = inputTitle.value;
    let tododesc = todoDescription.value;
    let todo = document.createElement("div");
    todo.draggable = true;
    todo.classList.add("todo");

    let template = `<div class="title"><span>${inputValue}</span></div>
                    <div class="todo-description">
                        <p>${tododesc}</p>
                    </div>
                    <div class="todo-del"><button>Delete</button></div>`

    todo.innerHTML = template;
    todo.addEventListener("drag", () => {
        dragElemt = todo;
    })

    todos.appendChild(todo);
    inputTitle.value = "";
    todoDescription.value = "";
    let delBtns = document.querySelectorAll('.todo-del');
    delTodos(delBtns);
    notify("task added successfully");

    //------------------------new code for tomorow---------------
    alltasks.forEach((col) => {
        let tasks = col.querySelectorAll(".todo");
        let count = col.querySelector(".count");



        //setlocalstrorage tasks
        tasksData[col.id] = Array.from(tasks).map((t) => {
            return {
                title: t.querySelector("span").innerText,
                description: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("taskData", JSON.stringify(tasksData));

        if (tasks.length > 0) {
            count.innerText = tasks.length;
        } else {
            count.innerText = 0;
        }

    });
    //------------------------new code for tomorow---------------////
    addDragEvent();
    mainModel.style.display = "none";
})
function addDragEvent() {
    alltodos.forEach((curr) => {
        curr.addEventListener("drag", () => {
            // console.log("hellow")
            dragElemt = curr;
        })
    })
}

addDragEvent()

function addEvntListner(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault()
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault()
        column.classList.remove("hover-over")
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();


        column.appendChild(dragElemt);

        notify(`todo dropped successfully`);
        column.classList.remove("hover-over")

        alltasks.forEach((col) => {
            let tasks = col.querySelectorAll(".todo");
            let count = col.querySelector(".count");


            //setlocalstrorage tasks
            tasksData[col.id] = Array.from(tasks).map((t) => {
                return {
                    title: t.querySelector("span").innerText,
                    description: t.querySelector("p").innerText
                }
            })
            localStorage.setItem("taskData", JSON.stringify(tasksData));

            if (tasks.length > 0) {
                count.innerText = tasks.length;
            } else {
                count.innerText = 0;
            }
        })
    })
}

addEvntListner(todos)
addEvntListner(progress);
addEvntListner(done);


function notify(data) {

    let div = document.createElement("div");
    div.classList.add("notify-container");

    let heading = document.createElement("h3");
    heading.classList.add("notfy");

    if (data) {
        heading.innerText = data + "👍";
    }
    div.appendChild(heading);
    document.body.appendChild(div);



    timer = setTimeout(() => {
        div.classList.add("remove");
        // clearTimeout(timer);
    }, 500);
    div.classList.remove("remove");
}

function delTodos(delBtns) {
    delBtns.forEach((currBtn) => {
        currBtn.addEventListener("click", (e) => {
            let todo = e.target.closest(".todo");
            console.log(todo)
            todo.remove();
            notify("todo remove successfully")
            updateCountAndStorage();
        })
    })
}

function updateCountAndStorage() {

    alltasks.forEach((col) => {
        let tasks = col.querySelectorAll(".todo");
        let count = col.querySelector(".count");


        //---setlocalstrorage tasks---//
        tasksData[col.id] = Array.from(tasks).map((t) => {
            return {
                title: t.querySelector("span").innerText,
                description: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("taskData", JSON.stringify(tasksData));

        if (tasks.length > 0) {
            count.innerText = tasks.length;
        } else {
            count.innerText = 0;
        }
    })
}