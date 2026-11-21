import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skyway: {
          emerald: "#10B981",
          green: "#0B7A2B",
          dark: "#043E17",
          deep: "#021A0A",
          gold: "#D4AF37",
          amber: "#F59E0B",
          cyan: "#06B6D4",
          slate: "#0F172A",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        "3d": "0 20px 50px -10px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(16, 185, 129, 0.15)",
        "3d-gold": "0 20px 50px -10px rgba(212, 175, 55, 0.25), 0 0 25px rgba(212, 175, 55, 0.2)",
        "3d-green": "0 20px 50px -10px rgba(11, 122, 43, 0.35), 0 0 25px rgba(16, 185, 129, 0.25)",
        "luxury": "0 24px 70px rgba(4, 92, 29, 0.18)",
        "glow": "0 0 34px rgba(212, 175, 55, 0.34)",
        "neon": "0 0 15px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.2)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-glow": "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.18) 0%, transparent 60%)",
        "hero-mesh": "radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), linear-gradient(145deg, #021a0a 0%, #043e17 50%, #03140a 100%)",
        "card-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
