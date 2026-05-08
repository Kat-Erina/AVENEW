"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { flats } from "@/lib/flats";
import Image from "next/image";

export default function FeaturedApartments() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const thumbElRef = useRef(null);
  const params = useParams();
  const locale = params?.locale || "ka";
  const t = useTranslations("flat");
const cardWidthRef = useRef(423);
const [trackPadding, setTrackPadding] = useState('0px');



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

 useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const progressBar = progressBarRef.current;
    const thumbEl = thumbElRef.current;
    if (!track || !wrapper || !progressBar || !thumbEl) return;

    let velocity = 0;
    let lastX = 0;
    let rafId = null;

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

    function momentum() {
      if (Math.abs(velocity) < 0.5) return;
      velocity *= 0.92; // friction — lower = stops faster, higher = glides longer
      applyOffset(s.current.offset + velocity);
      rafId = requestAnimationFrame(momentum);
    }

    updateCardWidth();
    updateThumb();

    setTimeout(() => {
  // updateCardWidth();
  updateThumb();
}, 100);

function updateCardWidth() {
  const firstCard = track.querySelector('a');
  if (firstCard) {
    const gap = wrapper.offsetWidth < 640 ? 0 : 30;
    cardWidthRef.current = firstCard.offsetWidth + gap;
    setTrackPadding(wrapper.offsetWidth < 640 ? '0px' : '24px');
  }
}
    const onWheel = (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
    cancelAnimationFrame(rafId);
    applyOffset(s.current.offset + e.deltaX);
  }
};

    const onTrackMouseDown = (e) => {
      cancelAnimationFrame(rafId);
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.clientX;
      s.current.dragStartOffset = s.current.offset;
      lastX = e.clientX;
      velocity = 0;
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
        velocity = lastX - e.clientX; // track velocity while dragging
        lastX = e.clientX;
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
      if (s.current.isDragging) {
        rafId = requestAnimationFrame(momentum); // release → glide
      }
      s.current.isDragging = false;
      s.current.isBarDragging = false;
      track.style.cursor = 'grab';
      progressBar.style.cursor = 'grab';
    };

    const onTrackTouchStart = (e) => {
      cancelAnimationFrame(rafId);
      s.current.isDragging = true;
      s.current.didDrag = false;
      s.current.dragStartX = e.touches[0].clientX;
      s.current.dragStartOffset = s.current.offset;
      lastX = e.touches[0].clientX;
      velocity = 0;
    };

    const onTrackTouchMove = (e) => {
      if (!s.current.isDragging) return;
      velocity = lastX - e.touches[0].clientX;
      lastX = e.touches[0].clientX;
      const delta = s.current.dragStartX - e.touches[0].clientX;
      if (Math.abs(delta) > 4) {
        s.current.didDrag = true;
        e.preventDefault();
      }
      applyOffset(s.current.dragStartOffset + delta);
    };
const onTrackTouchEnd = () => {
  s.current.isDragging = false;
  const cardWidth = cardWidthRef.current;

  if (Math.abs(velocity) > 1) {
    const currentIndex = Math.round(s.current.offset / cardWidth);
    const targetIndex = velocity > 0 ? currentIndex + 1 : currentIndex - 1;
    const clampedIndex = Math.max(0, Math.min(targetIndex, flats.length - 1));
    const snappedOffset = Math.max(0, Math.min(clampedIndex * cardWidth, s.current.maxOffset));

    const startOffset = s.current.offset;
    const distance = snappedOffset - startOffset;
    const duration = 300;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      applyOffset(startOffset + distance * ease);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    }

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  } else {
    snapToCard();
  }
};

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

function snapToCard() {
  const cardWidth = cardWidthRef.current;
  const index = Math.round(s.current.offset / cardWidth);
  const snappedOffset = Math.max(0, Math.min(index * cardWidth, s.current.maxOffset));

  const startOffset = s.current.offset;
  const distance = snappedOffset - startOffset;
  const duration = 300;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    applyOffset(startOffset + distance * ease);
    if (progress < 1) rafId = requestAnimationFrame(animate);
  }

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(animate);
}
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
    wrapper.addEventListener('wheel', onWheel, { passive: false }); 


    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener('wheel', onWheel); 
  track.removeEventListener('mousedown', onTrackMouseDown);
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
        wrapper.removeEventListener('wheel', onWheel); // ← add here

    };
  }, []);

  return (
    <section className="py-10 bg-white">
      <div ref={wrapperRef} className="bg-yellowish overflow-hidden pt-12 pb-10 flex flex-col justify-center gap-8">

        {/* ── Track ── */}
        <div
ref={trackRef}
  className="flex flex-row gap-0 sm:gap-[30px]"
  style={{
    width: 'max-content',
     paddingLeft: trackPadding,
    paddingRight: trackPadding,
    cursor: 'grab',
    userSelect: 'none',
    willChange: 'transform',
  }}
        >
          {flats.map((apartment, index) => (
            <Link
  key={apartment.id}
  // href={`/${locale}/flats/${apartment.id}`}
  href={'#'}
  className="flex flex-col bg-yellowish transition duration-300 hover:scale-[1.025] hover:-translate-y-[5px] w-[100vw] sm:w-[393px]"
  draggable={false}
  onClick={(e) => {
    if (s.current.didDrag) {
      e.preventDefault();
      s.current.didDrag = false;
    }
  }}
>
  {/* ── Image wrapper with yellowish padding ── */}
  <div className="px-4 sm:px-0 bg-yelowish">
    <div className="relative overflow-hidden group" style={{ height: '380px', width: '100%' }}>
  <div className="absolute inset-0 bg-white ">
    {/* <div className="relative w-full h-full overflow-hidden"> */}

        <img
    src={apartment.image}
    alt={apartment.name}
    className="w-full h-full  transition-transform duration-500 group-hover:scale-105 "
  />
    {/* </div> */}
  </div>
</div>
  </div>

  {/* ── Text ── */}
<div className="px-4 sm:px-0 bg-yellowish">
  <div className="p-4 bg-white">
    <div className="flex justify-between items-baseline mb-3">
      <p>
        <span className="primary-cl text-[26px] text-black uppercase">{t('flat')} </span>
        <span className="text-[26px] text-black uppercase">{apartment.number}</span>
      </p>
      <span className="text-[16px] text-black">{apartment.area} M²</span>
    </div>
    <p className="text-[16px] text-grey mb-1 font-normal uppercase">{t('balcony')}: {apartment.balcony} M²</p>
    <p className="font-normal text-[16px] text-grey mb-1 uppercase">{t('livingSpace')}: {apartment.living} M²</p>
    <p className="font-normal text-[16px] text-grey uppercase">{t('bedroom_one')}: {
       apartment.bedroom === 'studio' 
      ? t('studio')
      :`${apartment.bedroom} ${Number(apartment.bedroom) === 1 ? t('bedroom_one') : t('bedroom_other')}`
      }</p>
  </div>
</div>
</Link>
          ))}
          {/* <div style={{ width: '0', flexShrink: 0 }} /> */}

        </div>

        {/* ── Progress Bar ── */}
        <div className="flex justify-center pt-5 pb-2">
          <div
            ref={progressBarRef}
            style={{
              position: 'relative',
              width: '130px',
              height: '13px',
              cursor: 'grab',
              backgroundColor: 'white',
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
                cursor: 'grab',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}





