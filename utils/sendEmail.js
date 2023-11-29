import nodemailer from "nodemailer";
import nodeMailerConfig from "./nodeMailerConfig.js";

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport(nodeMailerConfig);

  return transporter.sendMail({
    from: '"Kwabena Twitter 👻" <kwabena@mail.com>',
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;
