const nodemailer = require("nodemailer");

export interface EmailTemp {
  subject: string;
  emailBody: string;
}

export interface User {
  userEmail: string;
  userPassword: string;
}

export interface Contact {
  name: string;
  email: string;
}

export async function SendEmail(
  emailTemp: EmailTemp,
  user: User,
  contact: Contact
) {
  const { name, email } = contact;
  const rg = /(?<=@)[^.]+(?=\.)/gm;
  const domain = rg.exec(user.userEmail) || "gmail";
  const transporter = nodemailer.createTransport({
    service: domain[0],
    auth: {
      user: user.userEmail,
      pass: user.userPassword,
    },
  });

  const mailOptions = {
    from: user.userEmail,
    to: email,
    subject: emailTemp.subject,
    html: emailTemp.emailBody.replace("FLAG_NAME", name),
  };

  return transporter.sendMail(mailOptions);
}
