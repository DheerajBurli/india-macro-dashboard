import React from 'react';
import ChartView       from './ChartView';
import TableView       from './TableView';
import PredictionPanel from './PredictionPanel';
import './IndicatorCard.css';

const FREQ_COLORS = {
  Daily: '#00e87a', Weekly: '#00d8f0', Fortnightly: '#3d8ef8',
  Monthly: '#ffbe00', Quarterly: '#b57bff',
};

export default function IndicatorCard({ indicator, sectionColor, viewMode, showPred, isOpen, onToggle }) {
  const { id, name, source, freq, lag, unit, description, series, prediction } = indicator;

  return (
    <div className={`icard ${isOpen ? 'icard--open' : ''}`}>

      {/* collapsed row */}
      <div className="icard-row" onClick={onToggle}>
        <div className="icard-left">
          <span className="icard-num">#{id}</span>
          <div className="icard-info">
            <span className="icard-name">{name}</span>
            <span className="icard-src">{source}</span>
          </div>
        </div>

        <div className="icard-right">
          <span className="freq-tag" style={{ color: FREQ_COLORS[freq] ?? 'var(--tx2)', borderColor: FREQ_COLORS[freq] ?? 'var(--bdr)' }}>
            {freq}
          </span>
          <span className="unit-tag">{unit}</span>
          {showPred && <span className="badge badge-pu">◆ Q+1: TBD</span>}
          <span className="expand-icon">{isOpen ? '▾' : '›'}</span>
        </div>
      </div>

      {/* expanded body */}
      {isOpen && (
        <div className="icard-body anim-fade">
          <div className="icard-desc">{description}</div>
          <div className={`icard-content ${showPred ? 'icard-content--with-pred' : ''}`}>
            <div className="icard-main">
              {viewMode === 'chart'
                ? <ChartView indicator={indicator} sectionColor={sectionColor} showPred={showPred} />
                : <TableView indicator={indicator} showPred={showPred} />
              }
            </div>
            {showPred && <PredictionPanel prediction={prediction} unit={unit} />}
          </div>
        </div>
      )}
    </div>
  );
}
