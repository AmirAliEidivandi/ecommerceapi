const asyncWrapper = require("../middleware/async");
const Product = require("../models/product.model");

// CREATE PRODUCT
const postProduct = asyncWrapper(async (req, res) => {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
});

// GET ALL PRODUCT
const getAllProducts = asyncWrapper(async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else {
        products = await Product.find({});
    }

    res.status(200).json(products);
});

// GET PRODUCT
const getProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
});

// UPDATE PRODUCT
const updateProduct = asyncWrapper(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedProduct);
});

// DELETE PRODUCT
const deleteProduct = asyncWrapper(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("Product has been deleted...");
});

module.exports = {
    postProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
