// Government Schemes — Bootstrap green theme
import React, { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const MOCK = [
  { _id:"1", shortName:"PM-KISAN", icon:"💰", category:"income-support", name:"PM Kisan Samman Nidhi", nameHi:"पीएम किसान सम्मान निधि", description:"Direct income support of ₹6,000/year to small farmers.", descriptionHi:"छोटे किसानों को ₹6,000/वर्ष की प्रत्यक्ष आय सहायता।", eligibility:"Farmers with land up to 2 hectares.", eligibilityHi:"2 हेक्टेयर तक भूमि वाले किसान।", benefit:"₹6,000/year", benefitHi:"₹6,000/वर्ष", applicationLink:"https://pmkisan.gov.in" },
  { _id:"2", shortName:"PMFBY", icon:"🛡️", category:"insurance", name:"PM Fasal Bima Yojana", nameHi:"प्रधानमंत्री फसल बीमा योजना", description:"Crop insurance for loss due to natural calamities.", descriptionHi:"प्राकृतिक आपदाओं से फसल नुकसान पर बीमा।", eligibility:"All farmers growing notified crops.", eligibilityHi:"अधिसूचित फसलें उगाने वाले सभी किसान।", benefit:"Up to 100% coverage", benefitHi:"100% तक कवरेज", applicationLink:"https://pmfby.gov.in" },
  { _id:"3", shortName:"KCC", icon:"💳", category:"credit", name:"Kisan Credit Card", nameHi:"किसान क्रेडिट कार्ड", description:"Affordable credit for seeds, fertilizers and equipment.", descriptionHi:"बीज, उर्वरक और उपकरण के लिए सस्ती ऋण सुविधा।", eligibility:"All farmers and sharecroppers.", eligibilityHi:"सभी किसान और बटाईदार।", benefit:"₹3 lakh at 4% interest", benefitHi:"4% ब्याज पर ₹3 लाख", applicationLink:"https://www.nabard.org" },
  { _id:"4", shortName:"PMKSY", icon:"💧", category:"irrigation", name:"PM Krishi Sinchayee Yojana", nameHi:"प्रधानमंत्री कृषि सिंचाई योजना", description:"Subsidy on drip and sprinkler irrigation systems.", descriptionHi:"ड्रिप और स्प्रिंकलर सिंचाई पर सब्सिडी।", eligibility:"All farmers, priority to small holders.", eligibilityHi:"सभी किसान, छोटे किसानों को प्राथमिकता।", benefit:"Drip/sprinkler subsidy", benefitHi:"ड्रिप/स्प्रिंकलर सब्सिडी", applicationLink:"https://pmksy.gov.in" },
  { _id:"5", shortName:"SHC", icon:"🌱", category:"technology", name:"Soil Health Card Scheme", nameHi:"मृदा स्वास्थ्य कार्ड योजना", description:"Free soil testing and fertilizer recommendations.", descriptionHi:"मुफ्त मिट्टी परीक्षण और उर्वरक सिफारिशें।", eligibility:"All farmers across India.", eligibilityHi:"पूरे भारत के सभी किसान।", benefit:"Free soil test + guide", benefitHi:"मुफ्त मिट्टी परीक्षण", applicationLink:"https://soilhealth.dac.gov.in" },
  { _id:"6", shortName:"eNAM", icon:"🏪", category:"technology", name:"National Agriculture Market", nameHi:"राष्ट्रीय कृषि बाजार", description:"Online platform connecting farmers directly to buyers.", descriptionHi:"किसानों को सीधे खरीदारों से जोड़ने वाला ऑनलाइन प्लेटफॉर्म।", eligibility:"Farmers registered with local APMCs.", eligibilityHi:"स्थानीय APMCs पंजीकृत किसान।", benefit:"Pan-India market access", benefitHi:"पूरे भारत में बाजार", applicationLink:"https://enam.gov.in" },
];

const SchemeCard = ({ scheme, hi }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="krishi-card mb-3" style={{ borderLeft:"4px solid #1B5E20" }}>
      <div className="d-flex gap-3 align-items-start">
        <div style={{ fontSize:"2.5rem" }}>{scheme.icon}</div>
        <div className="flex-fill">
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <span className="badge" style={{ background:"#1B5E20" }}>{scheme.shortName}</span>
            <span className="text-muted small text-capitalize">{scheme.category.replace("-"," ")}</span>
          </div>
          <h6 className="fw-bold mb-1" style={{ color:"#1B5E20" }}>{hi ? scheme.nameHi : scheme.name}</h6>
          <p className="text-muted small mb-2">{hi ? scheme.descriptionHi : scheme.description}</p>
          <span className="badge" style={{ background:"#FFF3CD", color:"#856404", border:"1px solid #FFCC02" }}>
            💰 {hi ? scheme.benefitHi : scheme.benefit}
          </span>
        </div>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="btn btn-sm btn-outline-success mt-3 w-100">
        {expanded ? (hi?"▲ कम दिखाएं":"▲ Less") : (hi?"▼ पात्रता व आवेदन":"▼ Eligibility & Apply")}
      </button>
      {expanded && (
        <div className="mt-3">
          <div className="p-2 mb-2 rounded" style={{ background:"#f9fdf9", border:"1px solid #c8e6c9" }}>
            <small className="fw-bold d-block" style={{ color:"#2E7D32" }}>✅ {hi?"पात्रता":"Eligibility"}</small>
            <small className="text-muted">{hi ? scheme.eligibilityHi : scheme.eligibility}</small>
          </div>
          <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100">
            {hi ? "अभी आवेदन करें 🔗" : "Apply Now 🔗"}
          </a>
        </div>
      )}
    </div>
  );
};

