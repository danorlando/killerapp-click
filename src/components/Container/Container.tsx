import React from 'react';
import styles from './styles.module.css';

export type TContainer = {
  children: React.ReactNode;
  className?: string;
};
export const Container: React.FC<TContainer> = ({children, className = ''}) => (
  <main className={`${styles.container} ${className}`}>{children}</main>
);
