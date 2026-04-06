import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export function useD3(renderFn, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      // Clear previous content
      d3.select(ref.current).selectAll('*').remove()
      renderFn(d3.select(ref.current), ref.current)
    }

    const handleResize = () => {
      if (ref.current) {
        d3.select(ref.current).selectAll('*').remove()
        renderFn(d3.select(ref.current), ref.current)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, deps)

  return ref
}
