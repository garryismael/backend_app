const status = require('http-status');
const {
    generateToken,
    getUserWithoutPassword,
    hashPassword,
    sendEmailForRegistration,
    sendEmailForResetPassword,
} = require('../utils/auth');
const User = require('../models/user');
const drive = require('../config/deta');

const register = async(req, res) => {
    req.body.password = hashPassword(req.body.password);
    
    //Upload file
    const filename = req.files.image.name;
    const contents = req.files.image.data;
    req.body.image = filename;
    await drive.put(filename, { data: contents });

    const user = User.build(req.body);
    await user.save();
    sendEmailForRegistration(user);
    res.status(status.CREATED).send();
};

const login = async(req, res) => {
    const user = res.locals.user;
    const token = generateToken(user, '7h');
    res.status(status.OK).json({
        token,
        user: getUserWithoutPassword(user),
    });
};

const activeAccount = async(req, res) => {
    const user = res.locals.user;
    user.estverifie = true;
    await user.save();
    res.status(status.OK).send();
};

// Send Email For Reseting Password
const confirmEmail = async(req, res) => {
    const user = res.locals.user;
    sendEmailForResetPassword(user);
    res.status(status.OK).json({
        user: getUserWithoutPassword(user),
    });
};

const changePassword = async(req, res) => {
    const user = res.locals.user;
    user.password = hashPassword(req.body.newPassword);
    await user.save();
    res.status(status.OK).send();
};

const imageUrl = async(res, res) => {
    const name = req.params.name;
    const img = await drive.get(name);
    img ? res.send(Buffer.from(await img.arrayBuffer())) : res.status(httpStatus.NOT_FOUND).send();
};

module.exports = {
    register,
    login,
    activeAccount,
    changePassword,
    confirmEmail,
    imageUrl
};