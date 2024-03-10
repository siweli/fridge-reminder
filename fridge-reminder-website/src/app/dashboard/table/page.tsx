import "../../globals.css";
import styles from "./styles.module.css";
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export default async function Home() {
    const token = cookies().get("user_id");

    if (!token) {
        redirect("../account")
    }

    const devices = await prisma.devices.findMany ({
        where: {
            user_id: parseInt(token.value)
        }
    })

    const fridge_contents = await prisma.items.findMany({
        where: {
            device_id: devices[0].id,
        },
    });
    
    let rows = []
    for (let i=0; i<fridge_contents.length; i++) {
        rows.push(
            <tr key={i}>
                <td className={styles.contents_table}>{fridge_contents[i].name}</td>
                <td className={styles.contents_table}>{fridge_contents[i].expires}</td>
                <td>
                    <form method="POST" action="../../api/deleterow">
                        <input type="hidden" name="id" value={fridge_contents[i].id}></input>
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
                            <th scope="col" className={styles.contents_table}>Item</th>
                            <th scope="col" className={styles.contents_table}>Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button type="submit" className={styles.add_row_btn}>+</button>

                <div className={styles.new_item}>
                    <h2>Add a new item:</h2>
                    <form method="POST" action="../../api/addrow">
                        <input type="hidden" name="device_id" value={devices[0].id}></input>
                        <input name="item_name" type="text" placeholder="Item name" className={styles.entry}></input>
                        <p>Expires:</p>
                        <input name="expire_date" type="date"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </main>
    );
}