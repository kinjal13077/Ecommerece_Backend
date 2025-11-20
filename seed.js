const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Sample products imported ✅");
  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

importData();
