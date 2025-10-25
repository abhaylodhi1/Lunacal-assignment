/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: "#0f1215",
        card: "#363C43",
        accent: "#171717",
        accentHover: "#272732",
        button: "#161718",
        textButton: "#303439",
        leftRightButton: "#6F787C",
        textMuted: "#B0B0C1",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};
