// Crop listing model for the marketplace
import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Crop title is required"],
      trim: true,
    },
    titleHi: {
      type: String,
      default: "", // Hindi translation of title
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    descriptionHi: {
      type: String,
      default: "", // Hindi description
    },
    category: {
      type: String,
      enum: ["vegetables", "fruits", "grains", "pulses", "spices", "others"],
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    priceUnit: {
      type: String,
      default: "per kg", // per kg, per quintal, per ton
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
    },
    quantityUnit: {
      type: String,
      default: "kg",
    },
    image: {
      type: String,
      default: "", // URL or base64
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    farmerPhone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    harvestDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
cropSchema.index({ title: "text", description: "text", location: "text" });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
