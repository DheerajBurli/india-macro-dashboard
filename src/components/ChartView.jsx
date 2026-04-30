import React, { useRef, useEffect } from 'react';
import {
  Chart, LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip, Filler,
} from 'chart.js';
import './ChartView.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

export default function ChartView({ indicator, sectionColor, showPred }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    const ctx  = canvasRef.current.getContext('2d');
    const dark = isDark();
    const { labels, actuals } = indicator.series;
    const pred = indicator.prediction;

    const gridColor  = dark ? 'rgba(26,41,64,.85)' : 'rgba(185,208,228,.5)';
    const tickColor  = dark ? '#3a5270'             : '#6a86a4';
    const tooltipBg  = dark ? '#0e1520'             : '#ffffff';
    const tooltipBdr = dark ? '#1a2940'             : '#c8d8e8';
    const purpleCol  = dark ? '#a06aff'             : '#7340d6';

    const tickCfg = {
      color: tickColor,
      font: { size: 10, family: "'IBM Plex Mono'" },
      maxRotation: 45,
    };

    // Thin out labels for readability on 120-point monthly series
    const step = labels.length >= 100 ? 12 : labels.length >= 40 ? 6 : 1;
    const displayLabels = labels.map((l, i) => i % step === 0 ? l : '');

    const actualData = [...actuals];
    const predData   = actuals.map(() => null);

    if (showPred) {
      const label = pred.value !== null ? 'Q+1 (pred)' : 'Q+1 TBD';
      displayLabels.push(label);
      actualData.push(null);
      predData.push(pred.value);
    }

    const datasets = [
      {
        label: indicator.name,
        data: actualData,
        borderColor: sectionColor,
        backgroundColor: `${sectionColor}1a`,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: sectionColor,
        tension: 0.38,
        fill: true,
        spanGaps: false,
      },
    ];

    if (showPred) {
      datasets.push({
        label: 'Prediction',
        data: predData,
        borderColor: purpleCol,
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        borderDash: [6, 4],
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: purpleCol,
        tension: 0.2,
        fill: false,
        spanGaps: false,
      });
    }

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: { labels: displayLabels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            borderColor: tooltipBdr,
            borderWidth: 1,
            padding: 10,
            titleFont: { family: "'IBM Plex Mono'", size: 11 },
            bodyFont:  { family: "'IBM Plex Mono'", size: 11 },
            titleColor: dark ? '#eaf0fa' : '#0d1826',
            bodyColor:  dark ? '#8aa4c0' : '#3a5270',
            callbacks: {
              label: c => {
                const v = c.parsed.y;
                return v === null
                  ? `${c.dataset.label}: awaiting data`
                  : `${c.dataset.label}: ${v} ${indicator.unit}`;
              },
            },
          },
        },
        scales: {
          x: { grid: { color: gridColor, drawBorder: false }, ticks: tickCfg },
          y: { grid: { color: gridColor, drawBorder: false }, ticks: { ...tickCfg, maxRotation: 0 } },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [indicator, sectionColor, showPred]);

  return (
    <div className="chart-view">
      <div className="chart-header">
        <div className="chart-title">{indicator.name}</div>
        <div className="chart-unit">{indicator.unit}</div>
        <div className="chart-range-note">Jan 2015 – Dec 2024 · 10 yrs</div>
        {showPred && (
          <div className="chart-pred-legend">
            <span className="cpleg" style={{ background: sectionColor }} />
            <span className="cpleg-label">Historical</span>
            <span className="cpleg cpleg--pred" />
            <span className="cpleg-label">Q+1 Prediction</span>
          </div>
        )}
      </div>
      <div className="chart-canvas-wrap">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
