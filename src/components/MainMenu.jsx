import React from "react";
import { useNavigate } from "react-router-dom";
import RetroButton from "./ui/RetroButton";
import { Settings, X } from "lucide-react";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-retro-blue pattern-dots">
      <div className="window-retro flex flex-col items-center gap-6 p-12 max-w-md w-full">
        <h1 className="text-4xl font-display text-retro-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          KIDDO QUEST
        </h1>

        <div className="flex flex-col w-full gap-4">
          <RetroButton
            onClick={() => navigate("/games/alphabet")}
            color="green"
            className="w-full text-xl py-4"
          >
            A B C (Alphabet)
          </RetroButton>
          <RetroButton
            onClick={() => navigate("/games/numbers")}
            color="cyan"
            className="w-full text-xl py-4"
          >
            1 2 3 (Numbers)
          </RetroButton>
          <RetroButton
            onClick={() => navigate("/games/words")}
            color="magenta"
            className="w-full text-xl py-4"
          >
            Words
          </RetroButton>
          <RetroButton
            onClick={() => navigate("/games/keyboard")}
            color="yellow"
            className="w-full text-xl py-4 text-retro-black"
          >
            Keyboard Explore
          </RetroButton>
        </div>

        <div className="flex gap-4 w-full mt-4">
          <RetroButton
            onClick={() => console.log("Settings")}
            color="gray"
            className="flex-1 flex justify-center"
          >
            <Settings size={24} />
          </RetroButton>
          <RetroButton
            onClick={() => window.close()}
            color="red"
            className="flex-1 flex justify-center"
          >
            Exit
          </RetroButton>
        </div>
      </div>

      <div className="mt-8 text-retro-white text-sm font-retro">
        v1.0 - PRESS START TO PLAY
      </div>
    </div>
  );
};

export default MainMenu;
