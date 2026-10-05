import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatBRL } from '../../utils/formatters';

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  change?: number; // percentual de alteração
  changeLabel?: string;
  isCurrency?: boolean;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeLabel = 'vs mês anterior',
  isCurrency = true,
  prefix = '',
  suffix = '',
  icon,
  variant = 'default',
}) => {
  const isPositive = change !== undefined ? change >= 0 : undefined;

  const getBorderTopColor = () => {
    switch (variant) {
      case 'positive': return 'var(--accent-emerald)';
      case 'negative': return 'var(--accent-rose)';
      default: return 'transparent';
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        borderTop: variant !== 'default' ? `3px solid ${getBorderTopColor()}` : '1px solid var(--border-light)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
      }}
      className="hover-subtle-lift animate-fade-in"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        {icon && (
          <div style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
          className="tabular-nums"
        >
          {prefix}{isCurrency ? formatBRL(value) : value.toLocaleString('pt-BR')}{suffix}
        </div>

        {subtitle && (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>

      {change !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '2px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 600,
              color: isPositive ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            }}
          >
            {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
            {Math.abs(change).toFixed(1)}%
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{changeLabel}</span>
        </div>
      )}
    </div>
  );
};
