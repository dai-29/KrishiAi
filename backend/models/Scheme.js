// Government scheme model
import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameHi: {
      type: String,
      default: "",
    },
    shortName: {
      type: String, // e.g., "PM-KISAN"
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionHi: {
      type: String,
      default: "",
    },
    eligibility: {
      type: String,
      default: "",
    },
    eligibilityHi: {
      type: String,
      default: "",
    },
    benefit: {
      type: String,
      default: "",
    },
    benefitHi: {
      type: String,
      default: "",
    },
    applicationLink: {
      type: String,
      default: "#",
    },
    icon: {
      type: String,
      default: "🌾",
    },
    category: {
      type: String,
      enum: ["income-support", "insurance", "credit", "irrigation", "technology"],
      default: "income-support",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scheme = mongoose.model("Scheme", schemeSchema);
export default Scheme;
