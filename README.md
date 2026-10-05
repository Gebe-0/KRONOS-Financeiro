# 🇨🇭 KRONOS — Minimalist Financial & Portfolio OS

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Design](https://img.shields.io/badge/Design-Swiss_International_Style-000000?style=flat)](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
[![Motion](https://img.shields.io/badge/Motion-Emil_Kowalski_Principles-059669?style=flat)](https://github.com/emilkowalski/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **KRONOS** é uma aplicação web de gestão patrimonial e acompanhamento de carteira de investimentos com foco em **rigor tipográfico**, clareza contábil e microinterações táteis e refinadas inspiradas no **Estilo Internacional Suíço** e nos princípios de design engineering de **Emil Kowalski**.

---

## ⚡ Destaques do Projeto

- 📐 **Estética Suíça Minimalista**: Fundo claro e neutro (`#F8FAFC`), cartões puros com bordas cirúrgicas de 1px (`#E2E8F0`), sem sombras pesadas ou clichês de IA.
- 🔢 **Tipografia com Números Tabulares**: Uso estrito de `font-feature-settings: "tnum"` para garantir alinhamento vertical matemático perfeito de moedas e percentuais.
- 📊 **Visualização Gráfica em SVG Nativo**: Gráficos customizados e ultra-leves (Fluxo de Caixa Mensal Entradas/Saídas e Donut Chart de distribuição de categorias) com zero dependências externas inchadas.
- 💼 **Carteira Multiativos**: Acompanhamento de Renda Fixa, Ações B3, FIIs e Criptoativos com cálculo dinâmico de rentabilidade, preço médio e edição rápida de cotações inline.
- 🎯 **Metas Financeiras Interativas**: Barras de progresso com aportes rápidos em um clique (+R$ 200, +R$ 500, +R$ 1.000) e animação comemorativa ao atingir o objetivo.
- 💾 **Persistência em LocalStorage & Portabilidade**: Seus dados ficam salvos no navegador, com suporte completo para exportar backup em JSON e restaurar o estado de demonstração a qualquer momento.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Framework** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) |
| **Design System & Estilos** | CSS Moderno com Design Tokens Suíços e Variáveis CSS |
| **Microinterações** | Princípios de Física e Curvas Bézier (`cubic-bezier(0.16, 1, 0.3, 1)`) |
| **Ícones** | [Lucide React](https://lucide.dev/) (Vetoriais, sem uso de emojis como ícones) |
| **Efeitos Táteis** | Canvas Confetti para celebrações de metas atingidas |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/KRONOS-financial-dashboard.git
   cd KRONOS-financial-dashboard
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador:**
   ```
   http://localhost:5173/
   ```

---

## 🏛️ Estrutura de Arquitetura

```
├── src/
│   ├── components/
│   │   ├── charts/         # Gráficos SVG (Fluxo de Caixa e Donut)
│   │   ├── goals/          # Metas financeiras e barras de progresso
│   │   ├── investments/    # Carteira de ativos e cotações inline
│   │   ├── layout/         # Header, Navbar e navegação por abas
│   │   ├── metrics/        # Cards de estatísticas e KPIs
│   │   ├── transactions/   # Lista de transações, filtros e busca
│   │   └── ui/             # Botões, Badges e Modais acessíveis
│   ├── context/
│   │   └── FinanceContext.tsx # Estado reativo global e persistência
│   ├── styles/
│   │   ├── tokens.css      # Variáveis de cores, raios e tipografia suíça
│   │   ├── globals.css     # Reset, números tabulares e fontes
│   │   └── animations.css  # Microinterações no padrão Emil Kowalski
│   ├── types/
│   │   └── finance.ts      # Tipos TypeScript para transações e investimentos
│   └── utils/
│       ├── formatters.ts   # Formatação de moedas (BRL), percentuais e datas
│       ├── seedData.ts     # Dados realistas para demonstração imediata
│       └── storage.ts      # Abstração de leitura/escrita em LocalStorage e JSON
```

---

## 📄 Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
