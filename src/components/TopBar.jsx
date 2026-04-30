import React from 'react';
import './TopBar.css';

export default function TopBar({ section, onBack, theme, onToggleTheme, fontSize, onFontSize }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand">
          <span className="brand-dot" />
          <span className="brand-text">INDIA MACRO DASHBOARD</span>
          {section && (
            <>
              <span className="brand-sep">/</span>
              <span className="brand-section" style={{ color: section.color }}>
                {section.longLabel}
              </span>
            </>
          )}
        </div>
        {section && (
          <button className="back-btn" onClick={onBack}>← All Sections</button>
        )}
      </div>

      <div className="topbar-right">

        {/* Font size adjuster */}
        <div className="font-adjuster">
          <span className="font-label">Aa</span>
          <button className="font-btn" onClick={() => onFontSize(s => Math.max(12, s - 1))} title="Decrease font">A−</button>
          <span className="font-size-display">{fontSize}px</span>
          <button className="font-btn" onClick={() => onFontSize(s => Math.min(22, s + 1))} title="Increase font">A+</button>
        </div>

        {/* Theme toggle */}
        <button className="theme-toggle" onClick={onToggleTheme}>
          <span className="theme-icon">{theme === 'dark' ? '☀' : '☾'}</span>
          <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

      </div>
    </header>
  );
}
