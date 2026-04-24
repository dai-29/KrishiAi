// Government schemes route — serves static + DB schemes
import express from "express";
import Scheme from "../models/Scheme.js";

const router = express.Router();

// Seed data for government schemes
const defaultSchemes = [
  {
    name: "PM Kisan Samman Nidhi", nameHi: "पीएम किसान सम्मान निधि", shortName: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to small and marginal farmers in three equal installments.",
    descriptionHi: "छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता तीन समान किस्तों में।",
    eligibility: "Small and marginal farmers with cultivable land up to 2 hectares.",
    eligibilityHi: "2 हेक्टेयर तक कृषि योग्य भूमि वाले छोटे और सीमांत किसान।",
    benefit: "₹6,000 per year (₹2,000 per installment)", benefitHi: "₹6,000 प्रति वर्ष (₹2,000 प्रति किस्त)",
    applicationLink: "https://pmkisan.gov.in", icon: "💰", category: "income-support",
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana", nameHi: "प्रधानमंत्री फसल बीमा योजना", shortName: "PMFBY",
    description: "Crop insurance scheme providing financial support to farmers suffering crop loss due to natural calamities, pests and diseases.",
    descriptionHi: "प्राकृतिक आपदाओं, कीटों और रोगों से फसल नुकसान झेलने वाले किसानों को वित्तीय सहायता।",
    eligibility: "All farmers growing notified crops in notified areas. Compulsory for loanee farmers.",
    eligibilityHi: "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।",
    benefit: "Crop insurance coverage up to 100% of sum insured", benefitHi: "बीमित राशि का 100% तक फसल बीमा कवरेज",
    applicationLink: "https://pmfby.gov.in", icon: "🛡️", category: "insurance",
  },
  {
    name: "Kisan Credit Card", nameHi: "किसान क्रेडिट कार्ड", shortName: "KCC",
    description: "Provides farmers with affordable credit for agricultural needs including seeds, fertilizers, and equipment.",
    descriptionHi: "किसानों को बीज, उर्वरक और उपकरण सहित कृषि जरूरतों के लिए सस्ती ऋण सुविधा।",
    eligibility: "All farmers, sharecroppers, oral lessees and self-help groups.",
    eligibilityHi: "सभी किसान, बटाईदार, मौखिक पट्टेदार और स्वयं सहायता समूह।",
    benefit: "Credit limit up to ₹3 lakh at 4% interest", benefitHi: "4% ब्याज पर ₹3 लाख तक की क्रेडिट सीमा",
    applicationLink: "https://www.nabard.org", icon: "💳", category: "credit",
  },
  {
    name: "Pradhan Mantri Krishi Sinchayee Yojana", nameHi: "प्रधानमंत्री कृषि सिंचाई योजना", shortName: "PMKSY",
    description: "Aims to expand cultivable area under assured irrigation, improve water use efficiency and introduce sustainable conservation practices.",
    descriptionHi: "सुनिश्चित सिंचाई के तहत कृषि योग्य क्षेत्र का विस्तार और जल उपयोग दक्षता में सुधार।",
    eligibility: "All farmers, with priority to small and marginal farmers.",
    eligibilityHi: "सभी किसान, छोटे और सीमांत किसानों को प्राथमिकता।",
    benefit: "Subsidy on drip/sprinkler irrigation systems", benefitHi: "ड्रिप/स्प्रिंकलर सिंचाई प्रणालियों पर सब्सिडी",
    applicationLink: "https://pmksy.gov.in", icon: "💧", category: "irrigation",
  },
  {
    name: "Soil Health Card Scheme", nameHi: "मृदा स्वास्थ्य कार्ड योजना", shortName: "SHC",
    description: "Provides soil health cards to farmers with crop-wise recommendations for nutrients and fertilizers for individual farms.",
    descriptionHi: "किसानों को व्यक्तिगत खेतों के लिए पोषक तत्वों और उर्वरकों की फसल-वार सिफारिशों के साथ मृदा स्वास्थ्य कार्ड।",
    eligibility: "All farmers across India.", eligibilityHi: "पूरे भारत के सभी किसान।",
    benefit: "Free soil testing and fertilizer recommendations", benefitHi: "मुफ्त मिट्टी परीक्षण और उर्वरक सिफारिशें",
    applicationLink: "https://soilhealth.dac.gov.in", icon: "🌱", category: "technology",
  },
  {
    name: "National Agriculture Market", nameHi: "राष्ट्रीय कृषि बाजार", shortName: "eNAM",
    description: "Online trading platform for agricultural commodities creating a unified national market for farmers.",
    descriptionHi: "किसानों के लिए एकीकृत राष्ट्रीय बाजार बनाने वाला कृषि वस्तुओं के लिए ऑनलाइन ट्रेडिंग प्लेटफॉर्म।",
    eligibility: "Farmers registered with local APMCs.", eligibilityHi: "स्थानीय APMCs के साथ पंजीकृत किसान।",
    benefit: "Direct access to buyers across India", benefitHi: "पूरे भारत में खरीदारों तक सीधी पहुंच",
    applicationLink: "https://enam.gov.in", icon: "🏪", category: "technology",
  },
];

// @route   GET /api/schemes
router.get("/", async (req, res) => {
  try {
    let schemes = await Scheme.find({ isActive: true });
    // Seed schemes if DB is empty
    if (schemes.length === 0) {
      schemes = await Scheme.insertMany(defaultSchemes);
    }
    res.json({ success: true, schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
