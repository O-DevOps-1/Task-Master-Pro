document.addEventListener('DOMContentLoaded', () => {
  const darkModeCheckbox = document.getElementById('darkMode');
  const notificationsCheckbox = document.getElementById('notifications');

  // loafs and sets current settings
  chrome.storage.sync.get(['darkMode', 'notifications'], (result) => {
    darkModeCheckbox.checked = result.darkMode || false;
    notificationsCheckbox.checked = result.notifications || false;
  });

  // saving the elected settings
  document.getElementById('optionsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    chrome.storage.sync.set({
      darkMode: darkModeCheckbox.checked,
      notifications: notificationsCheckbox.checked,
    }, () => {
      alert('Settings saved!');
    });
  });});
