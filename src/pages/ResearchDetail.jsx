import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { getAllNotes, getStoredNotes, deleteUserNote } from '../data/notesManager';
import { siteConfig } from '../config/site.config';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import BibtexModal from '../components/BibtexModal';
import styles from './ResearchDetail.module.css';

function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopy = () => {
    if (preRef.current) {
      navigator.clipboard.writeText(preRef.current.innerText || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.codeBlockWrapper}>
      <button
        type="button"
        className={styles.copyCodeBtn}
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}

export default function ResearchDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBibtex, setShowBibtex] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [notesList, setNotesList] = useState(() => getAllNotes());

  useEffect(() => {
    const refreshNotes = () => setNotesList(getAllNotes());
    window.addEventListener('orbetex_notes_updated', refreshNotes);
    return () => window.removeEventListener('orbetex_notes_updated', refreshNotes);
  }, []);

  const noteIndex = notesList.findIndex(n => n.slug === slug || n.id === slug);
  const note = notesList[noteIndex];
  const isUserNote = note ? getStoredNotes().some(n => n.slug === note.slug || n.id === note.slug) : false;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${note.title}"? This cannot be undone.`)) {
      deleteUserNote(note.slug);
      navigate('/research');
    }
  };

  // Next / Previous notes
  const prevNote = noteIndex > 0 ? notesList[noteIndex - 1] : null;
  const nextNote = noteIndex >= 0 && noteIndex < notesList.length - 1 ? notesList[noteIndex + 1] : null;

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
      <Helmet>
        <title>{`${note.title} — Orbetex Research Notes`}</title>
        <meta name="description" content={note.summary} />
        <meta name="author" content={siteConfig.name} />
        <meta property="og:title" content={note.title} />
        <meta property="og:description" content={note.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/research/${note.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={note.title} />
        <meta name="twitter:description" content={note.summary} />
      </Helmet>

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
                {isUserNote && (
                  <>
                    <Link
                      to={`/research/new?edit=${note.slug}`}
                      className={styles.actionBtn}
                    >
                      ✎ Edit Note
                    </Link>
                    <button
                      type="button"
                      className={styles.actionBtnDanger}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={handleShare}
                  aria-label="Copy note link"
                >
                  {copiedLink ? '✓ Copied Link' : 'Share'}
                </button>
                {note.bibtex && (
                  <button
                    type="button"
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
              {(note.tags || []).map(tag => (
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
                rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
                components={{
                  pre: CodeBlock,
                  blockquote: ({ children, ...props }) => {
                    const text = React.Children.toArray(children)
                      .map(c => (typeof c === 'string' ? c : c?.props?.children || ''))
                      .join('');

                    const match = text.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                    if (match) {
                      const type = match[1].toUpperCase();
                      return (
                        <div className={`${styles.calloutBox} ${styles[`callout_${type.toLowerCase()}`] || ''}`}>
                          <span className={styles.calloutBadge}>{type}</span>
                          <div className={styles.calloutContent}>
                            {children}
                          </div>
                        </div>
                      );
                    }
                    return <blockquote {...props}>{children}</blockquote>;
                  },
                  h2: ({ children, ...props }) => {
                    const text = React.Children.toArray(children)
                      .map(c => (typeof c === 'string' ? c : c?.props?.children || ''))
                      .join('');
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = React.Children.toArray(children)
                      .map(c => (typeof c === 'string' ? c : c?.props?.children || ''))
                      .join('');
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                  p: ({ node, children, ...props }) => {
                    const hasBlockElement =
                      node?.children?.some(c => c.tagName === 'img' || c.tagName === 'figure') ||
                      React.Children.toArray(children).some(
                        child => React.isValidElement(child) && (child.type === 'figure' || child.props?.className?.includes?.('mediaFigure'))
                      );
                    if (hasBlockElement) {
                      return <div {...props}>{children}</div>;
                    }
                    return <p {...props}>{children}</p>;
                  },
                  img: ({ src, alt, title }) => {
                    const isVideo = src && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
                    const isYouTube = src && (src.includes('youtube.com') || src.includes('youtu.be'));

                    if (isVideo) {
                      return (
                        <figure className={styles.mediaFigure}>
                          <video src={src} controls className={styles.embeddedVideo} poster={title}>
                            Your browser does not support the video tag.
                          </video>
                          {alt && <figcaption className={styles.mediaCaption}>{alt}</figcaption>}
                        </figure>
                      );
                    }

                    if (isYouTube) {
                      let embedUrl = src;
                      if (src.includes('watch?v=')) {
                        embedUrl = src.replace('watch?v=', 'embed/');
                      } else if (src.includes('youtu.be/')) {
                        embedUrl = src.replace('youtu.be/', 'www.youtube.com/embed/');
                      }
                      return (
                        <figure className={styles.mediaFigure}>
                          <div className={styles.videoEmbedWrapper}>
                            <iframe
                              src={embedUrl}
                              title={alt || 'Embedded video'}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          {alt && <figcaption className={styles.mediaCaption}>{alt}</figcaption>}
                        </figure>
                      );
                    }

                    return (
                      <figure className={styles.mediaFigure}>
                        <img src={src} alt={alt || 'Research figure'} className={styles.embeddedImage} loading="lazy" />
                        {alt && <figcaption className={styles.mediaCaption}>{alt}</figcaption>}
                      </figure>
                    );
                  }
                }}
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
                  <dd>{siteConfig.name}</dd>
                  <dt>Laboratory</dt>
                  <dd>{siteConfig.affiliation}</dd>
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
