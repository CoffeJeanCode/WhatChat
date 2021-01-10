import { useLayoutEffect } from 'react'

export const useTitle = (title) => {
  useLayoutEffect(() => {
    document.title = title
  }, [])
  return { title }
}
