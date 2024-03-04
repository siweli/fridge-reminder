import "../globals.css";
import { cookies } from "next/headers";
import styles from "./styles.module.css";


export default function Page() {
    const token = cookies().get("user_logged_in");
    
    if (token) {
        return (
            <main>
                <title>Account</title>
                <div>
                    <h1>logged in as {token.value}</h1>
                </div>
                <form method="POST" action="../../api/logout">
                    <button type="submit">log out</button>
                </form>

                <div className={styles.card_container}>
                    <a href="account/devices">
                        <div className={styles.dash_card}>
                            <h2>View devices</h2>
                        </div>
                    </a>
                </div>

            </main>
        )
    }
    return (
        <main>
            <title>Login</title>
            
            <h1>Login/Create an account</h1>
            <div className={styles.container}>
                <div className={styles.log_container}>
                    <h2>Create an account:</h2>
                    <form method="POST" action="../api/addaccount">
                        <input name="username" type="text" placeholder="Username" className={styles.entry}></input>
                        <input name="password" type="password" placeholder="Password" className={styles.entry}></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className={styles.log_container}>
                    <h2>Log in:</h2>
                    <form method="POST" action="../api/login">
                        <input name="username" type="text" placeholder="Username" className={styles.entry}></input>
                        <input name="password" type="password" placeholder="Password" className={styles.entry}></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    )
}