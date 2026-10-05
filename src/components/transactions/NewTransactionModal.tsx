import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    account?: string;
  }) => void;
}

const CATEGORIES_EXPENSE = [
  'Moradia',
  'Alimentação',
  'Transporte',
  'Serviços',
  'Saúde',
  'Educação',
  'Lazer',
  'Investimentos',
  'Outros'
];

const CATEGORIES_INCOME = [
  'Salário',
  'Freelance / PJ',
  'Investimentos / Dividendos',
  'Vendas',
  'Reembolso',
  'Outros'
];

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState(CATEGORIES_EXPENSE[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [account, setAccount] = useState('Nubank');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountStr.replace(',', '.'));
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !description.trim()) {
      return;
    }

    onSubmit({
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date,
      account: account.trim() || undefined,
    });

    // Reset
    setDescription('');
    setAmountStr('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Transação"
      subtitle="Adicione uma receita ou despesa ao seu fluxo de caixa"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Seletor Tipo: Receita / Despesa */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '4px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
          <button
            type="button"
            onClick={() => { setType('expense'); setCategory(CATEGORIES_EXPENSE[0]); }}
            style={{
              padding: '8px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: type === 'expense' ? 'var(--bg-surface)' : 'transparent',
              color: type === 'expense' ? 'var(--accent-rose)' : 'var(--text-secondary)',
              boxShadow: type === 'expense' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Despesa (-)
          </button>
          <button
            type="button"
            onClick={() => { setType('income'); setCategory(CATEGORIES_INCOME[0]); }}
            style={{
              padding: '8px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: type === 'income' ? 'var(--bg-surface)' : 'transparent',
              color: type === 'income' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              boxShadow: type === 'income' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Receita (+)
          </button>
        </div>

        {/* Descrição */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Descrição
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Supermercado, Salário, Internet"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-page)',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>

        {/* Valor e Data */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Valor (R$)
            </label>
            <input
              type="text"
              required
              placeholder="0,00"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="tabular-nums"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                outline: 'none',
                fontWeight: 600,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Data
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Categoria e Conta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                outline: 'none',
              }}
            >
              {(type === 'expense' ? CATEGORIES_EXPENSE : CATEGORIES_INCOME).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Conta / Origem
            </label>
            <input
              type="text"
              placeholder="Ex: Nubank, Itaú, Carteira"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Salvar Transação
          </Button>
        </div>
      </form>
    </Modal>
  );
};
