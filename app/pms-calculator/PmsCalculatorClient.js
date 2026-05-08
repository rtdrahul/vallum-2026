"use client";
import { useState, useCallback } from "react";

const BRAND = "#3e3e8a";
const BRAND_LIGHT = "#f0f0fa";
const BRAND_MED = "#312e2e";

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
    <td style={{ padding: "6px 12px", borderBottom: "1px solid #312e2e", minWidth: 220, maxWidth: 320 }}>
      <div style={{ fontWeight: isBold ? 500 : 400, fontSize: 15, color: "#222" }}>{label}</div>
      <div style={{ fontSize: 14, color: BRAND, fontStyle: "italic", marginTop: 1 }}>{formula}</div>
    </td>
    {values.map((v, i) => {
      const color = isGreen ? "#1a7f4f" : isRed && typeof v === "number" && v < 0 ? "#c0392b" : "#222";
      return (
        <td key={i} style={{ padding: "6px 14px", textAlign: "right",verticalAlign: "middle", borderBottom: "1px solid #312e2e", fontSize: 15, fontWeight: isBold ? 500 : 400, color, whiteSpace: "nowrap" }}>
          {isStr ? v : fmtCr(v)}
        </td>
      );
    })}
  </tr>
);

const PctRow = ({ label, formula, values }) => (
  <tr style={{ background: BRAND_LIGHT }}>
    <td style={{ padding: "6px 12px", borderBottom: "1px solid #312e2e" }}>
      <div style={{ fontWeight: 500, fontSize: 15, color: "#222" }}>{label}</div>
      <div style={{ fontSize: 14, color: BRAND, fontStyle: "italic", marginTop: 1 }}>{formula}</div>
    </td>
    {values.map((v, i) => (
      <td key={i} style={{ padding: "6px 14px", textAlign: "right", borderBottom: "1px solid #312e2e", fontSize: 15, fontWeight: 500, color: v >= 0 ? "#1a7f4f" : "#c0392b" }}>
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
        <Assump label="Capital Contribution (Rs.)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (%age per annum)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" />
        <Assump label="Other Expenses" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Brokerage and Transaction cost" value={d} onChange={v => setD(v)} suffix="%" step="0.1" />
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
        <Assump label="Capital Contribution (Rs.)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (%age per annum)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" min={varOnly ? 0 : undefined} max={varOnly ? 0 : undefined} />
        <Assump label="Other Expenses (%age per annum)" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Performance (%age per annum)" value={d} onChange={v => setD(v)} suffix="%" step="1" />
        <Assump label="Hurdle Rate of Return (%age p.a.)" value={e} onChange={v => setE(v)} suffix="%" step="0.5" />
        <Assump label="Brokerage and Transaction cost" value={f} onChange={v => setF(v)} suffix="%" step="0.1" />
      </AssumptionsGrid>
      <ReturnInputs returns={returns} setReturns={setReturns} labels={["Scenario 1", "Scenario 2", "Scenario 3"]} />
      <TableWrap>
        <ColHeaders labels={[`Scenario 1 (${returns[0]}%)`, `Scenario 2 (${returns[1]}%)`, `Scenario 3 (${returns[2]}%)`]} />
        <SectionHeader label={varOnly ? "Hybrid Fee Illustration" : "Hybrid Fee Illustration"} />
        <Row label="Capital Contributed / Assets under Management" formula="[i] = a" values={V("i")} />
        <Row label="Gain / (Loss) on Investment based on the Scenario" formula="[ii] = i × scenario" values={V("ii")} />
        <Row label="Gross Value of the Portfolio at the end of the year" formula="[iii] = i + ii" values={V("iii")} />
        <Row label="Daily Weighted Average assets under management" formula="[iv] = (i + iii) / 2" values={V("iv")} />
        <Row label="Other Expenses" formula="[v] = iv × c" values={V("v")} isRed />
        <Row label="Brokerage and Transaction cost" formula="[vi] = iv × f" values={V("vi")} isRed />
        <Row label="Management Fees" formula="[vii] = (iv + v + vi) × b" values={V("vii")} isRed />
        <Row label="Total charges before Performance fee." formula="[viii] = v + vi + vii" values={V("viii")} isBold isRed />
        <Row label="Gross Value of the Portfolio before Performance fee" formula="[ix] = iii + viii" values={V("ix")} />
        
        <Row label="High Water Mark Value (HWM) (Capital contributed for 1st year and second year onwards as defined in the PMS agreement.)" formula="[x] = capital (yr 1)" values={V("x")} />
        <Row label="Hurdle Rate of return or as defined in the PMS agreement" formula="[xi] = i × e" values={V("xi")} />
        <Row label="Gross Value of the Portfolio before Performance fee is greater than High Water Mark Value + Hurdle rate of return" formula='[xii] = ix > (x + xi) → "Yes" else "No P.Fee"' values={V("xii")} isStr />
        <SectionHeader/>
        <Row label="Portfolio return subject of Performance Fee" formula="[xiii] = ix − x − xi (if applicable)" values={V("xiii")} />
        <Row label="Performance fee" formula="[xiv] = xiii × d" values={V("xiv")} isRed />
        <Row label="Net value of the Portfolio at the end of the year after all fees and expenses" formula="[xv] = ix + xiv" values={V("xv")} isBold isGreen />
        <PctRow label="% Portfolio Return" formula="[xvi] = (xv − i) / i" values={V("xvi")} />
        <SectionHeader  />
        <Row label="High Water Mark to be carried forward for next year. When performance fee is charged from the portfolio itself." formula="[xvii] = max(x, xv)" values={V("hwmPortfolio")} />
        <Row label="High Water Mark to becarried forward for next year. When performance fee is paid separately by the investor to the PM" formula="[xvii] = max(ix, x)" values={V("hwmSeparate")} />
      </TableWrap>
      <Notes notes={hybridNotes} />
    </div>
  );
}

/* ── MULTI-YEAR HYBRID FEE ──────────────────────────── */
function calcMultiYear(a, b, c, d, e, f, retPct) {
  const years = [];
  let prevXI = null, prevIX = null, prevXVII = null, prevXIX = null;
  const initialCapital = a;
  for (let n = 0; n < 5; n++) {
    const r = retPct[n];
    const i = n === 0 ? a : prevXVII;
    const ii = i * r, iii = i + ii;
    const iv = (i + iii) / 2;
    const v = -(iv * c), vi = -(iv * f);
    const vii = -(iv * b);
    const viii = v + vi + vii;
    const ix = iii + viii;
    const x = n === 0 ? a : prevXIX;
    const xi = n === 0 ? i * (1 + e) : Math.max(prevIX, prevXI) * (1 + e);
    const isP = ix > xi;
    const xii = isP ? (ix - xi) / xi : 0;
    const xiii = xii * d;
    // FIX: Year 1 uses xii*d*i; Year 2+ uses (ix-xi)*d
    const xiv = isP ? (n === 0 ? xii * d * i : (ix - xi) * d) : 0;
    const xvi = isP ? "Yes" : "No P.Fee";
    const xvii = ix - xiv;
    const xviii = (xvii - i) / i;
    const xirr = Math.pow(xvii / initialCapital, 1 / (n + 1)) - 1;
    const xix = Math.max(x, ix);

    years.push({ i, ii, iii, iv, v, vi, vii, viii, ix, x, xi, xii, xiii, xiv: -xiv, xvi, xvii, xviii, xirr, xix });

    // FIX: Update all prev variables each iteration
    prevXI = xi;
    prevIX = ix;
    prevXVII = xvii;
    prevXIX = xix;
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
        <Assump label="Capital Contribution (Rs.)" value={a} onChange={v => setA(v)} prefix="₹" />
        <Assump label="Management Fee (%age per annum)" value={b} onChange={v => setB(v)} suffix="%" step="0.1" />
        <Assump label="Other Expenses (%age per annum)" value={c} onChange={v => setC(v)} suffix="%" step="0.1" />
        <Assump label="Performance (%age per annum)" value={d} onChange={v => setD(v)} suffix="%" step="1" />
        <Assump label="Hurdle Rate of Return (%age p.a.)" value={e} onChange={v => setE(v)} suffix="%" step="0.5" />
        <Assump label="Brokerage and Transaction cost" value={f} onChange={v => setF(v)} suffix="%" step="0.1" />
      </AssumptionsGrid>
      <ReturnInputs returns={returns} setReturns={setReturns} labels={yrLabels} />
      <TableWrap>
        <ColHeaders labels={yrLabels} />
        <SectionHeader label="Hybrid Fee Calculator" />
        <Row label="Capital Contributed / Op Assets under Management" formula="[i] = a (Yr1), xvii prev (Yr2+)" values={V("i")} />
        <Row label="Gain / (Loss) on Investment based on the Scenario" formula="[ii] = i × return" values={V("ii")} />
        <Row label="Gross Value of the Portfolio at the end of the year" formula="[iii] = i + ii" values={V("iii")} />
        <Row label="Daily Weighted Average assets under management" formula="[iv] = (i + iii) / 2" values={V("iv")} />
        <Row label="Other Expenses" formula="[v] = iv × c" values={V("v")} isRed />
        <Row label="Brokerage and Transaction Cost" formula="[vi] = iv × f" values={V("vi")} isRed />
        <Row label="Management Fees" formula="[vii] = iv × b" values={V("vii")} isRed />
        <Row label="Total charges during the year" formula="[viii] = v + vi + vii" values={V("viii")} isBold isRed />
        <SectionHeader/>
        <Row label="Value of the Portfolio before Performance fee" formula="[ix] = iii + viii" values={V("ix")} />
        <Row label="High Water Mark Value (HWM)" formula="[x] = capital (Yr1); max(x, ix) prior year (Yr2+)" values={V("x")} />
        <Row label="Hurdle NAV (Compounded at Hurdle rate YoY)" formula="[xi] = i×(1+e) Yr1; max(prev_ix, prev_xi)×(1+e) Yr2+" values={V("xi")} />
        <SectionHeader/>
        <PctRow label="Portfolio value in excess of Hurdle NAV" formula="[xii] = (ix − xi) / xi  (if ix > xi, else 0)" values={V("xii")} />
        <PctRow label="Profit share of the PMS" formula="[xiii] = xii × d  (performance fee rate applied to excess)" values={V("xiii")} />
        <Row label="Profit Share To be taken by PMS" formula="[xiv] = (ix − xi) × d  (if applicable, else 0)" values={V("xiv")} isRed />
        <Row label="Is the Performance Fee charged?" formula='[xvi] = ix > xi → "Yes" else "No P.Fee"' values={V("xvi")} isStr />
        <SectionHeader/>
        <Row label="Net value of the Portfolio at the end of the year after all fees and expenses" formula="[xvii] = ix − xiv" values={V("xvii")} isBold isGreen />
        <PctRow label="% Portfolio Return (for the year)" formula="[xviii] = (xvii − i) / i" values={V("xviii")} />
        <PctRow label="Portfolio XIRR (Annualised CAGR since inception)" formula="[xirr] = (xvii / initial capital)^(1/n) − 1" values={V("xirr")} />
        <Row label="High Water Mark to be carried forward to next year" formula="[xix] = max(x, ix)" values={V("xix")} />
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
  "In the illustration, Management fee is assumed to be charged annually. However, the Portfolio Manager can charge fee at any frequency i.e. Daily, Monthly, Quarterly, Semi-annually, Annually or at any other frequency as defined in the PMS agreement and as permitted under SEBI regulations.",
  "Portfolio Manager can charge Management Fee on Average portfolio value for the management fee period or the closing portfolio value or in any other manner as defined in the PMS agreement.",
  "Returns are assumed to be generated linearly through the year.",
  "Other Expenses includes Account Opening charges, stamp duty /Audit Fee/ Bank charges / Fund Accounting charges / Custody Fee / demat charges or other miscellaneous expense",
  "Brokerage and transaction cost for the illustration purpose is charged on the Average AUM. However, Brokerage and Transaction cost are charged on basis the actuals trades.",
  "All Fees and charges are subject to GST.",
  "For this illustration, High Water Mark for the 1st Year is the Capital invested and from second year onwards if performance fee is charged, it's the year end closing value after all charges and fees, else it remains the same. However, in actual, High Water Mark is defined in the PMS agreement and may differ from this illustration.",
  "For this illustration, Hurdle rate is calculated on Higher of (HWM or previous year closing capital). However, in actual Hurdle Rate of return is defined in the PMS agreement and may differ from this illustration.",
  "Hurdle rate is prorated in case the performance fee period is less than 1 year OR if there are inflow/outflows from the portfolio",
  "The above illustration shows the High Water Mark to be carried forward in different scenario for equal and fair treatment to the investor.",
  "This is only a generic illustration, each portfolio manager can modify the illustration as per the terms and condition of their PMS agreement.",
  "Portfolio Managers are advised to also refer to the illustrations provided in Annexure 4A of Master Circular for Portfolio Managers dated June 07, 2024. ",
];
const multiNotes = [
  "In the illustration, Management fee is assumed to be charged annually. However, the Portfolio Manager may charge fee at any other frequency (i.e. Monthly, Quarterly, Semi-annually, Annually) as defined in the PMS agreement and permitted under SEBI regulations.",
  "For this illustration, the Hurdle NAV is compounded annually at the Hurdle Rate. In the first year, the Hurdle NAV is calculated by applying the Hurdle Rate to the Initial Capital Contribution. For subsequent years, the Hurdle NAV is calculated as the greater of the Value of the Portfolio before applying the Performance Fee, after applying the Hurdle Rate, or the previous year's Hurdle NAV compounded by the Hurdle Rate. This approach ensures that the Hurdle NAV is properly compounded while accounting for the performance of the portfolio.",
  "For this illustration, High Water Mark in any year is the maximum closing value of the portfolio (before performance fee) in all the preceding financial years.",
  "In this example, there is no catch up of fee for the customer.",
  "Hurdle rate is prorated in case the performance fee period is less than 1 year OR if there are inflow/outflows from the portfolio.",
  "The above calculator assumes that the performance fee is charged from the portfolio itself.",
  "Returns are assumed to be generated linearly through the year.",
  "Other Expenses includes Account Opening charges, stamp duty / Audit Fee / Bank charges / Fund Accounting charges / Custody Fee / demat charges or other miscellaneous expense.",
  "Brokerage and transaction cost for the illustration purpose is charged on the Average AUM. However, Brokerage and Transaction cost are charged on basis the actual trades.",
  "All Fees and charges are subject to GST.",
  "This is only a generic illustration, each portfolio manager can modify the illustration as per the terms and condition of their PMS agreement.",
  "Portfolio XIRR is the Compound Annual Growth Rate (CAGR) from initial capital to the current net portfolio value over n years: (Net Portfolio Value / Initial Capital)^(1/n) − 1.",
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
