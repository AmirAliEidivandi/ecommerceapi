const asyncWrapper = require("../middleware/async");
const Cart = require("../models/cart.model");

// CREATE CART
const postCart = asyncWrapper(async (req, res) => {
    const newCart = new Product(req.body);

    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
});

// GET ALL CART
const getAllCarts = asyncWrapper(async (req, res) => {
    const carts = await Cart.find();
    res.status(200).json(carts);
});

// GET CART
const getCart = asyncWrapper(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
});

// UPDATE CART
const updateCart = asyncWrapper(async (req, res) => {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedCart);
});

// DELETE CART
const deleteCart = asyncWrapper(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart has been deleted...");
});

module.exports = {
    postCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart,
};