const GovernmentSchemes = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/schemes").then(r=>setSchemes(r.data.schemes)).catch(()=>setSchemes(MOCK)).finally(()=>setLoading(false));
  }, []);

  const categories = ["all","income-support","insurance","credit","irrigation","technology"];
  const catLabels = { all:hi?"सभी":"All","income-support":hi?"आय":"Income","insurance":hi?"बीमा":"Insurance","credit":hi?"ऋण":"Credit","irrigation":hi?"सिंचाई":"Irrigation","technology":hi?"तकनीक":"Technology" };
  const filtered = filter === "all" ? schemes : schemes.filter(s=>s.category===filter);

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-label">{hi?"भारत सरकार":"GOVERNMENT OF INDIA"}</h6>
          <h2 style={{ color:"#1B5E20", fontWeight:800 }}>🏛️ {hi?"सरकारी कृषि योजनाएं":"Government Schemes"}</h2>
          <p className="text-muted">{hi?"किसानों के लिए सरकारी योजनाओं की जानकारी":"Information on schemes available for farmers"}</p>
        </div>
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {categories.map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className="btn btn-sm rounded-pill px-3"
              style={{ background:filter===c?"#1B5E20":"#E8F5E9", color:filter===c?"#fff":"#1B5E20", border:"1px solid #a5d6a7" }}>
              {catLabels[c]}
            </button>
          ))}
        </div>
        {loading ? <div className="text-center py-5"><div className="krishi-spinner mx-auto"/></div> : (
          <div className="col-lg-8 mx-auto">
            {filtered.map(s=><SchemeCard key={s._id} scheme={s} hi={hi}/>)}
          </div>
        )}
        <div className="text-center p-4 mt-4 rounded-3" style={{ background:"#E8F5E9", border:"2px solid #a5d6a7" }}>
          <h5 style={{ color:"#1B5E20" }}>🙋 {hi?"कोई सवाल है?":"Need Help?"}</h5>
          <p className="text-muted">{hi?"KrishiBot से पूछें!":"Ask KrishiBot about any scheme!"}</p>
          <a href="/chat" className="btn btn-success rounded-pill px-4">🤖 KrishiBot</a>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
