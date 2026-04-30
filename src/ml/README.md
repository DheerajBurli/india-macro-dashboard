# ML Prediction Pipeline

> **Status: Placeholder / Dummy Mode**
> All prediction values in `src/data/indicators.js` are currently `null`.
> This file documents where and how to wire in real model outputs.

---

## Architecture (Planned)

```
Raw Data (CSV / API)
     │
     ▼
Feature Engineering  ──►  src/ml/features.js
     │
     ▼
Model Training        ──►  notebooks/ or src/ml/train.py
  - XGBoost (tabular, primary)
  - LSTM     (sequential, time-series)
  - ARIMA    (univariate, fast baseline)
  - Ridge/Lasso Regression (regularised linear)
     │
     ▼
Model Artefacts       ──►  src/ml/models/<indicator_id>.json
     │
     ▼
Inference Endpoint    ──►  src/ml/predict.js  (or Vercel Edge Function)
     │
     ▼
prediction object     ──►  indicator.prediction.value / confidence / metrics
```

---

## Populating Predictions (Two Options)

### Option A — Static JSON (simple)
Run your Python notebook, export results to:
```
public/predictions.json
```

Shape:
```json
{
  "1":  { "value": 22.8, "change": "+5.8%", "direction": "pos", "confidence": 82, "rmse": "0.9", "r2": "0.91" },
  "2":  { "value": 1.95, "change": "+4.8%", "direction": "pos", "confidence": 78, "rmse": "0.04", "r2": "0.88" },
  ...
}
```

Then in `App.jsx` fetch it and merge into `SECTIONS`:
```js
useEffect(() => {
  fetch('/predictions.json')
    .then(r => r.json())
    .then(preds => {
      // merge preds[id] into each indicator.prediction
    });
}, []);
```

### Option B — Vercel Edge Function (production)
Create `api/predict.js` (Vercel serverless):
```js
export default async function handler(req, res) {
  const { indicatorId } = req.query;
  // load model artefact, run inference
  res.json({ value: ..., confidence: ..., ... });
}
```

---

## Train / Test Split Convention
- **Training set**: Q1 FY20 → Q4 FY24  (20 quarters)
- **Validation set**: Q1 FY25 → Q2 FY25  (2 quarters held out)
- **Prediction target**: Q3 FY26 (next quarter from latest data)

---

## Indicator → Model Mapping

| Indicator | Planned Model | Rationale |
|-----------|--------------|-----------|
| UPI Transactions | XGBoost | Tabular, strong seasonality |
| Two-Wheeler Sales | LSTM | Sequential, trend + seasonal |
| FMCG Volume Growth | ARIMA | Univariate, mean-reverting |
| Consumer Credit | Ridge Reg | Linear trend + lag features |
| Capital Goods IIP | Ridge Reg | Volatile, penalise overfitting |
| Cement Dispatches | XGBoost | Non-linear seasonal patterns |
| Merchandise Exports | XGBoost | Multi-feature (FX, global PMI) |
| INR/USD | GARCH+AR | Volatility clustering |
| Brent Crude | Futures+ARIMA | Price discovery in futures |
| Services Exports | Trend+LSTM | Strong structural uptrend |
| Nighttime Lights | CNN+ARIMA | Spatial → temporal aggregation |
| M3 Money Supply | VAR Model | Multivariate monetary system |

---

## Metrics Displayed
- **RMSE** — Root Mean Squared Error on validation set
- **R²**   — Coefficient of determination on validation set
- **Confidence %** — Bootstrap prediction interval width → mapped to 0-100

---

*Replace this README with actual model documentation once the pipeline is built.*
