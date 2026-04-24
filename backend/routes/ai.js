// AI API proxy routes
import express from "express";
import axios from "axios";
import fetch from "node-fetch";

const router = express.Router();
const AI_API_URL = process.env.AI_API_URL || "http://localhost:8000";

// Keyword-based local AI fallback (used when OpenAI key not set)
const getLocalReply = (message, language) => {
  const msg = message.toLowerCase();
  const hi = language === "Hindi";
  const responses = [
    { keys:["blight","disease","infection","rot","rust","mildew","pest","aphid","fungal","झुलसा","रोग","बीमारी","कीट","माहू"], reply: hi
      ? "🔬 फसल रोग / कीट नियंत्रण:\n\n🌿 पत्ती झुलसा — मैंकोजेब 2.5g/L हर 7-10 दिन\n🔴 किट्ट रोग — प्रोपिकोनाजोल 0.1%\n⬜ पाउडरी मिल्ड्यू — सल्फर 2g/L\n🐛 माहू कीट — इमिडाक्लोप्रिड 0.5ml/L या नीम तेल 5ml/L\n\nसटीक निदान के लिए Disease Detection में फोटो अपलोड करें!"
      : "🔬 Crop Disease / Pest Control:\n\n🌿 Leaf Blight — Mancozeb 2.5g/L every 7-10 days\n🔴 Rust — Propiconazole 0.1%\n⬜ Powdery Mildew — Sulfur 2g/L\n🐛 Aphids — Imidacloprid 0.5ml/L or Neem oil 5ml/L\n\nUpload a photo in Disease Detection for accurate AI diagnosis!"},
    { keys:["wheat","gehu","sow","buvai","rabi","गेहूं","बुवाई","रबी"], reply: hi
      ? "🌾 गेहूं गाइड:\n\n📅 बुवाई: 15 अक्टूबर – 25 नवंबर\n💧 सिंचाई: 4-6 बार | 🌱 बीज: 100-125 kg/ha\nउर्वरक: N-120, P-60, K-40 kg/ha\nकिस्में: HD-2967, PBW-343, GW-322\n📊 उपज: 3-4 टन/ha"
      : "🌾 Wheat Guide:\n\n📅 Sowing: Oct 15 – Nov 25\n💧 Irrigation: 4-6 times | 🌱 Seed: 100-125 kg/ha\nFertilizer: N-120, P-60, K-40 kg/ha\nVarieties: HD-2967, PBW-343, GW-322\n📊 Yield: 3-4 t/ha"},
    { keys:["rice","chawal","dhaan","paddy","धान","चावल","kharif","खरीफ"], reply: hi
      ? "🍚 धान गाइड:\n\n📅 बुवाई: जून-जुलाई\n💧 खेत में 2-5cm पानी रखें\nउर्वरक: N-100, P-50, K-50 kg/ha\nकिस्में: IR-64, स्वर्णा, पूसा बासमती-1\n📊 उपज: 3-5 टन/ha"
      : "🍚 Rice Guide:\n\n📅 Sowing: June-July\n💧 Keep 2-5cm water in field\nFertilizer: N-100, P-50, K-50 kg/ha\nVarieties: IR-64, Swarna, Pusa Basmati-1\n📊 Yield: 3-5 t/ha"},
    { keys:["tomato","tamatar","टमाटर"], reply: hi
      ? "🍅 टमाटर: N-100, P-80, K-60 kg/ha | उपज 20-30 टन/ha\nड्रिप सिंचाई सर्वोत्तम | जीवाणु म्लानि से सावधान"
      : "🍅 Tomato: N-100, P-80, K-60 kg/ha | Yield 20-30 t/ha\nDrip irrigation best | Watch for Bacterial wilt"},
    { keys:["potato","aalu","आलू"], reply: hi
      ? "🥔 आलू: बुवाई अक्टूबर-नवंबर | N-120, P-80, K-120 kg/ha\nउपज 20-30 टन/ha | किस्में: कुफरी ज्योति, कुफरी पुखराज"
      : "🥔 Potato: Plant Oct-Nov | N-120, P-80, K-120 kg/ha\nYield 20-30 t/ha | Varieties: Kufri Jyoti, Kufri Pukhraj"},
    { keys:["maize","makka","corn","मक्का"], reply: hi
      ? "🌽 मक्का: N-150, P-75, K-40 kg/ha | उपज 4-6 टन/ha\nबुवाई जून-जुलाई (खरीफ) | तना छेदक कीट से सावधान"
      : "🌽 Maize: N-150, P-75, K-40 kg/ha | Yield 4-6 t/ha\nSowing June-July (Kharif) | Watch for stem borer"},
    { keys:["cotton","kapas","कपास"], reply: hi
      ? "☁️ कपास: N-120, P-60, K-60 kg/ha | बुवाई अप्रैल-मई\nBt Cotton हाइब्रिड | बॉलवर्म और सफेदमक्खी से सावधान"
      : "☁️ Cotton: N-120, P-60, K-60 kg/ha | Sowing April-May\nBt Cotton hybrids | Watch for bollworm and whitefly"},
    { keys:["pm-kisan","pmkisan","6000","2000","किसान सम्मान"], reply: hi
      ? "💰 PM-KISAN:\n\n• ₹6,000/वर्ष — 3 किस्तों में\n• 2 हेक्टेयर तक भूमि के किसान\n• pmkisan.gov.in पर आवेदन\n• किस्तें: अप्रैल, अगस्त, दिसंबर"
      : "💰 PM-KISAN:\n\n• Rs.6,000/year in 3 installments\n• Farmers with land up to 2 ha\n• Apply: pmkisan.gov.in\n• Installments: April, Aug, Dec"},
    { keys:["scheme","yojana","pmfby","kcc","pmksy","bima","loan","insurance","योजना","बीमा","ऋण","credit"], reply: hi
      ? "📋 किसान योजनाएं:\n\n💰 PM-KISAN — ₹6,000/वर्ष\n🛡️ PMFBY — फसल बीमा (खरीफ 2%, रबी 1.5%)\n💳 KCC — 4% ब्याज पर ₹3 लाख तक\n💧 PMKSY — ड्रिप पर 55% सब्सिडी\n🌱 SHC — मुफ्त मिट्टी जांच\n\nSchemes पेज पर पूरी जानकारी देखें!"
      : "📋 Farmer Schemes:\n\n💰 PM-KISAN — Rs.6,000/year\n🛡️ PMFBY — Crop insurance (Kharif 2%, Rabi 1.5%)\n💳 KCC — Rs.3 lakh at 4% interest\n💧 PMKSY — 55% subsidy on drip irrigation\n🌱 SHC — Free soil health card\n\nVisit Schemes page for full details!"},
    { keys:["npk","fertilizer","urea","dap","nitrogen","phosphorus","potassium","soil","mitti","खाद","उर्वरक","मिट्टी"], reply: hi
      ? "💊 उर्वरक गाइड (kg/ha):\n\n🌾 गेहूं: N-120, P-60, K-40\n🍅 टमाटर: N-100, P-80, K-60\n🌽 मक्का: N-150, P-75, K-40\n🍚 चावल: N-100, P-50, K-50\n\n💡 नाइट्रोजन 3 हिस्सों में डालें। मिट्टी जांच जरूर कराएं!"
      : "💊 Fertilizer Guide (kg/ha):\n\n🌾 Wheat: N-120, P-60, K-40\n🍅 Tomato: N-100, P-80, K-60\n🌽 Maize: N-150, P-75, K-40\n🍚 Rice: N-100, P-50, K-50\n\n💡 Apply nitrogen in 3 splits. Get soil tested for precision!"},
    { keys:["organic","jaivik","vermicompost","neem","compost","जैविक"], reply: hi
      ? "🌿 जैविक खेती:\n\n1. वर्मीकम्पोस्ट 4-5 टन/ha\n2. नीम केक 200 kg/ha\n3. फसल चक्र हर मौसम\n✅ जैविक फसल 20-40% अधिक मूल्य!"
      : "🌿 Organic Farming:\n\n1. Vermicompost 4-5 t/ha\n2. Neem cake 200 kg/ha\n3. Crop rotation every season\n✅ Organic produce 20-40% higher price!"},
    { keys:["weather","mausam","rain","barish","temp","humidity","मौसम","बारिश","तापमान"], reply: hi
      ? "🌤️ मौसम और खेती:\n\n☀️ गर्मी (>35C): सुबह/शाम सिंचाई\n🌧️ बारिश से पहले: कीटनाशक न छिड़कें\n❄️ ठंड: नर्सरी को ढकें\n🌫️ कोहरा: कवक रोगों से सावधान\n\nWeather पेज पर शहर का 5 दिन का पूर्वानुमान!"
      : "🌤️ Weather & Farming:\n\n☀️ High temp (>35C): irrigate morning/evening\n🌧️ Before rain: don't spray pesticides\n❄️ Cold: cover nursery seedlings\n🌫️ Fog: watch for fungal diseases\n\nCheck Weather page for 5-day city forecast!"},
    { keys:["market","mandi","sell","price","bhav","profit","income","मंडी","बेच","भाव","कमाई"], reply: hi
      ? "🏪 बाजार और मंडी:\n\n• Marketplace पर सीधे खरीदार से मिलें\n• कोई बिचौलिया नहीं — पूरा मुनाफा आपका\n• जैविक फसल: 20-40% अधिक दाम\n• eNAM मंडी से ऑनलाइन बेचें"
      : "🏪 Market & Mandi:\n\n• Connect directly with buyers on Marketplace\n• No middlemen — full profit to you\n• Organic produce: 20-40% higher price\n• Sell online via eNAM mandi"},
    { keys:["water","sinchai","irrigation","drip","sprinkler","सिंचाई","पानी"], reply: hi
      ? "💧 सिंचाई गाइड:\n\n🌾 गेहूं: 4-6 बार | 🍚 चावल: भरा रखें\n🍅 टमाटर: हर 3-4 दिन (ड्रिप)\n\nPMKSY: ड्रिप/स्प्रिंकलर पर 55% सब्सिडी!"
      : "💧 Irrigation Guide:\n\n🌾 Wheat: 4-6 times | 🍚 Rice: Keep flooded\n🍅 Tomato: Every 3-4 days (drip best)\n\nPMKSY: 55% subsidy on drip/sprinkler!"},
  ];
  for (const r of responses) {
    if (r.keys.some(k => msg.includes(k))) return r.reply;
  }
  return hi
    ? "🌾 नमस्ते! मैं KrishiBot हूं — आपका AI कृषि सहायक\n\nपूछें: फसल रोग, गेहूं/चावल/टमाटर खेती, उर्वरक, PM-KISAN/PMFBY/KCC, मौसम, मंडी भाव"
    : "🌾 Namaste! I'm KrishiBot — your AI agriculture assistant!\n\nAsk about: crop diseases, wheat/rice/tomato farming, fertilizers, PM-KISAN/PMFBY/KCC, weather, market prices";
};

