import React, { useState, useEffect, useCallback } from "react";
import GameWindow from "../components/ui/GameWindow";
import SettingsModal from "../components/ui/SettingsModal";
import RetroButton from "../components/ui/RetroButton";

// QWERTY Layout rows
const KEYBOARD_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const ALPHA_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
  ["U", "V", "W", "X", "Y", "Z"],
];

const COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "magenta",
  "cyan",
  "lightblue",
  "lightgreen",
  "lightcyan",
  "lightred",
  "lightmagenta",
  "brown",
];

// Explicit map to ensure Tailwind generates these classes
const BG_CLASSES = {
  red: "bg-retro-red",
  green: "bg-retro-green",
  blue: "bg-retro-blue",
  yellow: "bg-retro-yellow",
  magenta: "bg-retro-magenta",
  cyan: "bg-retro-cyan",
  lightblue: "bg-retro-lightblue",
  lightgreen: "bg-retro-lightgreen",
  lightcyan: "bg-retro-lightcyan",
  lightred: "bg-retro-lightred",
  lightmagenta: "bg-retro-lightmagenta",
  brown: "bg-retro-brown",
};

const WORD_POOL = {
  A: ["Apple", "Ant", "Astronaut", "Alligator", "Airplane"],
  B: ["Ball", "Bear", "Banana", "Butterfly", "Boat"],
  C: ["Cat", "Car", "Cake", "Cow", "Castle"],
  D: ["Dog", "Duck", "Drum", "Dinosaur", "Doll"],
  E: ["Egg", "Elephant", "Earth", "Engine", "Eagle"],
  F: ["Fish", "Frog", "Flower", "Fan", "Fire"],
  G: ["Goat", "Grape", "Guitar", "Grass", "Ghost"],
  H: ["Hat", "Horse", "House", "Heart", "Helicopter"],
  I: ["Ice", "Igloo", "Island", "Insect", "Idea"],
  J: ["Jam", "Jelly", "Jet", "Jungle", "Juice"],
  K: ["Kite", "Key", "King", "Kangaroo", "Koala"],
  L: ["Lion", "Lamp", "Leaf", "Lemon", "Ladder"],
  M: ["Moon", "Mouse", "Monkey", "Milk", "Map"],
  N: ["Nest", "Nose", "Net", "Night", "Nut"],
  O: ["Owl", "Octopus", "Orange", "Ocean", "Onion"],
  P: ["Pig", "Pizza", "Penguin", "Pencil", "Plane"],
  Q: ["Queen", "Quilt", "Quiet", "Question", "Quarter"],
  R: ["Rabbit", "Robot", "Rain", "Ring", "Rocket"],
  S: ["Sun", "Snake", "Star", "Sock", "Spoon"],
  T: ["Tree", "Tiger", "Train", "Turtle", "Table"],
  U: ["Umbrella", "Unicorn", "Up", "Uniform", "Under"],
  V: ["Van", "Violin", "Vegetable", "Volcano", "Vase"],
  W: ["Whale", "Watch", "Water", "Wolf", "Wagon"],
  X: ["Xylophone", "X-Ray", "Box", "Fox", "Six"],
  Y: ["Yo-Yo", "Yak", "Yellow", "Yarn", "Yacht"],
  Z: ["Zebra", "Zoo", "Zero", "Zipper", "Zigzag"],
  0: ["Zero"],
  1: ["One"],
  2: ["Two"],
  3: ["Three"],
  4: ["Four"],
  5: ["Five"],
  6: ["Six"],
  7: ["Seven"],
  8: ["Eight"],
  9: ["Nine"],
};

