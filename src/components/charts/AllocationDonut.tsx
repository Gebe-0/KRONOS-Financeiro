import React from 'react';
import type { CategoryExpense } from '../../types/finance';
import { formatBRL } from '../../utils/formatters';

interface AllocationDonutProps {
  categories: CategoryExpense[];
  totalExpense: number;
}

export const AllocationDonut: React.FC<AllocationDonutProps> = ({
  categories,
  totalExpense,
}) => {
  // Cálculo dos arcos SVG do Donut Chart
  let cumulativeAngle = 0;
  const size = 160;
  const radius = 60;
  const strokeWidth = 24;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      className="animate-fade-in"
    >
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Distribuição por Categoria
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Despesas do mês corrente agrupadas
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {categories.length === 0 ? (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--border-light)"
                strokeWidth={strokeWidth}
              />
            ) : (
              categories.map((cat) => {
                const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((cumulativeAngle / 360) * circumference);
                cumulativeAngle += (cat.percentage / 100) * 360;

                return (
                  <circle
                    key={cat.category}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={cat.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{
                      transition: 'all 0.5s var(--ease-out-spring)',
                      cursor: 'pointer',
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* Valor Central no Donut */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }} className="tabular-nums">
              {formatBRL(totalExpense)}
            </span>
          </div>
        </div>

        {/* Legenda Lateral Alinhada */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '180px' }}>
          {categories.slice(0, 5).map((cat) => (
            <div
              key={cat.category}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                padding: '4px 0',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }}></span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{cat.category}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }} className="tabular-nums">
                  {formatBRL(cat.amount)}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', width: '36px', textAlign: 'right' }}>
                  {cat.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
