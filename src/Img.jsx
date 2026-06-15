import React, { useState } from 'react';

// Gambar dengan skeleton shimmer + lazy-load native + fade-in saat selesai.
// Bungkus <img> dengan <span.imgwrap> yang memegang skeleton; class 'is-loaded'
// dipasang setelah onLoad/onError. Untuk gambar LCP (hero) pakai eager.
export function Img({ src, alt, width, height, className = '', eager = false, onError, ...rest }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={'imgwrap' + (loaded ? ' is-loaded' : '') + (className ? ' ' + className : '')}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        onError={(e) => { setLoaded(true); onError && onError(e); }}
        {...rest}
      />
    </span>
  );
}
