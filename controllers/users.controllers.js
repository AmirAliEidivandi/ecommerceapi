const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");
const CryptoJS = require("crypto-js");
const User = require("../models/user.model");

// GET ALL USER
const getAllUsers = asyncWrapper(async (req, res) => {
    const query = req.query.new;
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find({});
    res.status(200).json(users);
});

// GET USER
const getUser = asyncWrapper(async (req, res) => {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
});

// GET USER STATS
const getUserStats = asyncWrapper(async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);

    res.status(200).json(data);
});

const postUser = asyncWrapper(async (req, res) => {
    const userName = req.body.username;
    res.send(userName);
});

// UPDATE USER
const updateUser = asyncWrapper(async (req, res, next) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    const userUpdate = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true, runValidators: true }
    );
    res.status(200).json(userUpdate);
});

// DELETE USER
const deleteUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User has been deleted...");
});

module.exports = {
    getAllUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    getUserStats,
};
