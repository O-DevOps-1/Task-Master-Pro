document.addEventListener('DOMContentLoaded', function () {
  const botSendButton = document.getElementById('bot-send');
  const botMessageInput = document.getElementById('bot-message');
  const botContent = document.getElementById('bot-content');

  botSendButton.addEventListener('click', function () {
    const userMessage = botMessageInput.value;
    if (userMessage.trim() !== '') {
      appendMessage('You', userMessage);
      getBotResponse(userMessage);
      botMessageInput.value = '';
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    botContent.appendChild(messageElement);
  }

  function getBotResponse(message) {
    let response = 'Sorry, I do not understand that command.';

    if (message.toLowerCase().includes('help')) {
      response = 'Here are some things you can do: Add Task, View Tasks, Sync Calendar.';
    } else if (message.toLowerCase().includes('add task')) {
      response = 'Sure! What task would you like to add?';
    }

    setTimeout(() => {
      appendMessage('Bot', response);
    }, 1000);
  } });
