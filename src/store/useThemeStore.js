import { create } from "zustand";

const useThemeStore = create((set) => {
  // Get stored theme from localStorage
  const storedTheme = localStorage.getItem("theme");

  return {
    theme: storedTheme ? storedTheme : "light",

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme); // Save theme in localStorage
        return { theme: newTheme };
      }),

    getTheme: () => useThemeStore.getState().theme,
  };
});

export default useThemeStore;
