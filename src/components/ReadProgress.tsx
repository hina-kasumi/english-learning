import { useEffect, useState } from 'react'
export default function ReadProgress({ lessonId }: { lessonId: string }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const article = document.querySelector('.lesson-article .prose')
      if (!article) return
      const rect = article.getBoundingClientRect()
      const available = Math.max(1, rect.height - window.innerHeight)
      setProgress(Math.round(Math.max(0, Math.min(100, (-rect.top / available) * 100))))
    }
    const frame = requestAnimationFrame(update)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [lessonId])
  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label="Tiến độ đọc bài"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}
