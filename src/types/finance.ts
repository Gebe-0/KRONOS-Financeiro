export interface Transaction {
  id: string;
  description: string;
  amount: number; // Positivo para receitas, positivo em despesas (o tipo define o sinal nos cálculos)
  type: 'income' | 'expense';
  category: string;
  date: string; // YYYY-MM-DD
  account?: string;
  notes?: string;
}

export type AssetCategory = 'renda-fixa' | 'acoes' | 'fiis' | 'cripto' | 'internacional';

export interface InvestmentAsset {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  lastUpdated: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // YYYY-MM-DD
  category: string;
  color?: string;
}

export interface CashFlowMonth {
  month: string; // ex: 'Jan', 'Fev'
  income: number;
  expense: number;
  net: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PortfolioSummaryData {
  totalInvested: number;
  totalCurrent: number;
  totalProfitLoss: number;
  profitPercentage: number;
}
