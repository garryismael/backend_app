const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');

const token_key = process.env.TOKEN_KEY;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = (user, expiresIn) => {
  return getToken(
    {
      user_id: user.id,
      email: user.email,
    },
    { expiresIn }
  );
};

const generateRegistrationToken = (id) => {
  return getToken(
    {
      id,
    },
    { expiresIn: '1h' }
  );
};

const getToken = (payload, expiresIn) => {
  return jwt.sign(payload, token_key, expiresIn);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, token_key);
  } catch (error) {
    return undefined;
  }
};

const sendEmailForRegistration = async (email, token) => {
  await transporter.sendMail({
    from: '<app@gmail.com>',
    to: email,
    subject: "Vérification de l'email",
    html: `Votre email de vérification: <a href="${FRONTEND_URL}/email-verify/${token}">lien</a>`,
  });
};

const getUserWithoutPassword = (user) => {
  return {
    id: user.id,
    nom: user.nom,
    username: user.username,
    email: user.email,
  };
};

module.exports = {
  hashPassword,
  checkPassword,
  generateToken,
  verifyToken,
  sendEmailForRegistration,
  getUserWithoutPassword,
  generateRegistrationToken,
};

