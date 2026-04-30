// ── 10-year monthly labels: Jan 2015 → Dec 2024 ─────────────────────────
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const MONTHLY_10Y = [];
for (let yr = 2015; yr <= 2024; yr++) {
  for (const mo of MONTHS_SHORT) MONTHLY_10Y.push(`${mo} ${yr}`);
}

export const QUARTERLY_10Y = [
  'Q1 FY15','Q2 FY15','Q3 FY15','Q4 FY15',
  'Q1 FY16','Q2 FY16','Q3 FY16','Q4 FY16',
  'Q1 FY17','Q2 FY17','Q3 FY17','Q4 FY17',
  'Q1 FY18','Q2 FY18','Q3 FY18','Q4 FY18',
  'Q1 FY19','Q2 FY19','Q3 FY19','Q4 FY19',
  'Q1 FY20','Q2 FY20','Q3 FY20','Q4 FY20',
  'Q1 FY21','Q2 FY21','Q3 FY21','Q4 FY21',
  'Q1 FY22','Q2 FY22','Q3 FY22','Q4 FY22',
  'Q1 FY23','Q2 FY23','Q3 FY23','Q4 FY23',
  'Q1 FY24','Q2 FY24','Q3 FY24','Q4 FY24',
  'Q1 FY25','Q2 FY25',
];

const nulls = (n) => Array(n).fill(null);

const dummyPred = (unit, model = 'Gradient Boost') => ({
  value: null, unit, change: 'TBD', direction: 'nt', confidence: null,
  model, metrics: { rmse: 'TBD', r2: 'TBD', trainPeriods: 40 },
});

