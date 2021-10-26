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
    subject: email.subject,
    html: email.emailBody.replace("FLAG_NAME", Name),
  };

  return transporter.sendMail(mailOptions);
};
