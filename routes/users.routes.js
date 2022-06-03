const router = require("express").Router();
const { getAllUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/users.controllers");

router.route("/").get(getAllUsers).post(postUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
