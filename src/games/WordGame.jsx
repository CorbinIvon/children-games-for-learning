import React, { useState, useEffect, useCallback, useRef } from "react";
import GameWindow from "../components/ui/GameWindow";
import SettingsModal from "../components/ui/SettingsModal";
import RetroButton from "../components/ui/RetroButton";
import Fanfare from "../components/ui/Fanfare";
import { useSettings } from "../context/SettingsContext";

const WORDS = [
  { word: "CAT", icon: "🐱", missing: 0 },
  { word: "DOG", icon: "🐶", missing: 0 },
  { word: "SUN", icon: "☀️", missing: 1 },
  { word: "BAT", icon: "🦇", missing: 0 },
  { word: "PIG", icon: "🐷", missing: 2 },
  { word: "CAR", icon: "🚗", missing: 0 },
  { word: "HAT", icon: "🎩", missing: 0 },
];

const WordGame = () => {
  const [mode, setMode] = useState("missing"); // missing, picker
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const { settings, toggleSetting } = useSettings();
  const fanfareRef = useRef(null);

  const speak = useCallback((text) => {
    if ("speechSynthesis" in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const initMissingMode = useCallback(() => {
    const current = WORDS[currentIndex];
    const correctLetter = current.word[current.missing];
    let opts = [correctLetter];
    while (opts.length < 3) {
      const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      if (!opts.includes(char)) opts.push(char);
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, [currentIndex]);

  useEffect(() => {
    initMissingMode();
  }, [currentIndex, initMissingMode]);

  const handleOptionClick = (letter) => {
    const current = WORDS[currentIndex];
    if (letter === current.word[current.missing]) {
      setFeedback("correct");
      speak(`Excellent! ${current.word}!`);
      if (fanfareRef.current) fanfareRef.current.trigger();
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % WORDS.length);
      }, 2500);
    } else {
      setFeedback("wrong");
      speak("Try another one!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const current = WORDS[currentIndex];

  return (
    <GameWindow
      title="WORD WONDERLAND"
      onSettingsClick={() => setShowSettings(true)}
    >
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onToggle={toggleSetting}
        onTestFanfare={() => fanfareRef.current?.trigger()}
      />
      <Fanfare ref={fanfareRef} />

      {/* Mode Picker (Simplified for now) */}
      <div className="flex justify-center p-4 bg-retro-black/10">
        <h2 className="text-xl font-retro text-retro-white">
          MISSING LETTER CHALLENGE
        </h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-retro-white p-8 border-4 border-retro-black shadow-retro rounded-2xl flex flex-col items-center max-w-md w-full animate-in zoom-in duration-300">
          <span className="text-9xl mb-8" role="img" aria-label={current.word}>
            {current.icon}
          </span>

          <div className="flex gap-4 mb-12">
            {current.word.split("").map((char, i) => (
              <div
                key={i}
                className={`w-20 h-24 border-b-8 border-retro-black flex items-center justify-center
                  ${i === current.missing ? "bg-retro-yellow/20" : ""}
                `}
              >
                <span
                  className={`text-6xl font-display text-retro-black
                  ${
                    i === current.missing && feedback !== "correct"
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-6">
            {options.map((letter) => (
              <RetroButton
                key={letter}
                onClick={() => handleOptionClick(letter)}
                color={
                  feedback === "correct" &&
                  letter === current.word[current.missing]
                    ? "green"
                    : "blue"
                }
                className={`w-20 h-20 text-4xl font-display 
                  ${
                    feedback === "wrong" &&
                    letter !== current.word[current.missing]
                      ? "opacity-50"
                      : ""
                  }
                `}
              >
                {letter}
              </RetroButton>
            ))}
          </div>
        </div>
      </div>
    </GameWindow>
  );
};

export default WordGame;
