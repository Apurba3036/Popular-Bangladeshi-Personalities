import { useState } from 'react'

export default function LazyImage({ src, alt = '', className = '', style, lazy = true, ...rest }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`lazy-img ${loaded ? 'loaded' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    />
  )
}