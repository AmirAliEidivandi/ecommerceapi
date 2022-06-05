const router = require("express").Router();
const postPayment = require("../controllers/stripe.controllers");

router.post("/payment", postPayment);

module.exports = router;
