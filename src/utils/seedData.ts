import type { Transaction, InvestmentAsset, FinancialGoal } from '../types/finance';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Salário Tech Lead / Desenvolvedor',
    amount: 14500.00,
    type: 'income',
    category: 'Salário',
    date: '2026-10-01',
    account: 'Nubank PJ',
    notes: 'Recebimento mensal regular'
  },
  {
    id: 'tx-2',
    description: 'Dividendos & Rendimentos FIIs',
    amount: 720.50,
    type: 'income',
    category: 'Investimentos',
    date: '2026-10-03',
    account: 'BTG Pactual'
  },
  {
    id: 'tx-3',
    description: 'Aluguel & Condomínio',
    amount: 3200.00,
    type: 'expense',
    category: 'Moradia',
    date: '2026-10-02',
    account: 'Itaú'
  },
  {
    id: 'tx-4',
    description: 'Supermercado Mensal Orgânico',
    amount: 1450.80,
    type: 'expense',
    category: 'Alimentação',
    date: '2026-10-03',
    account: 'Nubank'
  },
  {
    id: 'tx-5',
    description: 'Internet Fibra 1Gbps + Assinaturas Cloud',
    amount: 349.90,
    type: 'expense',
    category: 'Serviços',
    date: '2026-10-04',
    account: 'Nubank'
  },
  {
    id: 'tx-6',
    description: 'Aporte Carteira de Renda Fixa (CDB 115% CDI)',
    amount: 3500.00,
    type: 'expense',
    category: 'Investimentos',
    date: '2026-10-04',
    account: 'BTG Pactual'
  },
  {
    id: 'tx-7',
    description: 'Combustível & Manutenção Carro',
    amount: 480.00,
    type: 'expense',
    category: 'Transporte',
    date: '2026-10-05',
    account: 'Nubank'
  },
  {
    id: 'tx-8',
    description: 'Jantar Restaurante Gastronômico',
    amount: 380.00,
    type: 'expense',
    category: 'Lazer',
    date: '2026-10-05',
    account: 'Nubank'
  }
];

export const INITIAL_ASSETS: InvestmentAsset[] = [
  {
    id: 'ast-1',
    ticker: 'TD-IPCA+2035',
    name: 'Tesouro IPCA+ com Juros Semestrais',
    category: 'renda-fixa',
    quantity: 6,
    averagePrice: 3200.00,
    currentPrice: 3420.00,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-2',
    ticker: 'CDB-LIQ-110%',
    name: 'CDB Banco Inter 110% do CDI',
    category: 'renda-fixa',
    quantity: 1,
    averagePrice: 28500.00,
    currentPrice: 29840.00,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-3',
    ticker: 'WEGE3',
    name: 'WEG S.A. ON',
    category: 'acoes',
    quantity: 250,
    averagePrice: 42.50,
    currentPrice: 53.80,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-4',
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    category: 'acoes',
    quantity: 300,
    averagePrice: 29.80,
    currentPrice: 35.40,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-5',
    ticker: 'HGLG11',
    name: 'CSHG Logística FII',
    category: 'fiis',
    quantity: 120,
    averagePrice: 158.00,
    currentPrice: 167.50,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-6',
    ticker: 'KNCR11',
    name: 'Kinea Rendimentos Imobiliários',
    category: 'fiis',
    quantity: 180,
    averagePrice: 99.20,
    currentPrice: 104.10,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-7',
    ticker: 'BTC',
    name: 'Bitcoin',
    category: 'cripto',
    quantity: 0.085,
    averagePrice: 310000.00,
    currentPrice: 385000.00,
    lastUpdated: '2026-10-05'
  },
  {
    id: 'ast-8',
    ticker: 'ETH',
    name: 'Ethereum',
    category: 'cripto',
    quantity: 1.25,
    averagePrice: 14200.00,
    currentPrice: 16800.00,
    lastUpdated: '2026-10-05'
  }
];

export const INITIAL_GOALS: FinancialGoal[] = [
  {
    id: 'goal-1',
    title: 'Reserva de Emergência (6 Meses)',
    targetAmount: 50000.00,
    currentAmount: 42500.00,
    deadline: '2026-12-31',
    category: 'Segurança'
  },
  {
    id: 'goal-2',
    title: 'Aporte de Fim de Ano & Rebalanceamento',
    targetAmount: 20000.00,
    currentAmount: 14800.00,
    deadline: '2026-11-30',
    category: 'Investimento'
  },
  {
    id: 'goal-3',
    title: 'Upgrade Setup Dev & Estação de Trabalho',
    targetAmount: 12000.00,
    currentAmount: 8500.00,
    deadline: '2027-02-28',
    category: 'Carreira'
  }
];
