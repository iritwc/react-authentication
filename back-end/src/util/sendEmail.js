const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e9aa8e43716b59",
      pass: "041d8d9163c519"
    }
  });


  export const sendEmail = ({from, to, subject, text, html}) => {
    transport.sendMail({from, to, subject, text, html});
  }