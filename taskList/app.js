// window.setTimeout((greetings) => {
//     console.log(greetings);
// }, 3000, 'Hello');

// Define all UL vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// call LoadEventlisteners function
loadEventListeners();

function loadEventListeners() {
    // Load DOM events
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);

    // Remove tasks event
    taskList.addEventListener('click', removeTask);

    // clearing task event
    clearBtn.addEventListener('click', clearTask);

    // Filtering Tasks event
    filterInput.addEventListener('keyup', filterTasks);
}

// Get task from localStorage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }

    tasks.forEach((task) => {
     //    Create li element
     const li = document.createElement('li');

     // Add class to li element
     li.className = 'collection-item';

     // Create textnode and append
     li.appendChild(document.createTextNode(task));

     // create a new link element
     const link = document.createElement('a');

     // add class name
     link.className = 'delete-item secondary-content';

     // add delete font icon html
     link.innerHTML = '<i class="fa fa-remove"></i>';

     // append link to li (parentChild)
     li.appendChild(link);

     // append li to ul
     taskList.appendChild(li);
    });
}

// Add task function
function addTask(e) {
    e.preventDefault();
   if (taskInput.value === '') {
       alert('Add a Task');
   } else {

        //    Create li element
        const li = document.createElement('li');

        // Add class to li element
        li.className = 'collection-item';

        // Create textnode and append
        li.appendChild(document.createTextNode(taskInput.value));

        // create a new link element
        const link = document.createElement('a');

        // add class name
        link.className = 'delete-item secondary-content';

        // add delete font icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append link to li (parentChild)
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
       
        // Store in localStorage
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
   }
          
}

// store tasks in localStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function  removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

             // Remove from localStorage
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

   
   
}

// Remove from localStorage function
function removeFromLocalStorage (taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// clear task
function clearTask() {
    // innerHtml to clear task
    //taskList.innerHTML = '';

    // using while loop. It`s support all browsers and faster way of clearing task
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear task from local storage
    clearTaskFromLocalStorage();
}

// Clear task from local storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// Filtering Tasks
function filterTasks(e) {
 const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
    }else{
    //    task.style.display = 'none';
       const notFound = document.getElementById('cardErr');
       notFound.textContent = "Not found";
       
    }
 });
}



