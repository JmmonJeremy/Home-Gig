const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");
const systemRoutes = require("./routes/systemRoutes");

dotenv.config();

connectDB();

// temporarily force Node to load Mongoose schemas to verify that the model files have no syntax errors
require("./models/User");
require("./models/Product");
require("./models/Customer");
require("./models/Order");

const app = express();

const allowedOrigins = [
  "http://localhost:4200",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/system", systemRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Home Gig API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Home Gig API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});