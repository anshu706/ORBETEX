import React from 'react';

/**
 * OrbetexLogo — SVG logo mark + wordmark
 *
 * Props:
 *  variant  : 'primary' | 'accent' | 'light' | 'surface'
 *  showText : boolean (default true)
 *  size     : number  (squircle side length in px, default 40)
 *  className: string
 */

const VARIANTS = {
  primary: {
    container: '#2E2E2E',
    ring:      '#F1ECE6',
    dot:       '#7D4047',
    wordmark:  '#2E2E2E',
    subtitle:  '#7D4047',
  },
  accent: {
    container: '#7D4047',
    ring:      '#F1ECE6',
    dot:       '#2E2E2E',
    wordmark:  '#7D4047',
    subtitle:  '#2E2E2E',
  },
  light: {
    container: '#F1ECE6',
    ring:      '#2E2E2E',
    dot:       '#7D4047',
    wordmark:  '#2E2E2E',
    subtitle:  '#7D4047',
  },
  surface: {
    container: '#DDD5CD',
    ring:      '#2E2E2E',
    dot:       '#7D4047',
    wordmark:  '#2E2E2E',
    subtitle:  '#7D4047',
  },
  footer: {
    container: '#F1ECE6',
    ring:      '#2E2E2E',
    dot:       '#7D4047',
    wordmark:  '#F1ECE6',
    subtitle:  '#DDD5CD',
  },
};

export default function OrbetexLogo({
  variant = 'primary',
  showText = true,
  size = 40,
  className = '',
  style = {},
}) {
  const c = VARIANTS[variant] || VARIANTS.primary;
  const r = size / 2;
  const cornerRadius = size * 0.28;

  // Orbital ring geometry
  const cx = r;
  const cy = r;
  const ringRx = r * 0.58;
  const ringRy = r * 0.27;
  const ringStroke = Math.max(1.5, size * 0.075);

  // Satellite dot on the orbit (transformed with the ring)
  const dotAngle = -Math.PI / 3.4;
  const dotR = Math.max(1.8, size * 0.095);
  const dotX = cx + ringRx * Math.cos(dotAngle);
  const dotY = cy + ringRy * Math.sin(dotAngle);

  return (
    <div
      className={`orbetex-logo ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3 + 'px', ...style }}
      aria-label="Orbetex Research Notes"
    >
      {/* ── Mark ── */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Squircle background */}
        <rect
          x="0" y="0"
          width={size} height={size}
          rx={cornerRadius}
          fill={c.container}
        />

        {/* Orbital ring & Satellite dot locked to trajectory */}
        <g transform={`rotate(-22 ${cx} ${cy})`}>
          <ellipse
            cx={cx} cy={cy}
            rx={ringRx} ry={ringRy}
            stroke={c.ring}
            strokeWidth={ringStroke}
            fill="none"
          />
          <circle
            cx={dotX}
            cy={dotY}
            r={dotR}
            fill={c.dot}
          />
        </g>
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontFamily: "var(--font-display, 'Gravitas One', Georgia, serif)",
              fontWeight: 400,
              fontSize: size * 0.54 + 'px',
              color: c.wordmark,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Orbetex
          </span>
          <span
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontWeight: 500,
              fontSize: size * 0.24 + 'px',
              color: c.subtitle,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Research Notes
          </span>
        </div>
      )}
    </div>
  );
}
