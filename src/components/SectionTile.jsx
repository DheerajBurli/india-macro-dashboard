import React from 'react';
import './SectionTile.css';

export default function SectionTile({ section, index, onClick }) {
  return (
    <button
      className={`section-tile section-tile--${section.accent} anim-fade`}
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={onClick}
    >
      <div className="tile-top">
        <span className="tile-icon">{section.icon}</span>
        {section.gdpShare !== null && (
          <span className="tile-share" style={{ color: section.color }}>
            {section.gdpShare > 0 ? `~${section.gdpShare}%` : `${section.gdpShare}%`}
            <span className="tile-share-label"> of GDP</span>
          </span>
        )}
      </div>

      <div className="tile-name">{section.label}</div>
      <div className="tile-component">{section.longLabel}</div>
      <div className="tile-desc">{section.description}</div>

      <div className="tile-footer">
        <span className="tile-count">{section.indicators.length} indicators</span>
        <span className="tile-arrow">›</span>
      </div>
    </button>
  );
}
