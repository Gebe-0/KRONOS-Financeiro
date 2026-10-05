import React, { useState } from 'react';
import type { CashFlowMonth } from '../../types/finance';
import { formatBRL } from '../../utils/formatters';

interface CashFlowChartProps {
  data: CashFlowMonth[];
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense)), 1000);
  const chartHeight = 180;

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Fluxo de Caixa Mensal
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Comparativo de Receitas vs Despesas (Últimos 6 meses)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--accent-emerald)' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Receitas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--accent-rose)' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Despesas</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart Interativo */}
      <div style={{ position: 'relative', width: '100%', height: `${chartHeight + 40}px` }}>
        {/* Linhas de grade suaves */}
        <div style={{ position: 'absolute', inset: 0, height: `${chartHeight}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <div style={{ borderBottom: '1px dashed var(--border-light)', width: '100%' }}></div>
          <div style={{ borderBottom: '1px dashed var(--border-light)', width: '100%' }}></div>
          <div style={{ borderBottom: '1px solid var(--border-strong)', width: '100%' }}></div>
        </div>

        {/* Colunas do gráfico */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            height: `${chartHeight}px`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            padding: '0 8px',
          }}
        >
          {data.map((item, idx) => {
            const incomeH = (item.income / maxVal) * chartHeight;
            const expenseH = (item.expense / maxVal) * chartHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.month}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  width: '14%',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip Tátil */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: `${Math.max(incomeH, expenseH) + 12}px`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--text-inverse)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: 'var(--shadow-dropdown)',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                    className="animate-pop-in tabular-nums"
                  >
                    <div style={{ fontWeight: 600, borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '4px' }}>
                      {item.month} 2026
                    </div>
                    <div>Receita: <span style={{ color: '#34D399' }}>{formatBRL(item.income)}</span></div>
                    <div>Despesa: <span style={{ color: '#FB7185' }}>{formatBRL(item.expense)}</span></div>
                    <div style={{ marginTop: '2px', fontWeight: 600 }}>Saldo: {formatBRL(item.net)}</div>
                  </div>
                )}

                {/* Barras de Receita e Despesa */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '45%',
                      maxWidth: '18px',
                      height: `${Math.max(incomeH, 4)}px`,
                      backgroundColor: isHovered ? '#047857' : 'var(--accent-emerald)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.4s var(--ease-out-spring), background-color 0.15s ease',
                    }}
                  />
                  <div
                    style={{
                      width: '45%',
                      maxWidth: '18px',
                      height: `${Math.max(expenseH, 4)}px`,
                      backgroundColor: isHovered ? '#BE123C' : 'var(--accent-rose)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.4s var(--ease-out-spring), background-color 0.15s ease',
                    }}
                  />
                </div>

                {/* Label do Mês */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-24px',
                    fontSize: '12px',
                    fontWeight: isHovered ? 600 : 500,
                    color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
