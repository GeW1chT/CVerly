// components/ui/label.tsx
"use client";

import React, { LabelHTMLAttributes, forwardRef } from 'react';

// Label için ana stil
const labelStyles = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '0.5rem',
  cursor: 'pointer',
};

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, style, ...props }, ref) => {
    const combinedStyles = {
      ...labelStyles,
      ...style,
    };

    return (
      <label
        ref={ref}
        style={combinedStyles}
        className={className}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";