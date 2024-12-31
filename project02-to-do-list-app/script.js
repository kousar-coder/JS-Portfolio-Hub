// Select elements
const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
addButton.addEventListener('click', () => {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    addTask(taskText);
    inputBox.value = '';
});

// Add task function
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '\u00D7'; // Unicode for the "x" symbol
    deleteBtn.classList.add('delete-btn');

    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    saveTasks(); // Save tasks to local storage
}

// Handle task actions (mark complete, delete)
listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
    saveTasks(); // Save changes to local storage
});

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    listContainer.querySelectorAll('li').forEach((li) => {
        tasks.push({
            text: li.textContent.slice(0, -1), // Exclude the delete button
            completed: li.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '\u00D7';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}
