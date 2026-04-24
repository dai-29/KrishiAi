# Soil recommendation route
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class SoilRequest(BaseModel):
    nitrogen: float      # kg/ha
    phosphorus: float    # kg/ha
    potassium: float     # kg/ha
    ph: float            # 0-14
    moisture: float      # percentage
    temperature: Optional[float] = 25
    rainfall: Optional[float] = 800

# Crop recommendation rules based on NPK + pH ranges
RECOMMENDATIONS = [
    {"crop": "Rice", "cropHi": "चावल", "n": (80,120), "p": (40,60), "k": (40,60), "ph": (5.5,7.0), "moisture": (70,100)},
    {"crop": "Wheat", "cropHi": "गेहूं", "n": (60,100), "p": (30,50), "k": (30,50), "ph": (6.0,7.5), "moisture": (50,75)},
    {"crop": "Maize", "cropHi": "मक्का", "n": (80,120), "p": (50,70), "k": (50,70), "ph": (5.8,7.0), "moisture": (55,75)},
    {"crop": "Cotton", "cropHi": "कपास", "n": (60,100), "p": (30,50), "k": (30,60), "ph": (6.0,8.0), "moisture": (40,65)},
    {"crop": "Soybean", "cropHi": "सोयाबीन", "n": (20,40), "p": (40,70), "k": (40,70), "ph": (6.0,7.0), "moisture": (55,70)},
    {"crop": "Groundnut", "cropHi": "मूंगफली", "n": (15,30), "p": (30,50), "k": (50,80), "ph": (6.0,7.0), "moisture": (50,70)},
    {"crop": "Sugarcane", "cropHi": "गन्ना", "n": (100,150), "p": (50,80), "k": (80,120), "ph": (6.0,7.5), "moisture": (65,85)},
    {"crop": "Tomato", "cropHi": "टमाटर", "n": (80,120), "p": (50,80), "k": (60,100), "ph": (6.0,7.0), "moisture": (60,75)},
    {"crop": "Potato", "cropHi": "आलू", "n": (80,120), "p": (50,80), "k": (80,120), "ph": (5.5,6.5), "moisture": (65,80)},
    {"crop": "Mustard", "cropHi": "सरसों", "n": (40,80), "p": (20,40), "k": (20,40), "ph": (6.0,7.5), "moisture": (40,60)},
]

def score_crop(crop, n, p, k, ph, moisture):
    """Score how well soil params match a crop's requirements."""
    score = 0
    def in_range(val, lo, hi): return lo <= val <= hi
    if in_range(n, *crop["n"]): score += 2
    elif abs(n - (crop["n"][0]+crop["n"][1])/2) < 20: score += 1
    if in_range(p, *crop["p"]): score += 2
    if in_range(k, *crop["k"]): score += 2
    if in_range(ph, *crop["ph"]): score += 3
    if in_range(moisture, *crop["moisture"]): score += 2
    return score

def get_fertilizer_advice(n, p, k, ph):
    advice, adviceHi = [], []
    if n < 60:
        advice.append("Apply Urea (46% N) or DAP to increase nitrogen levels.")
        adviceHi.append("नाइट्रोजन बढ़ाने के लिए यूरिया (46% N) या DAP लगाएं।")
    if p < 30:
        advice.append("Apply Single Super Phosphate (SSP) to boost phosphorus.")
        adviceHi.append("फास्फोरस बढ़ाने के लिए SSP (सिंगल सुपर फॉस्फेट) लगाएं।")
    if k < 30:
        advice.append("Apply Muriate of Potash (MOP) to increase potassium.")
        adviceHi.append("पोटेशियम बढ़ाने के लिए MOP (पोटाश का म्यूरेट) लगाएं।")
    if ph < 5.5:
        advice.append("Soil is acidic — apply agricultural lime to raise pH.")
        adviceHi.append("मिट्टी अम्लीय है — pH बढ़ाने के लिए कृषि चूना लगाएं।")
    elif ph > 7.5:
        advice.append("Soil is alkaline — apply gypsum or sulfur to lower pH.")
        adviceHi.append("मिट्टी क्षारीय है — pH कम करने के लिए जिप्सम या सल्फर लगाएं।")
    if not advice:
        advice.append("Soil nutrients are well-balanced. Maintain with organic compost.")
        adviceHi.append("मिट्टी के पोषक तत्व अच्छी तरह संतुलित हैं। जैविक खाद से बनाए रखें।")
    return advice, adviceHi

@router.post("/soil-recommend")
async def recommend_soil(data: SoilRequest):
    """Recommend best crops and fertilizers based on soil parameters."""
    # Score each crop
    scored = [(crop, score_crop(crop, data.nitrogen, data.phosphorus, data.potassium, data.ph, data.moisture))
              for crop in RECOMMENDATIONS]
    scored.sort(key=lambda x: x[1], reverse=True)

    top_crops = [{"crop": c["crop"], "cropHi": c["cropHi"], "score": s} for c, s in scored[:3]]
    fertilizers, fertilizersHi = get_fertilizer_advice(data.nitrogen, data.phosphorus, data.potassium, data.ph)

    ph_status = "Acidic" if data.ph < 6 else ("Alkaline" if data.ph > 7.5 else "Neutral")
    ph_statusHi = "अम्लीय" if data.ph < 6 else ("क्षारीय" if data.ph > 7.5 else "तटस्थ")

    return {
        "success": True,
        "recommended_crops": top_crops,
        "fertilizer_advice": fertilizers,
        "fertilizer_advice_hi": fertilizersHi,
        "soil_summary": {
            "nitrogen_status": "Low" if data.nitrogen < 50 else ("High" if data.nitrogen > 120 else "Medium"),
            "ph_status": ph_status, "ph_statusHi": ph_statusHi,
            "moisture_status": "Dry" if data.moisture < 40 else ("Wet" if data.moisture > 80 else "Optimal"),
        },
        "note": "Demo recommendation. Use lab-tested soil data for accurate results."
    }
