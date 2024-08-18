// Example user data - replace with dynamic user data if needed
const user = {
    name: 'User1',
    country: 'USA',
    emoji: '🇺🇸'
};

// Function to load messages from localStorage and display them
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

// Function to save messages to localStorage
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to send message using EmailJS
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

// Load messages when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadMessages);
