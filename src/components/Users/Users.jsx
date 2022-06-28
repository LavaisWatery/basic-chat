import styles from "./Users.module.scss";

const Users = ({room}) => {

    return (
        <div className={styles.root}>
            <div>
                <div> Online Users: </div>

                <div>
                    {room.users.map((user) => (
                        <div key={user.id}>
                            <b style={{color: user.color}}>
                                {user.nickname}
                            </b>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users;