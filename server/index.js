const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 4949;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

const CONNECTED_CLIENTS = [];
const ROOM = {
    users: [],
    chat: []
}

function sendToClient(client, method, args) {
    client.send(JSON.stringify({ type: "request", method, args }));
}

function sendToAll(method, args) {
    CONNECTED_CLIENTS.forEach((client) => {
        sendToClient(client.ws, method, args);
    })
}

function getClientObjectFromConnection(ws) {
    var oj = null;

    CONNECTED_CLIENTS.forEach(client => {
        if(getUserIDFromConnection(ws) == client.id) {
            oj = client;
            return;
        }
    })

    return oj;
}

function getUserIDFromConnection(ws) {
    return ws._ultron.id;
}

function addUserToRoom(user) {
    ROOM.users.push(user);
}

function clearUserFromRoom(user) {
    var userIndex = ROOM.users.indexOf(user);

    ROOM.users.splice(userIndex, 1);
}

function updateRoom() {
    sendToAll("updateroom", { room: ROOM });
}

function sendMessage(userObject, message) {
    ROOM.chat.push({message: message, datetime: new Date().toLocaleTimeString(["en-GB"], {
        hour: "2-digit",
        minute: "2-digit",
      }), user: userObject});
    sendToAll("onmessage", {room: ROOM});
}

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        const receieved = JSON.parse(data.toString());
        const method = receieved.method;
        const args = receieved.args;

        console.log(`args: `, args);

        switch (receieved.method) {
            case "login":
                var clientID = getUserIDFromConnection(ws);
                var arg = { nickname: args.nickname, color: args.color, id: clientID };

                CONNECTED_CLIENTS.push({ user: arg, id: clientID, ws: ws });
                addUserToRoom(arg);
                sendToClient(ws, "login", {user: arg, room: ROOM});
                updateRoom();
                break;
            case "logout":
                sendToClient(ws, "logout");

                clearUserFromRoom(getClientObjectFromConnection(ws).user);
                break;
            case "message": 
                sendMessage(getClientObjectFromConnection(ws).user, args.message);

                break;
            default:
                break;
        }
    });

    ws.addEventListener('close', (event) => {
        var clientObject = getClientObjectFromConnection(event.target);
        var clientIndex = CONNECTED_CLIENTS.indexOf(clientObject);

        CONNECTED_CLIENTS.splice(clientIndex, 1);
        clearUserFromRoom(clientObject);
        updateRoom();
    });
});

server.listen(port, function () {
    console.log("Web Socket Server started on port " + port);
});