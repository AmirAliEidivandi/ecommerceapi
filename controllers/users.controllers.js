const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllUsers = asyncWrapper(async (req, res) => {
    res.send("hello world");
});

const getUser = asyncWrapper(async (req, res) => {});

const postUser = asyncWrapper(async (req, res) => {
    const userName = req.body.username;
    res.send(userName);
});

const updateUser = asyncWrapper(async (req, res) => {});

const deleteUser = asyncWrapper(async (req, res) => {});

module.exports = {
    getAllUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
};
