// STAR BUTTON FUNCTIONALITY IMPLEMENTED

// Initialize the to-do list from local storage or use an empty array
const Todo_list = JSON.parse(localStorage.getItem('todoList')) || [];

rendertodolist();

function rendertodolist() {
    let final_todo_list = '';
    const noTasksMessage = document.getElementById('no-tasks-message');

    if (Todo_list.length === 0) {
        noTasksMessage.textContent = "No tasks are available.";
    } else {
        noTasksMessage.textContent = "";

        for (let i = 0; i < Todo_list.length; i++) {
            const looped_resultobj = Todo_list[i];
            const todotask = looped_resultobj.task_list;
            const todo_date = looped_resultobj.datee;

            // Toggle text color based on the 'important' property
            let textColorStyle = looped_resultobj.important ? 'color: red;' : '';

            let html_code = `
            <div style="${textColorStyle}">${todotask}</div>
            <div>${todo_date}</div>
            <i class="fa-${looped_resultobj.important ? 'solid' : 'regular'} fa-star important-button" id="important-button" data-index="${i}"></i>
            <button class="edit-button">Edit</button>
            <button class='delet_button JS-delete-todo-button' data-index="${i}">Delete</button>
          `;
            final_todo_list += html_code;
        }
    }

    document.querySelector('.display_result').innerHTML = final_todo_list;

    document.querySelectorAll('.JS-delete-todo-button')
        .forEach((delete_button) => {
            delete_button.addEventListener('click', (event) => {
                const indexToDelete = event.target.getAttribute('data-index');
                if (indexToDelete !== null) {
                    Todo_list.splice(indexToDelete, 1);
                    saveTodoListToLocalStorage();
                    rendertodolist();
                }
            });
        });

    addEditListeners(); // Add edit listeners when rendering
    addImportantListeners(); // Add important listeners when rendering

}

function showWarning(message) {
    const warningMessage = document.getElementById('warning-message');
    warningMessage.textContent = message;
}

function clearWarning() {
    const warningMessage = document.getElementById('warning-message');
    warningMessage.textContent = "";
}

function adding_the_todolist() {
    const entering_todolist = document.querySelector('.inputed_value');
    const todo_list_entered = entering_todolist.value;
    const date_get_element = document.querySelector('.date_selector');
    const date_store_vari = date_get_element.value;
    const noTasksMessage = document.getElementById('no-tasks-message');

    if (todo_list_entered.trim() === '') {
        showWarning("Enter your task");
    } else {
        clearWarning();
        Todo_list.push({
            task_list: todo_list_entered,
            datee: date_store_vari,
            important: false // Initially, the task is not marked as important
        });

        entering_todolist.value = '';

        saveTodoListToLocalStorage();
        rendertodolist();

        noTasksMessage.textContent = "";
    }
}

function saveTodoListToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(Todo_list));
}

document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
        adding_the_todolist();
    });

document.querySelector('.inputed_value')
    .addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            adding_the_todolist();
        }
    });

function addEditListeners() {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
            // Get the corresponding task div
            const taskDiv = document.querySelectorAll('.display_result div')[index * 2];

            // Get the current task text
            const currentTaskText = taskDiv.textContent;

            // Create an input field for editing
            const inputField = document.createElement('input');
            inputField.value = currentTaskText;

            // Replace the task text with the input field
            taskDiv.textContent = '';
            taskDiv.appendChild(inputField);

            // Create a "Save" button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'save';


            // Add a click event for saving the edited task
            saveButton.addEventListener('click', () => {
                const editedText = inputField.value;

                // Update the task text and render the updated list
                Todo_list[index].task_list = editedText;
                saveTodoListToLocalStorage();
                rendertodolist();
            });

            // Add the "Save" button after the input field
            taskDiv.appendChild(saveButton);
            saveButton.style.fontFamily = 'Lexend Mega, sans-serif'
            saveButton.style.paddingLeft = "10px"
            saveButton.style.color = "black";
            saveButton.style.fontWeight = "700";
            saveButton.style.fontSize = "0.85rem";
            saveButton.style.border = "none";
        });
    });
}


function addImportantListeners() {
    const importantButtons = document.querySelectorAll('.important-button');

    importantButtons.forEach((importantButton, index) => {
        importantButton.addEventListener('click', () => {
            // Toggle the 'important' property of the task
            Todo_list[index].important = !Todo_list[index].important;

            // Update the star icon
            const starIcon = importantButton;
            starIcon.className = `fa-${Todo_list[index].important ? 'solid' : 'regular'} fa-star important-button`;

            // Toggle text color when the 'important' button is clicked
            const taskText = document.querySelectorAll('.display_result div')[index * 2];
            taskText.style.color = Todo_list[index].important ? '#ff4911' : ''; // Set red color if important, else reset to default

            saveTodoListToLocalStorage();
        });
    });
}
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// // Initialize the to-do list from local storage or use an empty array
// const Todo_list = JSON.parse(localStorage.getItem('todoList')) || [];

