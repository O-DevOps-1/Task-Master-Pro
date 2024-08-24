document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('toggle-theme');
  const body = document.body;

  themeToggleButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
  });

  // loading charts using Chart.js
  const ctx = document.getElementById('taskCompletionChart').getContext('2d');
  const taskCompletionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'In Progress', 'Pending'],
      datasets: [{
        label: 'Task Completion',
        data: [50, 30, 20],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });});
