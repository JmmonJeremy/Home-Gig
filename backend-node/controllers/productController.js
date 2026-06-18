const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      ownerId: req.user._id,
      isActive: true
    }).sort({ name: 1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
      isActive: true
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get product", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ownerId: req.user._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inventoryQuantity: req.body.inventoryQuantity,
      inventoryStatus: req.body.inventoryStatus
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id,
        isActive: true
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};