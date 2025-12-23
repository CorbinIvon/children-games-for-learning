import React from "react";
import RetroButton from "./RetroButton";
import { X } from "lucide-react";

const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onToggle,
  onTestFanfare,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="window-retro bg-retro-gray max-w-md w-full relative">
        <div className="flex justify-between items-center mb-6 border-b-4 border-retro-black pb-2">
          <h2 className="text-2xl text-retro-black font-display">CONFIG</h2>
          <button
            onClick={onClose}
            className="hover:text-retro-red transition-none"
          >
            <X size={32} />
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-retro-white border-2 border-retro-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            >
              <span className="text-retro-black font-retro uppercase text-lg">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <RetroButton
                onClick={() => onToggle(key)}
                color={value ? "green" : "red"}
                className="w-24 py-1 text-xs"
              >
                {value ? "ON" : "OFF"}
              </RetroButton>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between gap-4">
          <RetroButton
            onClick={onTestFanfare}
            color="yellow"
            className="flex-1"
          >
            TEST CELEBRATION
          </RetroButton>
          <RetroButton onClick={onClose} color="blue" className="w-24">
            CLOSE
          </RetroButton>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
