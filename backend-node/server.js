const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

// temporarily force Node to load Mongoose schemas to verify that the model files have no syntax errors
require("./models/User");
require("./models/Product");
require("./models/Customer");
require("./models/Order");
require("./models/Payment");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Home Gig API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Home Gig API running on port ${PORT}`);
});