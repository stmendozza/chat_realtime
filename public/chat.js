"use strict";

const socket = io();

// DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let output = document.getElementById("output");
let actions = document.getElementById("actions");
let btn = document.getElementById("send");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
});
// ～

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
    message.innerHTML = '';
    actions.innerHTML = '';
    output.innerHTML +=  `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', (data) => {
    actions.innerHTML =  `<p><em>${data} esta escribiendo...</em></p>`;
});