/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        retro: {
          black: "#000000",
          blue: "#0000AA",
          green: "#00AA00",
          cyan: "#00AAAA",
          red: "#AA0000",
          magenta: "#AA00AA",
          brown: "#AA5500",
          gray: "#AAAAAA",
          darkgray: "#555555",
          lightblue: "#5555FF",
          lightgreen: "#55FF55",
          lightcyan: "#55FFFF",
          lightred: "#FF5555",
          lightmagenta: "#FF55FF",
          yellow: "#FFFF55",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        retro: ['"VT323"', "monospace"],
        display: ['"Press Start 2P"', "cursive"],
      },
      boxShadow: {
        retro: "4px 4px 0px 0px rgba(0,0,0,1)",
      },
    },
  },
  plugins: [],
};
