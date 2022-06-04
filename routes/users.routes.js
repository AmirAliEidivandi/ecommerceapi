const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../controllers/verifyToken");
const { getUserStats, getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/users.controllers");

router.get("/", getAllUsers);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/stats", verifyTokenAndAdmin, getUserStats);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
