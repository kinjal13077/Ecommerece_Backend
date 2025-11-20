// backend/routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/**
 * GET /api/products
 * Optional: ?collection=flash|best|explore
 */
router.get("/", async (req, res) => {
  try {
    const { collection } = req.query;
    const filter = collection ? { collections: collection } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/products
 * Create new product
 */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      image,
      price,
      originalPrice,
      rating,
      reviews,
      discount,
      isNew,
      collections,
    } = req.body;

    if (!title || price == null) {
      return res
        .status(400)
        .json({ message: "Title and price are required" });
    }

    const newProduct = new Product({
      title,
      image,
      price,
      originalPrice,
      rating,
      reviews,
      discount,
      isNew,
      collections,
    });

    const created = await newProduct.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/products/:id
 * Update a product
 */
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      image,
      price,
      originalPrice,
      rating,
      reviews,
      discount,
      isNew,
      collections,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title ?? product.title;
    product.image = image ?? product.image;
    product.price = price ?? product.price;
    product.originalPrice = originalPrice ?? product.originalPrice;
    product.rating = rating ?? product.rating;
    product.reviews = reviews ?? product.reviews;
    product.discount = discount ?? product.discount;
    product.isNew = isNew ?? product.isNew;
    product.collections = collections ?? product.collections;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/products/:id
 * Delete a product
 */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
