import Chat from "../Chat/Chat";
import Users from "../Users/Users";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({user, room, onChat}) => {

    return (
        <div className={styles.root}>
            <Chat room={room} onChat={onChat}/>
            <Users room={room}/>
        </div>
    );
}

export default ChatRoom;