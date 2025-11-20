// backend/routes/categoryRoutes.js
const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/categories
router.post("/", async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = new Category({ name, image });
    const created = await category.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/categories/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = name ?? category.name;
    category.image = image ?? category.image;

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/categories/:id
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.deleteOne();
    res.json({ message: "Category removed" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
