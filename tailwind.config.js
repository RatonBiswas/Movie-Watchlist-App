/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B0F1A",
          800: "#121829",
          700: "#1B2238"
        },
        accent: {
          500: "#FF6B6B",
          600: "#FF4D4D"
        },
        mint: {
          500: "#34D399"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 107, 107, 0.25)"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Inter\"", "sans-serif"]
      }
    }
  },
  plugins: []
};
