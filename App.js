// UI wiring
const aiBtn = document.getElementById('aiBtn');
const chatBox = document.getElementById('chatBox');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

aiBtn.addEventListener('click', () => {
  const isVisible = chatBox.style.display === 'block';
  chatBox.style.display = isVisible ? 'none' : 'block';
  chatBox.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
  userInput.focus();
});

// Add Enter key listener
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

function appendMessage(text, cls = 'bot') {
  const p = document.createElement('p');
  p.textContent = text;
  p.className = cls;
  chatMessages.appendChild(p);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user'); // show user text
  userInput.value = '';
  appendMessage('...thinking', 'bot'); // placeholder

  try {
    // send to our server
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) {
      throw new Error('Server error: ' + res.status);
    }

    const data = await res.json();
    // remove last placeholder '...thinking'
    const last = Array.from(chatMessages.querySelectorAll('p')).pop();
    if (last && last.textContent === '...thinking') last.remove();

    // server expected to return { reply: "..." }
    appendMessage(data.reply || 'Sorry, no reply.', 'bot');
  } catch (err) {
    // remove placeholder
    const last = Array.from(chatMessages.querySelectorAll('p')).pop();
    if (last && last.textContent === '...thinking') last.remove();

    appendMessage('Error: ' + (err.message || 'Failed to connect'), 'bot');
    console.error(err);
  }
}
