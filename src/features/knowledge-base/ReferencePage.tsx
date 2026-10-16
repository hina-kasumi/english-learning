import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { topicPath } from '../../lib/content'
export default function LegacyReferenceRedirect() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const topic = params.get('topic')
  return (
    <Navigate
      replace
      to={
        topic && topic.startsWith(`${id}.`)
          ? topicPath(topic)
          : `/knowledge?category=${encodeURIComponent(id)}`
      }
    />
  )
}
