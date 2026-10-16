import { useEffect, useRef } from 'react';

/**
 * React wrapper around Owl Carousel (jQuery plugin loaded in index.html).
 * Children must be static (they are cloned/moved by Owl).
 * Content comes from the admin panel, so give the carousel a `key` that changes when its items change
 * (use `useListKey(items)`) - that re-creates the carousel cleanly.
 */
export default function OwlCarousel({ className = '', options = {}, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const $ = window.jQuery;
    if (!$ || !$.fn.owlCarousel || !ref.current) return undefined;

    const $el = $(ref.current);
    $el.owlCarousel(options);

    // autoHeight carousels: re-measure once images have loaded
    const imgs = options.autoHeight ? Array.from(ref.current.querySelectorAll('img')) : [];
    const refresh = () => $el.trigger('refresh.owl.carousel');
    imgs.forEach((i) => i.addEventListener('load', refresh));

    return () => {
      imgs.forEach((i) => i.removeEventListener('load', refresh));
      try {
        $el.trigger('destroy.owl.carousel');
      } catch {
        /* element already removed */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={`owl-carousel owl-theme ${className}`.trim()}>
      {children}
    </div>
  );
}

/** Stable key that changes whenever the list content changes. */
export function useListKey(items) {
  const s = JSON.stringify(items || []);
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
  return `${(items || []).length}-${h}`;
}
