import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProgress } from "../store/ProgressContext";
export function useReadingPosition(
  id: string | undefined,
  isLesson: boolean,
  section: string | null,
) {
  const { progress, visit, saveScroll } = useProgress();
  const saved = useRef(progress.lessons);
  saved.current = progress.lessons;
  const location = useLocation();
  useEffect(() => {
    if (!id) return;
    const initialY = saved.current[id]?.scrollY ?? 0;
    if (isLesson) visit(id);
    let ready = false;
    let latestY = initialY;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      if (section)
        document.getElementById(section)?.scrollIntoView({ block: "start" });
      else window.scrollTo(0, isLesson ? initialY : 0);
      latestY = window.scrollY;
      ready = true;
    });
    const flush = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
      if (isLesson && ready) saveScroll(id, latestY);
    };
    const onScroll = () => {
      if (!ready) return;
      latestY = window.scrollY;
      if (!timer) timer = setTimeout(flush, 400);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
      flush();
    };
  }, [id, isLesson, section, location.key, visit, saveScroll]);
}
