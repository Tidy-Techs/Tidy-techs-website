function toggleChat() {
  const box = document.getElementById('chatBox');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const msgBox = document.getElementById('chatMessages');

  if (input.value.trim() !== '') {
    const userMsg = document.createElement('p');
    userMsg.textContent = '🧑: ' + input.value;
    msgBox.appendChild(userMsg);

    const botMsg = document.createElement('p');
    botMsg.textContent = '🤖: Thanks for reaching out! A team member will get back to you soon.';
    msgBox.appendChild(botMsg);

    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;
  }
}
