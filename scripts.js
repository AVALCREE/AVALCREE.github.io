// Example user data (in a real app, you'd fetch this from a server)
const user = {
    name: 'User1',
    country: 'USA',
    emoji: '🇺🇸'
};

// Load messages from local storage
function loadMessages() {
    const messagesContainer = document.getElementById('messages');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesContainer.innerHTML = messages.map(message => `
        <div class="message">
            <span class="username">${message.user} (${message.country} ${message.emoji})</span>: 
            <span class="text">${message.text}</span>
        </div>
    `).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Save a message to local storage
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Handle sending a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim();
    if (messageText) {
        const message = {
            user: user.name,
            country: user.country,
            emoji: user.emoji,
            text: messageText
        };
        saveMessage(message);
        loadMessages();
        messageInput.value = '';
    }
}

// Initialize chat
document.addEventListener('DOMContentLoaded', loadMessages);
