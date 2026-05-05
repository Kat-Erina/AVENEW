'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { flats } from '@/lib/flats';

export default function FlatCarousel() {
  const locale = useLocale();
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const thumbElRef = useRef(null);
  const t = useTranslations('flat');

  const s = useRef({
    offset: 0,
    maxOffset: 0,
    thumbWidth: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    didDrag: false,
    isBarDragging: false,
    barDragStartX: 0,
    barDragStartOffset: 0,
  });

  const [loadedCount, setLoadedCount] = useState(0);


  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const progressBar = progressBarRef.current;
    const thumbEl = thumbElRef.current;
    if (!track || !wrapper || !progressBar || !thumbEl) return;

    function updateThumb() {
      const trackWidth = track.scrollWidth;
      const viewWidth = wrapper.offsetWidth;
      const barWidth = progressBar.offsetWidth;
      const maxOffset = Math.max(0, trackWidth - viewWidth);
      s.current.maxOffset = maxOffset;

      const thumbWidth = Math.max(24, (viewWidth / trackWidth) * barWidth);
      s.current.thumbWidth = thumbWidth;
      const thumbLeft = maxOffset > 0
        ? (s.current.offset / maxOffset) * (barWidth - thumbWidth)
        : 0;

      thumbEl.style.width = `${thumbWidth}px`;
      thumbEl.style.left = `${thumbLeft}px`;
    }

    function applyOffset(newOffset) {
      s.current.offset = Math.max(0, Math.min(newOffset, s.current.maxOffset));
      track.style.transform = `translateX(${-s.current.offset}px)`;
      updateThumb();
    }

    updateThumb();

    // ── Track mouse drag ─────────────────────────────────────────────────────
    const onTrackMouseDown = (e) => {
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.clientX;
      s.current.dragStartOffset = s.current.offset;
      track.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onBarMouseDown = (e) => {
      s.current.isBarDragging = true;
      s.current.barDragStartX = e.clientX;
      s.current.barDragStartOffset = s.current.offset;
      progressBar.style.cursor = 'grabbing';
      e.preventDefault();
      e.stopPropagation();
    };

    const onMouseMove = (e) => {
      if (s.current.isDragging) {
        const delta = s.current.dragStartX - e.clientX;
        if (Math.abs(delta) > 4) s.current.didDrag = true;
        applyOffset(s.current.dragStartOffset + delta);
      } else if (s.current.isBarDragging) {
        const barWidth = progressBar.offsetWidth;
        const maxTravel = barWidth - s.current.thumbWidth;
        const ratio = maxTravel > 0 ? (e.clientX - s.current.barDragStartX) / maxTravel : 0;
        applyOffset(s.current.barDragStartOffset + ratio * s.current.maxOffset);
      }
    };

    const onMouseUp = () => {
      s.current.isDragging = false;
      s.current.isBarDragging = false;
      track.style.cursor = 'grab';
      progressBar.style.cursor = 'grab';
    };

    // ── Track touch drag ─────────────────────────────────────────────────────
    const onTrackTouchStart = (e) => {
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.touches[0].clientX;
      s.current.dragStartOffset = s.current.offset;
    };

    const onTrackTouchMove = (e) => {
      if (!s.current.isDragging) return;
      const delta = s.current.dragStartX - e.touches[0].clientX;
      if (Math.abs(delta) > 4) {
        s.current.didDrag = true;
        e.preventDefault();
      }
      applyOffset(s.current.dragStartOffset + delta);
    };

    const onTrackTouchEnd = () => { s.current.isDragging = false; };

    // ── Progress bar touch drag ──────────────────────────────────────────────
    const onBarTouchStart = (e) => {
      s.current.isBarDragging = true;
      s.current.barDragStartX = e.touches[0].clientX;
      s.current.barDragStartOffset = s.current.offset;
      e.stopPropagation();
    };

    const onBarTouchMove = (e) => {
      if (!s.current.isBarDragging) return;
      const barWidth = progressBar.offsetWidth;
      const maxTravel = barWidth - s.current.thumbWidth;
      const ratio = maxTravel > 0 ? (e.touches[0].clientX - s.current.barDragStartX) / maxTravel : 0;
      applyOffset(s.current.barDragStartOffset + ratio * s.current.maxOffset);
      e.preventDefault();
    };

    const onBarTouchEnd = () => { s.current.isBarDragging = false; };

    track.addEventListener('mousedown', onTrackMouseDown);
    progressBar.addEventListener('mousedown', onBarMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    track.addEventListener('touchstart', onTrackTouchStart, { passive: true });
    window.addEventListener('touchmove', onTrackTouchMove, { passive: false });
    window.addEventListener('touchend', onTrackTouchEnd);
    progressBar.addEventListener('touchstart', onBarTouchStart, { passive: true });
    progressBar.addEventListener('touchmove', onBarTouchMove, { passive: false });
    progressBar.addEventListener('touchend', onBarTouchEnd);
    window.addEventListener('resize', updateThumb);

    return () => {
      track.removeEventListener('mousedown', onTrackMouseDown);
      progressBar.removeEventListener('mousedown', onBarMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('touchstart', onTrackTouchStart);
      window.removeEventListener('touchmove', onTrackTouchMove);
      window.removeEventListener('touchend', onTrackTouchEnd);
      progressBar.removeEventListener('touchstart', onBarTouchStart);
      progressBar.removeEventListener('touchmove', onBarTouchMove);
      progressBar.removeEventListener('touchend', onBarTouchEnd);
      window.removeEventListener('resize', updateThumb);
    };
  }, []);

  return (
    <div className="py-10 bg-white">
      <section ref={wrapperRef} className="bg-yellowish overflow-hidden pt-12 pb-10 flex flex-col justify-center gap-8 ">
        <div
          ref={trackRef}
          className="flex"
          style={{
            width: 'max-content',
            gap: '30px',
            paddingLeft: '24px',
            cursor: 'grab',
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          {flats.map((flat, i) => (
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
              <div className="hover:cursor-pointer relative bg-amber-500" style={{ height: '380px', width: '393px' }}>
                <Image
                  src={flat.image}
                  fill
                  alt={flat.name}
                  className="object-cover"
                   onLoad={() => setLoadedCount(c => c + 1)}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[26px] text-black">{t('flat')}</span>
                  <span className="text-[16px] text-black">{flat.area} M²</span>
                </div>
                <p className="text-sm text-grey mb-1 font-normal font-helvetica-geo uppercase">{t('balcony')}: {flat.balcony} M²</p>
                <p className="font-normal font-helvetica-geo text-sm text-grey mb-1">{t('livingSpace')}: {flat.living} M²</p>
                <p className="font-normal font-helvetica-geo text-sm text-grey">{t('bedroom')}: {flat.bedroom}</p>
              </div>
            </Link>
          ))}
          <div style={{ minWidth: '0px', height: '0px', flexShrink: 0, backgroundColor:'red' }} />

        </div>
             <div className="flex justify-center flex-1 pt-5 pb-2">
        <div
          ref={progressBarRef}
          style={{
            position: 'relative',
            width: '130px',
            height: '13px',
            borderRadius: '3px',
            cursor: 'grab',
            backgroundColor:'white'
          }}
        >
          <div
            ref={thumbElRef}
            style={{
              position: 'absolute',
              top: 0,
              left: '0px',
              width: '0px',
              height: '100%',
              backgroundColor: '#776F40',
              borderRadius: '3px',
              cursor: 'grab',
            }}
          />
        </div>
      </div>
      </section>

      {/* Scrubber */}
 
    </div>
  );
}
