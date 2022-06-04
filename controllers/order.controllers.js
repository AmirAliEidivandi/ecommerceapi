const asyncWrapper = require("../middleware/async");
const Order = require("../models/order.model");

// CREATE ORDER
const postOrder = asyncWrapper(async (req, res) => {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
});

// GET ALL ORDERS
const getAllOrders = asyncWrapper(async (req, res) => {
    const orders = awaitOrder.find();
    res.status(200).json(orders);
});

// GET ORDER
const getOrder = asyncWrapper(async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
});

// UPDATE ORDER
const updateOrder = asyncWrapper(async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedOrder);
});

// DELETE ORDER
const deleteOrder = asyncWrapper(async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order has been deleted...");
});

// GET MONTHLY INCOME
const getIncome = asyncWrapper(async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    res.status(200).send(income);
});

module.exports = {
    getIncome,
    getAllOrders,
    getOrder,
    postOrder,
    updateOrder,
    deleteOrder,
};
