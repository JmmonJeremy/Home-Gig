const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const passwordHash = await bcrypt.hash("Password123!", 10);

    await User.deleteMany({ email: "owner@homegig.com" });

    await User.create({
      email: "owner@homegig.com",
      passwordHash,
      firstName: "Home",
      lastName: "Owner",
      businessName: "Home Gig Demo",
      role: "owner"
    });

    console.log("Test user created successfully");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedUser();