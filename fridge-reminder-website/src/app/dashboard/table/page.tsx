"use client";

import { useState } from "react";
import "../../globals.css";
import styles from "./styles.module.css";
import prisma  from "../../../libaries/prisma"

export default async function Home() {

    const [showDiv, setShowDiv] = useState(false);
    function toggle() {
        setShowDiv(!showDiv);
    }

    let fridge_contents = [["Milk", "12/2/2024"], ["Eggs", "13/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"], ["Meat", "14/2/2024"]];
    
    let rows = []

    console.log(await prisma.users.findMany())

    for (let i=0; i<fridge_contents.length; i++) {
        rows.push(
            <tr key={i}>
                <td className={styles.contents_table}>{i}</td>
                <td className={styles.contents_table}>{fridge_contents[i][0]}</td>
                <td className={styles.contents_table}>{fridge_contents[i][1]}</td>
                <td>
                    <form method="POST" action="../../api/deleterow">
                        <input type="hidden" name="id" value={i}></input>
                        <button type="submit" className={styles.delete_row_btn}>-</button>
                    </form>
                </td>
            </tr>
        )
    }
    return (
        <main>
            <title>View contents</title>
            <div className={styles.wrapper}>
                <h1 className={styles.title_text}>Your fridge contents:</h1>
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th scope="col" className={styles.contents_table}>ID</th>
                            <th scope="col" className={styles.contents_table}>Item</th>
                            <th scope="col" className={styles.contents_table}>Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button type="submit" onClick={toggle} className={styles.add_row_btn}>+</button>

                <div className={styles.new_item} style={{display: showDiv?"block":"none"}}>
                    <h2>Add a new item:</h2>
                    <form method="POST" action="../../api/addrow">
                        <input name="item_name" type="text" placeholder="Item name"></input>
                        <p>Expires:</p>
                        <input name="expire_date" type="date"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    );
}