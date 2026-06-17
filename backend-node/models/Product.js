const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    inventoryQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    inventoryStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Critical Level", "Out of Stock"],
      default: "In Stock"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);