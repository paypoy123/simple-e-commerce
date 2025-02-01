import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2025 Warung Madura by Taufik. All rights reserved.</p>
      </div>
    </footer>
  );
};
