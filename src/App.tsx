import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  PieChart as PieIcon,
  ShieldCheck
} from 'lucide-react';
import { useFinance } from './context/FinanceContext';
import { Navbar } from './components/layout/Navbar';
import { StatCard } from './components/metrics/StatCard';
import { CashFlowChart } from './components/charts/CashFlowChart';
import { AllocationDonut } from './components/charts/AllocationDonut';
import { TransactionList } from './components/transactions/TransactionList';
import { NewTransactionModal } from './components/transactions/NewTransactionModal';
import { AssetList } from './components/investments/AssetList';
import { NewAssetModal } from './components/investments/NewAssetModal';
import { GoalsView } from './components/goals/GoalsView';
import { Button } from './components/ui/Button';
import { formatBRL, formatPercent } from './utils/formatters';

export const App: React.FC = () => {
  const {
    transactions,
    assets,
    goals,
    totalBalance,
    totalIncomeMonth,
    totalExpenseMonth,
    portfolioSummary,
    netWorth,
    cashFlowHistory,
    categoryExpenses,
    addTransaction,
    deleteTransaction,
    addAsset,
    updateAssetPrice,
    deleteAsset,
    addGoal,
    updateGoalAmount,
    deleteGoal,
    exportData,
    resetData,
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'investments' | 'goals'>('overview');
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={exportData}
        onReset={resetData}
      />

      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '32px 24px' }}>
        {/* Bloco Superior de Boas-Vindas e Ação Rápida */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Painel Financeiro Consolidado
              </h1>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }}></span>
                Ao Vivo
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Gestão patrimonial com padrão internacional suíço e controle em tempo real.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="outline"
              size="sm"
              icon={<Plus size={15} />}
              onClick={() => setIsAssetModalOpen(true)}
            >
              Novo Ativo
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={15} />}
              onClick={() => setIsTxModalOpen(true)}
            >
              Nova Transação
            </Button>
          </div>
        </div>

        {/* 4 KPIs Fundamentais */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <StatCard
            title="Patrimônio Total"
            value={netWorth}
            subtitle="Saldo em conta + Carteira de investimentos"
            change={8.4}
            icon={<Wallet size={18} />}
            variant="default"
          />

          <StatCard
            title="Saldo Disponível"
            value={totalBalance}
            subtitle="Receitas subtraídas de despesas"
            change={12.1}
            icon={<ShieldCheck size={18} />}
            variant={totalBalance >= 0 ? 'positive' : 'negative'}
          />

          <StatCard
            title="Receitas no Mês"
            value={totalIncomeMonth}
            subtitle="Salários, dividendos e extras"
            change={4.5}
            icon={<ArrowUpRight size={18} />}
            variant="positive"
          />

          <StatCard
            title="Despesas no Mês"
            value={totalExpenseMonth}
            subtitle="Gastos fixos e variáveis"
            change={-2.3}
            changeLabel="abaixo da meta"
            icon={<ArrowDownRight size={18} />}
            variant="negative"
          />
        </section>

        {/* Conteúdo Renderizado Baseado na Aba Ativa */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Gráficos Principais */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <CashFlowChart data={cashFlowHistory} />
              <AllocationDonut categories={categoryExpenses} totalExpense={totalExpenseMonth} />
            </div>

            {/* Destaque de Investimentos e Metas Recentes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Card Resumo de Carteira */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
                className="animate-fade-in"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Rentabilidade da Carteira
                    </h3>
                    <TrendingUp size={18} style={{ color: 'var(--accent-emerald)' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Alocação diversificada em {assets.length} ativos
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)' }} className="tabular-nums">
                    {formatBRL(portfolioSummary.totalCurrent)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginTop: '4px' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                      +{formatBRL(portfolioSummary.totalProfitLoss)} ({formatPercent(portfolioSummary.profitPercentage)})
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>de lucro histórico</span>
                  </div>
                </div>

                <Button variant="secondary" size="sm" onClick={() => setActiveTab('investments')}>
                  Ver Detalhes da Carteira →
                </Button>
              </div>

              {/* Card Resumo de Metas */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
                className="animate-fade-in"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Objetivos & Metas
                    </h3>
                    <PieIcon size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {goals.length} metas em acompanhamento ativo
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {goals.slice(0, 2).map(g => (
                    <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{g.title}</span>
                      <span style={{ fontWeight: 600 }} className="tabular-nums">
                        {Math.round((g.currentAmount / g.targetAmount) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>

                <Button variant="secondary" size="sm" onClick={() => setActiveTab('goals')}>
                  Gerenciar Metas →
                </Button>
              </div>
            </div>

            {/* Transações Recentes */}
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onOpenNewModal={() => setIsTxModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'transactions' && (
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onOpenNewModal={() => setIsTxModalOpen(true)}
          />
        )}

        {activeTab === 'investments' && (
          <AssetList
            assets={assets}
            onDelete={deleteAsset}
            onUpdatePrice={updateAssetPrice}
            onOpenNewModal={() => setIsAssetModalOpen(true)}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsView
            goals={goals}
            onAddGoal={addGoal}
            onUpdateAmount={updateGoalAmount}
            onDeleteGoal={deleteGoal}
          />
        )}
      </main>

      {/* Modais de Cadastro */}
      <NewTransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        onSubmit={addTransaction}
      />

      <NewAssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSubmit={addAsset}
      />

      {/* Footer Minimalista Suíço */}
      <footer style={{ borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--bg-surface)', padding: '24px 0', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>KRONOS</span>
            <span>— Minimalist Financial Intelligence System</span>
          </div>
          <div>
            Built with React, TypeScript & Swiss Design Philosophy
          </div>
        </div>
      </footer>
    </div>
  );
};
