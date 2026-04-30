import React, { useState, useEffect } from 'react';
import TopBar     from './components/TopBar';
import HomePage   from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { SECTIONS } from './data/indicators';
import './styles/app.css';

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('imd-theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('imd-font') || '15'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('imd-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    localStorage.setItem('imd-font', fontSize);
  }, [fontSize]);

  const section = activeSection ? SECTIONS.find(s => s.key === activeSection) : null;

  return (
    <div className="app-shell">
      <TopBar
        section={section}
        onBack={() => setActiveSection(null)}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        fontSize={fontSize}
        onFontSize={setFontSize}
      />
      <main className="app-main">
        {!activeSection
          ? <HomePage onOpen={setActiveSection} />
          : <DetailPage section={section} key={activeSection} />
        }
      </main>
    </div>
  );
}