// ── CONSUMPTION ──────────────────────────────────────────────────────────
export const CONSUMPTION = [
  { id:1,  name:'UPI Transactions',     source:'NPCI',           freq:'Monthly',      lag:'1 wk',  unit:'₹ L.Cr',   color:'#0fb876', description:'Monthly UPI transaction volume — real-time digital consumption proxy covering retail, P2M and P2P flows.', series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'Gradient Boost') },
  { id:2,  name:'Two-Wheeler Sales',    source:'SIAM / FADA',    freq:'Monthly',      lag:'1 day', unit:'mn units', color:'#0fb876', description:'Monthly 2-wheeler retail sales — best proxy for rural & semi-urban discretionary spending.',               series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn units','LSTM') },
  { id:3,  name:'FMCG Volume Growth',   source:'Nielsen / Kantar',freq:'Monthly',     lag:'3 wks', unit:'% YoY',    color:'#0fb876', description:'Nielsen/Kantar tracked FMCG sell-out volume growth — staples + discretionary consumption basket.',          series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('%',       'ARIMA') },
  { id:4,  name:'Consumer Credit Growth',source:'RBI',           freq:'Fortnightly',  lag:'2 wks', unit:'% YoY',    color:'#0fb876', description:'RBI sectoral credit — personal loans, credit cards, consumer durables financing.',                         series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('%',       'Ridge Reg') },
  { id:5,  name:'Air Passenger Traffic',source:'DGCA',           freq:'Monthly',      lag:'3 wks', unit:'mn pax',   color:'#06bcd4', description:'DGCA domestic + international scheduled pax — high-end services consumption proxy.',                       series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn pax',  'Holt-Winters') },
  { id:6,  name:'E-Commerce GMV',       source:'IAMAI',          freq:'Monthly',      lag:'3 wks', unit:'₹ bn',     color:'#06bcd4', description:'Gross merchandise value across B2C platforms — urban digital consumption channel.',                         series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ bn',    'Gradient Boost') },
  { id:7,  name:'Rural Wage Index',     source:'Labour Bureau',  freq:'Monthly',      lag:'6 wks', unit:'Index',    color:'#06bcd4', description:'Labour Bureau nominal daily agricultural wage index — rural income and consumption capacity.',              series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('Index',   'ARIMA') },
  { id:8,  name:'Monsoon Deviation',    source:'IMD',            freq:'Monthly',      lag:'0',     unit:'% vs LPA', color:'#eda820', description:'IMD all-India cumulative rainfall deviation from Long Period Average — kharif crop & rural income driver.',  series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('% vs LPA','IMD Ensemble') },
];

// ── INVESTMENT ───────────────────────────────────────────────────────────
export const INVESTMENT = [
  { id:9,  name:'Cement Dispatches',    source:'CMA',            freq:'Monthly',      lag:'3 wks', unit:'mn tonnes',color:'#1a67f0', description:'Cement Manufacturers Association dispatches — leading indicator of construction and capex activity.',        series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn t',    'Gradient Boost') },
  { id:10, name:'Steel Consumption',    source:'JPC',            freq:'Monthly',      lag:'3 wks', unit:'mn tonnes',color:'#1a67f0', description:'Joint Plant Committee finished steel apparent consumption — infrastructure + manufacturing investment proxy.', series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn t',    'LSTM') },
  { id:11, name:'Capital Goods IIP',    source:'MoSPI',          freq:'Monthly',      lag:'6 wks', unit:'% YoY',    color:'#1a67f0', description:'IIP Capital Goods sub-index — domestic production of investment goods: machinery and equipment.',             series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('%',       'Ridge Reg') },
  { id:12, name:'Credit to Industry',   source:'RBI',            freq:'Fortnightly',  lag:'2 wks', unit:'% YoY',    color:'#1a67f0', description:'RBI sectoral bank credit to industry — capex financing, working capital and investment pipeline.',            series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('%',       'ARIMA') },
  { id:13, name:'CMIE New Projects',    source:'CMIE',           freq:'Monthly',      lag:'2 wks', unit:'₹ L.Cr',   color:'#1a67f0', description:'CMIE CapEx database new investment project announcements — forward-looking private capex pipeline.',          series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'Gradient Boost') },
  { id:14, name:'Capital Goods Imports',source:'DGCI&S',         freq:'Monthly',      lag:'3 wks', unit:'$bn',      color:'#1a67f0', description:'Merchandise imports in capital goods category — machinery, equipment, technology investment from abroad.',     series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'Lasso Reg') },
  { id:15, name:'FDI Equity Inflows',   source:'DPIIT',          freq:'Monthly',      lag:'6 wks', unit:'$bn',      color:'#06bcd4', description:'DPIIT FDI equity inflows (excl. reinvested earnings) — foreign investment into productive capacity.',         series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'Random Forest') },
  { id:16, name:'Residential Launches', source:'PropEquity',     freq:'Monthly',      lag:'4 wks', unit:'k units',  color:'#06bcd4', description:'PropEquity new residential unit launches across top 8 cities — real estate investment activity.',              series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('k units', 'Gradient Boost') },
];

// ── GOVERNMENT ───────────────────────────────────────────────────────────
export const GOVERNMENT = [
  { id:17, name:'CGA Capital Expenditure',  source:'CGA / MoF',  freq:'Monthly',      lag:'3 wks', unit:'₹ L.Cr',   color:'#eda820', description:'Controller General of Accounts central govt capital expenditure (actuals) — infrastructure and asset creation.', series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'ARIMA') },
  { id:18, name:'CGA Revenue Expenditure',  source:'CGA / MoF',  freq:'Monthly',      lag:'3 wks', unit:'₹ L.Cr',   color:'#eda820', description:'CGA central govt revenue expenditure (actuals) — salaries, subsidies, interest payments and transfers.',            series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'Ridge Reg') },
  { id:19, name:'PFMS Daily Expenditure',   source:'PFMS',       freq:'Monthly',      lag:'0',     unit:'₹ Cr/day', color:'#eda820', description:'Public Financial Management System real-time daily govt spending — highest-frequency fiscal proxy.',               series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ Cr/d',  'Gradient Boost') },
  { id:20, name:'NHAI Highway Construction',source:'NHAI',       freq:'Monthly',      lag:'3 wks', unit:'km / mo',  color:'#eda820', description:'National Highways Authority km constructed per month — flagship govt capex execution metric.',                    series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('km/mo',   'Holt-Winters') },
  { id:21, name:'MGNREGA Person-Days',      source:'MoRD',       freq:'Monthly',      lag:'1 wk',  unit:'mn p-days',color:'#eda820', description:'Ministry of Rural Dev MGNREGS employment generated — rural welfare spending and social protection.',               series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn p-days','ARIMA') },
  { id:22, name:'State Govt Capex',         source:'RBI',        freq:'Quarterly',    lag:'8 wks', unit:'₹ L.Cr',   color:'#06bcd4', description:'RBI state finances aggregate state capital outlay — complements central govt capex in total G.',                  series:{labels:QUARTERLY_10Y, actuals:nulls(42)},  prediction:dummyPred('₹ L.Cr',  'Lasso Reg') },
  { id:23, name:'Defence Capital Outlay',   source:'CGA',        freq:'Monthly',      lag:'3 wks', unit:'₹ L.Cr',   color:'#06bcd4', description:'CGA defence ministry capital expenditure — MOD capital head, modernisation and equipment procurement.',            series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'Ridge Reg') },
];

