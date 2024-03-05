import "../../globals.css";

export default function Page() {
    return (
        <main>
            <title>Devices</title>
            <h1>display devices associated with account here</h1>
            <div>
                <h2>Activate a device:</h2>
                <form method="POST" action="../../api/adddevice">
                    <input name="otpcode" type="text" placeholder="OTP code"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}