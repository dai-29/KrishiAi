/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",DEFAULT:"#16a34a" },
        forest:  { 50:"#f0fdf4",100:"#dcfce7",500:"#2d6a4f",600:"#1b4332",700:"#081c15",DEFAULT:"#2d6a4f" },
        sage:    { 300:"#95d5b2",400:"#74c69d",500:"#52b788",600:"#40916c",DEFAULT:"#52b788" },
        harvest: { 400:"#fb923c",500:"#f77f00",600:"#ea580c",DEFAULT:"#f77f00" },
        cream:   { DEFAULT:"#f8f9f0", dark:"#eef0e5" },
        navy:    { 900:"#0a1628",800:"#0f2240",700:"#162d52",DEFAULT:"#0a1628" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-in-out",
        "slide-up":   "slideUp 0.5s ease-out",
        "slide-in":   "slideIn 0.4s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: 0 },                "100%": { opacity: 1 } },
        slideUp: { "0%": { transform: "translateY(20px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
        slideIn: { "0%": { transform: "translateX(-20px)", opacity: 0 }, "100%": { transform: "translateX(0)", opacity: 1 } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
