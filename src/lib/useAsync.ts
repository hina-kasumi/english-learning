import { useEffect, useState } from 'react'
export function useAsync<T>(loader: () => Promise<T>, key: string) {
  const [state, setState] = useState<{ key: string; data?: T; error?: string }>({ key })
  useEffect(() => {
    let active = true
    loader()
      .then((data) => {
        if (active) setState({ key, data })
      })
      .catch((error: unknown) => {
        if (active)
          setState({
            key,
            error: error instanceof Error ? error.message : 'Không tải được nội dung.',
          })
      })
    return () => {
      active = false
    }
    // The caller's stable content key controls requests, not the inline loader identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return state.key === key ? state : { key }
}
