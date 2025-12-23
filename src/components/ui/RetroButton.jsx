import React from "react";

const RetroButton = ({ children, onClick, color = "gray", className = "" }) => {
  // Map simple color names to our retro palette if needed, or rely on passing specific classes.
  // For now, we'll assume the user passes a valid retro color name for the background.
  // Defaults to the defined .btn-retro style which is gray.

  // Dynamic background class based on color prop
  const bgClass = color === "gray" ? "bg-retro-gray" : `bg-retro-${color}`;
  const textClass = ["black", "blue", "red", "magenta", "brown"].includes(color)
    ? "text-retro-white"
    : "text-retro-black";

  return (
    <button
      onClick={onClick}
      className={`btn-retro ${bgClass} ${textClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default RetroButton;
