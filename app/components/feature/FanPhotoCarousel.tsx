'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Rotation (deg) and visual offset per stack position (0 = front)
const STACK_STYLES: { rotation: number; scale: number; opacity: number }[] = [
  { rotation: 0, scale: 1, opacity: 1 },
  { rotation: 8, scale: 0.97, opacity: 0.75 },
  { rotation: 14, scale: 0.94, opacity: 0.55 },
  { rotation: 18, scale: 0.91, opacity: 0.4 },
];

interface FanPhotoCarouselProps {
  photos: string[];
  name: string;
}

export default function FanPhotoCarousel({ photos, name }: FanPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  if (!photos.length) return null;

  return (
    <div className="shrink-0">
      <div className="relative w-72 h-80 md:w-80 md:h-96">
        {photos.map((url, i) => {
          // How many steps behind the active card is this card?
          const position = (i - activeIndex + photos.length) % photos.length;
          const style = STACK_STYLES[Math.min(position, STACK_STYLES.length - 1)];

          return (
            <div
              key={i}
              className="absolute inset-0 rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xl transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom will-change-[transform,opacity]"
              style={{
                transform: `rotate(${style.rotation}deg) scale(${style.scale})`,
                zIndex: photos.length - position,
                opacity: style.opacity,
              }}
            >
              <Image src={url} alt={`Photo of ${name}`} fill sizes="(max-width: 768px) 288px, 320px" className="object-cover" priority={position === 0} />
            </div>
          );
        })}
      </div>
      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {photos.map((_, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} aria-label={`Foto ${i + 1}`} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-amber-500 w-4' : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-amber-400'}`} />
          ))}
        </div>
      )}
    </div>
  );
}
