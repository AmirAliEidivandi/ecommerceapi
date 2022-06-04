const router = require("express").Router();
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../controllers/verifyToken');
const { postOrder, updateOrder, deleteOrder, getAllOrders, getOrder, getIncome } = require("../controllers/order.controllers");

router.get('/income', verifyTokenAndAdmin, getIncome)
router.get('/', verifyTokenAndAdmin, getAllOrders)
router.get('/find/:userId', verifyTokenAndAuthorization, getOrder)
router.post('/', verifyToken, postOrder)
router.put('/:id', verifyTokenAndAdmin, updateOrder)
router.delete('/:id', verifyTokenAndAdmin, deleteOrder)

module.exports = router;