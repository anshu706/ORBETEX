import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { saveUserNote, formatNoteAsCode, getNoteBySlug } from '../data/notesManager';
import { siteConfig } from '../config/site.config';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import detailStyles from './ResearchDetail.module.css';
import styles from './NewResearchNote.module.css';

const DEFAULT_CATEGORIES = [
  'Neural Network Interpretability',
  'Cognitive Science',
  'Natural Language Processing',
  'Machine Learning',
  'Quantum Computing',
  'Autonomous Hardware & RF'
];

export default function NewResearchNote() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get('edit');
  const existingNote = editSlug ? getNoteBySlug(editSlug) : null;
  const isEditing = Boolean(existingNote);

  const [title, setTitle] = useState(() => existingNote?.title || '');
  const [slug, setSlug] = useState(() => existingNote?.slug || '');
  const [noteDate] = useState(() => existingNote?.date || new Date().toISOString().split('T')[0]);
  const [noteYear] = useState(() => new Date().getFullYear());
  const [category, setCategory] = useState(() => {
    if (!existingNote?.category) return DEFAULT_CATEGORIES[0];
    return DEFAULT_CATEGORIES.includes(existingNote.category) ? existingNote.category : 'Custom';
  });
  const [customCategory, setCustomCategory] = useState(() => {
    if (!existingNote?.category) return '';
    return DEFAULT_CATEGORIES.includes(existingNote.category) ? '' : existingNote.category;
  });
  const [status, setStatus] = useState(() => existingNote?.status || 'in-progress');
  const [readingTime, setReadingTime] = useState(() => existingNote?.readingTime || '5 min read');
  const [tagsInput, setTagsInput] = useState(() => (existingNote?.tags ? existingNote.tags.join(', ') : 'Interpretability, Neural Dynamics'));
  const [summary, setSummary] = useState(() => existingNote?.summary || '');
  const [mathSample, setMathSample] = useState(() => existingNote?.mathSample || '$$ \\mathcal{L} = \\|x - \\hat{x}\\|^2_2 $$');
  const [content, setContent] = useState(() => existingNote?.content || `## 1. Abstract & Motivation

Describe the theoretical motivation, scientific intuition, and research questions under investigation.

## 2. Mathematical Formalization

Formulate the core dynamics using closed-form analysis:

$$
h_{t+1} = \\sigma(W h_t + U x_t + b)
$$

## 3. Empirical Results & Figures

Place images and video recordings inside \`public/media/\` and reference them directly:

![Figure 1: Latent manifold trajectories](/media/figure1.png)

\`\`\`python
import torch

def compute_drift(states: torch.Tensor) -> torch.Tensor:
    """Calculates continuous attractor drift rate across time."""
    return torch.norm(states[1:] - states[:-1], dim=-1)
\`\`\`
`);
  const [toastMessage, setToastMessage] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Auto-generate slug from title if user hasn't explicitly edited slug
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditing) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const insertSnippet = (snippet) => {
    setContent(prev => prev + '\n' + snippet + '\n');
  };

  const getFinalTags = () => {
    return tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  };

  const currentCategory = category === 'Custom' ? customCategory : category;

  const currentNoteObject = {
    id: slug || 'draft-note',
    slug: slug || 'draft-note',
    title: title || 'Untitled Research Note',
    date: noteDate,
    status,
    readingTime,
    category: currentCategory || 'Research Note',
    tags: getFinalTags(),
    summary,
    mathSample,
    bibtex: `@article{orbetex${noteYear}${slug || 'note'},
  title={${title || 'Research Note'}},
  author={${siteConfig.name}},
  journal={Orbetex Research Notes},
  year={${noteYear}}
}`,
    content
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert('Please provide a Title and Slug for your research note.');
      return;
    }

    const success = saveUserNote(currentNoteObject);
    if (success) {
      setToastMessage(isEditing ? 'Research note updated! Opening note...' : 'Research note saved! Opening note...');
      setTimeout(() => {
        navigate(`/research/${slug}`);
      }, 700);
    } else {
      alert('Could not save note to browser storage. Check storage quotas.');
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`${isEditing ? 'Edit' : 'Write'} Research Note — ${siteConfig.brandName}`}</title>
      </Helmet>

      {/* Top action navigation */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <Link to="/research" className={styles.backLink}>
            ← Return to Research Index
          </Link>
          <div className={styles.topActions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setShowCodeModal(true)}
            >
              Export JS Code
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleSave}
            >
              {isEditing ? 'Update & View Note →' : 'Publish & View Note →'}
            </button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <header className={styles.pageHeader}>
          <span className={styles.preTitle}>Laboratory Notebook Composer</span>
          <h1 className={styles.title}>{isEditing ? `Edit: ${title || 'Research Note'}` : 'Compose New Research Note'}</h1>
          <p className={styles.desc}>
            Write your scientific formulation, embed experimental figures/videos from <code>public/media/</code>,
            and preview LaTeX math expressions in real time.
          </p>
        </header>

        {/* Media folder guide notice */}
        <div className={styles.assetNotice} style={{ marginBottom: 'var(--space-6)' }}>
          <strong>💡 Adding Images &amp; Videos:</strong> Place your <code>.png</code>, <code>.jpg</code>, or <code>.mp4</code> files
          inside <code>public/media/</code>. Then insert them with <code>![Figure Title](/media/your-file.png)</code> or <code>![Demo Video](/media/your-file.mp4)</code>.
          YouTube links can also be embedded directly.
        </div>

        <div className={styles.workspace}>
          {/* Editor Form */}
          <form className={styles.editorPane} onSubmit={handleSave}>
            <h2 className={styles.formSectionTitle}>1. Metadata &amp; Taxonomy</h2>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Note Title</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Spectral Bias in High-Dimensional Ring Attractors"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>URL Slug</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. spectral-bias-ring-attractors"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  required
                />
                <span className={styles.helperText}>URL path: /research/{slug || '...'}</span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Lifecycle Status</label>
                <select
                  className={styles.select}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="idea">Idea (Exploratory)</option>
                  <option value="in-progress">In Progress (Experimental)</option>
                  <option value="preprint">Preprint (Draft)</option>
                  <option value="published">Published (Validated)</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Research Category</label>
                <select
                  className={styles.select}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {DEFAULT_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Custom">+ Custom Category...</option>
                </select>
                {category === 'Custom' && (
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    style={{ marginTop: '6px' }}
                  />
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Estimated Read Time</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. 7 min read"
                  value={readingTime}
                  onChange={e => setReadingTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Tags (Comma-separated)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Interpretability, Attractors, Geometry, PyTorch"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Brief Abstract / Summary</label>
              <textarea
                className={styles.textarea}
                rows={3}
                placeholder="A concise 1-2 sentence overview of the note findings..."
                value={summary}
                onChange={e => setSummary(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Teaser Math Formula (LaTeX)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="$$ \mathcal{L} = \dots $$"
                value={mathSample}
                onChange={e => setMathSample(e.target.value)}
              />
            </div>

            <h2 className={styles.formSectionTitle} style={{ marginTop: 'var(--space-4)' }}>
              2. Markdown Manuscript &amp; Media
            </h2>

            {/* Quick Insertion Toolbar */}
            <div className={styles.toolbar} aria-label="Markdown insertion shortcuts">
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', alignSelf: 'center' }}>
                Insert:
              </span>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('![Figure: Architecture Description](/media/figure1.png)')}
                title="Embed Image"
              >
                + Image
              </button>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('![Simulation Recording](/media/simulation.mp4)')}
                title="Embed Local Video"
              >
                + Video (.mp4)
              </button>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('![Lecture Demonstration](https://www.youtube.com/watch?v=dQw4w9WgXcQ)')}
                title="Embed YouTube Video"
              >
                + YouTube
              </button>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('$$\n\\min_{W} \\|y - W x\\|^2_2 + \\lambda \\|W\\|_1\n$$')}
                title="Display Math Equation"
              >
                + LaTeX Equation
              </button>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('```python\nimport torch\nimport numpy as np\n\n# Experimental code\n```')}
                title="Python Code Block"
              >
                + Python Code
              </button>
              <button
                type="button"
                className={styles.toolbarBtn}
                onClick={() => insertSnippet('> [!NOTE]\n> Key empirical observation or theoretical guarantee.')}
                title="Callout Box"
              >
                + Callout
              </button>
            </div>

            <div className={styles.fieldGroup}>
              <textarea
                className={`${styles.textarea} ${styles.monospaceTextarea}`}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your research paper in GitHub Flavored Markdown..."
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <button type="submit" className={styles.primaryBtn} style={{ padding: '12px 24px' }}>
                Publish Note to Archive →
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setShowCodeModal(true)}
              >
                Get JS Code
              </button>
            </div>
          </form>

          {/* Live Preview Pane */}
          <aside className={styles.previewPane}>
            <div className={styles.previewHeader}>
              <span className={styles.previewTitle}>Live Manuscript Preview</span>
              <span className={styles.previewBadge}>Real-time Rendering</span>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <StatusBadge status={status} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.4rem', margin: '12px 0 6px' }}>
                {title || 'Untitled Note Preview'}
              </h2>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {getFinalTags().map(tag => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
              {summary && (
                <p style={{ fontStyle: 'italic', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  {summary}
                </p>
              )}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 'var(--space-4) 0' }} />

            {/* Markdown rendered view */}
            <div className={detailStyles.markdownBody}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
                components={{
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
                        <figure className={detailStyles.mediaFigure}>
                          <video src={src} controls className={detailStyles.embeddedVideo} poster={title}>
                            Your browser does not support the video tag.
                          </video>
                          {alt && <figcaption className={detailStyles.mediaCaption}>{alt}</figcaption>}
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
                        <figure className={detailStyles.mediaFigure}>
                          <div className={detailStyles.videoEmbedWrapper}>
                            <iframe
                              src={embedUrl}
                              title={alt || 'Embedded video'}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          {alt && <figcaption className={detailStyles.mediaCaption}>{alt}</figcaption>}
                        </figure>
                      );
                    }

                    return (
                      <figure className={detailStyles.mediaFigure}>
                        <img src={src} alt={alt || 'Research figure'} className={detailStyles.embeddedImage} loading="lazy" />
                        {alt && <figcaption className={detailStyles.mediaCaption}>{alt}</figcaption>}
                      </figure>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </aside>
        </div>
      </div>

      {/* Code Export Modal */}
      {showCodeModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowCodeModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)' }}>
                JavaScript Object for <code>src/data/researchNotes.js</code>
              </h3>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setShowCodeModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                Copy and paste this snippet into <code>src/data/researchNotes.js</code> to permanently commit it into git:
              </p>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  navigator.clipboard.writeText(formatNoteAsCode(currentNoteObject));
                  alert('Code copied to clipboard!');
                }}
              >
                Copy Code to Clipboard
              </button>
              <pre className={styles.codeBlock}>
                <code>{formatNoteAsCode(currentNoteObject)}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <span>✓ {toastMessage}</span>
        </div>
      )}
    </div>
  );
}
