import { useEffect, useRef } from 'react'

type Props = {
  'aria-label': string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
}

export default function SearchInput({ value, onValueChange, ...props }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const composing = useRef(false)

  useEffect(() => {
    // Sync URL navigation without rewriting the browser's in-progress IME text.
    if (input.current && !composing.current && input.current.value !== value) {
      input.current.value = value
    }
  }, [value])

  return (
    <input
      {...props}
      ref={input}
      defaultValue={value}
      onCompositionStart={() => {
        composing.current = true
      }}
      onCompositionEnd={(event) => {
        composing.current = false
        if (event.currentTarget.value !== value) onValueChange(event.currentTarget.value)
      }}
      onChange={(event) => {
        if (composing.current || (event.nativeEvent as InputEvent).isComposing) return
        if (event.currentTarget.value !== value) onValueChange(event.currentTarget.value)
      }}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' &&
          (composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
        ) {
          event.preventDefault()
        }
      }}
    />
  )
}
