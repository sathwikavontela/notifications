import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBf-eLZEIL_vhMBju_zba9t_mqj2YWfj34",
    authDomain: "notifications-w2n.firebaseapp.com",
    projectId: "notifications-w2n",
    storageBucket: "notifications-w2n.firebasestorage.app",
    messagingSenderId: "1026137881176",
    appId: "1:1026137881176:android:50bd8cb93e9e34f356a82d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

// Request permission to send notifications
const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: "BBpgVC8K08fbx916RlSmy33ZrWZgaapmuiimta2k2ki6RMLGk0zUq3ff783YoVhyruliHXRRwRGes-NpBrgatvQ" });
        if (currentToken) {
            console.log("FCM Token:", currentToken);
        } else {
            console.log("No registration token available.");
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
    }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    alert(`New Notification: ${payload.notification.title} - ${payload.notification.body}`);
});

export { auth, messaging, requestForToken };
