import { useEffect } from 'react'

// Resize local images through Netlify Image CDN
export const img = (src, width) => `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}`

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | North of Normal` : 'North of Normal'
  }, [title])
}
