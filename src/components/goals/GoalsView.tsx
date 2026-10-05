import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Calendar, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { FinancialGoal } from '../../types/finance';
import { formatBRL, formatDate, formatRelativeDate } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface GoalsViewProps {
  goals: FinancialGoal[];
  onAddGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
  onUpdateAmount: (id: string, newAmount: number) => void;
  onDeleteGoal: (id: string) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  onAddGoal,
  onUpdateAmount,
  onDeleteGoal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetStr, setTargetStr] = useState('');
  const [currentStr, setCurrentStr] = useState('');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [category, setCategory] = useState('Reserva / Segurança');

  // Adição de valor rápido a uma meta (+R$ 500, +R$ 1000)
  const handleQuickAdd = (goal: FinancialGoal, increment: number) => {
    const updated = goal.currentAmount + increment;
    onUpdateAmount(goal.id, updated);
    if (updated >= goal.targetAmount) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetStr.replace(',', '.'));
    const curr = currentStr ? parseFloat(currentStr.replace(',', '.')) : 0;

    if (!title.trim() || isNaN(target) || target <= 0) return;

    onAddGoal({
      title: title.trim(),
      targetAmount: target,
      currentAmount: curr,
      deadline,
      category,
    });

    setTitle('');
    setTargetStr('');
    setCurrentStr('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Metas Financeiras & Objetivos
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Defina marcos de economia e acompanhe seu progresso mês a mês
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => setIsModalOpen(true)}
        >
          Nova Meta
        </Button>
      </div>

      {/* Grid de Metas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {goals.map((goal) => {
          const progressPct = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
          const isCompleted = goal.currentAmount >= goal.targetAmount;

          return (
            <div
              key={goal.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: isCompleted ? '1px solid var(--accent-emerald)' : '1px solid var(--border-light)',
                padding: '20px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
              }}
              className="hover-subtle-lift"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {goal.category}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {goal.title}
                  </h4>
                </div>

                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  style={{ color: 'var(--text-muted)', padding: '4px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  title="Excluir meta"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Valores e Porcentagem */}
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }} className="tabular-nums">
                    {formatBRL(goal.currentAmount)}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: isCompleted ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                    {progressPct}%
                  </span>
                </div>

                {/* Barra de Progresso Tátil Suíça */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      backgroundColor: isCompleted ? 'var(--accent-emerald)' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.6s var(--ease-out-spring)',
                    }}
                  />
                </div>
              </div>

              {/* Informações de Meta e Prazo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Target size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>Alvo: <strong>{formatBRL(goal.targetAmount)}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title={`Prazo final: ${formatDate(goal.deadline)}`}>
                  <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>{formatRelativeDate(goal.deadline)}</span>
                </div>
              </div>

              {/* Ações Rápidas de Aporte */}
              {!isCompleted ? (
                <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                  <button
                    onClick={() => handleQuickAdd(goal, 200)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                    }}
                    className="interactive-tap"
                  >
                    + R$ 200
                  </button>
                  <button
                    onClick={() => handleQuickAdd(goal, 500)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                    }}
                    className="interactive-tap"
                  >
                    + R$ 500
                  </button>
                  <button
                    onClick={() => handleQuickAdd(goal, 1000)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                    }}
                    className="interactive-tap"
                  >
                    + R$ 1.000
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '12px', fontWeight: 600 }}>
                  <CheckCircle size={15} /> Meta Atingida! Parabéns!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de Criação de Meta */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Criar Nova Meta Financeira"
        subtitle="Defina o valor alvo e data limite para seu objetivo"
      >
        <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Título do Objetivo
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Viagem Japão, Reserva de Emergência"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Valor Alvo (R$)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 25000,00"
                value={targetStr}
                onChange={(e) => setTargetStr(e.target.value)}
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
                Já Acumulado (R$)
              </label>
              <input
                type="text"
                placeholder="0,00"
                value={currentStr}
                onChange={(e) => setCurrentStr(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Data Limite
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Categoria
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Sonho, Viagem, Bens"
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Meta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
