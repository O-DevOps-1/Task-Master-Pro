document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('taskList');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

  // fetch tasks from the API!
  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const tasks = await response.json();
      displayTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }}

  function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.textContent = task.title;
      taskItem.classList.add('task-item');
      taskList.appendChild(taskItem); });

    enableDragAndDrop();
  }

  addTaskBtn.addEventListener('click', function () {
    const taskTitle = prompt('Enter task title:');
    if (taskTitle) {
      createTask(taskTitle);
    }
  });

  async function createTask(title) {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title }),
      });
      const task = await response.json();
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  toggleDarkModeBtn.addEventListener('click', function () {
    document.getElementById('app').classList.toggle('dark-mode');
    chrome.storage.sync.get(['darkMode'], function (result) {
      chrome.storage.sync.set({ darkMode: !result.darkMode });
    });
  });

  function enableDragAndDrop() {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
      task.setAttribute('draggable', true);
      task.addEventListener('dragstart', handleDragStart);
      task.addEventListener('dragover', handleDragOver);
      task.addEventListener('drop', handleDrop);
    });
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const draggedTaskTitle = e.dataTransfer.getData('text/plain');
    const targetTask = e.target.textContent;

    // handle task reordering logic here
    console.log(`Reordered task: ${draggedTaskTitle} before ${targetTask}`);
  }

  // initialing fetch of tasks
  fetchTasks();
});
