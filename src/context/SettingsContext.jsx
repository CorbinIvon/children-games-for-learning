import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const DEFAULT_SETTINGS = {
  readLetter: true,
  readWord: true,
  showImage: true,
  randomColors: true,
  backgroundEffects: true,
  fullscreen: false,
  qwerty: true,
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("kiddo-quest-settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("kiddo-quest-settings", JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider
      value={{ settings, toggleSetting, updateSetting }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
