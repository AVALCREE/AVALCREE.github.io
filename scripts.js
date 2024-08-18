// Example user data
const user = {
    name: 'User1',
    country: 'USA',
    emoji: '🇺🇸'
};

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

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

async function sendMessage() {
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

        // Send email using EmailJS
        try {
            await emailjs.send('service_wvhhonc', 'template_ajbdu7b', {
                user: message.user,
                country: message.country,
                emoji: message.emoji,
                text: message.text
            });
            alert('Your message has been sent to me!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send your message.');
        }
    }
}

document.addEventListener('DOMContentLoaded', loadMessages);
