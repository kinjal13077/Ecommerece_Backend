const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },           // URL or /images/... path
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    discount: { type: Number },
    isNew: { type: Boolean, default: false },
    // which section(s) it belongs to on home page
    collections: [{ type: String }],   // e.g. ["flash"], ["best"], ["explore"]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
