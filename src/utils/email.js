const transporter = require('../config/email');

const sendEmail = (email, subject, template, context) => {
  transporter.sendMail({
    from: '<app@gmail.com>',
    to: email,
    subject,
    template,
    context,
  });
};

module.exports = {
  sendEmail,
};

