// CropCard — marketplace product listing card
import React from "react";
import { MapPin, Phone, Leaf, Star } from "lucide-react";
import { useLang } from "../context/LanguageContext";

const CATEGORY_COLORS = {
  vegetables: "bg-green-500/20 text-green-400",
  fruits: "bg-orange-500/20 text-orange-400",
  grains: "bg-yellow-500/20 text-yellow-400",
  pulses: "bg-red-500/20 text-red-400",
  spices: "bg-purple-500/20 text-purple-400",
  others: "bg-blue-500/20 text-blue-400",
};

const CATEGORY_EMOJIS = {
  vegetables:"🥦", fruits:"🍎", grains:"🌾", pulses:"🫘", spices:"🌶️", others:"🌿"
};

const CropCard = ({ crop }) => {
  const { t, isHindi } = useLang();
  const title = isHindi && crop.titleHi ? crop.titleHi : crop.title;
  const desc  = isHindi && crop.descriptionHi ? crop.descriptionHi : crop.description;

  const handleContact = () => {
    window.open(`https://wa.me/91${crop.farmerPhone}?text=Hi, I'm interested in your ${crop.title} listing on KrishiAI`, "_blank");
  };

  return (
    <div className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden mb-4 bg-white/5 h-44">
        {crop.image ? (
          <img src={crop.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {CATEGORY_EMOJIS[crop.category] || "🌿"}
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <span className={`badge text-xs ${CATEGORY_COLORS[crop.category] || "bg-white/20 text-white"}`}>
            {crop.category}
          </span>
          {crop.isOrganic && (
            <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Leaf size={10}/> {t("organic")}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-white/50 text-sm mb-3 line-clamp-2">{desc}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-harvest-400">₹{crop.price}</span>
          <span className="text-white/40 text-sm">/{crop.priceUnit || "kg"}</span>
          <span className="ml-auto text-white/40 text-xs">{crop.quantity} {crop.quantityUnit || "kg"} {t("available")}</span>
        </div>

        {/* Location & Farmer */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <MapPin size={12}/> <span>{crop.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <Star size={12} className="text-yellow-400"/> <span>{crop.farmerName}</span>
          </div>
        </div>

        {/* CTA */}
        <button onClick={handleContact}
          className="w-full btn-harvest text-sm py-2.5 flex items-center justify-center gap-2 mt-auto">
          <Phone size={14}/> {t("contactFarmer")}
        </button>
      </div>
    </div>
  );
};

export default CropCard;
