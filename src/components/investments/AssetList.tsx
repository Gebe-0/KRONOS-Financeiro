import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Trash2, Edit3, Check } from 'lucide-react';
import type { InvestmentAsset, AssetCategory } from '../../types/finance';
import { formatBRL, formatPercent } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AssetListProps {
  assets: InvestmentAsset[];
  onDelete: (id: string) => void;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onOpenNewModal: () => void;
}

export const AssetList: React.FC<AssetListProps> = ({
  assets,
  onDelete,
  onUpdatePrice,
  onOpenNewModal,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPriceStr, setEditingPriceStr] = useState<string>('');

  const getCategoryBadge = (cat: AssetCategory) => {
    switch (cat) {
      case 'renda-fixa': return <Badge variant="emerald">Renda Fixa</Badge>;
      case 'acoes': return <Badge variant="blue">Ações</Badge>;
      case 'fiis': return <Badge variant="amber">FIIs</Badge>;
      case 'cripto': return <Badge variant="rose">Cripto</Badge>;
      default: return <Badge variant="slate">Outro</Badge>;
    }
  };

  const filteredAssets = selectedClass === 'all'
    ? assets
    : assets.filter(a => a.category === selectedClass);

  const startEditPrice = (asset: InvestmentAsset) => {
    setEditingId(asset.id);
    setEditingPriceStr(asset.currentPrice.toString());
  };

  const saveEditPrice = (id: string) => {
    const parsed = parseFloat(editingPriceStr.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 0) {
      onUpdatePrice(id, parsed);
    }
    setEditingId(null);
  };

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Posições em Carteira
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Acompanhe o rendimento individual e ajuste as cotações
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={16} />}
          onClick={onOpenNewModal}
        >
          Novo Ativo
        </Button>
      </div>

      {/* Filtros de Categoria de Investimento */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'Todos os Ativos' },
          { id: 'renda-fixa', label: 'Renda Fixa' },
          { id: 'acoes', label: 'Ações' },
          { id: 'fiis', label: 'FIIs' },
          { id: 'cripto', label: 'Cripto' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedClass(item.id)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: 'var(--radius-full)',
              backgroundColor: selectedClass === item.id ? 'var(--text-primary)' : 'var(--bg-subtle)',
              color: selectedClass === item.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tabela de Ativos */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Ativo</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Classe</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Qtd</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>P. Médio</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Cotação Atual</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Total Atual</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Lucro / Prejuízo</th>
              <th style={{ padding: '10px 12px', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhum ativo nesta classe. Clique em "Novo Ativo" para adicionar.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => {
                const totalInvested = asset.quantity * asset.averagePrice;
                const totalCurrent = asset.quantity * asset.currentPrice;
                const profitVal = totalCurrent - totalInvested;
                const profitPct = totalInvested > 0 ? (profitVal / totalInvested) * 100 : 0;
                const isProfitable = profitVal >= 0;

                return (
                  <tr
                    key={asset.id}
                    style={{ borderBottom: '1px solid var(--border-light)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {asset.ticker}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {asset.name}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      {getCategoryBadge(asset.category)}
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }} className="tabular-nums">
                      {asset.quantity}
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }} className="tabular-nums">
                      {formatBRL(asset.averagePrice)}
                    </td>

                    {/* Cotação Atual com Edição Inline rápida */}
                    <td style={{ padding: '12px', textAlign: 'right' }} className="tabular-nums">
                      {editingId === asset.id ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="text"
                            value={editingPriceStr}
                            onChange={(e) => setEditingPriceStr(e.target.value)}
                            style={{
                              width: '80px',
                              padding: '2px 6px',
                              fontSize: '12px',
                              borderRadius: '4px',
                              border: '1px solid var(--border-strong)',
                              textAlign: 'right',
                            }}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditPrice(asset.id);
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                          />
                          <button
                            onClick={() => saveEditPrice(asset.id)}
                            style={{ color: 'var(--accent-emerald)', padding: '2px' }}
                          >
                            <Check size={14} />
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => startEditPrice(asset)}
                          style={{ cursor: 'pointer', borderBottom: '1px dotted var(--text-muted)' }}
                          title="Clique para atualizar cotação"
                        >
                          {formatBRL(asset.currentPrice)} <Edit3 size={11} style={{ opacity: 0.6 }} />
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }} className="tabular-nums">
                      {formatBRL(totalCurrent)}
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }} className="tabular-nums">
                      <div
                        style={{
                          fontWeight: 600,
                          color: isProfitable ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        {isProfitable ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {formatBRL(profitVal)}
                      </div>
                      <div style={{ fontSize: '11px', color: isProfitable ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                        {formatPercent(profitPct)}
                      </div>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => onDelete(asset.id)}
                        style={{ color: 'var(--text-muted)', padding: '4px' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        title="Remover ativo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
