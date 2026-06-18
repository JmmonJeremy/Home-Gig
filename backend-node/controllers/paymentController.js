const Payment = require("../models/Payment");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      ownerId: req.user._id
    })
      .populate("customerId", "name email phone")
      .populate("orderId", "orderDate orderTotal paymentStatus")
      .sort({ paymentDate: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to get payments", error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      ownerId: req.user._id
    })
      .populate("customerId", "name email phone")
      .populate("orderId", "orderDate orderTotal paymentStatus");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Failed to get payment", error: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      ownerId: req.user._id,
      orderId: req.body.orderId,
      customerId: req.body.customerId,
      amountPaid: req.body.amountPaid,
      paymentDate: req.body.paymentDate,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
      notes: req.body.notes
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create payment", error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: "Failed to update payment", error: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error: error.message });
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};