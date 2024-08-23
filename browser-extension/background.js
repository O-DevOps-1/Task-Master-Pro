chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757', darkMode: false }, () => {
    console.log('The color is green and dark mode is disabled.'); });

  chrome.alarms.create('remindDeadline', { periodInMinutes: 1 });

  chrome.action.onClicked.addListener((tab) => {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Task Manager',
      message: 'Stay productive! You have tasks to complete.',
    });
  });

});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'remindDeadline') {
    checkTasksForReminders();
  }});

function checkTasksForReminders() {
  // this would involve fetching tasks and checking deadlines, sending notifications accordingly, etcetera
  console.log("Checking tasks for upcoming deadlines...");
}
