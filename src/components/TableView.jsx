import React from 'react';
import './TableView.css';

export default function TableView({ indicator, showPred }) {
  const { labels, actuals } = indicator.series;
  const pred = indicator.prediction;
  const unit = indicator.unit;

  const rows = labels.map((lbl, i) => ({ label: lbl, value: actuals[i] })).reverse();

  return (
    <div className="table-view">
      <table className="data-table">
        <thead>
          <tr>
            <th className="col-period">Period</th>
            <th className="col-value">Value ({unit})</th>
            <th className="col-chg">Change vs Prior</th>
            <th className="col-note">Notes</th>
          </tr>
        </thead>
        <tbody>

          {showPred && (
            <tr className="pred-row">
              <td className="col-period">
                <span className="pred-period-tag">Q+1 · Prediction</span>
              </td>
              <td className="col-value">
                {pred.value !== null
                  ? <span className="pred-value">{pred.value} {pred.unit}</span>
                  : <span className="tbd-value">TBD — awaiting ML pipeline</span>}
              </td>
              <td className="col-chg">
                <span className="badge badge-pu">◆ {pred.change}</span>
              </td>
              <td className="col-note">
                <span className="pred-model-tag">{pred.model}</span>
                {pred.confidence !== null && (
                  <span className="pred-conf">{pred.confidence}% conf</span>
                )}
              </td>
            </tr>
          )}

          {showPred && (
            <tr className="sep-row">
              <td colSpan={4}><div className="sep-line">─── historical data (Jan 2015 – Dec 2024) ───</div></td>
            </tr>
          )}

          {rows.map((row, i) => {
            const prevVal = rows[i + 1]?.value ?? null;
            const change  = (row.value !== null && prevVal !== null)
              ? ((row.value - prevVal) / Math.abs(prevVal) * 100).toFixed(1)
              : null;
            const isLatest = i === 0;

            return (
              <tr key={row.label} className={isLatest ? 'latest-row' : ''}>
                <td className="col-period">
                  {isLatest && <span className="latest-tag">LATEST</span>}
                  {row.label}
                </td>
                <td className="col-value">
                  {row.value !== null
                    ? <span className="actual-value">{row.value}</span>
                    : <span className="tbd-value">—</span>}
                </td>
                <td className="col-chg">
                  {change !== null ? (
                    <span className={`badge ${parseFloat(change) >= 0 ? 'badge-pos' : 'badge-neg'}`}>
                      {parseFloat(change) >= 0 ? '▲' : '▼'} {Math.abs(change)}%
                    </span>
                  ) : (
                    <span className="tbd-value">—</span>
                  )}
                </td>
                <td className="col-note">—</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
