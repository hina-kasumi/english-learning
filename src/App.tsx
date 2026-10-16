import { Component, Suspense, lazy, type ErrorInfo, type ReactNode } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import Layout, { Loading } from './app/Layout'
import { modules } from './modules/registry'
const Dashboard = lazy(() => import('./features/progress/Dashboard'))
const Roadmap = lazy(() => import('./features/roadmap/Roadmap'))
const PracticeLibrary = lazy(() =>
  import('./features/grammar/PracticePage').then((m) => ({ default: m.PracticeLibrary })),
)
const Reference = lazy(() => import('./features/knowledge-base/ReferencePage'))
const Knowledge = lazy(() => import('./features/knowledge-base/KnowledgePage'))
const Cheatsheet = lazy(() =>
  import('./features/knowledge-base/KnowledgePage').then((m) => ({ default: m.CheatsheetPage })),
)
const Review = lazy(() => import('./features/progress/ReviewPage'))
const Settings = lazy(() => import('./features/settings/SettingsPage'))
class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Không thể hiển thị trang', error, info.componentStack)
  }
  render() {
    return this.state.error ? (
      <div className="empty-state" role="alert">
        <h1>Trang học gặp một chút trục trặc.</h1>
        <p>Hãy tải lại trang. Tiến độ đã lưu vẫn nằm trên thiết bị.</p>
        <button className="button" onClick={() => location.reload()}>
          Tải lại
        </button>
      </div>
    ) : (
      this.props.children
    )
  }
}
export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="practice" element={<PracticeLibrary />} />
              {modules.flatMap((module) =>
                module.routes.map(({ path, component: Screen }) => (
                  <Route key={`${module.id}:${path}`} path={path} element={<Screen />} />
                )),
              )}
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="knowledge/reference/:id" element={<Reference />} />
              <Route path="knowledge/:id" element={<Cheatsheet />} />
              <Route path="review" element={<Review />} />
              <Route path="mistakes" element={<Review mistakes />} />
              <Route path="settings" element={<Settings />} />
              <Route
                path="*"
                element={
                  <div className="empty-state">
                    <h1>Trang này chưa có trong lộ trình.</h1>
                    <Link className="button" to="/">
                      Về góc học tập
                    </Link>
                  </div>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ErrorBoundary>
  )
}
