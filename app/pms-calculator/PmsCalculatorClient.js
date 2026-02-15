"use client";

import { useState, useEffect } from "react";

export default function PmsCalculatorClient() {
  const [investment, setInvestment] = useState(5000000);
  const [investmentError, setInvestmentError] = useState("");
  const [returns, setReturns] = useState([20, 10, 25, -10, 50]);
  const [results, setResults] = useState([]);

  const formatINR = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
      roundingMode: "halfExpand",
    }).format(value);
  };

  const calculateFees = () => {
    if (Number(investment) < 5000000) return;

    let yearlyData = [];
    let prevYearData = null;

    for (let i = 0; i < 5; i++) {
      const R = returns[i] / 100;
      let currentYear = {};

      currentYear.A = i === 0 ? Number(investment) : prevYearData.T;

      currentYear.B = currentYear.A * (1 + R * 0.25);
      currentYear.C = ((currentYear.A + currentYear.B) / 2) * 0.005;
      currentYear.D = currentYear.B - currentYear.C;

      currentYear.E = currentYear.A * (1 + R * 0.5) - currentYear.C;
      currentYear.F = ((currentYear.D + currentYear.E) / 2) * 0.005;
      currentYear.G = currentYear.E - currentYear.F;

      currentYear.H = currentYear.A * (1 + R * 0.75) - currentYear.C - currentYear.F;
      currentYear.I = ((currentYear.G + currentYear.H) / 2) * 0.005;
      currentYear.J = currentYear.H - currentYear.I;

      currentYear.K = currentYear.A * (1 + R * 1) - currentYear.C - currentYear.F - currentYear.I;
      currentYear.L = ((currentYear.J + currentYear.K) / 2) * 0.005;

      currentYear.M = currentYear.K - currentYear.L;

      currentYear.N = 0.1;

      currentYear.O = i === 0 ? currentYear.A : prevYearData.W;

      currentYear.P = currentYear.O * currentYear.N;

      const isPerformanceFee = currentYear.M > currentYear.O + currentYear.P;
      currentYear.Q = isPerformanceFee ? "Yes" : "No Performance Fee";

      currentYear.R = isPerformanceFee ? currentYear.M - currentYear.O - currentYear.P : 0;

      currentYear.S = currentYear.R * 0.1;

      currentYear.T = currentYear.M - currentYear.S;

      currentYear.U = currentYear.C + currentYear.F + currentYear.I + currentYear.L + currentYear.S;

      currentYear.V = ((currentYear.T - currentYear.A) / currentYear.A) * 100;

      currentYear.W = isPerformanceFee ? currentYear.T : currentYear.O + currentYear.P;

      yearlyData.push(currentYear);
      prevYearData = currentYear;
    }

    setResults(yearlyData);
  };

  const handleInvestmentChange = (e) => {
    const val = e.target.value;
    setInvestment(val);
    
    if (Number(val) < 5000000) {
      setInvestmentError("Minimum investment is ₹50,00,000");
    } else {
      setInvestmentError("");
    }
  };

  const handleReturnChange = (index, value) => {
    const newReturns = [...returns];
    newReturns[index] = Number(value);
    setReturns(newReturns);
  };

  useEffect(() => {
    calculateFees();
  }, []); 

  const tableRows = [
    { section: "Fixed Management Fees Calculation" },
    { label: "Opening NAV at the beginning of the year", formula: "[A]", key: "A" },
    { label: "NAV at the end of Q1 before Fixed Fees", formula: "[B]=[A]*(1+(Returns*0.25))", key: "B" },
    { label: "Fixed PMS Fees Q1", formula: "[C]=[(A+B)/2*0.5%]", key: "C" },
    { label: "NAV after Q1 Fees", formula: "[D]=[B-C]", key: "D" },
    { label: "NAV at the end of Q2 before Fixed Fees", formula: "[E]=[[A]*(1+(Returns*0.5))]-[C]", key: "E" },
    { label: "Fixed PMS Fees Q2", formula: "[F]=[(D+E)/2*0.5%]", key: "F" },
    { label: "NAV after Q2 Fees", formula: "[G]=[E-F]", key: "G" },
    { label: "NAV at the end of Q3 before Fixed Fees", formula: "[H]=[[A]*(1+(Returns*0.75))]-[C]-[F]", key: "H" },
    { label: "Fixed PMS Fees Q3", formula: "[I]=[(G+H)/2*0.5%]", key: "I" },
    { label: "NAV after Q3 Fees", formula: "[J]=[H-I]", key: "J" },
    { label: "NAV at the end of Q4 before Fixed Fees", formula: "[K]=[[A]*(1+(Returns*1))]-[C]-[F]-[I]", key: "K" },
    { label: "Fixed PMS Fees Q4", formula: "[L]=[(J+K)/2*0.5%]", key: "L" },
    { section: "Profit Sharing Fees Calculation" },
    { label: "NAV after Q4 Fees", formula: "[M]=[K-L]", key: "M" },
    { label: "Hurdle Rate of Return [% p.a]", formula: "[N]", key: "N", isPercent: true },
    { label: "High Water Mark Value (HWMV)", formula: "[O]=[A] in Yr 1, else [W]", key: "O" },
    { label: "Hurdle Rate of Return", formula: "[P]=[O*N]", key: "P" },
    { label: "Gross Value of the Portfolio before Performance fee is greater than High Water Mark Value + Hurdle rate of return", formula: '[Q]= If [M]>(O+P) then "Yes", else "No Performance Fee"', key: "Q", isString: true },
    { subSection: "If Yes, proceed to performance fee calculation else 0 (zero) performance fee for the period" },
    { label: "Portfolio Value in excess of Hurdle NAV", formula: "[R]=[M-O-P]", key: "R" },
    { label: "Profit Sharing Fee @ 10%", formula: "[S]=[R*10%]", key: "S" },
    { label: "NAV After Profit Sharing Fees", formula: "[T]=[M-S]", key: "T" },
    { label: "Total Fees charged during the Year", formula: "[U]=[C]+[F]+[I]+[L]+[S]", key: "U", isBold: true },
    { label: "% Portfolio Return on Opening NAV", formula: "[V]=[(T-A)/A*100]", key: "V", isPercentDynamic: true },
    { label: "HWMV to be carried forward for next year", formula: '[W]=If [Q] is "Yes", then [T], else [O+P]', key: "W" },
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#eefaf8", minHeight: "100vh" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="mb-2 fw-bold" style={{ color: "#3e3e8a" }}>Fee Calculator</h2>
          <p className="text-muted mb-4 fst-italic">Edit investment amount/expected returns for different scenarios.</p>

          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle mb-0 text-center" style={{ overflow: "visible" }}>
              <thead>
                <tr>
                  <th rowSpan="2" className="align-middle w-25 text-white" style={{ backgroundColor: "#3e3e8a" }}>Investment (INR)</th>
                  <th colSpan="5" className="text-white border-start-0" style={{ backgroundColor: "#3e3e8a" }}>Expected Returns</th>
                </tr>
                <tr>
                  <th className="text-white" style={{ backgroundColor: "#3e3e8a" }}>Year 1</th>
                  <th className="text-white" style={{ backgroundColor: "#3e3e8a" }}>Year 2</th>
                  <th className="text-white" style={{ backgroundColor: "#3e3e8a" }}>Year 3</th>
                  <th className="text-white" style={{ backgroundColor: "#3e3e8a" }}>Year 4</th>
                  <th className="text-white" style={{ backgroundColor: "#3e3e8a" }}>Year 5</th>
                </tr>
              </thead>
              <tbody className="bg-light">
                <tr>
                  <td className="p-3 position-relative">
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white">₹</span>
                      <input
                        type="number"
                        className={`form-control text-start border-start-0 ${investmentError ? 'is-invalid' : ''}`}
                        value={investment}
                        min="5000000"
                        onChange={handleInvestmentChange}
                      />
                    </div>
                    {investmentError && (
                      <div className="text-danger small mt-1 text-start fw-bold">
                        {investmentError}
                      </div>
                    )}
                  </td>
                  {returns.map((ret, index) => (
                    <td key={index} className="p-3 align-top">
                      <div className="input-group shadow-sm">
                        <input
                          type="number"
                          className="form-control text-center border-end-0"
                          value={ret}
                          onChange={(e) => handleReturnChange(index, e.target.value)}
                        />
                        <span className="input-group-text bg-white">%</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <button 
              className="btn px-4 py-2 shadow-sm text-white" 
              style={{ backgroundColor: "#3e3e8a", borderColor: "#3e3e8a", opacity: investmentError ? 0.6 : 1 }} 
              onClick={calculateFees}
              disabled={!!investmentError}
            >
              Calculate
            </button>
          </div>

          {results.length > 0 && !investmentError && (
            <div className="table-responsive shadow-sm border rounded mb-5">
              <table className="table table-bordered table-hover mb-0" style={{ fontSize: "0.95rem" }}>
                <tbody>
                  {tableRows.map((row, index) => {
                    if (row.section) {
                      return (
                        <tr key={index} className="text-center fw-bold">
                          <td colSpan="6" className="py-2 text-white" style={{ backgroundColor: "#3e3e8a" }}>{row.section}</td>
                        </tr>
                      );
                    }

                    if (row.subSection) {
                      return (
                         <tr key={index} className="table-light text-start fw-bold">
                          <td colSpan="6" className="py-2 px-3 text-dark">{row.subSection}</td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={index}>
                        <td className="w-25 bg-light px-3">
                          <div className={`text-dark ${row.isBold ? "fw-bold" : ""}`}>
                            {row.label}
                          </div>
                          <small className="fst-italic" style={{ color: "#3e3e8a", fontSize: "0.75rem" }}>
                            {row.formula}
                          </small>
                        </td>
                        {results.map((res, i) => {
                          let cellValue;
                          if (row.isString) {
                            cellValue = res[row.key];
                          } else if (row.isPercent) {
                            cellValue = "10%";
                          } else if (row.isPercentDynamic) {
                            cellValue = `${res[row.key].toFixed(2)}%`;
                          } else {
                            cellValue = formatINR(res[row.key]);
                          }

                          return (
                            <td
                              key={i}
                              className={`text-end align-middle px-3 ${row.isBold ? "fw-bold" : ""}`}
                            >
                              {cellValue}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4 pt-3 border-top text-start" style={{ fontSize: "0.85rem", color: "#444" }}>
            <p className="fw-bold mb-2">Assumptions & Notes:</p>
            <ol className="ps-3 mb-0">
              <li className="mb-1">In the illustration, Management fee is assumed to be charged Quarterly.</li>
              <li className="mb-1">Returns are assumed to be generated linearly throughout the year.</li>
              <li className="mb-1">Return figures are calculated based on NAV. NAV is net of all expenses & Pre-tax (TDS will enhance the NAV). Statutory levies like GST is not included in the illustrative calculations.</li>
              <li className="mb-1">All Fees and charges are subject to GST.</li>
              <li className="mb-1">For this illustration, High Water Mark Value for the 1st year is the capital invested, and from the second year onwards if a performance fee is charged, it's the year-end closing value after all charges and fees. (Assuming performance fee is charged from the portfolio itself)</li>
              <li className="mb-1">For this illustration, Hurdle rate of return is calculated on HWMV, which is arrived at the completion of each year.</li>
              <li className="mb-1">Hurdle rate is prorated in case the performance fee period is less than 1 year OR if there are inflow/outflows from the portfolio.</li>
              <li className="mb-1">
                Further to note 3 above and clause 7 of the PMS agreement, since returns are calculated based on NAV, expenses like custodian fees, brokerage, and other expenses have already been considered in computing the returns. The illustration of the below expenses is based on the assumption that the assets under management is Rs. 75 lakhs for an initial investment of Rs. 50 lakhs:
                <ol type="a" className="ps-3 mt-2">
                  <li className="mb-1">Custodian fees: 0.03% per annum of the assets under management: Rs. 2,250 per annum.</li>
                  <li className="mb-1">Other expenses including depository charges, bank charges, audit fees, and legal charges would be at actuals. Such expenses shall not exceed 0.5% per annum of the client's average daily Assets Under Management: Rs. 37,500/-.</li>
                  <li className="mb-1">Brokerage on transactions: Limited to 0.25% of the value of the securities bought and sold to be paid to the stockbroker, assuming a total buy and sale of Rs. 75 lakhs: Rs. 18,750/-.</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}