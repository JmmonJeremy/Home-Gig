const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      ownerId: req.user._id,
      isActive: true
    }).sort({ name: 1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get customers", error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
      isActive: true
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to get customer", error: error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ownerId: req.user._id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      notes: req.body.notes
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: "Failed to create customer", error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id,
        isActive: true
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: "Failed to update customer", error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user._id,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};