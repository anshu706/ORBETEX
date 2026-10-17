import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>404 — Research Vector Not Found | Orbetex</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="container" style={{ textAlign: 'center', padding: '100px var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '5rem',
          color: 'var(--accent)',
          display: 'block',
          lineHeight: 1
        }}>
          404
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', margin: 'var(--space-4) 0 var(--space-2)' }}>
          Research Vector Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto var(--space-6)' }}>
          The requested coordinate does not exist in the Orbetex archival index.
          It may have been relocated or integrated into a consolidated manuscript.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--bg)',
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 'var(--text-sm)'
          }}
        >
          Return to Laboratory Home
        </Link>
      </div>
    </div>
  );
}
