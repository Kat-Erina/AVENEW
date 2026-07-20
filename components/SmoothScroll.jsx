'use client';

import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(() =>
    typeof window === 'undefined'
      ? false
      : !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setEnabled(!e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Next's App Router doesn't reliably reset scroll to top on shallow
  // navigations that keep this layout mounted (e.g. the locale switcher's
  // router.push + router.refresh) — force it so every route change lands at top.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  if (!enabled) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.1,
        easing: easeOutExpo,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
};

export default SmoothScroll;
