// utils/sendMail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify the transporter works
    await transporter.verify();
    console.log("✅ Email server is ready to take messages");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}:`, info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendEmail;
