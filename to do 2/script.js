document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskDateInput = document.getElementById('task-date');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;

        if (taskText === '' || taskDate === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText} - <small>${new Date(taskDate).toLocaleString()}</small></span>
            <div>
                <button class="edit-task">✏️</button>
                <button class="complete-task">✔️</button>
                <button class="delete-task">🗑️</button>
            </div>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = '';
        taskDateInput.value = '';

        // Event Listeners for the buttons
        const editButton = taskItem.querySelector('.edit-task');
        const completeButton = taskItem.querySelector('.complete-task');
        const deleteButton = taskItem.querySelector('.delete-task');

        editButton.addEventListener('click', () => editTask(taskItem));
        completeButton.addEventListener('click', () => completeTask(taskItem));
        deleteButton.addEventListener('click', () => deleteTask(taskItem));
    }

    // Function to edit a task
    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span').textContent.split(' - ')[0];
        const newTaskText = prompt('Edit your task:', taskText);

        if (newTaskText !== null && newTaskText.trim() !== '') {
            const taskDate = taskItem.querySelector('small').textContent;
            taskItem.querySelector('span').innerHTML = `${newTaskText} - <small>${taskDate}</small>`;
        }
    }

    // Function to complete a task
    function completeTask(taskItem) {
        taskItem.classList.toggle('completed');
    }

    // Function to delete a task
    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
