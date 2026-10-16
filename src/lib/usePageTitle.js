import { useEffect } from 'react';

/** Sets the browser tab title for an inner page: "Page name | K.M.S Inter College" */
export default function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = `${title} | K.M.S Inter College`;
  }, [title]);
}
