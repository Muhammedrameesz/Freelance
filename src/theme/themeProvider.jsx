import React, { useEffect } from "react";
import useThemeStore from "../store/useThemeStore";

export default function ThemeProvider({ children }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {children}
    </div>
  );
}
