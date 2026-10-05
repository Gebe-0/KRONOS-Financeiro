import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import type { Transaction } from '../../types/finance';
import { formatBRL, formatDate } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onOpenNewModal: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  onOpenNewModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category));
    return Array.from(set);
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tx.account && tx.account.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchType = filterType === 'all' || tx.type === filterType;
      const matchCategory = selectedCategory === 'all' || tx.category === selectedCategory;

      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, searchTerm, filterType, selectedCategory]);

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
      {/* Header com Busca e Controles */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Extrato de Transações
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {filtered.length} registro(s) encontrado(s)
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={16} />}
          onClick={onOpenNewModal}
        >
          Nova Transação
        </Button>
      </div>

      {/* Barra de Filtros */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por descrição, categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-page)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        {/* Filtro por Tipo */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-page)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: filterType === 'all' ? 'var(--bg-surface)' : 'transparent',
              color: filterType === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: filterType === 'all' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterType('income')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: filterType === 'income' ? 'var(--bg-surface)' : 'transparent',
              color: filterType === 'income' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              boxShadow: filterType === 'income' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            Receitas
          </button>
          <button
            onClick={() => setFilterType('expense')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: filterType === 'expense' ? 'var(--bg-surface)' : 'transparent',
              color: filterType === 'expense' ? 'var(--accent-rose)' : 'var(--text-secondary)',
              boxShadow: filterType === 'expense' ? 'var(--shadow-subtle)' : 'none',
            }}
          >
            Despesas
          </button>
        </div>

        {/* Filtro de Categoria */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} style={{ color: 'var(--text-muted)' }} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-page)',
              fontSize: '12px',
              outline: 'none',
              color: 'var(--text-secondary)',
            }}
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Transações Suíça */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Transação</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Categoria</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Conta</th>
              <th style={{ padding: '10px 12px', fontWeight: 600 }}>Data</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Valor</th>
              <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right', width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhuma transação encontrada para os filtros selecionados.
                </td>
              </tr>
            ) : (
              filtered.map((tx) => {
                const isInc = tx.type === 'income';
                return (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color 0.1s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isInc ? 'var(--accent-emerald-light)' : 'var(--accent-rose-light)',
                          color: isInc ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                        }}
                      >
                        {isInc ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                      </span>
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                        {tx.description}
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <Badge variant={isInc ? 'emerald' : 'slate'}>{tx.category}</Badge>
                    </td>

                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                      {tx.account || '—'}
                    </td>

                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }} className="tabular-nums">
                      {formatDate(tx.date)}
                    </td>

                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        fontWeight: 600,
                        color: isInc ? 'var(--accent-emerald)' : 'var(--text-primary)',
                      }}
                      className="tabular-nums"
                    >
                      {isInc ? '+' : '-'} {formatBRL(tx.amount)}
                    </td>

                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => onDelete(tx.id)}
                        style={{
                          padding: '6px',
                          color: 'var(--text-muted)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        title="Excluir transação"
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
