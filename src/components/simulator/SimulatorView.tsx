import { useMemo, useState } from 'react';
import { formatBRL } from '../../utils/formatters';
import { calculateProjection, type ProjectionInputs } from '../../utils/financialProjection';
import './SimulatorView.css';

const defaults: ProjectionInputs = {
  initialAmount: 10000, monthlyContribution: 1000, annualReturnPercent: 10,
  annualInflationPercent: 4, monthlyExpenses: 5000, withdrawalRatePercent: 4, years: 30,
};

const fields: { key: keyof ProjectionInputs; label: string; suffix: string; min: number; max: number; step: number }[] = [
  { key: 'initialAmount', label: 'Capital inicial', suffix: 'R$', min: 0, max: 1e10, step: 100 },
  { key: 'monthlyContribution', label: 'Aporte mensal', suffix: 'R$', min: 0, max: 1e9, step: 100 },
  { key: 'annualReturnPercent', label: 'Rentabilidade anual', suffix: '%', min: -99, max: 100, step: 0.1 },
  { key: 'annualInflationPercent', label: 'Inflação anual', suffix: '%', min: 0, max: 100, step: 0.1 },
  { key: 'monthlyExpenses', label: 'Despesas mensais desejadas', suffix: 'R$', min: 0, max: 1e9, step: 100 },
  { key: 'withdrawalRatePercent', label: 'Taxa anual de retirada', suffix: '%', min: 0.1, max: 100, step: 0.1 },
  { key: 'years', label: 'Horizonte', suffix: 'anos', min: 1, max: 60, step: 1 },
];

export function SimulatorView() {
  const [values, setValues] = useState<Record<keyof ProjectionInputs, string>>(
    Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, String(value)])) as Record<keyof ProjectionInputs, string>,
  );
  const parsed = useMemo(() => Object.fromEntries(Object.entries(values).map(([key, value]) =>
    [key, Number(value)])) as unknown as ProjectionInputs, [values]);
  const invalid = fields.some(({ key, min, max, step }) => values[key].trim() === '' ||
    !Number.isFinite(parsed[key]) || parsed[key] < min || parsed[key] > max ||
    (step === 1 && !Number.isInteger(parsed[key])));
  const projection = useMemo(() => invalid ? null : calculateProjection(parsed), [invalid, parsed]);
  const final = projection?.years.at(-1);
  const maxBalance = final?.balance || 1;

  return <section className="simulator animate-fade-in" aria-labelledby="simulator-heading">
    <header className="simulator-heading">
      <div>
        <p className="simulator-eyebrow">PLANEJAMENTO / PROJEÇÃO</p>
        <h2 id="simulator-heading">Juros compostos & independência financeira</h2>
        <p>Explore como aportes mensais e tempo podem transformar seu patrimônio.</p>
      </div>
    </header>

    <div className="simulator-layout">
      <div className="simulator-card simulator-inputs">
        <h3>Parâmetros</h3>
        <div className="simulator-field-grid">
          {fields.map(({ key, label, suffix, min, max, step }) => <label className="simulator-field" key={key}>
            <span>{label}</span>
            <span className="simulator-input-wrap">
              <input type="number" inputMode="decimal" min={min} max={max} step={step}
                value={values[key]} onChange={event => setValues(previous => ({ ...previous, [key]: event.target.value }))} />
              <span aria-hidden="true">{suffix}</span>
            </span>
          </label>)}
        </div>
        {invalid && <p className="simulator-error" role="alert">Revise os campos: valores vazios ou fora dos limites não podem ser projetados.</p>}
        <p className="simulator-note">Aporte aplicado ao fim de cada mês. Rentabilidade e inflação são taxas anuais efetivas constantes. Valores futuros são estimativas antes de impostos e taxas.</p>
      </div>

      {projection && final && <div className="simulator-results">
        <div className="simulator-card simulator-highlight">
          <p>Patrimônio projetado em {parsed.years} anos</p>
          <strong className="tabular-nums">{formatBRL(final.balance)}</strong>
          <div className="simulator-breakdown">
            <span>Aportes <b className="tabular-nums">{formatBRL(final.contributions)}</b></span>
            <span>Rendimento <b className="tabular-nums">{formatBRL(final.earnings)}</b></span>
            <span>Em reais de hoje <b className="tabular-nums">{formatBRL(final.realBalance)}</b></span>
          </div>
        </div>
        <div className="simulator-card simulator-target">
          <div><p>Meta de independência, em reais de hoje</p><strong className="tabular-nums">{formatBRL(projection.independenceTarget)}</strong></div>
          <p>{projection.independenceMonth === null
            ? 'Meta não alcançada no horizonte simulado.'
            : projection.independenceMonth === 0 ? 'Meta já alcançada com o capital inicial.'
              : `Meta alcançada após ${projection.independenceMonth} meses (${(projection.independenceMonth / 12).toFixed(1)} anos).`}</p>
          <small>Meta = despesas mensais × 12 ÷ taxa anual de retirada. Compara-se ao patrimônio descontado pela inflação.</small>
        </div>
      </div>}
    </div>

    {projection && <div className="simulator-card simulator-evolution">
      <div className="simulator-section-title"><h3>Evolução anual</h3><span>Saldo nominal · Aportes acumulados</span></div>
      <div className="simulator-bars" role="img" aria-label="Gráfico de evolução anual do saldo e dos aportes acumulados">
        {projection.years.slice(1).map(row => <div className="simulator-bar-column" key={row.year}
          title={`Ano ${row.year}: saldo ${formatBRL(row.balance)}, aportes ${formatBRL(row.contributions)}`}>
          <div className="simulator-bar-stack" style={{ height: `${Math.max(2, row.balance / maxBalance * 100)}%` }}>
            <div className="simulator-bar-contribution" style={{ height: `${Math.min(100, Math.max(0, row.contributions / (row.balance || 1) * 100))}%` }} />
          </div><span>{row.year}</span>
        </div>)}
      </div>
      <div className="simulator-legend"><span><i /> Saldo projetado</span><span><i /> Aportes acumulados</span></div>
      <div className="simulator-table-scroll"><table className="simulator-table">
        <thead><tr><th>Ano</th><th>Saldo nominal</th><th>Aportes</th><th>Rendimentos</th><th>Saldo real</th></tr></thead>
        <tbody>{projection.years.map(row => <tr key={row.year}><th>{row.year}</th><td>{formatBRL(row.balance)}</td><td>{formatBRL(row.contributions)}</td><td>{formatBRL(row.earnings)}</td><td>{formatBRL(row.realBalance)}</td></tr>)}</tbody>
      </table></div>
    </div>}
  </section>;
}
