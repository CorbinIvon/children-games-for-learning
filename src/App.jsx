import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import KeyboardGame from "./games/KeyboardGame";
import AlphabetGame from "./games/AlphabetGame";
import NumberGame from "./games/NumberGame";
import WordGame from "./games/WordGame";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen font-retro">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/games/alphabet" element={<AlphabetGame />} />
            <Route path="/games/numbers" element={<NumberGame />} />
            <Route path="/games/words" element={<WordGame />} />
            <Route path="/games/keyboard" element={<KeyboardGame />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
