import React from 'react';
import styles from './TagChip.module.css';

export default function TagChip({ tag, onClick, active = false, size = 'md' }) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      className={`${styles.chip} ${styles[size]} ${active ? styles.active : ''} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      aria-pressed={onClick ? active : undefined}
      title={tag}
    >
      {tag}
    </Tag>
  );
}
