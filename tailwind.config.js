/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#2A166F",
          800: "#3B22A6",
          700: "#4C2ED1",
          600: "#5C3AF7",
          500: "#6E5BFF",
          100: "#EFEAFF"
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
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(92, 58, 247, 0.25)"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Inter\"", "sans-serif"]
      }
    }
  },
  plugins: []
};
