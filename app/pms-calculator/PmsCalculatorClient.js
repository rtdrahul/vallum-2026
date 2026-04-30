"use client";
import { useState, useCallback } from "react";

const BRAND = "#3e3e8a";
const BRAND_LIGHT = "#f0f0fa";
const BRAND_MED = "#c5c5e8";

const fmt = (v, dp = 0) => {
  if (v === null || v === undefined || isNaN(v)) return "—";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: dp, minimumFractionDigits: dp }).format(v);
};
const fmtPct = (v, dp = 2) => (isNaN(v) ? "—" : `${(v * 100).toFixed(dp)}%`);
const fmtCr = (v) => `₹ ${fmt(v)}`;

const Input = ({ value, onChange, min, step = "any", prefix, suffix, width = 160 }) => (
  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${BRAND_MED}`, borderRadius: 6, overflow: "hidden", width }}>
    {prefix && <span style={{ padding: "4px 8px", background: BRAND_LIGHT, color: BRAND, fontSize: 15, borderRight: `1px solid ${BRAND_MED}`, whiteSpace: "nowrap" }}>{prefix}</span>}
    <input
      type="number"
      value={value}
      min={min}
      step={step}
      onChange={onChange}
      style={{ flex: 1, border: "none", outline: "none", padding: "5px 8px", fontSize: 15, minWidth: 0, background: "white" }}
    />
    {suffix && <span style={{ padding: "4px 8px", background: BRAND_LIGHT, color: BRAND, fontSize: 15, borderLeft: `1px solid ${BRAND_MED}` }}>{suffix}</span>}
  </div>
);

const SectionHeader = ({ label }) => (
  <tr>
    <td colSpan={10} style={{ background: BRAND, color: "white", padding: "6px 12px", fontWeight: 500, fontSize: 14, letterSpacing: "0.04em" }}>
      {label}
    </td>
  </tr>
);

const Row = ({ label, formula, values, isBold, isGreen, isRed, isStr }) => (
  <tr style={{ background: isBold ? BRAND_LIGHT : "white" }}>
    <td style={{ padding: "6px 12px", borderBottom: "1px solid #eee", minWidth: 220, maxWidth: 320 }}>
      <div style={{ fontWeight: isBold ? 500 : 400, fontSize: 15, color: "#222" }}>{label}</div>
      <div style={{ fontSize: 14, color: BRAND, fontStyle: "italic", marginTop: 1 }}>{formula}</div>
    </td>
    {values.map((v, i) => {
      const color = isGreen ? "#1a7f4f" : isRed && typeof v === "number" && v < 0 ? "#c0392b" : "#222";
      return (
        <td key={i} style={{ padding: "6px 14px", textAlign: "right",verticalAlign: "middle", borderBottom: "1px solid #eee", fontSize: 15, fontWeight: isBold ? 500 : 400, color, whiteSpace: "nowrap" }}>
          {isStr ? v : fmtCr(v)}
        </td>
      );
    })}
  </tr>
);

const PctRow = ({ label, formula, values }) => (
  <tr style={{ background: BRAND_LIGHT }}>
    <td style={{ padding: "6px 12px", borderBottom: "1px solid #eee" }}>
      <div style={{ fontWeight: 500, fontSize: 15, color: "#222" }}>{label}</div>
      <div style={{ fontSize: 14, color: BRAND, fontStyle: "italic", marginTop: 1 }}>{formula}</div>
    </td>
    {values.map((v, i) => (
      <td key={i} style={{ padding: "6px 14px", textAlign: "right", borderBottom: "1px solid #eee", fontSize: 15, fontWeight: 500, color: v >= 0 ? "#1a7f4f" : "#c0392b" }}>
        {fmtPct(v)}
      </td>
    ))}
  </tr>
);

const ColHeaders = ({ labels }) => (
  <tr style={{ background: "#2e2e6a" }}>
    <th style={{ padding: "8px 12px", textAlign: "left", color: "white", fontWeight: 500, fontSize: 15 }}>Description</th>
    {labels.map((l, i) => (
      <th key={i} style={{ padding: "8px 14px", textAlign: "right", color: "white", fontWeight: 500, fontSize: 15, minWidth: 130 }}>{l}</th>
    ))}
  </tr>
);

/* ── ONE-YEAR FIXED FEE ─────────────────────────────── */
function calcFixed(a, b, c, d, scenarios) {
  return scenarios.map(r => {
    const i = a, ii = i * r, iii = i + ii;
    const iv = (i + iii) / 2;
    const v = -(iv * c), vi = -(iv * d);
    const vii = -((iv + v + vi) * b);
    const viii = v + vi + vii;
    const ix = iii + viii;
    const x = (ix - i) / i;
    return { i, ii, iii, iv, v, vi, vii, viii, ix, x };
  });
}

function TabFixed() {
  const [a, setA] = useState(10000000);
  const [b, setB] = useState(2);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(0.2);
  const [returns, setReturns] = useState([20, 0, -20]);

  const res = calcFixed(a, b / 100, c / 100, d / 100, returns.map(r => r / 100));
  const V = (key) => res.map(r => r[key]);

  return (
    <div>
      <AssumptionsGrid>
        <Assump label="Capital (₹)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (% p.a.)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" />
        <Assump label="Other Expenses (% p.a.)" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Brokerage & Transaction Cost (% p.a.)" value={d} onChange={v => setD(v)} suffix="%" step="0.1" />
      </AssumptionsGrid>
      <ReturnInputs returns={returns} setReturns={setReturns} labels={["Scenario 1", "Scenario 2", "Scenario 3"]} />
      <TableWrap>
        <ColHeaders labels={["Scenario 1 (Gain " + returns[0] + "%)", "Scenario 2 (" + (returns[1] >= 0 ? "No Change " + returns[1] : "Loss " + Math.abs(returns[1])) + "%)", "Scenario 3 (Loss " + Math.abs(returns[2]) + "%)"]} />
        <SectionHeader label="Fixed Fee Illustration" />
        <Row label="Capital Contributed / Assets under Management" formula="[i] = a" values={V("i")} />
        <Row label="Gain / (Loss) on Investment based on the Scenario" formula="[ii] = i × Scenario return" values={V("ii")} />
        <Row label="Gross Value of the Portfolio at the end of the year" formula="[iii] = i + ii" values={V("iii")} />
        <Row label="Average assets under management" formula="[iv] = (i + iii) / 2" values={V("iv")} />
        <Row label="Other Expense" formula="[v] = iv × c" values={V("v")} isRed />
        <Row label="Brokerage and Transaction cost" formula="[vi] = iv × d" values={V("vi")} isRed />
        <Row label="Management Fees" formula="[vii] = (iv + v + vi) × b" values={V("vii")} isRed />
        <Row label="Total charges during the year" formula="[viii] = v + vi + vii" values={V("viii")} isBold isRed />
        <Row label="Net value of the Portfolio at the end of the year" formula="[ix] = iii + viii" values={V("ix")} isBold isGreen />
        <PctRow label="% Portfolio Return" formula="[x] = ((ix − i) / i)%" values={V("x")} />
      </TableWrap>
      <Notes notes={fixedNotes} />
    </div>
  );
}

/* ── ONE-YEAR HYBRID FEE ────────────────────────────── */
function calcHybrid(a, b, c, d, e, f, scenarios) {
  return scenarios.map(r => {
    const i = a, ii = i * r, iii = i + ii;
    const iv = (i + iii) / 2;
    const v = -(iv * c), vi = -(iv * f);
    const vii = -((iv + v + vi) * b);
    const viii = v + vi + vii;
    const ix = iii + viii;
    const x = a; // HWM = capital (yr 1)
    const xi = i * e; // hurdle return amount
    const isP = ix > (x + xi);
    const xii = isP ? "Yes" : "No P.Fee";
    const xiii = isP ? ix - x - xi : 0;
    const xiv = -(xiii * d);
    const xv = ix + xiv;
    const xvi = (xv - i) / i;
    const hwmPortfolio = Math.max(x, xv);
    const hwmSeparate = Math.max(ix, x);
    return { i, ii, iii, iv, v, vi, vii, viii, ix, x, xi, xii, xiii, xiv, xv, xvi, hwmPortfolio, hwmSeparate };
  });
}

function TabHybrid({ varOnly = false }) {
  const [a, setA] = useState(10000000);
  const [b, setB] = useState(varOnly ? 0 : 2);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(20);
  const [e, setE] = useState(8);
  const [f, setF] = useState(0.2);
  const [returns, setReturns] = useState([20, 0, -20]);

  const res = calcHybrid(a, b / 100, c / 100, d / 100, e / 100, f / 100, returns.map(r => r / 100));
  const V = (key) => res.map(r => r[key]);

  return (
    <div>
      <AssumptionsGrid>
        <Assump label="Capital (₹)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (% p.a.)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" min={varOnly ? 0 : undefined} max={varOnly ? 0 : undefined} />
        <Assump label="Other Expenses (% p.a.)" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Performance Fee (%)" value={d} onChange={v => setD(v)} suffix="%" step="1" />
        <Assump label="Hurdle Rate of Return (% p.a.)" value={e} onChange={v => setE(v)} suffix="%" step="0.5" />
        <Assump label="Brokerage & Transaction Cost (% p.a.)" value={f} onChange={v => setF(v)} suffix="%" step="0.1" />
      </AssumptionsGrid>
      {varOnly && <div style={{ fontSize: 15, color: "#777", marginBottom: 12, fontStyle: "italic" }}>Management Fee is 0 for the Variable Fee model.</div>}
      <ReturnInputs returns={returns} setReturns={setReturns} labels={["Scenario 1", "Scenario 2", "Scenario 3"]} />
      <TableWrap>
        <ColHeaders labels={[`Scenario 1 (${returns[0]}%)`, `Scenario 2 (${returns[1]}%)`, `Scenario 3 (${returns[2]}%)`]} />
        <SectionHeader label={varOnly ? "Variable Fee Illustration" : "Hybrid Fee Illustration"} />
        <Row label="Capital Contributed / AUM" formula="[i] = a" values={V("i")} />
        <Row label="Gain / (Loss) on Investment" formula="[ii] = i × scenario" values={V("ii")} />
        <Row label="Gross Value of Portfolio (year end)" formula="[iii] = i + ii" values={V("iii")} />
        <Row label="Average AUM" formula="[iv] = (i + iii) / 2" values={V("iv")} />
        <Row label="Other Expenses" formula="[v] = iv × c" values={V("v")} isRed />
        <Row label="Brokerage and Transaction Cost" formula="[vi] = iv × f" values={V("vi")} isRed />
        <Row label="Management Fees" formula="[vii] = (iv + v + vi) × b" values={V("vii")} isRed />
        <Row label="Total Charges Before Performance Fee" formula="[viii] = v + vi + vii" values={V("viii")} isBold isRed />
        <Row label="Gross Portfolio Value Before Performance Fee" formula="[ix] = iii + viii" values={V("ix")} />
        <SectionHeader label="Performance Fee Calculation" />
        <Row label="High Water Mark Value (HWM)" formula="[x] = capital (yr 1)" values={V("x")} />
        <Row label="Hurdle Return Amount" formula="[xi] = i × e" values={V("xi")} />
        <Row label="Performance Fee Applicable?" formula='[xii] = ix > (x + xi) → "Yes" else "No P.Fee"' values={V("xii")} isStr />
        <Row label="Portfolio Value in Excess of Hurdle" formula="[xiii] = ix − x − xi (if applicable)" values={V("xiii")} />
        <Row label="Performance Fee" formula="[xiv] = xiii × d" values={V("xiv")} isRed />
        <Row label="Net Portfolio Value (after all fees)" formula="[xv] = ix + xiv" values={V("xv")} isBold isGreen />
        <PctRow label="% Portfolio Return" formula="[xvi] = (xv − i) / i" values={V("xvi")} />
        <SectionHeader label="High Water Mark to Carry Forward" />
        <Row label="HWM c/f — if fee charged from portfolio" formula="[xvii] = max(x, xv)" values={V("hwmPortfolio")} />
        <Row label="HWM c/f — if fee paid separately by investor" formula="[xvii] = max(ix, x)" values={V("hwmSeparate")} />
      </TableWrap>
      <Notes notes={hybridNotes} />
    </div>
  );
}

/* ── MULTI-YEAR HYBRID FEE ──────────────────────────── */
function calcMultiYear(a, b, c, d, e, f, retPct) {
  const years = [];
  let prevXI = null, prevIX = null, prevXVII = null, prevXIX = null;
  for (let n = 0; n < 5; n++) {
    const r = retPct[n];
    const i = n === 0 ? a : prevXVII;
    const ii = i * r, iii = i + ii;
    const iv = (i + iii) / 2;
    const v = -(iv * c), vi = -(iv * f);
    const vii = -(iv * b); // Multi-year uses iv * b (not (iv+v+vi)*b)
    const viii = v + vi + vii;
    const ix = iii + viii;
    const x = n === 0 ? a : prevXIX; // HWM
    let xi;
    if (n === 0) {
      xi = i * (1 + e);
    } else {
      xi = Math.max(prevIX * (1 + e), prevXI * (1 + e));
    }
    const isP = ix > xi;
    const xiv = isP ? (ix - xi) * d : 0; // performance fee
    const xvii = ix - xiv;
    const xviii = (xvii - i) / i;
    const xix = Math.max(x, ix);

    years.push({ i, ii, iii, iv, v, vi, vii, viii, ix, x, xi, isPerf: isP ? "Yes" : "No P.Fee", xiv: -xiv, xvii, xviii, xix });
    prevXI = xi; prevIX = ix; prevXVII = xvii; prevXIX = xix;
  }
  return years;
}

function TabMultiYear() {
  const [a, setA] = useState(500000);
  const [b, setB] = useState(2);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(20);
  const [e, setE] = useState(8);
  const [f, setF] = useState(0.2);
  const [returns, setReturns] = useState([40, -25, 50, 40, 0]);

  const res = calcMultiYear(a, b / 100, c / 100, d / 100, e / 100, f / 100, returns.map(r => r / 100));
  const V = (key) => res.map(r => r[key]);
  const yrLabels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];

  return (
    <div>
      <AssumptionsGrid>
        <Assump label="Capital (₹)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (% p.a.)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" />
        <Assump label="Other Expenses (% p.a.)" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Performance Fee (%)" value={d} onChange={v => setD(v)} suffix="%" step="1" />
        <Assump label="Hurdle Rate of Return(% p.a.)" value={e} onChange={v => setE(v)} suffix="%" step="0.5" />
        <Assump label="Brokerage & Transaction Cost (% p.a.)" value={f} onChange={v => setF(v)} suffix="%" step="0.1" />
      </AssumptionsGrid>
      <ReturnInputs returns={returns} setReturns={setReturns} labels={yrLabels} />
      <TableWrap>
        <ColHeaders labels={yrLabels} />
        <SectionHeader label="Multi-Year Hybrid Fee Calculator" />
        <Row label="Opening Capital / AUM" formula="[i] = a (Yr1), xvii prev (Yr2+)" values={V("i")} />
        <Row label="Gain / (Loss)" formula="[ii] = i × return" values={V("ii")} />
        <Row label="Gross Portfolio Value" formula="[iii] = i + ii" values={V("iii")} />
        <Row label="Average AUM" formula="[iv] = (i + iii) / 2" values={V("iv")} />
        <Row label="Other Expenses" formula="[v] = iv × c" values={V("v")} isRed />
        <Row label="Brokerage and Transaction Cost" formula="[vi] = iv × f" values={V("vi")} isRed />
        <Row label="Management Fees" formula="[vii] = iv × b" values={V("vii")} isRed />
        <Row label="Total Charges" formula="[viii] = v + vi + vii" values={V("viii")} isBold isRed />
        <Row label="Portfolio Value Before Performance Fee" formula="[ix] = iii + viii" values={V("ix")} />
        <SectionHeader label="Performance Fee Calculation" />
        <Row label="High Water Mark (HWM)" formula="[x] = capital (Yr1); max prior ix (Yr2+)" values={V("x")} />
        <Row label="Hurdle NAV (compounded)" formula="[xi] = i×(1+e) Yr1; max(prev_ix, prev_xi)×(1+e) Yr2+" values={V("xi")} />
        <Row label="Performance Fee Applicable?" formula='[xii] = ix > xi → "Yes" else "No P.Fee"' values={V("isPerf")} isStr />
        <Row label="Performance Fee" formula="[xiv] = (ix − xi) × d (if applicable)" values={V("xiv")} isRed />
        <Row label="Net Portfolio Value (after all fees)" formula="[xvii] = ix − xiv" values={V("xvii")} isBold isGreen />
        <PctRow label="% Portfolio Return" formula="[xviii] = (xvii − i) / i" values={V("xviii")} />
        <Row label="HWM Carried Forward" formula="[xix] = max(x, ix)" values={V("xix")} />
      </TableWrap>
      <Notes notes={multiNotes} />
    </div>
  );
}

/* ── SHARED SUB-COMPONENTS ──────────────────────────── */
function AssumptionsGrid({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 20, padding: 16, background: BRAND_LIGHT, borderRadius: 8, border: `1px solid ${BRAND_MED}` }}>
      {children}
    </div>
  );
}

function Assump({ label, value, onChange, prefix, suffix, step = "any", min, max }) {
  return (
    <div>
      <div style={{ fontSize: 14, color: BRAND, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <Input value={value} onChange={e => onChange(Number(e.target.value))} prefix={prefix} suffix={suffix} step={step} min={min} max={max} width="100%" />
    </div>
  );
}

function ReturnInputs({ returns, setReturns, labels }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 16, color: "#000", fontWeight: 500, marginBottom: 8 }}>Expected Returns / Scenario</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {returns.map((r, i) => (
          <div key={i} style={{ minWidth: 120 }}>
            <div style={{ fontSize: 14, color: "#000", marginBottom: 3 }}>{labels[i]}</div>
            <Input
              value={r}
              onChange={e => { const n = [...returns]; n[i] = Number(e.target.value); setReturns(n); }}
              suffix="%" step="1" width={120}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TableWrap({ children }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 8, border: `1px solid ${BRAND_MED}`, marginBottom: 20 }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 500 }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Notes({ notes }) {
  return (
    <div style={{ background: "#f9f9f9", border: "1px solid #e8e8e8", borderRadius: 8, padding: "14px 18px", fontSize: 15, color: "#555", lineHeight: 1.7 }}>
      <div style={{ fontWeight: 500, marginBottom: 8, color: "#333" }}>Notes & Assumptions</div>
      <ol style={{ margin: 0, paddingLeft: 18 }}>
        {notes.map((n, i) => <li key={i} style={{ marginBottom: 4 }}>{n}</li>)}
      </ol>
    </div>
  );
}

/* ── NOTES DATA ─────────────────────────────────────── */
const fixedNotes = [
  "In the illustration, Management fee is assumed to be charged annually. However, the Portfolio Manager can charge fee at any frequency i.e. Daily, Monthly, Quarterly, Semi-annually, Annually or at any other frequency as defined in the PMS agreement and as permitted under SEBI regulations.",
  "Portfolio Manager can charge Management Fee on Average portfolio value for the management fee period or the closing portfolio value or in any other manner as defined in the PMS agreement.",
  "Returns are assumed to be generated linearly through the year.",
  "Other Expenses includes Account Opening charges, stamp duty /Audit Fee/ Bank charges / Fund Accounting charges / Custody Fee / demat charges or other miscellaneous expense",
  "Brokerage and transaction cost for the illustration purpose is charged on the Average AUM. However, Brokerage and Transaction cost are charged on basis the actuals trades.",
  "All fees and charges are subject to GST.",
  "This is only a generic illustration, each portfolio manager can modify the illustration as per the terms and condition of their PMS agreement.",
  "Portfolio Managers are advised to also refer to the illustrations provided in Annexure 4A of Master Circular for Portfolio Managers dated June 07, 2024.",
];
const hybridNotes = [
  "Management fee is assumed to be charged annually.",
  "High Water Mark (HWM) for Year 1 is the capital invested. From Year 2 onwards, if performance fee is charged, it is the year-end closing value after all charges.",
  "Hurdle rate is calculated on the HWM or previous year closing capital (whichever is higher).",
  "Hurdle rate is prorated if the performance fee period is less than 1 year or if there are inflows/outflows.",
  "The illustration shows HWM to be carried forward in different scenarios for equal and fair treatment to the investor.",
  "Returns are assumed to be generated linearly through the year.",
  "All fees and charges are subject to GST.",
  "Portfolio Managers are advised to refer to Annexure 4A of SEBI Master Circular for Portfolio Managers dated June 07, 2024.",
];
const multiNotes = [
  "Management fee is charged annually on Average AUM.",
  "Hurdle NAV is compounded annually at the hurdle rate. In Year 1, it is the initial capital × (1 + hurdle rate). In subsequent years, it is the greater of (previous portfolio value × (1 + hurdle rate)) and (previous hurdle NAV × (1 + hurdle rate)).",
  "High Water Mark in any year is the maximum closing value of the portfolio (before performance fee) in all preceding years.",
  "No catch-up fee for the client in this illustration.",
  "Performance fee is assumed to be charged from the portfolio itself.",
  "Hurdle rate is prorated in case the performance fee period is less than 1 year or if there are inflows/outflows.",
  "Returns are assumed to be generated linearly through the year.",
  "All fees and charges are subject to GST.",
];

/* ── MAIN APP ───────────────────────────────────────── */
const TABS = [
  { id: "fixed", label: "One Year — Fixed Fees" },
  { id: "hybrid", label: "One Year — Hybrid Fees" },
  { id: "variable", label: "One Year — Variable Fees" },
  { id: "multi", label: "Multi Year — Hybrid Fees" },
];

export default function PmsCalculator() {
  const [activeTab, setActiveTab] = useState("fixed");

  return (
    <section className="section">
      <div className="container">
          {/* Header */}
          <div style={{ background: BRAND, padding: "20px 24px 0", borderRadius: "10px 10px 0 0" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
              <h1 style={{ margin: 0, color: "white", letterSpacing: "-0.01em" }}>PMS Fee Calculator</h1>
              <span style={{ fontSize: 22, color: "rgba(255, 255, 255)", fontStyle: "italic" }}>(Vallum Capital Advisors)</span>
            </div>
            {/* Tab bar */}
            <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? "white" : "rgba(255,255,255,0.12)",
                    color: activeTab === tab.id ? BRAND : "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "6px 6px 0 0",
                    padding: "8px 14px",
                    fontSize: 15,
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ background: "white", border: `1px solid ${BRAND_MED}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: 24 }}>
            {activeTab === "fixed" && <TabFixed />}
            {activeTab === "hybrid" && <TabHybrid varOnly={false} />}
            {activeTab === "variable" && <TabHybrid varOnly={true} />}
            {activeTab === "multi" && <TabMultiYear />}
          </div>
        </div>
    </section>
  );
} 