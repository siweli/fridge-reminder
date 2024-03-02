import "../globals.css";
import { cookies } from "next/headers";

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
            </main>
        )
    }
    return (
        <main>
            <title>Account</title>
            
            <h1>Login/Create an account</h1>
            <div>
            <h2>Create an account:</h2>
                <form method="POST" action="../api/addaccount">
                    <input name="username" type="text" placeholder="Username"></input>
                    <input name="password" type="password" placeholder="Password"></input>
                    <button type="submit">Submit</button>
                </form>

                <h2>Log in:</h2>
                <form method="POST" action="../api/login">
                    <input name="username" type="text" placeholder="Username"></input>
                    <input name="password" type="password" placeholder="Password"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}