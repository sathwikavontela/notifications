import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const serviceAccount = JSON.parse(
    fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8")
);

// Fix line breaks
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    

// API to send notifications
app.post("/send-notification", async (req, res) => {
    const { token, title, body } = req.body;

    const message = {
        token: token,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        await admin.messaging().send(message);
        res.json({ success: true, message: "Notification sent successfully" });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
