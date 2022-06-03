const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllUsers = asyncWrapper(async (req, res) => {});

const getUser = asyncWrapper(async (req, res) => {});

const postUser = asyncWrapper(async (req, res) => {});

const updateUser = asyncWrapper(async (req, res) => {});

const deleteUser = asyncWrapper(async (req, res) => {});

module.exports = {
    getAllUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
};
