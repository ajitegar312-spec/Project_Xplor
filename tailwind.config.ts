/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe6fe",
          500: "#2b5cff",
          600: "#1e46d6",
          700: "#1838ad",
          900: "#101c4e",
        },
        ink: "#0b1020",
      },
      maxWidth: { shell: "80rem" },
    },
  },
  plugins: [],
};
