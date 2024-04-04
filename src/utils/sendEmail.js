const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  secure: false,
  auth: {
    user: "mono_sender@outlook.com",
    pass: "A2s4D6f8",
  },
});

async function sendEmail(recipient_email) {
  try {
    const info = await transporter.sendMail({
      from: "mono_sender@outlook.com",
      to: recipient_email,
      subject: "Welcome email",
      text: "You registered successfully.",
      html: "<p>Congratulations. You have registered to monobank. Hope you will use our website with satisfaction =)</p>",
    });

    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