const KeyboardGame = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [bgColor, setBgColor] = useState("bg-retro-darkgray");

  // Initialize random colors for each key on mount
  const [keyColors, setKeyColors] = useState({});
  // Initialize random words for each key on mount
  const [keyWords, setKeyWords] = useState({});

  useEffect(() => {
    const newColors = {};
    const allKeys = KEYBOARD_ROWS.flat();

    // Create a pool that guarantees equal distribution
    let pool = [];
    const numKeys = allKeys.length;

    // Fill pool with needed amount of colors
    let i = 0;
    while (pool.length < numKeys) {
      pool.push(COLORS[i % COLORS.length]);
      i++;
    }

    // Shuffle logic (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // AssignColors
    allKeys.forEach((key, index) => {
      newColors[key] = pool[index];
    });
    setKeyColors(newColors);

    // Assign words
    const newWords = {};
    allKeys.forEach((key) => {
      const char = key.toUpperCase();
      const words = WORD_POOL[char];
      if (words && words.length > 0) {
        newWords[key] = words[Math.floor(Math.random() * words.length)];
      } else {
        newWords[key] = "";
      }
    });
    setKeyWords(newWords);
  }, []); // Run once on mount

  // Settings State
  const [settings, setSettings] = useState({
    readLetter: true,
    readWord: true,
    showImage: true,
    randomColors: true,
    backgroundEffects: true,
    fullscreen: false,
    qwerty: true,
  });

  // Handle Fullscreen Side Effect
  useEffect(() => {
    if (settings.fullscreen) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.error(`Error attempting to enable fullscreen: ${e.message}`);
        });
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((e) => {
          console.error(`Error attempting to exit fullscreen: ${e.message}`);
        });
      }
    }
  }, [settings.fullscreen]);

  // Word mapping using assigned logic
  const getWordForChar = (char) => {
    return keyWords[char] || "";
  };

  const speak = useCallback((text) => {
    if ("speechSynthesis" in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleKeyPress = useCallback(
    (key) => {
      const char = key.toUpperCase();
      setActiveKey(char);

      // 1. Audio: Speech
      const isNumber = /^[0-9]$/.test(char);
      const word = getWordForChar(char);
      let text = "";

      if (isNumber) {
        if (settings.readWord && word) {
          text = word;
        } else if (settings.readLetter) {
          text = char;
        }
      } else {
        if (settings.readLetter) text += `${char}. `;
        if (settings.readWord && word) text += `${word}.`;
      }
      speak(text);

      // 3. Visual: Background Effect
      if (settings.backgroundEffects) {
        const keyColor = keyColors[char];
        if (keyColor && BG_CLASSES[keyColor]) {
          setBgColor(BG_CLASSES[keyColor]);
        }
      }
    },
    [settings, keyColors, keyWords, speak]
  );

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const validKey = /^[a-zA-Z0-9]$/;
      if (validKey.test(e.key)) {
        handleKeyPress(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to determine key color
  const getKeyColor = (char) => {
    if (activeKey === char) return "white"; // Highlight
    if (settings.randomColors) {
      return keyColors[char] || "gray";
    }
    return "gray";
  };

  return (
    <GameWindow
      title="KEYBOARD EXPLORE"
      onSettingsClick={() => setShowSettings(true)}
    >
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onToggle={toggleSetting}
      />

      {/* Main Display Area */}
      <div
        className={`flex-1 flex flex-col items-center justify-center transition-colors duration-200 ${bgColor}`}
      >
        {activeKey && (
          <div
            className="text-center animate-bounce cursor-pointer active:scale-110 transition-transform"
            onPointerDown={() => speak(activeKey)}
          >
            <h1 className="text-[120px] font-display text-retro-white drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">
              {activeKey}
            </h1>
          </div>
        )}
        {!activeKey && (
          <div className="text-retro-gray/50 text-2xl font-retro blink">
            PRESS A KEY...
          </div>
        )}
      </div>

      {/* On-Screen Keyboard */}
      <div className="p-2 md:p-4 bg-retro-black/20 flex flex-col gap-1 md:gap-2 items-center justify-center w-full shrink-0">
        {/* Static Word Display */}
        <div className="h-12 md:h-16 flex items-center justify-center mb-1">
          {activeKey && settings.showImage && getWordForChar(activeKey) && (
            <div
              className="text-4xl text-retro-yellow font-retro bg-black/50 px-8 py-2 rounded border-2 border-retro-white shadow-retro cursor-pointer active:scale-95 transition-transform"
              onPointerDown={() => speak(getWordForChar(activeKey))}
            >
              {getWordForChar(activeKey)}
            </div>
          )}
        </div>

        {(settings.qwerty ? KEYBOARD_ROWS : ALPHA_ROWS).map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((char) => (
              <RetroButton
                key={char}
                onClick={() => handleKeyPress(char)}
                color={getKeyColor(char)}
                className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl transition-transform ${
                  activeKey === char
                    ? "translate-y-2 shadow-none bg-retro-white !text-retro-black"
                    : ""
                }`}
              >
                {char}
              </RetroButton>
            ))}
          </div>
        ))}
      </div>
    </GameWindow>
  );
};

export default KeyboardGame;
