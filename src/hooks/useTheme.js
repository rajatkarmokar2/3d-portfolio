import { useEffect, useState } from "react";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDarkMode(defaultDarkMode);
    document.documentElement.classList.toggle("dark", defaultDarkMode);
  }, []);

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
