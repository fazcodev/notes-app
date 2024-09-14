/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "" ,"system-ui", "sans-serif"],
        Roboto: ["Roboto", "system-ui", "sans-serif"],
        Poppins: ["Poppins", "system-ui", "sans-serif"],
        Kaushan: ["Kaushan Script", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
}