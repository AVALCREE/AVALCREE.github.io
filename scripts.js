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

// Function to handle form submission
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const message = {
        user: formData.get('user'),
        country: formData.get('country'),
        emoji: formData.get('emoji'),
        text: formData.get('text')
    };

    saveMessage(message);
    loadMessages();

    // Optionally, display a success message or reset the form
    document.getElementById('form-message').textContent = 'Your message has been sent!';
    event.target.reset();
});

// Load messages when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadMessages);
