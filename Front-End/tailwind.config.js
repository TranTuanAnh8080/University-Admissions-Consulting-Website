/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // 👈 thêm dòng này
  ],
}

