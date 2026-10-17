import React, { useState } from 'react';
import styles from './BibtexModal.module.css';

export default function BibtexModal({ isOpen, onClose, title, bibtex }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>Cite Publication</span>
            <h3 id="modal-title" className={styles.title}>{title}</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">×</button>
        </div>

        <div className={styles.body}>
          <pre className={styles.codeBlock}>
            <code>{bibtex}</code>
          </pre>
        </div>

        <div className={styles.footer}>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied to Clipboard' : 'Copy BibTeX Entry'}
          </button>
          <button className={styles.dismissBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
