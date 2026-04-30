import React from 'react';
import './PredictionPanel.css';

export default function PredictionPanel({ prediction, unit }) {
  const { value, change, direction, confidence, model, metrics } = prediction;

  const dirClass = { pos: 'dir--pos', neg: 'dir--neg', nt: 'dir--nt' }[direction] ?? 'dir--nt';
  const badgeClass = direction === 'pos' ? 'badge-pos' : direction === 'neg' ? 'badge-neg' : 'badge-nt';
  const dirArrow   = direction === 'pos' ? '▲' : direction === 'neg' ? '▼' : '—';

  return (
    <div className="pred-panel">

      <div className="pp-head">
        <span className="pp-head-icon">◆</span>
        <span>Next Quarter Prediction</span>
        <span className={`badge badge-pu pp-model-badge`}>{model}</span>
      </div>

      <div className="pp-value-row">
        <div className={`pp-value ${dirClass}`}>
          {value !== null ? value : <span className="pp-tbd">TBD</span>}
          <span className="pp-unit">{unit}</span>
        </div>
        <div className={`pp-change badge ${badgeClass}`}>
          {dirArrow} {change}
        </div>
      </div>

      <div className="pp-conf-wrap">
        <div className="pp-conf-label">
          <span className="label-sm">Model confidence</span>
          <span className="pp-conf-pct">
            {confidence !== null ? `${confidence}%` : 'Awaiting pipeline'}
          </span>
        </div>
        <div className="pp-conf-bar">
          <div
            className="pp-conf-fill"
            style={{ width: confidence !== null ? `${confidence}%` : '0%' }}
          />
        </div>
      </div>

      <div className="pp-metrics">
        <div className="pp-metric">
          <div className="label-sm">RMSE</div>
          <div className="pp-metric-val">{metrics.rmse}</div>
        </div>
        <div className="pp-metric">
          <div className="label-sm">R²</div>
          <div className="pp-metric-val">{metrics.r2}</div>
        </div>
        <div className="pp-metric">
          <div className="label-sm">Train Periods</div>
          <div className="pp-metric-val">{metrics.trainPeriods}</div>
        </div>
        <div className="pp-metric">
          <div className="label-sm">Model</div>
          <div className="pp-metric-val pp-metric-val--model">{model}</div>
        </div>
      </div>

      <div className="pp-note">
        ⚠ Dummy placeholder — populate <code>indicator.prediction</code> via
        ML pipeline output or <code>public/predictions.json</code>.
        See <code>src/ml/README.md</code>.
      </div>
    </div>
  );
}
