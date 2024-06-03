"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDarkMode, setDarkMode] = React.useState(resolvedTheme === "dark");

  React.useEffect(() => {
    setDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleDarkMode = (checked) => {
    setDarkMode(!checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={30} />
  );
}
