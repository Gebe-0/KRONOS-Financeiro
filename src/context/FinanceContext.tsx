import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Transaction, 
  InvestmentAsset, 
  FinancialGoal, 
  CashFlowMonth, 
  CategoryExpense, 
  PortfolioSummaryData 
} from '../types/finance';
import { 
  loadStoredData, 
  saveTransactions, 
  saveAssets, 
  saveGoals, 
  resetToSeedData,
  exportProjectData 
} from '../utils/storage';

interface FinanceContextType {
  transactions: Transaction[];
  assets: InvestmentAsset[];
  goals: FinancialGoal[];
  
  // Ações de Transação
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  
  // Ações de Investimento
  addAsset: (asset: Omit<InvestmentAsset, 'id' | 'lastUpdated'>) => void;
  updateAssetPrice: (id: string, newPrice: number) => void;
  deleteAsset: (id: string) => void;
  
  // Ações de Metas
  addGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
  updateGoalAmount: (id: string, newAmount: number) => void;
  deleteGoal: (id: string) => void;

  // Utilitários de Dados
  resetData: () => void;
  exportData: () => void;
  importData: (jsonData: { transactions?: Transaction[]; assets?: InvestmentAsset[]; goals?: FinancialGoal[] }) => boolean;

  // Cálculos Derivados
  totalBalance: number;
  totalIncomeMonth: number;
  totalExpenseMonth: number;
  portfolioSummary: PortfolioSummaryData;
  netWorth: number;
  cashFlowHistory: CashFlowMonth[];
  categoryExpenses: CategoryExpense[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(() => loadStoredData());

  const { transactions, assets, goals } = data;

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveAssets(assets);
  }, [assets]);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  // Transações
  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setData(prev => ({
      ...prev,
      transactions: [created, ...prev.transactions]
    }));
  };

  const deleteTransaction = (id: string) => {
    setData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  // Investimentos
  const addAsset = (newAsset: Omit<InvestmentAsset, 'id' | 'lastUpdated'>) => {
    const created: InvestmentAsset = {
      ...newAsset,
      id: `ast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };
    setData(prev => ({
      ...prev,
      assets: [...prev.assets, created]
    }));
  };

  const updateAssetPrice = (id: string, newPrice: number) => {
    setData(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? { ...a, currentPrice: newPrice, lastUpdated: new Date().toISOString().slice(0, 10) } : a)
    }));
  };

  const deleteAsset = (id: string) => {
    setData(prev => ({
      ...prev,
      assets: prev.assets.filter(a => a.id !== id)
    }));
  };

  // Metas
  const addGoal = (newGoal: Omit<FinancialGoal, 'id'>) => {
    const created: FinancialGoal = {
      ...newGoal,
      id: `goal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, created]
    }));
  };

  const updateGoalAmount = (id: string, newAmount: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === id ? { ...g, currentAmount: newAmount } : g)
    }));
  };

  const deleteGoal = (id: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
  };

  // Reset e Export/Import
  const resetData = () => {
    const clean = resetToSeedData();
    setData(clean);
  };

  const exportData = () => {
    exportProjectData({ transactions, assets, goals });
  };

  const importData = (imported: { transactions?: Transaction[]; assets?: InvestmentAsset[]; goals?: FinancialGoal[] }) => {
    try {
      if (Array.isArray(imported.transactions) || Array.isArray(imported.assets) || Array.isArray(imported.goals)) {
        setData(prev => ({
          transactions: imported.transactions || prev.transactions,
          assets: imported.assets || prev.assets,
          goals: imported.goals || prev.goals,
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Cálculos de Transações do Mês Corrente
  const { totalBalance, totalIncomeMonth, totalExpenseMonth } = useMemo(() => {
    let income = 0;
    let expense = 0;
    
    transactions.forEach(tx => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else {
        expense += tx.amount;
      }
    });

    const balance = income - expense;
    return {
      totalBalance: balance,
      totalIncomeMonth: income,
      totalExpenseMonth: expense
    };
  }, [transactions]);

  // Cálculos da Carteira de Investimentos
  const portfolioSummary = useMemo<PortfolioSummaryData>(() => {
    let totalInvested = 0;
    let totalCurrent = 0;

    assets.forEach(asset => {
      totalInvested += asset.quantity * asset.averagePrice;
      totalCurrent += asset.quantity * asset.currentPrice;
    });

    const totalProfitLoss = totalCurrent - totalInvested;
    const profitPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    return {
      totalInvested,
      totalCurrent,
      totalProfitLoss,
      profitPercentage
    };
  }, [assets]);

  // Patrimônio Líquido Total (Saldo em Caixa + Investimentos)
  const netWorth = useMemo(() => {
    return totalBalance + portfolioSummary.totalCurrent;
  }, [totalBalance, portfolioSummary.totalCurrent]);

  // Histórico de Fluxo de Caixa (Mensal para Gráficos)
  const cashFlowHistory = useMemo<CashFlowMonth[]>(() => {
    const monthsMap: Record<string, { income: number; expense: number }> = {
      'Mai': { income: 13200, expense: 8400 },
      'Jun': { income: 14100, expense: 9100 },
      'Jul': { income: 13800, expense: 8800 },
      'Ago': { income: 15200, expense: 9500 },
      'Set': { income: 14900, expense: 9200 },
      'Out': { income: totalIncomeMonth, expense: totalExpenseMonth }
    };

    return Object.entries(monthsMap).map(([month, val]) => ({
      month,
      income: val.income,
      expense: val.expense,
      net: val.income - val.expense
    }));
  }, [totalIncomeMonth, totalExpenseMonth]);

  // Distribuição de Despesas por Categoria
  const categoryExpenses = useMemo<CategoryExpense[]>(() => {
    const categoryTotals: Record<string, number> = {};
    let totalExp = 0;

    transactions
      .filter(tx => tx.type === 'expense')
      .forEach(tx => {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
        totalExp += tx.amount;
      });

    const colorPalette = [
      '#0F172A', // Slate 900
      '#059669', // Emerald
      '#2563EB', // Blue
      '#D97706', // Amber
      '#7C3AED', // Violet
      '#E11D48', // Rose
      '#64748B'  // Muted Slate
    ];

    return Object.entries(categoryTotals).map(([cat, amt], idx) => ({
      category: cat,
      amount: amt,
      percentage: totalExp > 0 ? (amt / totalExp) * 100 : 0,
      color: colorPalette[idx % colorPalette.length]
    })).sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        assets,
        goals,
        addTransaction,
        deleteTransaction,
        addAsset,
        updateAssetPrice,
        deleteAsset,
        addGoal,
        updateGoalAmount,
        deleteGoal,
        resetData,
        exportData,
        importData,
        totalBalance,
        totalIncomeMonth,
        totalExpenseMonth,
        portfolioSummary,
        netWorth,
        cashFlowHistory,
        categoryExpenses,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider');
  }
  return context;
};
