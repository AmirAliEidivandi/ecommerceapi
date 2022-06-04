const router = require("express").Router();
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../controllers/verifyToken");
const { updateCart, getCart, getAllCarts, postCart, deleteCart } = require("../controllers/cart.controllers");

router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);
router.post("/", verifyToken, postCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

module.exports = router;
