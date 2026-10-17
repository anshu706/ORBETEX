import React from 'react';
import styles from './StatusBadge.module.css';

const STATUS_CONFIG = {
  idea:        { label: 'Idea',        icon: '💡' },
  'in-progress':{ label: 'In Progress', icon: '⚙️' },
  preprint:    { label: 'Preprint',    icon: '📄' },
  published:   { label: 'Published',   icon: '✓'  },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.idea;
  return (
    <span className={`${styles.badge} ${styles[status?.replace('-', '_')]}`} aria-label={`Status: ${cfg.label}`}>
      <span className={styles.icon} aria-hidden="true">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
