import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  dayKey,
  emptyProgress,
  parseProgress,
  STORAGE_KEY,
} from "../lib/progress";
import type { Bookmark, Progress } from "../types";
type Update = (fn: (old: Progress) => Progress) => void;
interface Store {
  progress: Progress;
  storageError: string;
  update: Update;
  visit: (id: string) => void;
  saveScroll: (id: string, y: number) => void;
  toggleComplete: (id: string) => void;
  setNote: (id: string, note: string) => void;
  toggleBookmark: (bookmark: Omit<Bookmark, "createdAt">) => void;
  importData: (data: unknown) => void;
}
const Context = createContext<Store | null>(null);
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return {
        data: raw ? parseProgress(JSON.parse(raw)) : emptyProgress(),
        error: "",
      };
    } catch {
      return {
        data: emptyProgress(),
        error:
          "Không thể đọc dữ liệu đã lưu. Hãy xuất một bản sao trước khi thay đổi dữ liệu.",
      };
    }
  });
  const [progress, setProgress] = useState(initial.data);
  const [storageError, setStorageError] = useState(initial.error);
  const current = useRef(progress);
  const update = useCallback<Update>((fn) => {
    const next = fn(current.current);
    current.current = next;
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError(
        "Trình duyệt chưa lưu được thay đổi. Hãy xuất bản sao JSON trong Cài đặt để giữ dữ liệu.",
      );
    }
  }, []);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const next = parseProgress(JSON.parse(e.newValue));
          current.current = next;
          setProgress(next);
        } catch {
          setStorageError("Dữ liệu từ cửa sổ khác không hợp lệ.");
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const visit = useCallback(
    (id: string) =>
      update((old) => ({
        ...old,
        activity: [...new Set([...old.activity, dayKey()])],
        lessons: {
          ...old.lessons,
          [id]: {
            ...old.lessons[id],
            status: old.lessons[id]?.status ?? "in-progress",
            scrollY: old.lessons[id]?.scrollY ?? 0,
            lastViewed: new Date().toISOString(),
          },
        },
      })),
    [update],
  );
  const saveScroll = useCallback(
    (id: string, y: number) =>
      update((old) =>
        old.lessons[id]
          ? {
              ...old,
              lessons: {
                ...old.lessons,
                [id]: { ...old.lessons[id], scrollY: Math.max(0, y) },
              },
            }
          : old,
      ),
    [update],
  );
  const toggleComplete = useCallback(
    (id: string) =>
      update((old) => {
        const previous = old.lessons[id];
        const completed = previous?.status !== "completed";
        return {
          ...old,
          activity: [...new Set([...old.activity, dayKey()])],
          lessons: {
            ...old.lessons,
            [id]: {
              scrollY: previous?.scrollY ?? 0,
              lastViewed: new Date().toISOString(),
              status: completed ? "completed" : "in-progress",
              ...(completed ? { completedAt: new Date().toISOString() } : {}),
            },
          },
        };
      }),
    [update],
  );
  const setNote = useCallback(
    (id: string, note: string) =>
      update((old) => ({ ...old, notes: { ...old.notes, [id]: note } })),
    [update],
  );
  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, "createdAt">) =>
      update((old) => {
        const same = (b: Bookmark) =>
          b.lessonId === bookmark.lessonId &&
          b.headingId === bookmark.headingId;
        return {
          ...old,
          bookmarks: old.bookmarks.some(same)
            ? old.bookmarks.filter((b) => !same(b))
            : [
                ...old.bookmarks,
                { ...bookmark, createdAt: new Date().toISOString() },
              ],
        };
      }),
    [update],
  );
  const importData = useCallback(
    (data: unknown) => {
      const next = parseProgress(data);
      update(() => next);
    },
    [update],
  );
  const value = useMemo(
    () => ({
      progress,
      storageError,
      update,
      visit,
      saveScroll,
      toggleComplete,
      setNote,
      toggleBookmark,
      importData,
    }),
    [
      progress,
      storageError,
      update,
      visit,
      saveScroll,
      toggleComplete,
      setNote,
      toggleBookmark,
      importData,
    ],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useProgress() {
  const store = useContext(Context);
  if (!store) throw new Error("ProgressProvider is required");
  return store;
}