// @route   POST /api/ai/disease
// @desc    Proxy disease detection to FastAPI
// @access  Public
router.post("/disease", async (req, res) => {
  try {
    const response = await axios.post(`${AI_API_URL}/disease-detect`, req.body, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });
    res.json(response.data);
  } catch (error) {
    const msg = error.response?.data?.detail || "AI service unavailable. Please try again.";
    res.status(503).json({ success: false, message: msg });
  }
});

// @route   POST /api/ai/yield
// @desc    Proxy yield prediction to FastAPI
// @access  Public
router.post("/yield", async (req, res) => {
  try {
    const response = await axios.post(`${AI_API_URL}/yield-predict`, req.body, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });
    res.json(response.data);
  } catch (error) {
    const msg = error.response?.data?.detail || "AI service unavailable.";
    res.status(503).json({ success: false, message: msg });
  }
});

// @route   POST /api/ai/chat
// @desc    Multilingual agriculture chatbot
// @access  Public
router.post("/chat", async (req, res) => {
  try {
    const { message, language = "English", history = [] } = req.body;
    if (!message) return res.status(400).json({ success: false, message: "Message required." });

    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback: if no OpenAI key, use keyword-based local reply
    if (!apiKey || apiKey === "sk-your-openai-key-here") {
      const reply = getLocalReply(message, language);
      return res.json({ success: true, reply });
    }

    const systemPrompt = `You are KrishiBot, an expert agriculture assistant for Indian farmers.
Always reply in ${language}. Be concise, practical, and helpful.
Focus on farming, crop diseases, weather, government schemes, fertilizers, and market prices.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages, temperature: 0.4, max_tokens: 500 }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ success: false, message: data?.error?.message || "OpenAI error." });

    const reply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";
    res.json({ success: true, reply });
  } catch (error) {
    // On any error, return local reply instead of crashing
    try {
      const { message: msg2, language: lang2 = "English" } = req.body;
      const reply = getLocalReply(msg2 || "", lang2);
      return res.json({ success: true, reply });
    } catch {
      res.status(500).json({ success: false, message: "Chatbot service error." });
    }
  }
});

export default router;
