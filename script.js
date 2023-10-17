const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, done: false });
        taskInput.value = '';
        displayTasks();
        saveTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''}> 
                              <p>${task.text}</p>
                              <button id="deleteTask" onclick="removeTask(${index})">Delete</button>`;
        taskItem.querySelector('input').addEventListener('change', () => {
            tasks[index].done = !tasks[index].done;
            displayTasks();
            saveTasks();
        });
        taskList.appendChild(taskItem);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('addTask').addEventListener('click', addTask);

displayTasks();
