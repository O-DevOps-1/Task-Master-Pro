document.addEventListener('DOMContentLoaded', () => {
  const darkModeCheckbox = document.getElementById('darkMode');
  const notificationsCheckbox = document.getElementById('notifications');
  const syncWithGoogleCalendarCheckbox = document.getElementById('syncWithGoogleCalendar');

  chrome.storage.sync.get(['darkMode', 'notifications', 'syncWithGoogleCalendar'], (result) => {
    darkModeCheckbox.checked = result.darkMode || false;
    notificationsCheckbox.checked = result.notifications || false;
    syncWithGoogleCalendarCheckbox.checked = result.syncWithGoogleCalendar || false;
  });

  document.getElementById('optionsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    chrome.storage.sync.set({
      darkMode: darkModeCheckbox.checked,
      notifications: notificationsCheckbox.checked,
      syncWithGoogleCalendar: syncWithGoogleCalendarCheckbox.checked,
    }, () => {
      alert('Settings saved!');
    });
  });});
