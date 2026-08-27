import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  // Use built-in service preset for Gmail or custom SMTP
  const transportConfig = process.env.SMTP_SERVICE
    ? {
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      }
    : {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      };

  const transporter = nodemailer.createTransport(transportConfig);

  const mailOptions = {
    from: `"ByteBooks LMS" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};
