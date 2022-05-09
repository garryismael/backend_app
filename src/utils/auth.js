const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./email');
const User = require('../models/user');

const TOKEN_KEY = process.env.TOKEN_KEY;
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
  return jwt.sign(payload, TOKEN_KEY, expiresIn);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, TOKEN_KEY);
  } catch (error) {
    return undefined;
  }
};

const sendEmailForRegistration = (user) => {
  const token = generateRegistrationToken(user.id);
  sendEmail(user.email, "Vérification de l'email", 'register', {
    name: user.nom,
    url: 'http://localhost:8080',
    token,
  });
};

const sendEmailForResetPassword = (user) => {
  const token = getToken(
    {
      id: user.id,
    },
    { expiresIn: '1h' }
  );
  sendEmail(user.email, 'Changer le mot de passe', 'resetpass', {
    name: user.nom,
    url: 'http://localhost:8080',
    token,
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

const IsNewUser = (user) => user !== null && !user.estverifie;

const checkTokenUserFactory = async (req, res, callback) => {
  const tokenData = verifyToken(req.params.token);
  let verified = false;
  if (tokenData) {
    const { id } = tokenData;
    const user = await User.findByPk(id);
    if (callback(user)) {
      verified = true;
      res.locals.user = user;
    }
  }
  return verified;
};

const IsNotNullUser = (user) => user !== null;

module.exports = {
  hashPassword,
  checkPassword,
  generateToken,
  verifyToken,
  sendEmailForRegistration,
  getUserWithoutPassword,
  generateRegistrationToken,
  sendEmailForResetPassword,
  IsNewUser,
  IsNotNullUser,
  checkTokenUserFactory,
};

