import { useEffect, useState } from "react";

export function useBrowserColorScheme() {
  const [browserColorScheme, setBrowserColorScheme] = useState("light");
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setBrowserColorScheme("dark");
    }
  }, []);
  return { browserColorScheme };
}
