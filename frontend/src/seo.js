import { useEffect } from 'react'

const SITE_NAME = 'Popular Personalities of Bangladesh'

export function useSeo({ title, description, image, canonicalPath }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description || 'Discover the most popular and influential personalities of Bangladesh — the heroes of the nation whose lives, achievements, and legacies shaped the country.'

    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.content = image
    }

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = `https://popularbangladeshi.vercel.app${canonicalPath}`
    }
  }, [title, description, image, canonicalPath])
}