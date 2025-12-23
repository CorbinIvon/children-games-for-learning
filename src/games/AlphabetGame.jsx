import React, { useState, useEffect, useCallback, useRef } from "react";
import GameWindow from "../components/ui/GameWindow";
import SettingsModal from "../components/ui/SettingsModal";
import RetroButton from "../components/ui/RetroButton";
import Fanfare from "../components/ui/Fanfare";
import { useSettings } from "../context/SettingsContext";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetGame = () => {
  const [mode, setMode] = useState("lab"); // lab, match
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUpperCase, setIsUpperCase] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [matchOptions, setMatchOptions] = useState([]);
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

  // Initialize Match Mode
  const initMatchMode = useCallback(() => {
    const correct = ALPHABET[currentIndex];
    let options = [correct];
    while (options.length < 3) {
      const random = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      if (!options.includes(random)) options.push(random);
    }
    // Shuffle
    setMatchOptions(options.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, [currentIndex]);

  useEffect(() => {
    if (mode === "match") initMatchMode();
  }, [mode, initMatchMode]);

  const handleLetterClick = () => {
    const letter = ALPHABET[currentIndex];
    setIsUpperCase(!isUpperCase);
    speak(letter);
  };

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % ALPHABET.length);
    setIsUpperCase(true);
  };

  const prevLetter = () => {
    setCurrentIndex((prev) => (prev - 1 + ALPHABET.length) % ALPHABET.length);
    setIsUpperCase(true);
  };

  const handleMatchSelect = (letter) => {
    const correct = ALPHABET[currentIndex];
    if (letter === correct) {
      setFeedback("correct");
      speak("Great job!");
      if (fanfareRef.current) fanfareRef.current.trigger();
      setTimeout(() => {
        nextLetter();
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback("wrong");
      speak("Try again!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <GameWindow
      title="ALPHABET ADVENTURE"
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

      {/* Mode Switcher */}
      <div className="flex justify-center gap-4 p-4 bg-retro-black/10">
        <RetroButton
          onClick={() => setMode("lab")}
          color={mode === "lab" ? "blue" : "gray"}
          className="text-xs"
        >
          LETTER LAB
        </RetroButton>
        <RetroButton
          onClick={() => setMode("match")}
          color={mode === "match" ? "blue" : "gray"}
          className="text-xs"
        >
          BIG & SMALL MATCH
        </RetroButton>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {mode === "lab" ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div
              onPointerDown={handleLetterClick}
              className="w-64 h-64 bg-retro-white border-8 border-retro-black shadow-retro rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="text-[160px] font-display text-retro-black select-none">
                {isUpperCase
                  ? ALPHABET[currentIndex]
                  : ALPHABET[currentIndex].toLowerCase()}
              </span>
            </div>
            <div className="mt-8 flex gap-8">
              <RetroButton onClick={prevLetter} color="magenta">
                PREV
              </RetroButton>
              <RetroButton onClick={nextLetter} color="green">
                NEXT
              </RetroButton>
            </div>
            <p className="mt-4 text-retro-white font-retro text-xl">
              Tap the letter to change size!
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-300">
            <h2 className="text-3xl font-display text-retro-yellow mb-8 text-center drop-shadow-retro">
              MATCH THE SMALL LETTER TO:
              <br />
              <span className="text-6xl text-retro-white">
                {ALPHABET[currentIndex]}
              </span>
            </h2>

            <div className="flex gap-6">
              {matchOptions.map((letter) => (
                <div
                  key={letter}
                  onPointerDown={() => handleMatchSelect(letter)}
                  className={`w-32 h-32 bg-retro-white border-4 border-retro-black shadow-retro rounded-lg flex items-center justify-center cursor-pointer transition-all
                    ${
                      feedback === "correct" &&
                      letter === ALPHABET[currentIndex]
                        ? "bg-retro-green scale-110"
                        : ""
                    }
                    ${
                      feedback === "wrong" && letter !== ALPHABET[currentIndex]
                        ? "bg-retro-red animate-shake"
                        : "hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  <span className="text-6xl font-display text-retro-black">
                    {letter.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GameWindow>
  );
};

export default AlphabetGame;
