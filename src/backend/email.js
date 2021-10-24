const nodemailer = require("nodemailer");

module.exports = async function SendEmail(email, user, contact) {
  const { Name, Email } = contact;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.email,
      pass: user.password,
    },
  });

  const mailOptions = {
    from: user.email,
    to: Email,
    subject: email.subject.replace("FLAG_NAME", Name),
    html: email.emailBody,
  };

  return transporter.sendMail(mailOptions);
};
