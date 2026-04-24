# KrishiAI 🌾 — Smart Agriculture & Rural Marketplace Platform

An AI-powered full-stack web platform for Indian farmers with bilingual (Hindi/English) support.

---

## 🏗️ Project Structure

```
e:\krishi\
├── frontend/          ← React + Tailwind CSS (runs on port 3000)
├── backend/           ← Node.js + Express + MongoDB (runs on port 5000)
└── ai-api/            ← Python FastAPI AI service (runs on port 8000)
```

---

## 🚀 How to Run Locally

### 1. Frontend (React)
```bash
cd e:\krishi\frontend
npm install     # already done
npm start       # opens http://localhost:3000
```

### 2. Backend (Node.js)
```bash
cd e:\krishi\backend

# 1. Copy and fill in your .env values:
#    - MONGO_URI: MongoDB Atlas connection string
#    - OPENAI_API_KEY: your OpenAI key
#    - WEATHER_API_KEY: OpenWeatherMap free key

npm install     # already done
npm run dev     # runs on http://localhost:5000
```

### 3. AI API (Python FastAPI)
```bash
cd e:\krishi\ai-api

# Install Python dependencies:
pip install -r requirements.txt

# Run the API:
uvicorn main:app --reload --port 8000
# Opens http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

---

## 🔑 Environment Variables (backend/.env)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `OPENAI_API_KEY` | OpenAI API key for chatbot |
| `WEATHER_API_KEY` | OpenWeatherMap API key (free) |
| `AI_API_URL` | FastAPI service URL (default: http://localhost:8000) |
| `OTP_MODE` | Set to `mock` for dev — OTP logged to console |

---

## 🌟 Features

| Feature | Status | Notes |
|---------|--------|-------|
| User Authentication | ✅ | JWT + role-based (Farmer/Buyer) |
| WhatsApp OTP Login | ✅ | Mock in dev — OTP printed to console |
| Farmer Dashboard | ✅ | Stats, AI tools, weather, listings |
| Buyer Dashboard | ✅ | Browse marketplace, weather |
| Disease Detection | ✅ | Upload image → AI diagnosis |
| Yield Prediction | ✅ | Form + bar chart + tips |
| Soil Recommendation | ✅ | Sliders → crop scores + fertilizer |
| Marketplace | ✅ | Grid with filters + WhatsApp contact |
| Government Schemes | ✅ | 6 real schemes with expandable details |
| AI Chatbot | ✅ | Full-page + floating widget |
| Weather Widget | ✅ | OpenWeatherMap + mock fallback |
| Bilingual (Hi/En) | ✅ | All pages toggle via navbar button |

---

## 🏛️ Architecture

```
User → React Frontend (3000)
         ↓ axios (JWT)
       Node.js Backend (5000)
         ├── MongoDB Atlas (user/crop/scheme data)
         ├── OpenWeatherMap API (weather)
         ├── OpenAI API (chatbot)
         └── FastAPI AI Service (8000)
               ├── /disease-detect
               ├── /yield-predict
               └── /soil-recommend
```

---

## 📱 Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Email+Password / WhatsApp OTP |
| `/register` | Public | Farmer or Buyer registration |
| `/marketplace` | Public | Browse all crop listings |
| `/schemes` | Public | Government schemes |
| `/chat` | Public | AI chatbot page |
| `/farmer-dashboard` | Farmer only | Hub with AI tools |
| `/buyer-dashboard` | Buyer only | Browse + weather |
| `/disease-detection` | Auth required | AI crop disease detection |
| `/yield-prediction` | Auth required | AI yield prediction |
| `/soil-recommendation` | Auth required | Soil analysis |

---

## 🤖 AI Endpoints (FastAPI)

```
POST /disease-detect   { image: base64, crop_type: string }
POST /yield-predict    { crop, soil_type, rainfall, temperature, area, N, P, K }
POST /soil-recommend   { nitrogen, phosphorus, potassium, ph, moisture }
```
> All use intelligent rule-based mock logic. Replace with real ML models for production.

---

## 🎨 Design System

- **Colors**: Forest Green `#2d6a4f` · Sage `#52b788` · Harvest Orange `#f77f00` · Navy `#0a1628`
- **Font**: Inter (Google Fonts)
- **Style**: Glassmorphism cards · Gradient text · Hover animations · Dark theme

---

## 🔧 Getting API Keys (Free)

1. **MongoDB Atlas**: [mongodb.com/atlas](https://www.mongodb.com/atlas) → Free M0 cluster
2. **OpenWeatherMap**: [openweathermap.org/api](https://openweathermap.org/api) → Free tier (1000 calls/day)
3. **OpenAI**: [platform.openai.com](https://platform.openai.com) → Pay-per-use (gpt-4o-mini is cheap)
