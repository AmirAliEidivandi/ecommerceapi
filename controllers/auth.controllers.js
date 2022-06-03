const User = require("../models/user.model");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");
const CryptoJS = require("crypto-js");

const userRegister = asyncWrapper(async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
});

const userLogin = asyncWrapper(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
});

module.exports = {
    userRegister,
    userLogin,
};
