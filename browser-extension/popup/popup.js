document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('taskList');
  const addTaskBtn = document.getElementById('addTaskBtn');

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
      taskList.appendChild(taskItem);
    });
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

  // Initial fetch of tasks
  fetchTasks();
});
