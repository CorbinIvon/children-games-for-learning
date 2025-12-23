import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";

function App() {
  return (
    <Router>
      <div className="min-h-screen font-retro selection:bg-retro-magenta selection:text-white">
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
          <Route
            path="/games/keyboard"
            element={
              <div className="text-white p-10">Keyboard Game Placeholder</div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
