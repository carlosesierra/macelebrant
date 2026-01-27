'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
  durationMs?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  showPen?: boolean;
};

export default function AnimatedLogo({
  durationMs = 5000,
  strokeWidth = 2,
  color = '#c6999b',
  className,
  showPen = true,
}: Props) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const penRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();

    // Fully hide at start (prevents ghost/dots)
    path.style.strokeDasharray = `${len} ${len}`;
    path.style.strokeDashoffset = `${-len}`;

    // Force layout so transition applies
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    path.getBoundingClientRect();

    // Animate draw
    path.style.transition = `stroke-dashoffset ${durationMs}ms ease-in-out`;
    path.style.strokeDashoffset = '0';

    // Optional pen tip following the path
    if (!showPen) return;

    const pen = penRef.current;
    if (!pen) return;

    pen.style.opacity = '1';

    const start = performance.now();
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const e = easeInOut(t);

      // Move pen along the path as it draws
      const pos = len * (1 - e);
      const pt = path.getPointAtLength(pos);

      pen.setAttribute('cx', String(pt.x));
      pen.setAttribute('cy', String(pt.y));

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, showPen]);

  /**
   * If it draws from the WRONG end (starts right instead of left):
   * - Change the initial dashoffset from `len` to `-len`
   * - And change pen position from `len * e` to `len * (1 - e)`
   */
  return (
    <svg
      id="Group_2"
      xmlns="http://www.w3.org/2000/svg"
      width="327.429"
      height="117.562"
      viewBox="0 0 327.429 117.562"
      className={className}
      role="img"
      aria-label="Animated line"
    >
      <defs>
        <clipPath id="clip-path">
          <rect width="327.429" height="117.562" fill="none" />
        </clipPath>
      </defs>

      <g clipPath="url(#clip-path)">
        <path
          ref={pathRef}
          d="M327.185,96.44c-10.88-2.743-15.183-3.018-26.676-2-15.879,1.413-30.428,12.886-48.967,13.966-12.845.749-39.905-4.572-55.617-22.28-2.988-3.367-11.874-13.863-11.972-28.082a18.191,18.191,0,0,1,5.238-12.155,15.234,15.234,0,0,1,20.285-1.5c6.29,4.868,9.56,13.171,9.394,13.652,0,0,9.81-20.884,23.777-14.317,12.894,6.064,11.722,21.865,2.494,35.083-6.624,9.488-23.527,18.373-40.154,24.359-19.917,7.17-52.542,13.218-75.321-.333-8.1-4.815-37.358-24-43.842-52.926-3.249-14.494,1.748-33.909,16.74-39.271,6.567-2.348,16.006-3.06,22.945.749,15.3,8.4,14.77,22.488,14.881,22.529,0,0,10.475-33.088,32.839-32.921,15.141.112,20.646,11.606,23.028,16.544,5.737,11.888,4.185,37.645-15.213,64.762-2.988,4.176-26.879,34.617-59.026,34.252-29.264-.333-52.542-19.87-77.732-20.7-13.459-.444-25.107,5.986-44.1,9.561"
          fill="none"
          stroke={color}
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {showPen && (
          <circle
            ref={penRef}
            r={strokeWidth * 1.2}
            cx="0"
            cy="0"
            fill={color}
            opacity={0}
          />
        )}
      </g>
    </svg>
  );
}