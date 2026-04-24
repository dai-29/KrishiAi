// Crop marketplace routes — CRUD for listings
import express from "express";
import Crop from "../models/Crop.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/crops
// @desc    Get all available crop listings (public)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, location, search, page = 1, limit = 12 } = req.query;

    // Build query filter
    const filter = { isAvailable: true };
    if (category && category !== "all") filter.category = category;
    if (location) filter.location = new RegExp(location, "i");
    if (search) filter.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Crop.countDocuments(filter);
    const crops = await Crop.find(filter)
      .populate("farmer", "name phone farmLocation")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      crops,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/crops/my
// @desc    Get crops listed by the logged-in farmer
// @access  Private (Farmer)
router.get("/my", protect, authorizeRoles("farmer"), async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/crops/:id
// @desc    Get a single crop listing
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farmer", "name phone email farmLocation");
    if (!crop) return res.status(404).json({ success: false, message: "Crop listing not found." });
    res.json({ success: true, crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/crops
// @desc    Create a new crop listing (Farmer only)
// @access  Private (Farmer)
router.post("/", protect, authorizeRoles("farmer"), async (req, res) => {
  try {
    const {
      title, titleHi, description, descriptionHi,
      category, price, priceUnit, quantity, quantityUnit,
      image, location, isOrganic, harvestDate
    } = req.body;

    const crop = await Crop.create({
      title, titleHi, description, descriptionHi,
      category, price, priceUnit, quantity, quantityUnit,
      image, location, isOrganic, harvestDate,
      farmer: req.user._id,
      farmerName: req.user.name,
      farmerPhone: req.user.phone,
    });

    res.status(201).json({ success: true, message: "Crop listed successfully!", crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/crops/:id
// @desc    Update a crop listing (Farmer only, own crops)
// @access  Private (Farmer)
router.put("/:id", protect, authorizeRoles("farmer"), async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found." });

    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to edit this listing." });
    }

    const updated = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: "Listing updated!", crop: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/crops/:id
// @desc    Delete a crop listing (Farmer only, own crops)
// @access  Private (Farmer)
router.delete("/:id", protect, authorizeRoles("farmer"), async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found." });

    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this listing." });
    }

    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Listing deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
