/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.mdx",
    "./blog/**/*.mdx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Tärkeä! Estää Tailwindia rikkomasta Docusauruksen omia tyylejä
  },
}