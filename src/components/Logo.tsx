'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

// Logo aspect ratio: 1280 / 719 ≈ 1.78
const LOGO_ASPECT_RATIO = 1280 / 719;

export default function Logo({ className = '', priority = false }: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateDimensions = () => {
      const parent = container.parentElement;
      if (!parent) {
        return;
      }

      // Get 95% of the appbar height
      const parentHeight = parent.clientHeight;
      const desiredHeight = parentHeight * 0.95;
      
      // Calculate width based on aspect ratio
      const calculatedWidth = desiredHeight * LOGO_ASPECT_RATIO;

      setDimensions({
        height: desiredHeight,
        width: calculatedWidth,
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    if (container.parentElement) {
      observer.observe(container.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`.trim()}
      style={{
        height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
        width: dimensions.width > 0 ? `${dimensions.width}px` : 'auto',
        minHeight: '32px',
        minWidth: '120px',
      }}
    >
      <Image
        src="/logo.png"
        alt="DeepDevs Logo"
        fill
        sizes="(min-width: 1280px) 280px, (min-width: 1024px) 260px, (min-width: 768px) 240px, (min-width: 640px) 210px, 170px"
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}

