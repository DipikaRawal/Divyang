import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = 5000;

// Allow only your frontend to make requests
app.use(cors({
    origin: ["https://divyang.vercel.app/"], // Change this if your frontend is deployed (e.g., "https://yourwebsite.com")
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());

if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("❌ Missing EMAIL or PASSWORD in environment variables.");
    process.exit(1);
}

// Debugging
console.log("✅ EMAIL:", process.env.EMAIL);

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL}>`,
            to: 'rawal.dipika1234@gmail.com',
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        console.log("✅ Email sent:", info.response);
        res.json({ success: "Message sent successfully!" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
