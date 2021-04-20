/*** TIME FUNCTIONALITY ***/

// DOM Elements
const time = document.getElementById('time');

// Display time
function displayTime() {
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        day = today.getDay(),
        date = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear();
    
    // Output week's day    
    const dayNames = ['Domingo', 'Segunda-Feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    
    // Output time
    time.innerHTML = `
        <div>
        ${dayNames[day]}
        </div>

        <div>
        <i class="far fa-calendar-alt"></i>
        ${addZeros(date)}<span>/</span>${addZeros(month)}<span>/</span>${year}
        </div>
        <div>
        <i class="far fa-clock"></i> 
        ${addZeros(hour)}<span>:</span>${addZeros(minutes)}<span>:</span>${addZeros(seconds)}     
        </div>       
        `

        setTimeout(displayTime, 1000);
}

// Adding zeros on minutes less than 10
function addZeros(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Run
displayTime();
addZeros();

/******/


/*** ADDING AND REMOVING TASKS FUNCTIONALITY ***/

// DOM Elements

const taskTitle = document.querySelector('.task-title');
const taskBody = document.querySelector('.task-body');
const addTaskBtn = document.querySelector('.add-task-btn');
const clearTaskBtn = document.querySelector('.clear-task-btn');
const spanErrorMessage = document.getElementById('error-message');
const boxTaskWrapper = document.querySelector('.box-task-wrapper');

loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Adding Task Event
    addTaskBtn.addEventListener('click', addTask);
    // Deleting A Task Event
    boxTaskWrapper.addEventListener('click', deleteTask);
    // Deleting All Tasks Event
    clearTaskBtn.addEventListener('click', deleteAllTasks);
    // Clicking Success Button Event
    boxTaskWrapper.addEventListener('click', doneTask);
}

// Get Tasks From LocalStorage
function getTasks() {
    let tasksTitle;
    let tasksBody;

    if(localStorage.getItem('tasksTitle') === null) {
        tasksTitle = [];
        tasksBody = [];
    } else {
        tasksTitle = JSON.parse(localStorage.getItem('tasksTitle'));
        tasksBody = JSON.parse(localStorage.getItem('tasksBody'));
    }

    for (var i = 0; i < tasksTitle.length; i++) {
        let boxTaskSingle = document.createElement('div');
        boxTaskSingle.className = 'box-task-single';

        boxTaskSingle.innerHTML = `
            <span class="del-task">&times;</span>
            <h3>${tasksTitle[i]}</h3>
            <p>${tasksBody[i]}</p>
            <button class="success-task">Tarefa Concluída</button>
            `
            
        boxTaskWrapper.appendChild(boxTaskSingle);
    }
}

// Adding Task
function addTask(e) {
    let boxTaskSingle = document.createElement('div');
        boxTaskSingle.className = 'box-task-single';

    boxTaskSingle.innerHTML = `
        <span class="del-task">&times;</span>
        <h3>${taskTitle.value}</h3>
        <p>${taskBody.value}</p>
        <button class="success-task">Tarefa Concluída</button>
        `

    if(taskTitle.value === '' || taskBody.value === '') {
        spanErrorMessage.innerText = "Erro: Motivo - Preencha todos os campos";

        setTimeout(() => {
            spanErrorMessage.innerText = '';
        }, 3000);

    } else if (taskTitle.value.length >= 21) {
        spanErrorMessage.innerText = "Insira até 20 caracteres no 'Nome da Tarefa'";

        setTimeout(() => {
            spanErrorMessage.innerText = '';
        }, 3000);

    } else {
        boxTaskWrapper.appendChild(boxTaskSingle);

    }

    storeTask(taskTitle.value, taskBody.value);
    
    taskTitle.value = '';
    taskBody.value = '';

    e.preventDefault();
}

// Store Task
function storeTask(taskT, taskB) {
    if(taskT !== '' || taskB !== '') {
        let tasksTitle;
        let tasksBody;

        if(localStorage.getItem('tasksTitle') === null) {
            tasksTitle = [];
            tasksBody = [];
        } else {
            tasksTitle = JSON.parse(localStorage.getItem('tasksTitle'));
            tasksBody = JSON.parse(localStorage.getItem('tasksBody'));
        }

        tasksTitle.push(taskT);
        tasksBody.push(taskB);

        localStorage.setItem('tasksTitle', JSON.stringify(tasksTitle));
        localStorage.setItem('tasksBody', JSON.stringify(tasksBody));
    }
}


// Delete A Task
function deleteTask(e) {
    if(e.target.classList.contains('del-task')) {
        e.target.parentElement.remove();
 
        deleteStoreTask(e.target.parentElement.children[1]);
        deleteStoreTask(e.target.parentElement.children[2]);
    }
}

// Deleting From LocalStorage
function deleteStoreTask(delTask) {
    let tasksTitle;
    let tasksBody;

    if(localStorage.getItem('tasksTitle') === null) {
        tasksTitle = [];
        tasksBody = [];
    } else {
        tasksTitle = JSON.parse(localStorage.getItem('tasksTitle'));
        tasksBody = JSON.parse(localStorage.getItem('tasksBody'));
    }

    tasksTitle.forEach((task,index) => {
        if(delTask.innerHTML === task) {
            tasksTitle.splice(index, 1);
            tasksBody.splice(index, 1);
        }
    });

    localStorage.setItem('tasksTitle', JSON.stringify(tasksTitle));
    localStorage.setItem('tasksBody', JSON.stringify(tasksBody));
}

// Delete All Tasks
function deleteAllTasks() {
    // First Way to Delete All Tasks
    // boxTaskWrapper.innerHTML = '';

    // Second Way to Delete All Tasks
    while(boxTaskWrapper.firstChild) {
        boxTaskWrapper.removeChild(boxTaskWrapper.firstChild);
    }

    clearStoreTask();

    spanErrorMessage.innerText = 'Todas as tarefas foram apagadas';

    setTimeout(() => {
        spanErrorMessage.innerText = '';
    }, 5000);

}

// Clear LocalStorage
function clearStoreTask() {
    localStorage.clear();
}

// Finish A Task
function doneTask(e) {
    if(e.target.classList.contains('success-task')) {
        e.target.classList.toggle('success');
    }
}


/******/