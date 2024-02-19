import styles from "./styles.module.css";

export default function Home() {

    let fridge_contents = [["Milk", "12/2/2024"], ["Eggs", "13/2/2024"], ["Meat", "14/2/2024"]];
    let rows = []

    for (let i=0; i<fridge_contents.length; i++) {
        rows.push(
            <tr key={i}>
                <td>{i}</td>
                <td>{fridge_contents[i][0]}</td>
                <td>{fridge_contents[i][1]}</td>
            </tr>
        )
    }
    return (
        <main>
            <p>aaaaa</p>
            <table>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Item</th>
                    <th scope="col">Expires</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </main>
    );
}