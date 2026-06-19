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
    res.status(500).json({
      message: "Failed to get orders",
      error: error.message
    });
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
    res.status(500).json({
      message: "Failed to get order",
      error: error.message
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const paymentStatus = req.body.paymentStatus || "Unpaid";

    const order = await Order.create({
      ownerId: req.user._id,
      orderNumber: req.body.orderNumber,
      customerId: req.body.customerId,
      orderDate: req.body.orderDate,
      items: req.body.items,
      orderTotal: req.body.orderTotal,
      paymentStatus,
      paymentDate: paymentStatus === "Paid" ? new Date() : null
    });

    const populatedOrder = await Order.findById(order._id).populate(
      "customerId",
      "name email phone"
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create order",
      error: error.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateData = {
      orderNumber: req.body.orderNumber,
      customerId: req.body.customerId,
      orderDate: req.body.orderDate,
      items: req.body.items,
      orderTotal: req.body.orderTotal,
      paymentStatus: req.body.paymentStatus
    };

    if (req.body.paymentStatus === "Paid") {
      updateData.paymentDate = req.body.paymentDate || new Date();
    }

    if (req.body.paymentStatus === "Unpaid") {
      updateData.paymentDate = null;
    }

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id
      },
      updateData,
      { new: true, runValidators: true }
    ).populate("customerId", "name email phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update order",
      error: error.message
    });
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
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};