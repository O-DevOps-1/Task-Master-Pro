chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757', darkMode: false, syncWithGoogleCalendar: false }, () => {
    console.log('Extension installed and initialized.');
  });

  chrome.alarms.create('remindDeadline', { periodInMinutes: 1 });

  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError) {
      console.log('Auth token retrieval failed: ', chrome.runtime.lastError);
      return;
    }

    chrome.storage.sync.set({ googleAuthToken: token });
  });
});


chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'remindDeadline') {
    checkTasksForReminders();
  }
});

function checkTasksForReminders() {
  // Fetch tasks and check deadlines, sending notifications accordingly
  console.log("Checking tasks for upcoming deadlines...");
}

// Sync tasks with Google Calendar
function syncTasksWithGoogleCalendar() {
  chrome.storage.sync.get(['googleAuthToken'], (result) => {
    const token = result.googleAuthToken;
    if (token) {
      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: 'Task from Task Manager Extension',
          description: 'Generated by Task Manager Extension',
          start: {
            dateTime: new Date().toISOString(),
            timeZone: 'America/Los_Angeles'
          },
          end: {
            dateTime: new Date(Date.now() + 3600000).toISOString(),
            timeZone: 'America/Los_Angeles'
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Task synced with Google Calendar:', data);
      })
      .catch(error => console.error('Error syncing with Google Calendar:', error));
    }
  });}
