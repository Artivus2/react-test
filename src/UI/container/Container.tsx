import React from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`${styles.main} ${className}`}>{children}</div>;
};
export default Container;