/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include Flowbite components
  ],
  darkMode: 'class', // This enables dark mode with class strategy
  theme: {
    extend: {
      // Your existing theme extensions here
    },
  },
  plugins: [
    // Your existing plugins here
    // require('')
  ],
}
