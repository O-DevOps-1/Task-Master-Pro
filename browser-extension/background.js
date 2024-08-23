chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Task Manager',
    message: 'Stay productive! You have tasks to complete.',
  });
});
