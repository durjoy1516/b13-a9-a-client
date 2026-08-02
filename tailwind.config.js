/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 ১. Tailwind-এর ক্লাস বেজড ডার্ক মোড অন করা হলো
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // 👈 ২. DaisyUI-তে dark থিম অ্যালাউ করা হলো
  },
};