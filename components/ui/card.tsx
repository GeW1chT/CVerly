// components/ui/card.tsx
"use client";

import React, { HTMLAttributes } from 'react';

// Card container için ana stil
const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
};

// Başlık bölümü için stil
const cardHeaderStyles = {
  padding: '1.5rem',
  borderBottom: '1px solid #e5e7eb',
};

// İçerik bölümü için stil
const cardContentStyles = {
  padding: '1.5rem',
};

// Başlık için stil
const cardTitleStyles = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: 0,
};

// Açıklama için stil
const cardDescriptionStyles = {
  fontSize: '0.875rem',
  color: '#6b7280',
  marginTop: '0.25rem',
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ ...cardStyles, ...style }}
      className={className}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ ...cardHeaderStyles, ...style }}
      className={className}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ ...cardContentStyles, ...style }}
      className={className}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, style, ...props }, ref) => (
    <h3
      ref={ref}
      style={{ ...cardTitleStyles, ...style }}
      className={className}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, style, ...props }, ref) => (
    <p
      ref={ref}
      style={{ ...cardDescriptionStyles, ...style }}
      className={className}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";