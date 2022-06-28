import send from "../server/send";

function onSignOut(event, webSocket) {
    send(webSocket, "logout");
}

function onSignIn(event, webSocket) {
    event.preventDefault(); // Prevent actual request sent to site
    const nickname = event.target.nickname.value;
    const color = event.target.color.value;
    
    if (nickname.length >= 1 && nickname.length <= 32) {
        send(webSocket, "login", { nickname, color });
    }
}

function onMessage(event, webSocket) {
    const message = event.target.message.value;

    if(message.length >= 1) {
        send(webSocket, "message", { message: message });
    }
}

const onClickMethods = {
    onSignIn,
    onSignOut,
    onMessage
};

export default onClickMethods;