// ── NET EXPORTS ──────────────────────────────────────────────────────────
export const NET_EXPORTS = [
  { id:24, name:'Merchandise Exports',   source:'DGCI&S',        freq:'Monthly',      lag:'2 wks', unit:'$bn',      color:'#ed4545', description:'Total merchandise exports FOB — DGCI&S flash and final. Covers all commodity groups.',                            series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'Gradient Boost') },
  { id:25, name:'Merch Imports ex-Oil',  source:'DGCI&S',        freq:'Monthly',      lag:'2 wks', unit:'$bn',      color:'#ed4545', description:'Non-oil merchandise imports — strips crude volatility to reveal underlying domestic demand.',                      series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'ARIMA') },
  { id:26, name:'Crude Oil Import Value',source:'PPAC',          freq:'Monthly',      lag:'2 wks', unit:'$bn',      color:'#ed4545', description:'PPAC petroleum import bill — combined price × volume effect on trade deficit.',                                    series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'Brent+ARIMA') },
  { id:27, name:'Services Exports IT/BPO',source:'RBI BoP',      freq:'Quarterly',    lag:'8 wks', unit:'$bn',      color:'#ed4545', description:'RBI Balance of Payments software & IT services exports — India\'s largest export category.',                       series:{labels:QUARTERLY_10Y, actuals:nulls(42)},  prediction:dummyPred('$bn',     'Trend+LSTM') },
  { id:28, name:'INR / USD Exchange Rate',source:'RBI / NSE',    freq:'Monthly',      lag:'0',     unit:'₹ per $',  color:'#ed4545', description:'RBI reference rate — export competitiveness driver and imported inflation pass-through.',                          series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹/$',     'GARCH+AR') },
  { id:29, name:'Global Composite PMI',  source:'S&P Global',    freq:'Monthly',      lag:'1 day', unit:'Index',    color:'#ed4545', description:'J.P.Morgan / S&P Global World Composite PMI — external demand signal for India\'s merchandise exports.',           series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('Index',   'Global Macro') },
  { id:30, name:'Brent Crude Price',     source:'ICE',           freq:'Monthly',      lag:'0',     unit:'$/bbl',    color:'#ed4545', description:'ICE Brent front-month — terms of trade driver. Higher crude widens India\'s trade deficit.',                       series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$/bbl',   'Futures+ARIMA') },
  { id:31, name:'Port Container Throughput',source:'MPA',        freq:'Monthly',      lag:'3 wks', unit:'mn TEUs',  color:'#06bcd4', description:'Major Ports Authority total container throughput — physical trade flow for exports and imports.',                  series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn TEUs', 'Trend+ARIMA') },
  { id:32, name:'Forex Reserves',        source:'RBI',           freq:'Monthly',      lag:'1 wk',  unit:'$bn',      color:'#06bcd4', description:'RBI total foreign exchange reserves including gold — buffer against current account / trade shocks.',              series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('$bn',     'Trend+AR') },
];

// ── CROSS-CUTTING ────────────────────────────────────────────────────────
export const CROSS_CUTTING = [
  { id:33, name:'India PMI Composite',   source:'S&P Global',    freq:'Monthly',      lag:'1 day', unit:'Index',    color:'#8b5cf6', tags:['C','I'],            description:'S&P Global India Composite PMI — manufacturing + services spanning consumption and investment.',              series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('Index',   'Lasso Reg') },
  { id:34, name:'Electricity Generation',source:'CEA',           freq:'Monthly',      lag:'1 wk',  unit:'BU',       color:'#8b5cf6', tags:['C','I','G'],         description:'CEA total electricity generation — broadest real-time activity indicator spanning all sectors.',              series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('BU',      'Gradient Boost') },
  { id:35, name:'Rail Freight Tonnage',  source:'Indian Railways',freq:'Monthly',     lag:'2 wks', unit:'mn tonnes',color:'#8b5cf6', tags:['C','I','G','X-M'],   description:'Indian Railways total freight — coal, steel, FMCG, containers all in one number.',                           series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('mn t',    'Gradient Boost') },
  { id:36, name:'GST Collections',       source:'GST Council',   freq:'Monthly',      lag:'1 day', unit:'₹ L.Cr',   color:'#8b5cf6', tags:['C','I','G','X-M'],   description:'Gross GST revenue — captures consumption, investment, government and trade in one number.',                 series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('₹ L.Cr',  'Gradient Boost') },
  { id:37, name:'Nighttime Light Index', source:'NOAA / NASA',   freq:'Monthly',      lag:'3 wks', unit:'Index',    color:'#8b5cf6', tags:['C','I'],             description:'NOAA VIIRS satellite nighttime lights aggregated to India grid — alternative GDP nowcast proxy.',             series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('Index',   'CNN+ARIMA') },
  { id:38, name:'M3 Money Supply',       source:'RBI',           freq:'Monthly',      lag:'~2 wks',unit:'% YoY',    color:'#8b5cf6', tags:['C','I','G'],         description:'RBI broad money M3 growth — monetary transmission channel feeding consumption, investment and fiscal spending.',series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('%',       'VAR Model') },
  { id:39, name:'Corporate Earnings Growth',source:'BSE / NSE',  freq:'Quarterly',    lag:'~3 wks',unit:'% YoY',    color:'#8b5cf6', tags:['C','I'],             description:'BSE500 aggregate PAT growth — reflects both consumer demand (revenues) and investment returns (margins).',    series:{labels:QUARTERLY_10Y, actuals:nulls(42)},  prediction:dummyPred('%',       'LSTM') },
  { id:40, name:'Credit / Deposit Ratio',source:'RBI',           freq:'Monthly',      lag:'~2 wks',unit:'Ratio',    color:'#8b5cf6', tags:['C','I'],             description:'Scheduled commercial banks C/D ratio — systemic credit availability affecting consumption and investment.',    series:{labels:MONTHLY_10Y,   actuals:nulls(120)}, prediction:dummyPred('Ratio',   'Ridge Reg') },
];

export const SECTIONS = [
  { key:'C',  label:'Consumption',   longLabel:'Consumption (C) — PFCE',       icon:'🛒', color:'#0fb876', colorRaw:'#0fb876', accent:'green',  description:'Private Final Consumption Expenditure · ~60% of GDP', gdpShare:60,   indicators:CONSUMPTION },
  { key:'I',  label:'Investment',    longLabel:'Investment (I) — GFCF',         icon:'🏗', color:'#1a67f0', colorRaw:'#1a67f0', accent:'blue',   description:'Gross Fixed Capital Formation · ~34% of GDP',         gdpShare:34,   indicators:INVESTMENT },
  { key:'G',  label:'Government',    longLabel:'Government (G) — GFCE',         icon:'🏛', color:'#eda820', colorRaw:'#eda820', accent:'amber',  description:'Govt Final Consumption Expenditure · ~10% of GDP',    gdpShare:10,   indicators:GOVERNMENT },
  { key:'X',  label:'Net Exports',   longLabel:'Net Exports (X-M)',              icon:'🚢', color:'#ed4545', colorRaw:'#ed4545', accent:'red',    description:'Merchandise & Services Trade Balance',                gdpShare:-4,   indicators:NET_EXPORTS },
  { key:'CC', label:'Cross-Cutting', longLabel:'Cross-Cutting Indicators',       icon:'⚡', color:'#8b5cf6', colorRaw:'#8b5cf6', accent:'purple', description:'Indicators spanning multiple GDP components',          gdpShare:null, indicators:CROSS_CUTTING },
];
