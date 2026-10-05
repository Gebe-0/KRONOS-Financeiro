import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'rose' | 'slate' | 'blue' | 'amber';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'sm',
}) => {
  const getBadgeStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: 500,
      borderRadius: 'var(--radius-full)',
      letterSpacing: '0.01em',
    };

    const sizeStyles = {
      sm: { padding: '2px 8px', fontSize: '11px' },
      md: { padding: '4px 10px', fontSize: '12px' },
    };

    const variantStyles = {
      emerald: {
        backgroundColor: 'var(--accent-emerald-light)',
        color: 'var(--accent-emerald)',
        border: '1px solid var(--accent-emerald-border)',
      },
      rose: {
        backgroundColor: 'var(--accent-rose-light)',
        color: 'var(--accent-rose)',
        border: '1px solid var(--accent-rose-border)',
      },
      slate: {
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-light)',
      },
      blue: {
        backgroundColor: 'var(--accent-blue-light)',
        color: 'var(--accent-blue)',
        border: '1px solid #BFDBFE',
      },
      amber: {
        backgroundColor: 'var(--accent-amber-light)',
        color: 'var(--accent-amber)',
        border: '1px solid #FDE68A',
      },
    };

    return { ...base, ...sizeStyles[size], ...variantStyles[variant] };
  };

  return <span style={getBadgeStyle()}>{children}</span>;
};
