import React from 'react';
import { SECTIONS } from '../data/indicators';
import SectionTile from '../components/SectionTile';
import './HomePage.css';

export default function HomePage({ onOpen }) {
  return (
    <div className="home-page anim-fade">
      <div className="home-header">
        <div className="home-title">GDP Component Tracker</div>
        <div className="home-sub">40 high-frequency indicators · 5 GDP components · Quarterly ML forecasts</div>
      </div>

      <div className="tiles-grid">
        {SECTIONS.map((section, i) => (
          <SectionTile key={section.key} section={section} index={i} onClick={() => onOpen(section.key)} />
        ))}
      </div>

      <div className="home-footer">
        <span className="footer-sources">
          Sources: NSO · MOSPI · RBI · NPCI · SIAM · DGCI&S · CGA/MoF · PPAC · CEA · IMD · S&P Global · ICE · DPIIT · CMIE
        </span>
      </div>
    </div>
  );
}
