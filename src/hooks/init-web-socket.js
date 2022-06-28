import { useEffect, useState } from "react";
import onClickMethods from "../lib/events/on-click-methods";
import send from "../lib/server/send";

const ws_url = "ws://localhost:4949";

const useInitWebSocket = () => {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);

    const [webSocket, setWebSocket] = useState(null);

    useEffect(function initWebSocket() {
        if(webSocket != null) return;
        const newWebSocket = new WebSocket(ws_url);

        newWebSocket.onmessage = (event) => {
            console.log(`[🧶] MESSAGE`, event.data);
            
            const data = JSON.parse(event.data);
            const { method, args } = data;

            switch(method) {
                case "login":
                    setRoom(args.room);
                    setUser(args.user);
                    break;
                case "logout":
                    setUser(null);
                    setRoom(null);
                    break;
                case "onmessage":
                    setRoom(args.room);
                case "updateroom":
                    setRoom(args.room);
                    break;
                default:
                    break;
            }
        };

        newWebSocket.onerror = (event) => {
            console.log(`[🔥] ERROR :\n`, event);
        };

        newWebSocket.onopen = (event) => {
            console.log("[🎉] OPEN :\n", event);
        };

        newWebSocket.onclose = (event) => {
            console.log(`[🧨] CLOSE :\n`, event);
        };

        setWebSocket(newWebSocket);
    }, []);

    const onClick = {
        onSignIn: (event) => onClickMethods.onSignIn(event, webSocket),
        onSignOut: (event) => onClickMethods.onSignOut(event, webSocket),
        onMessage: (event) => onClickMethods.onMessage(event, webSocket)
    }

    return { user, room, onClick };
}

export default useInitWebSocket;