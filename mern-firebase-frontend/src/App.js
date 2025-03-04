import React, { useEffect } from "react";
import Login from "./Login";
import { requestForToken } from "./firebase";

function App() {
    useEffect(() => {
        requestForToken();
    }, []);

    return (
        <div>
            <h1>Welcome to MERN + Firebase App</h1>
            <Login />
        </div>
    );
}

export default App;
