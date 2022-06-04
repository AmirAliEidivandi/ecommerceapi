const User = require("../models/user.model");
const asyncWrapper = require("../middleware/async");
// const { createCustomError } = require("../error/custom-error");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

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

    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!");

    const accessToken = JWT.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
});

module.exports = {
    userRegister,
    userLogin,
};
