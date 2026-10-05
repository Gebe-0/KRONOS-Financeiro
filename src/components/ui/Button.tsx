import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const getStyles = () => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: 500,
      borderRadius: 'var(--radius-md)',
      transition: 'all var(--duration-fast) var(--ease-out-spring)',
      cursor: 'pointer',
      letterSpacing: '-0.01em',
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: '6px 12px', fontSize: '13px' },
      md: { padding: '8px 16px', fontSize: '14px' },
      lg: { padding: '12px 22px', fontSize: '15px' },
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--text-primary)',
        color: 'var(--text-inverse)',
        boxShadow: 'var(--shadow-subtle)',
      },
      secondary: {
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-strong)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
      },
      danger: {
        backgroundColor: 'var(--accent-rose-light)',
        color: 'var(--accent-rose)',
        border: '1px solid var(--accent-rose-border)',
      },
    };

    return { ...base, ...sizeStyles[size], ...variantStyles[variant] };
  };

  return (
    <button
      style={getStyles()}
      className={`interactive-tap ${className}`}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};
