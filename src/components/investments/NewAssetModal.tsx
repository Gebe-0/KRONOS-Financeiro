import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { AssetCategory } from '../../types/finance';

interface NewAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    ticker: string;
    name: string;
    category: AssetCategory;
    quantity: number;
    averagePrice: number;
    currentPrice: number;
  }) => void;
}

export const NewAssetModal: React.FC<NewAssetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('acoes');
  const [quantityStr, setQuantityStr] = useState('');
  const [avgPriceStr, setAvgPriceStr] = useState('');
  const [currPriceStr, setCurrPriceStr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityStr.replace(',', '.'));
    const avg = parseFloat(avgPriceStr.replace(',', '.'));
    const curr = currPriceStr ? parseFloat(currPriceStr.replace(',', '.')) : avg;

    if (!ticker.trim() || !name.trim() || isNaN(qty) || qty <= 0 || isNaN(avg) || avg <= 0) {
      return;
    }

    onSubmit({
      ticker: ticker.trim().toUpperCase(),
      name: name.trim(),
      category,
      quantity: qty,
      averagePrice: avg,
      currentPrice: curr,
    });

    setTicker('');
    setName('');
    setQuantityStr('');
    setAvgPriceStr('');
    setCurrPriceStr('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Ativo à Carteira"
      subtitle="Cadastre ações, FIIs, renda fixa ou criptoativos"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Código / Ticker
            </label>
            <input
              type="text"
              required
              placeholder="Ex: WEGE3, BTC"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Nome do Ativo / Descrição
            </label>
            <input
              type="text"
              required
              placeholder="Ex: WEG S.A. ON"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Classe do Ativo
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as AssetCategory)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-page)',
              fontSize: '14px',
            }}
          >
            <option value="renda-fixa">Renda Fixa (Tesouro, CDBs, LCIs)</option>
            <option value="acoes">Ações Brasileiras (B3)</option>
            <option value="fiis">Fundos Imobiliários (FIIs)</option>
            <option value="cripto">Criptomoedas & Web3</option>
            <option value="internacional">Internacional (Stocks & ETFs)</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Quantidade
            </label>
            <input
              type="text"
              required
              placeholder="Ex: 100"
              value={quantityStr}
              onChange={(e) => setQuantityStr(e.target.value)}
              className="tabular-nums"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Preço Médio (R$)
            </label>
            <input
              type="text"
              required
              placeholder="0,00"
              value={avgPriceStr}
              onChange={(e) => setAvgPriceStr(e.target.value)}
              className="tabular-nums"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Preço Atual (R$)
            </label>
            <input
              type="text"
              placeholder="Igual ao médio se vazio"
              value={currPriceStr}
              onChange={(e) => setCurrPriceStr(e.target.value)}
              className="tabular-nums"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-page)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Cadastrar Ativo
          </Button>
        </div>
      </form>
    </Modal>
  );
};
