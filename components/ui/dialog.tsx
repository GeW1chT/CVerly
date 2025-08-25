// components/ui/dialog.tsx
"use client";

import React, { HTMLAttributes, ReactNode, useEffect } from 'react';

// Dialog için ana konteyner stili
const dialogOverlayStyles = {
  position: 'fixed' as 'fixed', // 'fixed' tipini belirtiyoruz
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '1rem',
};

// Dialog içeriği stili
const dialogContentStyles = {
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  padding: '2rem',
  maxWidth: '500px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto' as 'auto', // 'auto' tipini belirtiyoruz
  position: 'relative' as 'relative', // 'relative' tipini belirtiyoruz
  transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
  transform: 'scale(0.95)',
  opacity: 0,
};

// Başlık stili
const dialogHeaderStyles = {
  display: 'flex' as 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #e5e7eb',
};

// Başlık metni stili
const dialogTitleStyles = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0',
};

// Açıklama stili
const dialogDescriptionStyles = {
  fontSize: '0.875rem',
  color: '#6b7280',
  marginTop: '0.25rem',
};

interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {}
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Dialog = ({ children, isOpen, onClose }: DialogProps) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.style.transform = 'scale(1)';
          dialogRef.current.style.opacity = '1';
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={dialogOverlayStyles} onClick={handleOverlayClick}>
      <div ref={dialogRef} style={dialogContentStyles}>
        {children}
      </div>
    </div>
  );
};
Dialog.displayName = "Dialog";

export const DialogHeader = ({ children }: DialogHeaderProps) => (
  <div style={dialogHeaderStyles}>{children}</div>
);
DialogHeader.displayName = "DialogHeader";

export const DialogContent = ({ children }: DialogContentProps) => (
  <div style={{ padding: '0', boxShadow: 'none', transform: 'none', opacity: '1' }}>
    {children}
  </div>
);
DialogContent.displayName = "DialogContent";

export const DialogTitle = ({ children }: DialogTitleProps) => (
  <h3 style={dialogTitleStyles}>{children}</h3>
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = ({ children }: DialogDescriptionProps) => (
  <p style={dialogDescriptionStyles}>{children}</p>
);
DialogDescription.displayName = "DialogDescription";

export const DialogClose = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#6b7280',
    }}
  >
    {children}
  </button>
);
DialogClose.displayName = "DialogClose";