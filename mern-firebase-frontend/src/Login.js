import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sendNotification, setSendNotification] = useState(false); // Track notification preference

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");
            const token = localStorage.getItem("fcm_token");
            if (token && sendNotification) {
                fetch("https://notifications-qrso.onrender.com/send-notification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: token,
                        title: "Login Successful",
                        body: `Welcome back, ${email}!`,
                    }),
                })
                .then(res => res.json())
                .then(data => console.log("Notification Response:", data))
                .catch(err => console.error("Notification Error:", err));
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <div>
                <input
                    type="checkbox"
                    id="sendNotification"
                    checked={sendNotification}
                    onChange={(e) => setSendNotification(e.target.checked)}
                />
                <label htmlFor="sendNotification">Send Login Notification</label>
            </div>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
