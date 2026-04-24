# Disease detection route - mock rule-based logic (replace with real ML model)
from fastapi import APIRouter
from pydantic import BaseModel
import base64, random

router = APIRouter()

class DiseaseRequest(BaseModel):
    image: str  # base64 encoded image string
    crop_type: str = "unknown"

# Mock disease database with treatments in Hindi & English
DISEASES = [
    {
        "name": "Leaf Blight", "nameHi": "पत्ती झुलसा रोग",
        "confidence": 0.91,
        "treatment": "Apply Mancozeb fungicide (2.5g/L water). Remove and burn infected leaves. Avoid overhead irrigation.",
        "treatmentHi": "मैंकोजेब कवकनाशी (2.5g/L पानी) लगाएं। संक्रमित पत्तियों को हटाकर जला दें। ऊपर से सिंचाई से बचें।",
        "severity": "High", "severityHi": "उच्च",
        "prevention": "Use disease-resistant varieties. Maintain proper spacing. Avoid waterlogging.",
        "preventionHi": "रोग प्रतिरोधी किस्मों का उपयोग करें। उचित दूरी बनाए रखें। जलभराव से बचें।"
    },
    {
        "name": "Powdery Mildew", "nameHi": "पाउडरी मिल्ड्यू",
        "confidence": 0.88,
        "treatment": "Spray sulfur-based fungicide or neem oil (5ml/L). Increase air circulation around plants.",
        "treatmentHi": "सल्फर-आधारित कवकनाशी या नीम तेल (5ml/L) का छिड़काव करें। पौधों के आसपास वायु संचार बढ़ाएं।",
        "severity": "Medium", "severityHi": "मध्यम",
        "prevention": "Avoid excess nitrogen. Plant in sunny locations. Use resistant varieties.",
        "preventionHi": "अधिक नाइट्रोजन से बचें। धूप वाली जगह पर लगाएं। प्रतिरोधी किस्मों का उपयोग करें।"
    },
    {
        "name": "Rust Disease", "nameHi": "किट्ट रोग",
        "confidence": 0.85,
        "treatment": "Apply Propiconazole fungicide. Remove infected plant parts. Avoid working in wet conditions.",
        "treatmentHi": "प्रोपिकोनाजोल कवकनाशी लगाएं। संक्रमित पौधे के हिस्से हटाएं। गीली परिस्थितियों में काम से बचें।",
        "severity": "High", "severityHi": "उच्च",
        "prevention": "Plant early-maturing varieties. Apply preventive fungicide sprays.",
        "preventionHi": "जल्दी पकने वाली किस्में लगाएं। निवारक कवकनाशी छिड़काव करें।"
    },
    {
        "name": "Healthy Crop", "nameHi": "स्वस्थ फसल",
        "confidence": 0.95,
        "treatment": "No treatment needed. Continue regular monitoring and good agricultural practices.",
        "treatmentHi": "किसी उपचार की जरूरत नहीं। नियमित निगरानी और अच्छी कृषि पद्धतियां जारी रखें।",
        "severity": "None", "severityHi": "कोई नहीं",
        "prevention": "Maintain regular watering schedule. Apply balanced fertilizer as needed.",
        "preventionHi": "नियमित सिंचाई कार्यक्रम बनाए रखें। आवश्यकतानुसार संतुलित उर्वरक दें।"
    },
    {
        "name": "Brown Spot", "nameHi": "भूरा धब्बा",
        "confidence": 0.82,
        "treatment": "Apply Zineb or Iprodione fungicide. Ensure proper drainage. Use balanced NPK fertilizer.",
        "treatmentHi": "जिनेब या इप्रोडियोन कवकनाशी लगाएं। उचित जल निकासी सुनिश्चित करें। संतुलित NPK उर्वरक का उपयोग करें।",
        "severity": "Medium", "severityHi": "मध्यम",
        "prevention": "Use certified seeds. Treat seeds before sowing. Maintain field hygiene.",
        "preventionHi": "प्रमाणित बीजों का उपयोग करें। बुवाई से पहले बीजों का उपचार करें।"
    },
]

@router.post("/disease-detect")
async def detect_disease(data: DiseaseRequest):
    """
    Detect crop disease from a base64 encoded image.
    Currently uses mock/rule-based logic. Replace the selection logic
    with a real ML model (e.g., TensorFlow/PyTorch CNN) for production.
    """
    # Validate image data
    if not data.image or len(data.image) < 100:
        return {"success": False, "message": "Invalid image data provided."}

    # --- MOCK LOGIC ---
    # In production: load a trained CNN model and predict from the image bytes
    # decoded = base64.b64decode(data.image)
    # prediction = model.predict(preprocess(decoded))
    result = random.choice(DISEASES)

    return {
        "success": True,
        "disease": result["name"],
        "diseaseHi": result["nameHi"],
        "confidence": result["confidence"],
        "severity": result["severity"],
        "severityHi": result["severityHi"],
        "treatment": result["treatment"],
        "treatmentHi": result["treatmentHi"],
        "prevention": result["prevention"],
        "preventionHi": result["preventionHi"],
        "note": "This is a demo prediction. Integrate a trained CNN model for production use."
    }
