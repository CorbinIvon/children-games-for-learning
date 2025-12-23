import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import KeyboardGame from "./games/KeyboardGame";
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
            <Route
              path="/games/alphabet"
              element={
                <div className="text-white p-10">Alphabet Game Placeholder</div>
              }
            />
            <Route
              path="/games/numbers"
              element={
                <div className="text-white p-10">Numbers Game Placeholder</div>
              }
            />
            <Route
              path="/games/words"
              element={
                <div className="text-white p-10">Words Game Placeholder</div>
              }
            />
            <Route path="/games/keyboard" element={<KeyboardGame />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
