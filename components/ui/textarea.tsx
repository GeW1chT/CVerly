// components/ui/textarea.tsx
"use client";

import React, { TextareaHTMLAttributes, forwardRef, useState } from 'react';

// Textarea için ana stil
const textareaStyles = {
  display: 'block',
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  color: '#1f2937',
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  outline: 'none',
  minHeight: '100px',
  resize: 'vertical' as 'vertical',
};

// Odaklanma anındaki stil
const focusStyles = {
  borderColor: '#3b82f6',
  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.25)',
};

// Hata anındaki stil
const errorStyles = {
  borderColor: '#ef4444',
};

// Disabled (devre dışı) anındaki stil
const disabledStyles = {
  backgroundColor: '#f3f4f6',
  cursor: 'not-allowed',
  opacity: '0.6',
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    
    const combinedStyles = {
      ...textareaStyles,
      ...(isFocused && focusStyles),
      ...(disabled && disabledStyles),
      ...style,
    };

    return (
      <textarea
        ref={ref}
        style={combinedStyles}
        className={className}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";