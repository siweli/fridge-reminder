import "../globals.css";

export default function Page() {
    return (
        <main>
            <title>Account</title>
            
            <h1>do some login/create thing</h1>
            <h2>Create an account:</h2>
            <form method="POST" action="../api/addaccount">
                <input name="username" type="text" placeholder="Username"></input>
                <input name="password" type="text" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}