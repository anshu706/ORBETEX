import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { researchNotes } from '../data/researchNotes';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import BibtexModal from '../components/BibtexModal';
import styles from './ResearchDetail.module.css';

export default function ResearchDetail() {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBibtex, setShowBibtex] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const noteIndex = researchNotes.findIndex(n => n.slug === slug || n.id === slug);
  const note = researchNotes[noteIndex];

  // Next / Previous notes
  const prevNote = noteIndex > 0 ? researchNotes[noteIndex - 1] : null;
  const nextNote = noteIndex < researchNotes.length - 1 ? researchNotes[noteIndex + 1] : null;

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract table of contents headings from markdown
  const tocHeadings = useMemo(() => {
    if (!note?.content) return [];
    const lines = note.content.split('\n');
    const headings = [];
    lines.forEach(line => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        headings.push({ level, text, id });
      }
    });
    return headings;
  }, [note]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!note) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>Research Note Not Found</h2>
          <p style={{ margin: '16px 0 24px' }}>The requested working note could not be located in the laboratory archive.</p>
          <Link to="/research" className={styles.backBtn}>
            ← Return to Research Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Top Reading Progress Indicator */}
      <div
        className={styles.progressBar}
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <article className={styles.articleContainer}>
        {/* Note Header */}
        <header className={styles.articleHeader}>
          <div className="container">
            <div className={styles.topNav}>
              <Link to="/research" className={styles.backLink}>
                ← Back to Research Notes
              </Link>
              <div className={styles.headerActions}>
                <button
                  className={styles.actionBtn}
                  onClick={handleShare}
                  aria-label="Copy note link"
                >
                  {copiedLink ? '✓ Copied Link' : 'Share'}
                </button>
                {note.bibtex && (
                  <button
                    className={styles.actionBtnPrimary}
                    onClick={() => setShowBibtex(true)}
                  >
                    Cite Note (BibTeX)
                  </button>
                )}
              </div>
            </div>

            <div className={styles.metaRow}>
              <StatusBadge status={note.status} />
              <span className={styles.categoryBadge}>{note.category}</span>
              <span className={styles.readTime}>
                {note.readingTime} · Published {note.date}
              </span>
            </div>

            <h1 className={styles.articleTitle}>{note.title}</h1>

            <p className={styles.articleAbstract}>{note.summary}</p>

            <div className={styles.tagsBar}>
              {note.tags.map(tag => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </header>

        {/* Content & Sidebar Layout */}
        <div className={`container ${styles.layout}`}>
          {/* Main Article Body */}
          <main className={styles.mainContent}>
            <div className={styles.markdownBody}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
              >
                {note.content}
              </ReactMarkdown>
            </div>

            {/* Note Footer & Citations */}
            {note.bibtex && (
              <section className={styles.citationBox}>
                <div className={styles.citationHeader}>
                  <h3>Cite this Laboratory Note</h3>
                  <button
                    className={styles.copyInlineBtn}
                    onClick={() => {
                      navigator.clipboard.writeText(note.bibtex);
                      alert('BibTeX citation copied to clipboard!');
                    }}
                  >
                    Copy BibTeX
                  </button>
                </div>
                <pre className={styles.bibtexCode}>
                  <code>{note.bibtex}</code>
                </pre>
              </section>
            )}

            {/* Previous & Next Navigation */}
            <nav className={styles.prevNextNav} aria-label="Adjacent research notes">
              {prevNote ? (
                <Link to={`/research/${prevNote.slug}`} className={styles.navCard}>
                  <span className={styles.navCardDir}>← Previous Note</span>
                  <span className={styles.navCardTitle}>{prevNote.title}</span>
                </Link>
              ) : <div />}

              {nextNote ? (
                <Link to={`/research/${nextNote.slug}`} className={`${styles.navCard} ${styles.navCardRight}`}>
                  <span className={styles.navCardDir}>Next Note →</span>
                  <span className={styles.navCardTitle}>{nextNote.title}</span>
                </Link>
              ) : <div />}
            </nav>
          </main>

          {/* Sticky Sidebar */}
          <aside className={styles.sidebar} aria-label="Note Outline">
            <div className={styles.stickySidebar}>
              {/* Table of contents */}
              {tocHeadings.length > 0 && (
                <div className={styles.tocCard}>
                  <h4 className={styles.tocTitle}>Table of Contents</h4>
                  <ul className={styles.tocList}>
                    {tocHeadings.map(h => (
                      <li
                        key={h.id}
                        className={`${styles.tocItem} ${h.level === 3 ? styles.tocSubItem : ''}`}
                      >
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Document details card */}
              <div className={styles.metaCard}>
                <h4 className={styles.metaCardTitle}>Archive Metadata</h4>
                <dl className={styles.metaList}>
                  <dt>Researcher</dt>
                  <dd>Anshu Upadhyay</dd>
                  <dt>Laboratory</dt>
                  <dd>Orbetex Research Lab</dd>
                  <dt>Field</dt>
                  <dd>{note.category}</dd>
                  <dt>Lifecycle Stage</dt>
                  <dd><StatusBadge status={note.status} /></dd>
                  <dt>Licensing</dt>
                  <dd>CC-BY-4.0 Open Science</dd>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* BibTeX Modal */}
      {showBibtex && note.bibtex && (
        <BibtexModal
          isOpen={true}
          onClose={() => setShowBibtex(false)}
          title={note.title}
          bibtex={note.bibtex}
        />
      )}
    </div>
  );
}
