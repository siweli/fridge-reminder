"use client";

import { useState } from "react";
import "../../globals.css";
import styles from "./styles.module.css";

export default function Home() {

    const [showDiv, setShowDiv] = useState(false);
    function toggle() {
        setShowDiv(!showDiv);
    }

    let fridge_contents = [["Milk", "12/2/2024"], ["Eggs", "13/2/2024"], ["Meat", "14/2/2024"]];
    let rows = []

    for (let i=0; i<fridge_contents.length; i++) {
        rows.push(
            <tr key={i}>
                <td className={styles.contents_table}>{i}</td>
                <td className={styles.contents_table}>{fridge_contents[i][0]}</td>
                <td className={styles.contents_table}>{fridge_contents[i][1]}</td>
                <td><button type="submit" className={styles.delete_row_btn}>-</button></td>
            </tr>
        )
    }
    return (
        <main>
            <h1 className={styles.title_text}>Your fridge contents:</h1>
            <table cellSpacing="0">
                <tr>
                    <th scope="col" className={styles.contents_table}>ID</th>
                    <th scope="col" className={styles.contents_table}>Item</th>
                    <th scope="col" className={styles.contents_table}>Expires</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <button type="submit" onClick={toggle} className={styles.add_row_btn}>+</button>

            <div className={styles.new_item} style={{display: showDiv?"block":"none"}}>
                <h2>Add a new item:</h2>
                <form method="POST" action="../../api/addrow">
                    <input name="test" type="text" placeholder="Item name"></input>
                    <p>Expires:</p>
                    <input type="date"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    );
}