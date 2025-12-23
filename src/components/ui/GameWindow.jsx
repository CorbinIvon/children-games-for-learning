import React from "react";
import { ArrowLeft, Settings } from "lucide-react";
import RetroButton from "./RetroButton";
import { useNavigate } from "react-router-dom";

const GameWindow = ({ title, children, onSettingsClick }) => {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] bg-retro-blue pattern-dots p-2 md:p-4 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <RetroButton
          onClick={() => navigate("/")}
          color="red"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Exit
        </RetroButton>

        <div className="window-retro bg-retro-white text-retro-black py-2 px-8 text-xl font-bold shadow-retro">
          {title}
        </div>

        <RetroButton onClick={onSettingsClick} color="gray">
          <Settings size={20} />
        </RetroButton>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 window-retro bg-retro-darkgray relative overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default GameWindow;
