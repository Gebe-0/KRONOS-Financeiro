import React from 'react';
import { Layers, Download, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export type AppTab = 'overview' | 'transactions' | 'investments' | 'goals' | 'simulator';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onExport: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExport,
  onReset,
}) => {
  return (
    <header
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        className="kronos-navbar-inner"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo Suíço Minimalista */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-inverse)',
            }}
          >
            <Layers size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.04em' }}>
                KRONOS
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                }}
              >
                Swiss Edition
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1 }}>
              Financial & Portfolio OS
            </p>
          </div>
        </div>

        {/* Menu de Abas */}
        <nav className="kronos-navbar-tabs" aria-label="Navegação principal" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'transactions', label: 'Transações' },
            { id: 'investments', label: 'Investimentos' },
            { id: 'goals', label: 'Metas' },
            { id: 'simulator', label: 'Simulador' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AppTab)}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                }}
                className="interactive-tap"
              >
                {tab.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '16px',
                      right: '16px',
                      height: '2px',
                      backgroundColor: 'var(--text-primary)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Ações de Dados (Backup e Demonstração) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            variant="ghost"
            size="sm"
            icon={<Download size={14} />}
            onClick={onExport}
            title="Exportar cópia dos dados em JSON"
          >
            Exportar
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={() => {
              if (confirm('Deseja restaurar os dados de demonstração originais?')) {
                onReset();
              }
            }}
            title="Restaurar dados iniciais"
          >
            Reset
          </Button>
        </div>
      </div>
    </header>
  );
};
