const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ownerId: req.user._id
    })
      .populate("customerId", "name email phone")
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      ownerId: req.user._id
    }).populate("customerId", "name email phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to get order", error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ownerId: req.user._id,
      customerId: req.body.customerId,
      orderDate: req.body.orderDate,
      items: req.body.items,
      orderTotal: req.body.orderTotal,
      paymentStatus: req.body.paymentStatus,
      orderSource: req.body.orderSource,
      notes: req.body.notes
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};