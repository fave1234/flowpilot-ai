import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll on navigation; in-page anchors keep their native behaviour. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
