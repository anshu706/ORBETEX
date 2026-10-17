import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site.config';
import { researchNotes } from '../data/researchNotes';
import { publications } from '../data/publications';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import BibtexModal from '../components/BibtexModal';
import styles from './Home.module.css';

export default function Home() {
  const [selectedBibtex, setSelectedBibtex] = useState(null);

  // Take top items
  const featuredNotes = researchNotes.slice(0, 3);
  const featuredPubs = publications.slice(0, 3);

  return (
    <div className="page-wrapper">
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
            <Link to="/publications" className={styles.secondaryAction}>
              Browse Publications →
            </Link>
          </div>

          {/* Metric counter highlights */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>{researchNotes.length}</span>
              <span className={styles.metricLabel}>Active Research Notes</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>{publications.length}</span>
              <span className={styles.metricLabel}>Published Papers</span>
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
              View all notes ({researchNotes.length}) →
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
                    {note.tags.slice(0, 3).map(tag => (
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

      {/* ── Selected Publications (renders when publications exist) ── */}
      {publications.length > 0 && (
        <section className={`${styles.section} ${styles.altSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionPre}>Peer-Reviewed &amp; Preprints</span>
                <h2 className={styles.sectionTitle}>Selected Publications</h2>
              </div>
              <Link to="/publications" className={styles.sectionLink}>
                All publications →
              </Link>
            </div>

            <div className={styles.pubsList}>
              {featuredPubs.map(pub => (
                <article key={pub.id} className={styles.pubItem}>
                  <div className={styles.pubYear}>{pub.year}</div>
                  <div className={styles.pubContent}>
                    <div className={styles.pubVenueBadge}>
                      <span>{pub.venue}</span>
                      <span className={styles.pubType}>{pub.type}</span>
                    </div>
                    <h3 className={styles.pubTitle}>{pub.title}</h3>
                    <p className={styles.pubAuthors}>
                      {pub.authors.map((author, i) => (
                        <span key={author} className={author.includes('Anshu Upadhyay') ? styles.highlightAuthor : ''}>
                          {author}{i < pub.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                    <p className={styles.pubAbstract}>{pub.abstract.slice(0, 240)}...</p>

                    <div className={styles.pubActions}>
                      {pub.arxiv && (
                        <a href={pub.arxiv} target="_blank" rel="noopener noreferrer" className={styles.pubLink}>
                          arXiv
                        </a>
                      )}
                      {pub.code && (
                        <a href={pub.code} target="_blank" rel="noopener noreferrer" className={styles.pubLink}>
                          Code Repository
                        </a>
                      )}
                      <button
                        className={styles.citeBtn}
                        onClick={() => setSelectedBibtex({ title: pub.title, bibtex: pub.bibtex })}
                      >
                        Cite (BibTeX)
                      </button>
                      {pub.citations > 0 && (
                        <span className={styles.citationsBadge}>
                          {pub.citations} citations
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Citation Modal */}
      {selectedBibtex && (
        <BibtexModal
          isOpen={true}
          onClose={() => setSelectedBibtex(null)}
          title={selectedBibtex.title}
          bibtex={selectedBibtex.bibtex}
        />
      )}
    </div>
  );
}
