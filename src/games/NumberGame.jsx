import React, { useState, useEffect, useCallback, useRef } from "react";
import GameWindow from "../components/ui/GameWindow";
import SettingsModal from "../components/ui/SettingsModal";
import RetroButton from "../components/ui/RetroButton";
import Fanfare from "../components/ui/Fanfare";
import { useSettings } from "../context/SettingsContext";

const OBJECT_TYPES = ["Apple", "Star", "Duck", "Cake", "Car"];

const NumberGame = () => {
  const [mode, setMode] = useState("count"); // count, bubble
  const [targetNumber, setTargetNumber] = useState(3);
  const [count, setCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [objects, setObjects] = useState([]);
  const [bubbles, setBubbles] = useState([]);
  const [nextBubble, setNextBubble] = useState(1);
  const { settings, toggleSetting } = useSettings();
  const fanfareRef = useRef(null);

  const speak = useCallback((text) => {
    if ("speechSynthesis" in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const initCountMode = useCallback(() => {
    const num = Math.floor(Math.random() * 5) + 1;
    const type = OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)];
    setTargetNumber(num);
    setCount(0);
    setObjects(
      Array.from({ length: num }, (_, i) => ({ id: i, type, tapped: false }))
    );
  }, []);

  const initBubbleMode = useCallback(() => {
    const sequence = [1, 2, 3, 4, 5];
    const shuffled = sequence.map((n) => ({
      val: n,
      x: Math.random() * 70 + 10,
      y: Math.random() * 60 + 10,
      popped: false,
    }));
    setBubbles(shuffled);
    setNextBubble(1);
  }, []);

  useEffect(() => {
    if (mode === "count") initCountMode();
    else initBubbleMode();
  }, [mode, initCountMode, initBubbleMode]);

  const handleObjectClick = (id) => {
    setObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === id && !obj.tapped) {
          const newCount = count + 1;
          setCount(newCount);
          speak(newCount.toString());
          if (newCount === targetNumber) {
            setTimeout(() => {
              speak(`Awesome! ${targetNumber}!`);
              if (fanfareRef.current) fanfareRef.current.trigger();
              setTimeout(initCountMode, 3000);
            }, 500);
          }
          return { ...obj, tapped: true };
        }
        return obj;
      })
    );
  };

  const handleBubbleClick = (val) => {
    if (val === nextBubble) {
      setBubbles((prev) =>
        prev.map((b) => (b.val === val ? { ...b, popped: true } : b))
      );
      speak(val.toString());
      if (val === 5) {
        speak("You did it!");
        if (fanfareRef.current) fanfareRef.current.trigger();
        setTimeout(initBubbleMode, 3000);
      } else {
        setNextBubble(val + 1);
      }
    } else {
      speak("Try to find number " + nextBubble);
    }
  };

  return (
    <GameWindow
      title="NUMBER NEBULA"
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

      <div className="flex justify-center gap-4 p-4 bg-retro-black/10">
        <RetroButton
          onClick={() => setMode("count")}
          color={mode === "count" ? "green" : "gray"}
          className="text-xs"
        >
          COUNT THE STUFF
        </RetroButton>
        <RetroButton
          onClick={() => setMode("bubble")}
          color={mode === "bubble" ? "green" : "gray"}
          className="text-xs"
        >
          BUBBLE POP
        </RetroButton>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
        {mode === "count" ? (
          <div className="flex flex-col items-center w-full max-w-2xl">
            <h2 className="text-4xl font-display text-retro-white mb-12 drop-shadow-retro">
              CAN YOU COUNT {targetNumber} {objects[0]?.type}S?
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {objects.map((obj) => (
                <div
                  key={obj.id}
                  onPointerDown={() => handleObjectClick(obj.id)}
                  className={`w-28 h-28 bg-retro-white border-4 border-retro-black shadow-retro rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
                    ${
                      obj.tapped
                        ? "opacity-40 grayscale scale-90"
                        : "hover:rotate-12 active:scale-110"
                    }
                  `}
                >
                  <span className="text-6xl" role="img" aria-label={obj.type}>
                    {obj.type === "Apple" && "🍎"}
                    {obj.type === "Star" && "⭐"}
                    {obj.type === "Duck" && "🦆"}
                    {obj.type === "Cake" && "🍰"}
                    {obj.type === "Car" && "🚗"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-6xl font-display text-retro-yellow">
              {count} / {targetNumber}
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative cursor-crosshair">
            <h2 className="absolute top-4 left-0 right-0 text-center text-3xl font-display text-retro-white drop-shadow-retro pointer-events-none">
              POP BUBBLE NUMBER {nextBubble}!
            </h2>
            {bubbles.map((b) => (
              <div
                key={b.val}
                onPointerDown={() => handleBubbleClick(b.val)}
                className={`absolute w-24 h-24 rounded-full border-4 border-retro-white/50 flex items-center justify-center transition-all duration-300
                  ${
                    b.popped
                      ? "scale-150 opacity-0 pointer-events-none"
                      : "bg-retro-blue/30 backdrop-blur-sm shadow-xl hover:scale-110 active:scale-95"
                  }
                `}
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
              >
                <span className="text-4xl font-display text-retro-white drop-shadow-md select-none">
                  {b.val}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </GameWindow>
  );
};

export default NumberGame;
