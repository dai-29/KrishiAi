// Bilingual translations — English (en) and Hindi (hi)
const translations = {
  en: {
    // Nav
    home: "Home", marketplace: "Marketplace", schemes: "Gov. Schemes",
    chat: "AI Chat", login: "Login", register: "Register", logout: "Logout",
    farmerDash: "Farmer Dashboard", buyerDash: "Buyer Dashboard",

    // Landing
    heroTitle: "Smart Farming with AI",
    heroSubtitle: "KrishiAI empowers Indian farmers with AI-driven crop disease detection, yield prediction, and a direct marketplace — bridging the gap between field and market.",
    getStarted: "Get Started", learnMore: "Learn More",
    featuresTitle: "Everything a Modern Farmer Needs",
    featuresSubtitle: "AI-powered tools built for Indian agriculture",

    // Auth
    loginTitle: "Welcome Back", loginSubtitle: "Sign in to your KrishiAI account",
    registerTitle: "Join KrishiAI", registerSubtitle: "Start your smart farming journey",
    name: "Full Name", email: "Email Address", phone: "Phone Number",
    password: "Password", confirmPassword: "Confirm Password",
    role: "I am a", farmer: "Farmer", buyer: "Buyer",
    farmLocation: "Farm Location", farmSize: "Farm Size (acres)",
    loginBtn: "Sign In", registerBtn: "Create Account",
    orLoginWith: "Or sign in with", whatsappOtp: "WhatsApp OTP",
    sendOtp: "Send OTP", verifyOtp: "Verify & Login",
    otpSent: "OTP sent to your WhatsApp!", noAccount: "Don't have an account?",
    haveAccount: "Already have an account?", signUp: "Sign Up", signIn: "Sign In",

    // Dashboard
    goodMorning: "Good Morning", goodAfternoon: "Good Afternoon", goodEvening: "Good Evening",
    welcome: "Welcome back", yourCrops: "Your Listings", addCrop: "Add New Crop",
    disease: "Disease Detection", yield: "Yield Prediction", soil: "Soil Recommendation",
    weather: "Weather", totalListings: "Total Listings", activeListings: "Active Listings",

    // Disease
    diseaseTitle: "Crop Disease Detection",
    diseaseSubtitle: "Upload a photo of your crop leaf to detect diseases instantly",
    uploadImage: "Upload Crop Image", analyzing: "Analyzing...", analyzeBtn: "Detect Disease",
    diseaseFound: "Disease Detected", treatment: "Treatment", prevention: "Prevention",
    confidence: "Confidence", severity: "Severity",

    // Yield
    yieldTitle: "Yield Prediction", yieldSubtitle: "Enter your farm details to predict crop yield",
    cropType: "Crop Type", soilType: "Soil Type", rainfall: "Rainfall (mm/season)",
    temperature: "Temperature (°C)", area: "Area (hectares)",
    nitrogen: "Nitrogen (N)", phosphorus: "Phosphorus (P)", potassium: "Potassium (K)",
    irrigation: "Irrigation Type", predictBtn: "Predict Yield",
    predictedYield: "Predicted Yield", tonsPerHectare: "tonnes/hectare", totalYield: "Total Expected Yield",
    tips: "Recommendations",

    // Soil
    soilTitle: "Soil Recommendation", soilSubtitle: "Get crop and fertilizer recommendations for your soil",
    phLevel: "Soil pH Level", moisture: "Moisture (%)",
    recommendedCrops: "Recommended Crops", fertilizerAdvice: "Fertilizer Advice",
    analyzesoil: "Analyze Soil",

    // Marketplace
    marketTitle: "Agri Marketplace", marketSubtitle: "Buy fresh produce directly from farmers",
    search: "Search crops...", filterBy: "Filter by", allCategories: "All Categories",
    contactFarmer: "Contact Farmer", pricePerKg: "per kg", addToCart: "Enquire Now",
    organic: "Organic", location: "Location", available: "Available",

    // Schemes
    schemesTitle: "Government Schemes", schemesSubtitle: "Agriculture welfare schemes by Government of India",
    applyNow: "Apply Now", eligibility: "Eligibility", benefit: "Benefit",
    learnMoreBtn: "Learn More",

    // Weather
    humidity: "Humidity", wind: "Wind", pressure: "Pressure", feelsLike: "Feels Like",
    searchCity: "Search city...", weatherFor: "Weather for",

    // Chat
    chatTitle: "KrishiBot — AI Assistant",
    chatSubtitle: "Ask me anything about farming, crops, diseases, or schemes",
    chatPlaceholder: "Ask about crops, diseases, weather...",
    sendBtn: "Send", thinking: "KrishiBot is thinking...",
    clearChat: "Clear Chat", language: "Language",

    // Common
    loading: "Loading...", error: "Something went wrong", retry: "Retry",
    save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit",
    submit: "Submit", back: "Back", next: "Next", close: "Close",
    success: "Success!", failed: "Failed",
  },

  hi: {
    // Nav
    home: "होम", marketplace: "मंडी", schemes: "सरकारी योजनाएं",
    chat: "AI चैट", login: "लॉगिन", register: "रजिस्टर", logout: "लॉगआउट",
    farmerDash: "किसान डैशबोर्ड", buyerDash: "खरीदार डैशबोर्ड",

    // Landing
    heroTitle: "AI के साथ स्मार्ट खेती",
    heroSubtitle: "KrishiAI भारतीय किसानों को AI-आधारित फसल रोग पहचान, उपज भविष्यवाणी और सीधी मंडी के साथ सशक्त बनाता है।",
    getStarted: "शुरू करें", learnMore: "और जानें",
    featuresTitle: "आधुनिक किसान की हर जरूरत",
    featuresSubtitle: "भारतीय कृषि के लिए AI-संचालित उपकरण",

    // Auth
    loginTitle: "वापस स्वागत है", loginSubtitle: "अपने KrishiAI खाते में साइन इन करें",
    registerTitle: "KrishiAI से जुड़ें", registerSubtitle: "स्मार्ट खेती की यात्रा शुरू करें",
    name: "पूरा नाम", email: "ईमेल पता", phone: "फोन नंबर",
    password: "पासवर्ड", confirmPassword: "पासवर्ड पुष्टि करें",
    role: "मैं हूं", farmer: "किसान", buyer: "खरीदार",
    farmLocation: "खेत का स्थान", farmSize: "खेत का आकार (एकड़)",
    loginBtn: "साइन इन", registerBtn: "खाता बनाएं",
    orLoginWith: "या इससे साइन इन करें", whatsappOtp: "व्हाट्सएप OTP",
    sendOtp: "OTP भेजें", verifyOtp: "सत्यापित करें और लॉगिन करें",
    otpSent: "आपके व्हाट्सएप पर OTP भेजा गया!", noAccount: "खाता नहीं है?",
    haveAccount: "पहले से खाता है?", signUp: "साइन अप", signIn: "साइन इन",

    // Dashboard
    goodMorning: "सुप्रभात", goodAfternoon: "नमस्ते", goodEvening: "शुभ संध्या",
    welcome: "वापस स्वागत है", yourCrops: "आपकी लिस्टिंग", addCrop: "नई फसल जोड़ें",
    disease: "रोग पहचान", yield: "उपज भविष्यवाणी", soil: "मृदा सुझाव",
    weather: "मौसम", totalListings: "कुल लिस्टिंग", activeListings: "सक्रिय लिस्टिंग",

    // Disease
    diseaseTitle: "फसल रोग पहचान",
    diseaseSubtitle: "रोग तुरंत पहचानने के लिए अपनी फसल की पत्ती की फोटो अपलोड करें",
    uploadImage: "फसल छवि अपलोड करें", analyzing: "विश्लेषण हो रहा है...", analyzeBtn: "रोग पहचानें",
    diseaseFound: "रोग पहचाना गया", treatment: "उपचार", prevention: "रोकथाम",
    confidence: "सटीकता", severity: "गंभीरता",

    // Yield
    yieldTitle: "उपज भविष्यवाणी", yieldSubtitle: "फसल उपज की भविष्यवाणी के लिए अपने खेत का विवरण दर्ज करें",
    cropType: "फसल का प्रकार", soilType: "मिट्टी का प्रकार", rainfall: "वर्षा (मिमी/मौसम)",
    temperature: "तापमान (°C)", area: "क्षेत्र (हेक्टेयर)",
    nitrogen: "नाइट्रोजन (N)", phosphorus: "फास्फोरस (P)", potassium: "पोटेशियम (K)",
    irrigation: "सिंचाई का प्रकार", predictBtn: "उपज का अनुमान लगाएं",
    predictedYield: "अनुमानित उपज", tonsPerHectare: "टन/हेक्टेयर", totalYield: "कुल अपेक्षित उपज",
    tips: "सुझाव",

    // Soil
    soilTitle: "मृदा सुझाव", soilSubtitle: "अपनी मिट्टी के लिए फसल और उर्वरक सुझाव पाएं",
    phLevel: "मिट्टी का pH स्तर", moisture: "नमी (%)",
    recommendedCrops: "अनुशंसित फसलें", fertilizerAdvice: "उर्वरक सलाह",
    analyzesoil: "मिट्टी का विश्लेषण करें",

    // Marketplace
    marketTitle: "कृषि मंडी", marketSubtitle: "किसानों से सीधे ताज़ा उपज खरीदें",
    search: "फसल खोजें...", filterBy: "फ़िल्टर करें", allCategories: "सभी श्रेणियां",
    contactFarmer: "किसान से संपर्क", pricePerKg: "प्रति किग्रा", addToCart: "अभी पूछें",
    organic: "जैविक", location: "स्थान", available: "उपलब्ध",

    // Schemes
    schemesTitle: "सरकारी योजनाएं", schemesSubtitle: "भारत सरकार की कृषि कल्याण योजनाएं",
    applyNow: "अभी आवेदन करें", eligibility: "पात्रता", benefit: "लाभ",
    learnMoreBtn: "और जानें",

    // Weather
    humidity: "आर्द्रता", wind: "हवा", pressure: "दबाव", feelsLike: "महसूस होता है",
    searchCity: "शहर खोजें...", weatherFor: "का मौसम",

    // Chat
    chatTitle: "KrishiBot — AI सहायक",
    chatSubtitle: "खेती, फसल, रोग या योजनाओं के बारे में कुछ भी पूछें",
    chatPlaceholder: "फसल, रोग, मौसम के बारे में पूछें...",
    sendBtn: "भेजें", thinking: "KrishiBot सोच रहा है...",
    clearChat: "चैट साफ़ करें", language: "भाषा",

    // Common
    loading: "लोड हो रहा है...", error: "कुछ गलत हो गया", retry: "पुनः प्रयास",
    save: "सहेजें", cancel: "रद्द करें", delete: "हटाएं", edit: "संपादित करें",
    submit: "जमा करें", back: "वापस", next: "अगला", close: "बंद करें",
    success: "सफल!", failed: "विफल",
  },
};

export default translations;
