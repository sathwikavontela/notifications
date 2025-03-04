import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");

            // Get the FCM token from localStorage
            const token = localStorage.getItem("fcm_token");

            if (token) {
                // Send notification request to backend
                fetch("http://localhost:5000/send-notification", {
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
