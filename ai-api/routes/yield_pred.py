# Yield prediction route - rule-based model (replace with trained ML model)
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class YieldRequest(BaseModel):
    crop: str
    soil_type: str
    rainfall: float       # mm per season
    temperature: float    # average °C
    area: float           # in hectares
    nitrogen: Optional[float] = 50
    phosphorus: Optional[float] = 30
    potassium: Optional[float] = 40
    irrigation: Optional[str] = "canal"

# Base yield (tonnes/hectare) for common Indian crops
CROP_BASE_YIELD = {
    "wheat": 3.5, "rice": 4.0, "maize": 4.5, "sugarcane": 65.0,
    "cotton": 1.8, "soybean": 2.0, "tomato": 25.0, "potato": 20.0,
    "onion": 18.0, "mustard": 1.5, "groundnut": 2.0, "bajra": 2.5,
    "jowar": 2.0, "gram": 1.2, "tur": 1.0, "sunflower": 1.5,
}

CROP_NAMES_HI = {
    "wheat": "गेहूं", "rice": "चावल", "maize": "मक्का", "sugarcane": "गन्ना",
    "cotton": "कपास", "soybean": "सोयाबीन", "tomato": "टमाटर", "potato": "आलू",
    "onion": "प्याज", "mustard": "सरसों", "groundnut": "मूंगफली", "bajra": "बाजरा",
    "jowar": "ज्वार", "gram": "चना", "tur": "तूर", "sunflower": "सूरजमुखी",
}

def calculate_yield(crop, soil_type, rainfall, temperature, nitrogen, phosphorus, potassium, irrigation):
    """Rule-based yield estimation. Replace with trained regression model."""
    crop_key = crop.lower()
    base = CROP_BASE_YIELD.get(crop_key, 2.5)

    # Rainfall factor (optimal ~600-1200mm for most crops)
    if rainfall < 300: rf = 0.70
    elif rainfall < 600: rf = 0.85
    elif rainfall <= 1200: rf = 1.00
    elif rainfall <= 1800: rf = 0.92
    else: rf = 0.80

    # Temperature factor
    if temperature < 15: tf = 0.80
    elif temperature <= 30: tf = 1.00
    elif temperature <= 35: tf = 0.90
    else: tf = 0.75

    # Soil type factor
    soil_factors = {"loamy": 1.10, "clay": 0.90, "sandy": 0.75, "alluvial": 1.15, "black": 1.05, "red": 0.85}
    sf = soil_factors.get(soil_type.lower(), 1.0)

    # Nutrient factor (NPK 40-40-40 is baseline)
    nf = min(1.2, (nitrogen + phosphorus + potassium) / 120)

    # Irrigation bonus
    irr = 1.10 if irrigation in ["drip", "sprinkler"] else 1.0

    estimated = base * rf * tf * sf * nf * irr
    return round(estimated, 2)

@router.post("/yield-predict")
async def predict_yield(data: YieldRequest):
    """Predict crop yield based on agro-climatic and soil parameters."""
    predicted = calculate_yield(
        data.crop, data.soil_type, data.rainfall,
        data.temperature, data.nitrogen, data.phosphorus,
        data.potassium, data.irrigation
    )
    total = round(predicted * data.area, 2)
    crop_key = data.crop.lower()

    tips = []
    if data.rainfall < 400: tips.append("Consider supplemental irrigation — rainfall is below optimal.")
    if data.temperature > 32: tips.append("Use heat-tolerant varieties to protect yield.")
    if data.nitrogen < 30: tips.append("Apply nitrogen-rich fertilizer (Urea) to boost yield.")
    if data.soil_type.lower() == "sandy": tips.append("Add organic matter to improve water retention.")
    if not tips: tips.append("Conditions look good! Maintain regular monitoring.")

    tips_hi = []
    if data.rainfall < 400: tips_hi.append("वर्षा कम है — पूरक सिंचाई पर विचार करें।")
    if data.temperature > 32: tips_hi.append("उपज बचाने के लिए गर्मी-सहिष्णु किस्मों का उपयोग करें।")
    if data.nitrogen < 30: tips_hi.append("उपज बढ़ाने के लिए नाइट्रोजन युक्त उर्वरक (यूरिया) लगाएं।")
    if data.soil_type.lower() == "sandy": tips_hi.append("जल धारण क्षमता सुधारने के लिए जैविक पदार्थ डालें।")
    if not tips_hi: tips_hi.append("परिस्थितियाँ अच्छी हैं! नियमित निगरानी जारी रखें।")

    return {
        "success": True,
        "crop": data.crop,
        "cropHi": CROP_NAMES_HI.get(crop_key, data.crop),
        "predicted_yield_per_hectare": predicted,
        "total_predicted_yield": total,
        "area": data.area,
        "unit": "tonnes",
        "tips": tips,
        "tipsHi": tips_hi,
        "note": "Demo prediction — integrate a trained ML regression model for production."
    }
