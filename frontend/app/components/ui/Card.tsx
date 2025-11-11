'use client';

import { ReactNode, HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const cardClasses = [
    styles.card,
    styles[variant],
    hover ? styles.hover : '',
    styles[`padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`${styles.cardHeader} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}: CardTitleProps) {
  return (
    <Component className={`${styles.cardTitle} ${className}`} {...props}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function CardDescription({
  children,
  className = '',
  ...props
}: CardDescriptionProps) {
  return (
    <p className={`${styles.cardDescription} ${className}`} {...props}>
      {children}
    </p>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className = '', ...props }: CardContentProps) {
  return (
    <div className={`${styles.cardContent} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div className={`${styles.cardFooter} ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  height?: string;
}

export function CardImage({
  src,
  alt,
  height = '200px',
  className = '',
  ...props
}: CardImageProps) {
  return (
    <div className={`${styles.cardImage} ${className}`} style={{ height }} {...props}>
      <img src={src} alt={alt} />
    </div>
  );
}