wsUrl = "wss://echo-ws-service.herokuapp.com";

form = document.querySelector(".send-message");
input = form.querySelector(".input-message");
chat = document.querySelector(".chat-window");
is_connected = false;

websocket = new WebSocket(wsUrl);
addServiceMessage("Идет подключение...");

websocket.onopen = function(event) {
    console.log(event);
    removeServiceMessage();
    is_connected = true;
}

websocket.onmessage = function(event) {
    console.log(event);
    addMessageToChat(event.data, "received-message");
};

websocket.onerror = function(event) {
    alert(`Произошла ошибка: ${event.data}`);
};

function addMessageToChat(text, message_class) {
    message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(message_class);
    message.textContent = text;
    chat.appendChild(message);
}

function addServiceMessage(text) {
    message = document.createElement("p");
    message.classList.add("service-message");
    message.textContent = text;
    chat.appendChild(message);
}

function removeServiceMessage() {
    console.log(chat.children);
    for (child of chat.children) {
        console.log(child.classList);
        if (child.classList.contains("service-message")) {
            chat.removeChild(child);
        }
    }
}

function sendRequest(message) {
    websocket.send(message);
}

form.addEventListener("submit", (event) => {
    if (!is_connected) {
        return;
    }

    text = input.value;
    addMessageToChat(text, "sent-message");
    input.value = '';
    sendRequest(text);
    event.preventDefault();
});