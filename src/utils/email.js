const transporter = require('../config/email');
const path = require('path');

const sendEmail = (email, subject, template, context) => {
  transporter.sendMail({
    from: '<app@gmail.com>',
    to: email,
    subject,
    template,
    context,
    attachments: [
      {
        filename: 'email.png',
        path: path.resolve('./public/images/') + '/email.png',
        cid: 'emailImage'
      },
    ],
  });
};

module.exports = {
  sendEmail,
};

