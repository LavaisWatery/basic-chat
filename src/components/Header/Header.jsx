import styles from "./Header.module.scss";

const Header = ({ user, onSignOut }) => {
    return (
        <header className={styles.root}>
            <div>Basic Chat App</div>
            <div>
                {user && (
                    <div className={styles.base}>
                        <b style={{ color: user.color }}>{user.nickname}</b>
                        <button onClick={onSignOut} className="small">
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;