// rendertodolist();

// function rendertodolist() {
//     let final_todo_list = '';
//     const noTasksMessage = document.getElementById('no-tasks-message');

//     if (Todo_list.length === 0) {
//         noTasksMessage.textContent = "No tasks are available.";
//     } else {
//         noTasksMessage.textContent = "";

//         for (let i = 0; i < Todo_list.length; i++) {
//             const looped_resultobj = Todo_list[i];
//             const todotask = looped_resultobj.task_list;
//             const todo_date = looped_resultobj.datee;

//             let html_code = `
//                 <div>${todotask}</div>
//                 <div>${todo_date}</div>
//                 <i class="fa-regular fa-star important-button" id="important-button"></i>
//                 <button class="edit-button">Edit</button>
//                 <button class='delet_button JS-delete-todo-button' data-index="${i}">Delete</button>
//                 `;
//             final_todo_list += html_code;
//         }
//     }

//     document.querySelector('.display_result').innerHTML = final_todo_list;

//     document.querySelectorAll('.JS-delete-todo-button')
//         .forEach((delete_button) => {
//             delete_button.addEventListener('click', (event) => {
//                 const indexToDelete = event.target.getAttribute('data-index');
//                 if (indexToDelete !== null) {
//                     Todo_list.splice(indexToDelete, 1);
//                     saveTodoListToLocalStorage();
//                     rendertodolist();
//                 }
//             });
//         });

//     addEditListeners(); // Add edit listeners when rendering
// }

// function showWarning(message) {
//     const warningMessage = document.getElementById('warning-message');
//     warningMessage.textContent = message;
// }

// function clearWarning() {
//     const warningMessage = document.getElementById('warning-message');
//     warningMessage.textContent = "";
// }

// function adding_the_todolist() {
//     const entering_todolist = document.querySelector('.inputed_value');
//     const todo_list_entered = entering_todolist.value;
//     const date_get_element = document.querySelector('.date_selector');
//     const date_store_vari = date_get_element.value;
//     const noTasksMessage = document.getElementById('no-tasks-message');

//     if (todo_list_entered.trim() === '') {
//         showWarning("Fill the task");
//     } else {
//         clearWarning();
//         Todo_list.push({
//             task_list: todo_list_entered,
//             datee: date_store_vari
//         });

//         entering_todolist.value = '';

//         saveTodoListToLocalStorage();
//         rendertodolist();

//         noTasksMessage.textContent = "";
//     }
// }

// function saveTodoListToLocalStorage() {
//     localStorage.setItem('todoList', JSON.stringify(Todo_list));
// }

// document.querySelector('.js-add-todo-button')
//     .addEventListener('click', () => {
//         adding_the_todolist();
//     });

// document.querySelector('.inputed_value')
//     .addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             adding_the_todolist();
//         }
//     });

// function addEditListeners() {
//     const editButtons = document.querySelectorAll('.edit-button');

//     editButtons.forEach((editButton, index) => {
//         editButton.addEventListener('click', () => {
//             // Get the corresponding task div
//             const taskDiv = document.querySelectorAll('.display_result div')[index * 2];

//             // Get the current task text
//             const currentTaskText = taskDiv.textContent;

//             // Create an input field for editing
//             const inputField = document.createElement('input');
//             inputField.value = currentTaskText;

//             // Replace the task text with the input field
//             taskDiv.textContent = '';
//             taskDiv.appendChild(inputField);

//             // Create a "Save" button
//             const saveButton = document.createElement('button');
//             saveButton.textContent = 'Save';

//             // Add a click event for saving the edited task
//             saveButton.addEventListener('click', () => {
//                 const editedText = inputField.value;

//                 // Update the task text and render the updated list
//                 Todo_list[index].task_list = editedText;
//                 saveTodoListToLocalStorage();
//                 rendertodolist();
//             });

//             // Add the "Save" button after the input field
//             taskDiv.appendChild(saveButton);
//             saveButton.style.color = "#7fbc8c";
//             saveButton.style.fontWeight = "700";
//             saveButton.style.fontSize = "20px";
//             saveButton.style.border = "none";
//         });
//     });
// }

// // imp code

// document.getElementById('important-button').addEventListener('click', () => {

//     const textElements = document.querySelectorAll('.display_result div:first-child');
//     textElements.forEach((element) => {
//         element.classList.toggle('important-text');

//     });
// });


