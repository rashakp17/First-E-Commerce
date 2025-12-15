/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        irish: ["Irish Grover", "system-ui"],
        opensans: ['"Open Sans"', 'sans-serif'],
        poppins:["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}

