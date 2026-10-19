import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loadContent } from "./content";
import type { Content } from "../types";
const Context = createContext<Content | null>(null);
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    loadContent()
      .then(setContent)
      .catch(() => setError(true));
  }, []);
  if (error)
    return (
      <div className="loading">
        <h1>Chưa thể tải kho kiến thức</h1>
        <p>Hãy kiểm tra kết nối và tải lại trang.</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  if (!content)
    return (
      <div className="loading" role="status">
        Đang mở kho kiến thức…
      </div>
    );
  return <Context.Provider value={content}>{children}</Context.Provider>;
}
export function useContent() {
  const content = useContext(Context);
  if (!content) throw new Error("ContentProvider is required");
  return content;
}
