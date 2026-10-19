import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: { colors: { forest: "#285a49", paper: "#f7f8f5" } } },
  plugins: [typography],
};
