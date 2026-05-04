'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { flats } from '@/lib/flats';

const SPEED = 0.8; // px per frame (~48px/s at 60fps)

export default function FlatCarousel() {
  const locale = useLocale();
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
 const t=useTranslations('flat')
  const s = useRef({
    offset: 0,
    singleWidth: 0,
    isInView: true,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    didDrag: false,
    rafId: null,
  });

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    function wrap(v) {
      const w = s.current.singleWidth;
      if (!w) return v;
      if (v < 0) return v + w;
      if (v >= w) return v - w;
      return v;
    }

    function tick() {
      if (!s.current.singleWidth) {
        s.current.singleWidth = track.scrollWidth / 2;
      }
      if (!s.current.isDragging && s.current.isInView) {
        s.current.offset = wrap(s.current.offset + SPEED);
      }
      track.style.transform = `translateX(${-s.current.offset}px)`;
      s.current.rafId = requestAnimationFrame(tick);
    }

    s.current.rafId = requestAnimationFrame(tick);

    // Pause auto-scroll when section leaves viewport
    const observer = new IntersectionObserver(
      ([entry]) => { s.current.isInView = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(wrapper);

    // ── Mouse drag ──────────────────────────────────────────────────────────
    const onMouseDown = (e) => {
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.clientX;
      s.current.dragStartOffset = s.current.offset;
      track.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!s.current.isDragging) return;
      const delta = s.current.dragStartX - e.clientX;
      if (Math.abs(delta) > 4) s.current.didDrag = true;
      s.current.offset = wrap(s.current.dragStartOffset + delta);
    };

    const onMouseUp = () => {
      if (!s.current.isDragging) return;
      s.current.isDragging = false;
      track.style.cursor = 'grab';
    };

    // ── Touch drag ──────────────────────────────────────────────────────────
    const onTouchStart = (e) => {
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.touches[0].clientX;
      s.current.dragStartOffset = s.current.offset;
    };

    const onTouchMove = (e) => {
      if (!s.current.isDragging) return;
      const delta = s.current.dragStartX - e.touches[0].clientX;
      if (Math.abs(delta) > 4) {
        s.current.didDrag = true;
        e.preventDefault(); 
      }
      s.current.offset = wrap(s.current.dragStartOffset + delta);
    };

    const onTouchEnd = () => {
      s.current.isDragging = false;
    };

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(s.current.rafId);
      observer.disconnect();
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const doubled = [...flats, ...flats];

  return (
    <div className='py-10 bg-white'>
    <section ref={wrapperRef} className="bg-yellowish overflow-hidden py-12">
      <div
        ref={trackRef}
        className="flex"
        style={{
          width: 'max-content',
          gap: '24px',
          paddingLeft: '24px',
          cursor: 'grab',
          userSelect: 'none',
          willChange: 'transform',
        }}
      >
        {doubled.map((flat, i) => (
          <Link
            key={i}
            href={`/${locale}/flats/${flat.id}`}
            className="block flex-shrink-0 bg-white"
            style={{ width: '393px' }}
            draggable={false}
            onClick={(e) => {
              if (s.current.didDrag) {
                e.preventDefault();
                s.current.didDrag = false;
              }
            }}
          >
            <div className="relative bg-amber-500" style={{ height: '480px', width:'393px' }}>
              <Image
                src={flat.image}
                fill
                alt={flat.name}
                className="object-cover"
                
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-[26px] text-black">{t('flat')}</span>
                <span className="text-[16px] text-black">{flat.area} M²</span>
              </div>
              <p className="text-sm text-grey mb-1">{t('balcony')}: {flat.balcony} M²</p>
              <p className="text-sm text-grey mb-1">{t('livingSpace')}: {flat.living} M²</p>
              <p className="text-sm text-grey">{t('bedroom')}: {flat.bedroom}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </div>
  );
}
