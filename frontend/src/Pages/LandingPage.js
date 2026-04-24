// Landing Page — Hero, Features, Stats, CTA
import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { Leaf, Microscope, TrendingUp, ShoppingBag, MessageSquare, CloudSun, Shield, Users, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  { icon: <Microscope size={24}/>, key:"disease", title:"Disease Detection", titleHi:"रोग पहचान", desc:"AI-powered crop disease detection from a single photo.", descHi:"एक फोटो से AI-संचालित फसल रोग पहचान।", color:"from-red-500/20 to-orange-500/20", border:"border-red-500/30" },
  { icon: <TrendingUp size={24}/>, key:"yield", title:"Yield Prediction", titleHi:"उपज भविष्यवाणी", desc:"Predict harvest yield based on soil and weather data.", descHi:"मिट्टी और मौसम डेटा के आधार पर फसल उपज का अनुमान।", color:"from-blue-500/20 to-cyan-500/20", border:"border-blue-500/30" },
  { icon: <Leaf size={24}/>, key:"soil", title:"Soil Recommendation", titleHi:"मृदा सुझाव", desc:"Get crop and fertilizer advice for your soil type.", descHi:"अपनी मिट्टी के प्रकार के लिए फसल और उर्वरक सलाह।", color:"from-green-500/20 to-emerald-500/20", border:"border-green-500/30" },
  { icon: <ShoppingBag size={24}/>, key:"market", title:"Direct Marketplace", titleHi:"सीधी मंडी", desc:"Sell crops directly to buyers with no middlemen.", descHi:"बिना बिचौलियों के सीधे खरीदारों को फसल बेचें।", color:"from-yellow-500/20 to-amber-500/20", border:"border-yellow-500/30" },
  { icon: <MessageSquare size={24}/>, key:"chat", title:"AI Chatbot", titleHi:"AI चैटबॉट", desc:"Multilingual agriculture assistant available 24/7.", descHi:"24/7 उपलब्ध बहुभाषी कृषि सहायक।", color:"from-purple-500/20 to-pink-500/20", border:"border-purple-500/30" },
  { icon: <CloudSun size={24}/>, key:"weather", title:"Weather Forecast", titleHi:"मौसम पूर्वानुमान", desc:"Real-time weather data for smarter farming decisions.", descHi:"स्मार्ट खेती निर्णयों के लिए वास्तविक समय मौसम डेटा।", color:"from-sky-500/20 to-blue-500/20", border:"border-sky-500/30" },
];

const stats = [
  { val:"50K+", label:"Farmers Registered", labelHi:"किसान पंजीकृत" },
  { val:"95%", label:"Disease Accuracy", labelHi:"रोग सटीकता" },
  { val:"200+", label:"Crop Varieties", labelHi:"फसल किस्में" },
  { val:"6", label:"Govt. Schemes", labelHi:"सरकारी योजनाएं" },
];

const benefits = [
  "No middlemen — direct farm to buyer","AI disease detection in seconds",
  "Government scheme guidance","Bilingual Hindi & English support",
  "Real-time weather integration","Free to use for all farmers",
];

const LandingPage = () => {
  const { t, isHindi } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"/>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sage-500/10 rounded-full blur-3xl"/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-500/5 rounded-full blur-3xl"/>
        </div>

        <div className="container-wide relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 badge-green mb-6 text-sm py-1.5 px-4">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"/>
                AI-Powered Smart Agriculture
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                {isHindi ? "AI के साथ" : "Smart Farming"}<br/>
                <span className="gradient-text">{isHindi ? "स्मार्ट खेती" : "with AI"}</span><br/>
                <span className="text-white/80 text-3xl md:text-4xl font-bold">
                  {isHindi ? "किसान का साथी" : "Kisan ka Saathi"}
                </span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {isHindi
                  ? "KrishiAI भारतीय किसानों को AI-आधारित फसल रोग पहचान, उपज भविष्यवाणी और सीधी मंडी के साथ सशक्त बनाता है।"
                  : "KrishiAI empowers Indian farmers with AI-driven crop disease detection, yield prediction, and a direct marketplace — bridging field to market."}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                  {t("getStarted")} <ArrowRight size={18}/>
                </Link>
                <Link to="/marketplace" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                  {t("marketplace")}
                </Link>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle size={14} className="text-sage-400 flex-shrink-0"/> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex items-center justify-center animate-slide-up">
              <div className="relative w-full max-w-md">
                <div className="glass rounded-3xl p-6 glow-green">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-3">🌾</div>
                    <h3 className="text-white font-bold text-xl">KrishiAI Dashboard</h3>
                    <p className="text-white/50 text-sm">Your smart farming command center</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{e:"🔬",t:"Disease AI",v:"98% Accuracy"},{e:"📈",t:"Yield Pred.",v:"↑ 23% better"},{e:"💧",t:"Soil Analysis",v:"NPK Balanced"},{e:"☁️",t:"Weather",v:"32°C, Humid"}].map(c=>(
                      <div key={c.t} className="bg-white/10 rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                        <div className="text-2xl mb-1">{c.e}</div>
                        <p className="text-white text-xs font-semibold">{c.t}</p>
                        <p className="text-sage-400 text-xs">{c.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-harvest-500/20 rounded-xl border border-harvest-500/30">
                    <p className="text-harvest-400 text-xs font-semibold">🌱 Latest Alert</p>
                    <p className="text-white/70 text-xs">Wheat: Optimal sowing conditions this week!</p>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl animate-pulse-slow">
                  <p className="text-white text-xs font-bold">🤖 AI Active</p>
                </div>
                <div className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl">
                  <p className="text-sage-400 text-xs font-bold">50K+ Farmers 🧑‍🌾</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy-800/50 border-y border-white/5">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.val} className="stat-card py-6">
                <span className="text-4xl font-black gradient-text">{s.val}</span>
                <span className="text-white/50 text-sm text-center">{isHindi ? s.labelHi : s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container-wide">
        <div className="text-center mb-14">
          <h2 className="section-title">{t("featuresTitle")}</h2>
          <p className="section-subtitle">{t("featuresSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.key} className={`card group hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br ${f.color} border ${f.border}`}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{isHindi ? f.titleHi : f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{isHindi ? f.descHi : f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-forest-600/30 to-sage-500/20 border-y border-white/10">
        <div className="container-wide text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield size={40} className="text-sage-400"/>
            <Users size={40} className="text-primary-400"/>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {isHindi ? "आज ही KrishiAI से जुड़ें" : "Join KrishiAI Today"}
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            {isHindi ? "लाखों किसानों की तरह अपनी खेती को स्मार्ट बनाएं।" : "Join thousands of farmers using AI to transform their agriculture."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-10 py-4">{t("registerBtn")}</Link>
            <Link to="/schemes" className="btn-secondary text-lg px-10 py-4">{t("schemes")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
