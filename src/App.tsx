import { HashRouter, Route, Routes } from "react-router-dom";
import { ContentProvider } from "./lib/ContentContext";
import { Lesson } from "./pages/Lesson";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Roadmap } from "./pages/Roadmap";
import { Bookmarks } from "./pages/Bookmarks";
import { Settings } from "./pages/Settings";
import { ProgressProvider } from "./store/ProgressContext";
export default function App() {
  return (
    <HashRouter>
      <ContentProvider>
        <ProgressProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/lesson/:chapter/:slug" element={<Lesson />} />
              <Route path="/guide" element={<Lesson document="guide" />} />
              <Route
                path="/editorial-log"
                element={<Lesson document="editorialLog" />}
              />
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </ProgressProvider>
      </ContentProvider>
    </HashRouter>
  );
}
