import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const port = Number(process.env.SMTP_PORT) || 587;
  const isSecure = port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: isSecure,
    requireTLS: !isSecure,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"ByteBooks LMS" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
