import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.brand}>
        <img src="/logo.png" alt="Koreer Logo" className={styles.logo} />
        <span className={styles.brandName}>Koreer</span>
      </Link>
      {/* ... rest of the navigation content ... */}
    </nav>
  );
}; 