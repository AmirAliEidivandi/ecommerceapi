const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../controllers/verifyToken");
const { postProduct, updateProduct, getProduct, getAllProducts, deleteProduct } = require("../controllers/product.controllers");

router.get('/', getAllProducts)
router.get("/find/:id", getProduct);
router.post("/", verifyTokenAndAdmin, postProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct)

module.exports = router;
