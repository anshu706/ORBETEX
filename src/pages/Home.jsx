import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site.config';
import { getAllNotes } from '../data/notesManager';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import styles from './Home.module.css';

export default function Home() {
  const [allNotes, setAllNotes] = useState(() => getAllNotes());

  useEffect(() => {
    const refresh = () => setAllNotes(getAllNotes());
    window.addEventListener('orbetex_notes_updated', refresh);
    return () => window.removeEventListener('orbetex_notes_updated', refresh);
  }, []);

  // Take top items
  const featuredNotes = allNotes.slice(0, 3);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`${siteConfig.brandName} — Research Notes & Scientific Findings`}</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={`${siteConfig.brandName} — Research Hub`} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.siteUrl} />
      </Helmet>

      {/* ── Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className={styles.pulseDot} />
            <span>Open Research Hub &amp; Laboratory Notes</span>
          </div>

          <h1 className={styles.heroTitle}>
            Exploring the geometry of intelligence, cognitive attractors, and physical computing.
          </h1>

          <p className={styles.heroSubtitle}>
            {siteConfig.shortBio}
          </p>

          <div className={styles.interestPills} aria-label="Primary research interests">
            {siteConfig.researchInterests.map(interest => (
              <span key={interest} className={styles.interestPill}>
                {interest}
              </span>
            ))}
          </div>

          <div className={styles.heroActions}>
            <Link to="/research" className={styles.primaryAction}>
              Explore Research Notes →
            </Link>
            <Link to="/about" className={styles.secondaryAction}>
              About the Lab →
            </Link>
          </div>

          {/* Metric counter highlights */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>{allNotes.length}</span>
              <span className={styles.metricLabel}>Active Research Notes</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>{siteConfig.researchInterests.length}</span>
              <span className={styles.metricLabel}>Investigative Pillars</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>100%</span>
              <span className={styles.metricLabel}>Open Reproducible Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Research Notes ── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionPre}>Working Notebook</span>
              <h2 className={styles.sectionTitle}>Featured Research Notes</h2>
            </div>
            <Link to="/research" className={styles.sectionLink}>
              View all notes ({allNotes.length}) →
            </Link>
          </div>

          <div className={styles.cardsGrid}>
            {featuredNotes.map(note => (
              <article key={note.id} className={styles.noteCard}>
                <div className={styles.noteTop}>
                  <StatusBadge status={note.status} />
                  <span className={styles.noteMeta}>{note.readingTime} · {note.date}</span>
                </div>

                <h3 className={styles.noteTitle}>
                  <Link to={`/research/${note.slug}`}>{note.title}</Link>
                </h3>

                <p className={styles.noteSummary}>{note.summary}</p>

                {note.mathSample && (
                  <div className={styles.noteMathPreview}>
                    <code>{note.mathSample}</code>
                  </div>
                )}

                  <div className={styles.cardFooter}>
                    <div className={styles.tagsRow}>
                      {(note.tags || []).slice(0, 3).map(tag => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </div>
                  <Link to={`/research/${note.slug}`} className={styles.readLink} aria-label={`Read note: ${note.title}`}>
                    Read note →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
