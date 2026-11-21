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
        rozline: {
          blue: "#0284C7",
          royal: "#0066FF",
          navy: "#0A192F",
          deep: "#030B17",
          midnight: "#07152B",
          orange: "#F97316",
          amber: "#FB923C",
          sky: "#38BDF8",
          slate: "#0F172A",
        },
        skyway: {
          emerald: "#0284C7",
          green: "#0066FF",
          dark: "#0A192F",
          deep: "#030B17",
          gold: "#F97316",
          amber: "#FB923C",
          cyan: "#38BDF8",
          slate: "#0F172A",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        "3d": "0 20px 50px -10px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(2, 132, 199, 0.2)",
        "3d-gold": "0 20px 50px -10px rgba(249, 115, 22, 0.25), 0 0 25px rgba(249, 115, 22, 0.2)",
        "3d-orange": "0 20px 50px -10px rgba(249, 115, 22, 0.25), 0 0 25px rgba(249, 115, 22, 0.2)",
        "3d-green": "0 20px 50px -10px rgba(2, 132, 199, 0.35), 0 0 25px rgba(2, 132, 199, 0.25)",
        "3d-blue": "0 20px 50px -10px rgba(2, 132, 199, 0.35), 0 0 25px rgba(2, 132, 199, 0.25)",
        "luxury": "0 24px 70px rgba(2, 132, 199, 0.18)",
        "glow": "0 0 34px rgba(249, 115, 22, 0.34)",
        "neon": "0 0 15px rgba(2, 132, 199, 0.5), 0 0 30px rgba(2, 132, 199, 0.2)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-glow": "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.18) 0%, transparent 60%)",
        "hero-mesh": "radial-gradient(circle at 10% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(2, 132, 199, 0.15) 0%, transparent 40%), linear-gradient(145deg, #030b17 0%, #07152b 50%, #040e1e 100%)",
        "card-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
