import React from "react";
import { useTheme } from "../hooks/useTheme";

// *styles
import "./ThemSelector.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

export default function ThemeSelector() {
  const { changeColor } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            className=""
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
