import { useEffect, useState } from "react";
import { useProgress } from "../store/ProgressContext";
export function useTheme() {
  const { progress, update } = useProgress();
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const dark =
    progress.theme === "dark" || (progress.theme === "system" && systemDark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);
  const cycleTheme = () =>
    update((old) => ({
      ...old,
      theme:
        old.theme === "system"
          ? "light"
          : old.theme === "light"
            ? "dark"
            : "system",
    }));
  return { dark, theme: progress.theme, cycleTheme };
}
