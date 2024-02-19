export default function Page() {
    return (
        <main>
            <h1>Type in a message:</h1>
            <form method="POST" action="../../api/addrow">
                <input name="test" type="text"></input>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}