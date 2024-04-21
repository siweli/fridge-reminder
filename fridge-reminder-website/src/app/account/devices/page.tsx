import { redirect } from "next/navigation"
import "../../globals.css";
import { cookies } from "next/headers";
import prisma from "../../../libaries/prisma";

export default async function Page() {
    const logged_in = cookies().get("user_id");
    if (!logged_in) return
    if (!logged_in) (
        redirect("../account")
    )

    const user_devices = await prisma.devices.findMany ({
        where: {
            user_id: parseInt(logged_in.value)
        }
    })

    let devices_list = []
    for (let i=0; i<user_devices.length; i++) {
        devices_list.push(
            <div>
                <a href={"/dashboard/table?id="+user_devices[i].id}>
                    <h1>{user_devices[i].token}</h1>
                </a>
            </div>
        )
    }

    return (
        <main>
            <title>Devices</title>
            <h1>display devices associated with account here</h1>
            <div>
                <h2>Activate a device:</h2>
                <form method="POST" action="../../api/adddevice">
                    <h2></h2>
                    <input name="otpcode" type="text" placeholder="OTP code"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {devices_list}
            </div>
        </main>
    )
}