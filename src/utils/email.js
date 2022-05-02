const transporter = require('../config/email');

const sendEmail = async (email, subject, html) => {
  await transporter.sendMail({
    from: '<app@gmail.com>',
    to: email,
    subject,
    html,
  });
};

module.exports = {
  sendEmail,
};

