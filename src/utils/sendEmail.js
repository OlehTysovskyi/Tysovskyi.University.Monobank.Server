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

async function sendSupportEmail(req, res) {
  const { problem_text, sender_email } = req.body;

  try {
    const info = await transporter.sendMail({
      from: "mono_sender@outlook.com",
      to: sender_email,
      subject: "Support Message | Monobank",
      text: problem_text,
      html:
        "<h2>Вітаю) Я стикнувся з такою проблемою:</h2><p>" +
        problem_text +
        "</p><h3>Розраховую на вашу допомогу =)</h3>",
    });

    return res
      .status(200)
      .send({ message: "Support email has been successfully sended" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(400)
      .send({ message: "Error sending while sending support email" });
  }
}

async function sendSuccessTransactionEmail(recipient_email) {
  try {
    const info = await transporter.sendMail({
      from: "mono_sender@outlook.com",
      to: recipient_email,
      subject: "Incomes email | Monobank",
      text: "",
      html: "<h2>Вітання) На ваш рахунок було надіслано кошти</h2>",
    });

    console.log("Incomes email has been successfully sended");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail, sendSupportEmail, sendSuccessTransactionEmail };
