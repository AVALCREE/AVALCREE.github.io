const appId = '7aa18c42-e8c0-4e88-811f-6ad6059e48f6'; // Replace with your Photon App ID
const chatServerUrl = 'wss://chat-eu.exitgames.com'; // Replace with your Photon Chat server URL

let client;
let chat;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Photon Chat client
    client = new PhotonChat.Client(appId, chatServerUrl);
    client.addEventListener(PhotonChat.Event.CONNECTED, onConnected);
    client.addEventListener(PhotonChat.Event.DISCONNECTED, onDisconnected);
    client.addEventListener(PhotonChat.Event.MESSAGE, onMessage);
    
    // Connect to the Photon Chat server
    client.connect();
});

function onConnected(event) {
    console.log('Connected to Photon Chat server');
    chat = client.createChat('myChatRoom'); // Replace 'myChatRoom' with your desired chat room
    chat.addEventListener(PhotonChat.Event.MESSAGE, onMessage);
}

function onDisconnected(event) {
    console.log('Disconnected from Photon Chat server');
}

function onMessage(event) {
    const messageElement = document.createElement('div');
    messageElement.textContent = event.message.text;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value;
    if (messageText.trim()) {
        chat.sendMessage(messageText);
        messageInput.value = '';
    }
}
