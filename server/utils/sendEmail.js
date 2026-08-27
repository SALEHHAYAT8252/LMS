import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const isPort465 = Number(process.env.SMTP_PORT) === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    service: process.env.SMTP_SERVICE || "gmail",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: isPort465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const mailOptions = {
    from: `"ByteBooks LMS" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
