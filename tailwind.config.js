/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#2E248C",
          800: "#3A2FB2",
          700: "#4E41D9",
          600: "#5F5CE6",
          500: "#6A5BFF",
          400: "#7A73FF",
          100: "#ECEBFF"
        },
        ink: {
          900: "#0B0B12",
          700: "#2A2A3A",
          500: "#5A5A70"
        },
        surface: {
          50: "#FFFFFF",
          100: "#F7F7FB",
          200: "#E9EAF4"
        },
        accent: {
          200: "#F7D78A",
          400: "#F2C14E"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(94, 92, 230, 0.25)",
        card: "0 18px 40px rgba(26, 26, 54, 0.12)"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Inter\"", "sans-serif"]
      }
    }
  },
  plugins: []
};
