import './App.css';
import useInitWebSocket from "./hooks/init-web-socket";
import styles from "./App.module.scss"
import Header from "./components/Header/Header"
import SignIn from './components/SignIn/SignIn';
import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
  const { user, room, onClick } = useInitWebSocket(); // init socket

  return (
    <div className={styles.root}>
      <Header user={user} onSignOut={onClick.onSignOut}/>

      <main>
        {!user && <SignIn onClick={onClick.onSignIn} />}
        {user && <ChatRoom user={user} room={room} onChat={onClick.onMessage} />}
      </main>
    </div>
  );
}

export default App;
