const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./email');

const token_key = process.env.TOKEN_KEY;
const URL = process.env.FRONTEND_URL;

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

const sendEmailForRegistration = async (user) => {
  const token = generateRegistrationToken(user.id);
  await sendEmail(
    user.email,
    "Vérification de l'email",
    `Votre email de vérification: <a href="${URL}/email-verify/${token}">lien</a>`
  );
};

const sendEmailForResetPassword = async (user) => {
  const token = getToken(
    {
      id: user.id,
    },
    { expiresIn: '1h' }
  );
  await sendEmail(
    user.email,
    'Changer le mot de passe',
    `Votre email de changement de mot de passe: <a href="${URL}/reset-password/${token}">lien</a>`
  );
};

const getUserWithoutPassword = (user) => {
  return {
    id: user.id,
    nom: user.nom,
    username: user.username,
    email: user.email,
  };
};

const factory_registration = (user) => {
  return user !== null && !user.estverifie
}

const factory_reset_password = (user) => {
  return user !== null;
}


module.exports = {
  hashPassword,
  checkPassword,
  generateToken,
  verifyToken,
  sendEmailForRegistration,
  getUserWithoutPassword,
  generateRegistrationToken,
  sendEmailForResetPassword,
  factory_registration,
  factory_reset_password
};

