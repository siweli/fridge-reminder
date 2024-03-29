import "../globals.css";
import styles from "./styles.module.css";

export default function Page() {
    return (
        <main>
            <title>Dashboard</title>
            <h1>Dashboard</h1>
            <div className={styles.card_container}>
                <a href="/account/devices">
                    <div className={styles.dash_card}>
                        <h2>View fridge contents</h2>
                    </div>
                </a>
            </div>
        </main>
    )
}