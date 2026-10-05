import type { Transaction, InvestmentAsset, FinancialGoal } from '../types/finance';
import { INITIAL_TRANSACTIONS, INITIAL_ASSETS, INITIAL_GOALS } from './seedData';

const STORAGE_KEYS = {
  TRANSACTIONS: 'kronos_transactions_v1',
  ASSETS: 'kronos_assets_v1',
  GOALS: 'kronos_goals_v1',
};

export const loadStoredData = () => {
  try {
    const rawTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const rawAst = localStorage.getItem(STORAGE_KEYS.ASSETS);
    const rawGoals = localStorage.getItem(STORAGE_KEYS.GOALS);

    const transactions: Transaction[] = rawTx ? JSON.parse(rawTx) : INITIAL_TRANSACTIONS;
    const assets: InvestmentAsset[] = rawAst ? JSON.parse(rawAst) : INITIAL_ASSETS;
    const goals: FinancialGoal[] = rawGoals ? JSON.parse(rawGoals) : INITIAL_GOALS;

    return { transactions, assets, goals };
  } catch (error) {
    console.error('Falha ao ler dados do LocalStorage, usando seed inicial:', error);
    return {
      transactions: INITIAL_TRANSACTIONS,
      assets: INITIAL_ASSETS,
      goals: INITIAL_GOALS,
    };
  }
};

export const saveTransactions = (transactions: Transaction[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Falha ao salvar transações no LocalStorage:', error);
  }
};

export const saveAssets = (assets: InvestmentAsset[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  } catch (error) {
    console.error('Falha ao salvar investimentos no LocalStorage:', error);
  }
};

export const saveGoals = (goals: FinancialGoal[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  } catch (error) {
    console.error('Falha ao salvar metas no LocalStorage:', error);
  }
};

export const exportProjectData = (data: {
  transactions: Transaction[];
  assets: InvestmentAsset[];
  goals: FinancialGoal[];
}) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute(
    'download',
    `kronos-finance-backup-${new Date().toISOString().slice(0, 10)}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const resetToSeedData = () => {
  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  localStorage.removeItem(STORAGE_KEYS.ASSETS);
  localStorage.removeItem(STORAGE_KEYS.GOALS);
  return {
    transactions: INITIAL_TRANSACTIONS,
    assets: INITIAL_ASSETS,
    goals: INITIAL_GOALS,
  };
};
