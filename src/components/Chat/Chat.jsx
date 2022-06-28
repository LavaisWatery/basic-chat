import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";

const Chat = ({ onChat, room }) => {
    const [value, setValue] = useState("");
    const chatRef = useRef();

    const onSubmit = (event) => {
        event.preventDefault();
        setValue("");
        onChat(event);
    }

    useEffect(() => { // Keep chat scrolled
        if (chatRef.current) {
          chatRef.current.scroll({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, [room]);

    return (
        <div className={styles.root}>
            <div ref={chatRef} className={styles.base}>
                {room.chat.map((obj) => (
                    <div key={obj.datetime}>
                        <span className="spall">
                            {obj.datetime + " "}
                        </span>
                        <span>
                            <b style={{color: obj.user.color}}>
                                {obj.user.nickname}
                            </b>
                            {": "}
                        </span>
                        <span>{obj.message}</span>
                    </div>
                ))}
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Send a message"
                    id="message"
                    name="message"
                    onChange={(event) => setValue(event.target.value)}
                    minLength={1}
                    maxLength={256}
                    value={value}
                />
                <button className="small">
                    <svg
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.0972 6.29705C15.7381 6.57137 15.7381 7.47989 15.0972 7.75421L1.21455 13.6965C0.581174 13.9676 -0.0726234 13.3571 0.154451 12.7067L1.36758 9.23159C1.44729 9.00329 1.62691 8.82384 1.85532 8.74435L6.79381 7.02563L1.85532 5.30691C1.62691 5.22742 1.44729 5.04798 1.36758 4.81963L0.154451 1.34457C-0.0726227 0.694106 0.581174 0.0836679 1.21455 0.354776L15.0972 6.29705Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default Chat;