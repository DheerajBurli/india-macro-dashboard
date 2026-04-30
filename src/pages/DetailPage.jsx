import React, { useState } from 'react';
import IndicatorCard from '../components/IndicatorCard';
import './DetailPage.css';

export default function DetailPage({ section }) {
  const [viewMode, setViewMode] = useState('chart');
  const [showPred, setShowPred] = useState(true);
  const [openCards, setOpenCards] = useState(new Set([section.indicators[0].id]));

  function toggleCard(id) {
    setOpenCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="detail-page anim-fade">
      <div className="detail-header" style={{ borderBottomColor: `${section.colorRaw}55` }}>
        <div className="dh-left">
          <span className="dh-icon">{section.icon}</span>
          <div>
            <div className="dh-title">{section.longLabel}</div>
            <div className="dh-sub">{section.description}</div>
          </div>
        </div>
        <div className="dh-right">
          <label className="pred-toggle">
            <input type="checkbox" checked={showPred} onChange={e => setShowPred(e.target.checked)} />
            <span className="pred-toggle-label">Predictions</span>
          </label>
          <div className="view-toggle">
            <button className={`vbtn ${viewMode === 'chart' ? 'vbtn--on' : ''}`} onClick={() => setViewMode('chart')}>Chart</button>
            <button className={`vbtn ${viewMode === 'table' ? 'vbtn--on' : ''}`} onClick={() => setViewMode('table')}>Table</button>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="ind-list">
          {section.indicators.map(ind => (
            <IndicatorCard
              key={ind.id}
              indicator={ind}
              sectionColor={section.colorRaw}
              viewMode={viewMode}
              showPred={showPred}
              isOpen={openCards.has(ind.id)}
              onToggle={() => toggleCard(ind.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
