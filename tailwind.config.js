/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-navy": "#1E3A5F",
        "brand-blue": "#2563EB",
        "brand-lightblue": "#3B82F6",
        "brand-gold": "#F59E0B",
        "brand-green": "#16A34A",
        "brand-red": "#DC2626",
        "brand-orange": "#F97316",
        "brand-purple": "#8B5CF6",
        "brand-gray": "#64748B",
        "brand-lightgray": "#F8FAFC",
      },
      fontFamily: {
        bn: ["Hind Siliguri", "sans-serif"],
        en: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
