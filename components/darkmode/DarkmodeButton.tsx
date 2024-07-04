"use client";
import React from "react";
import { useTheme } from "next-themes";
type Props = {};

const DarkmodeButton = (props: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="fixed right-3 top-3 rounded-full bg-white px-3 py-1 font-medium shadow-xl dark:text-blue-500"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme}
    </button>
  );
};

export default DarkmodeButton;
