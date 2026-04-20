"use client";

import { useState, useRef, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const RECORDS = [
  {
    year: "2014",
    tag: "PSU · Governance Trap",
    title: "Real Estate Reiteration & PSU Dislocation",
    bullets: [
      "Reiterated extreme bearishness on Indian property amid national competitiveness concerns.",
      "Identified stark 'dislocation' in PSU banking versus private sector peers.",
      "Coined the insight: a 'value trap' in public sectors is often a 'governance trap'.",
      "Stark NBFC vs state bank valuations as a signal of structural decay.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773656894.pdf",
    current: false,
  },
  {
    year: "2015",
    tag: "Capital Preservation",
    title: "PSU Is A Value Trap",
    bullets: [
      "Firm stance: Public Sector Undertakings remained a significant value trap.",
      "Completely 'switched off' from public sector banks despite market noise.",
      "Without fundamental governance changes, these entities cannot create sustained value.",
      "Capital preservation paramount — avoiding institutionally weak sectors.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657000.pdf",
    current: false,
  },
  {
    year: "2016",
    tag: "China+1 · Chemicals",
    title: "Benefit To Indian Chemical Industry",
    bullets: [
      "Predicted rising costs in Chinese chemical industry due to pollution curbs.",
      "Indian chemical industry positioned as primary beneficiary of global shift.",
      "Indian firms uniquely well-prepared for the resulting surge in global demand.",
      "Capitalized on 'China+1' strategy long before it became mainstream narrative.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657057.pdf",
    current: false,
  },
  {
    year: "2017",
    tag: "Philosophy · Process",
    title: "The Four Corner Stones of Investing",
    bullets: [
      "Litmus test: art of buying, science of evaluation, disciplined selling, proper bet sizing.",
      "Capitalized on contrarian recoveries in basmati rice, auto ancillaries, and electrodes.",
      "Warned of future shortage of quality investable companies in India.",
      "Championed fiduciary responsibility — eventually led to new SEBI disclosure directives.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657333.pdf",
    current: false,
  },
  {
    year: "2018",
    tag: "Caution · Value Shift",
    title: "Economic Outlook & Value Shifts",
    bullets: [
      "Sounded caution on the true nature of Indian economic growth and market reflection.",
      "Perceived growth often masked by simple economic value shifts between sectors.",
      "Questioned whether the market was experiencing value creation or mere reshuffling.",
      "Warned of significant headwinds facing Indian equities in transition.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657411.pdf",
    current: false,
  },
  {
    year: "2019",
    tag: "Gold · De-dollarisation",
    title: "Dollar Depreciation & The Rise of Gold",
    bullets: [
      "Identified USD entering a bearish eight-year structural cycle.",
      "Emerging Markets, Gold, and Oil as primary beneficiaries of dollar decline.",
      "A decade of under-investment in gold mining creating massive supply contraction.",
      "Loaded up in large gold financing companies to capture the rise in bullion.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657482.pdf",
    current: false,
  },
  {
    year: "2020",
    tag: "Recovery · Pharma",
    title: "Recovery & The Post-Covid World",
    bullets: [
      "Anticipated meaningful domestic-led recovery in the Indian economy post-pandemic.",
      "Warned excess global monetary supply was creating massive asset inflation.",
      "Noted a 'domino effect' from high liquidity distorting global asset classes.",
      "Pivoted toward pharma as an under-owned sector with improving dynamics.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657558.pdf",
    current: false,
  },
  {
    year: "2021",
    tag: "Infrastructure · Commodities",
    title: "Physical Assets & Infrastructure Sector",
    bullets: [
      "Leveraged low interest rates and pent-up consumer demand for infrastructure revival.",
      "Government commitment to infrastructure identified as key catalyst.",
      "Commodity boom expected to fuel healthy working capital credit growth for lenders.",
      "Shifted tactically to higher market-cap companies to navigate counterbalancing forces.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657629.pdf",
    current: false,
  },
  {
    year: "2022",
    tag: "Value · Energy · Rotation",
    title: "Leadership Shift from Growth to Value",
    bullets: [
      "Identified a significant rotation in market leadership from growth to value investing.",
      "Companies disguised as 'innovators' lacking tangible assets were destroying value.",
      "Capitalized on cyclical, downtrodden energy and real assets during the Ukraine crisis.",
      "Tectonic shifts creating massive opportunities by moving away from expensive tech.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657675.pdf",
    current: false,
  },
  {
    year: "2023",
    tag: "Energy · Analytical Edge",
    title: "The Energy Landscape & Analytical Advantage",
    bullets: [
      "Navigated fragmented global energy landscape; India as a key buyer of discounted oil.",
      "Framework focused on informational, analytical, and behavioral competitive advantages.",
      "Invested in 'difficult-to-copy' consumer brands and deep-value recovering names.",
      "Emphasized the 'network effect' of India's expanding physical and digital infrastructure.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657764.pdf",
    current: false,
  },
  {
    year: "2024",
    tag: "Discretionary · Premiumisation",
    title: "The Acceleration Phenomenon (AP)",
    bullets: [
      "Modelled growth from income tax filers shifting into higher discretionary spending brackets.",
      "Non-linear opportunities in luxury car dealerships, premium apparel, and music content.",
      "Resurgence of thermal power as a contrarian play against the renewables focus.",
      "Focused on businesses where management interests align with minority shareholders.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657855.pdf",
    current: false,
  },
  {
    year: "2025",
    tag: "Malthusian · De-dollarisation",
    title: "Malthusian Bull Markets & De-dollarization",
    bullets: [
      "Analyzed 'Malthusian' market where valuations rose from scarcity of investable equity assets.",
      "Acceleration of de-dollarization; trade wars shifting capital toward Emerging Markets.",
      "Consolidated into 'Marquee Brands' to benefit from the government tax relief multiplier effect.",
      "Structural reversal: U.S. assets would no longer dominate global capital flows.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773657916.pdf",
    current: false,
  },
  {
    year: "2026",
    tag: "Multi-Asset · Silver · AI",
    title: 'The "Fox-Hog" Multi-Asset Approach',
    bullets: [
      "Launched Multi-Activa strategy across global themes, commodities, and debt instruments.",
      "Combined the global 'fox' vision with the survivalist discipline of the value 'hedgehog'.",
      "Capitalized on the 'Inversion of AI Economics' through high-conviction Chinese tech exposure.",
      "Positioned silver as the 'forgotten monetary metal' to hedge against global currency debasement.",
    ],
    url: "https://badmin.vallum.in/img/uploads/blogs/1773658632.pdf",
    current: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function RecordCard({ record, state }) {
  // state: "visible" | "exit-left" | "exit-right" | "hidden"
  const baseTransition = "opacity 0.35s ease, transform 0.35s ease";

  const stateStyles = {
    visible:     { opacity: 1, transform: "translateX(0)",    pointerEvents: "auto",  position: "relative" },
    "exit-left": { opacity: 0, transform: "translateX(0px)", pointerEvents: "none", position: "absolute", inset: 0 },
    "exit-right":{ opacity: 0, transform: "translateX(0px)", pointerEvents: "none",  position: "absolute", inset: 0 },
    hidden:      { opacity: 0, transform: "translateX(0px)", pointerEvents: "none",  position: "absolute", inset: 0 },
  };

  return (
    <div
      className="container"
      style={{
        width: "100%",
        transition: baseTransition,
        ...stateStyles[state],
      }}
    >
      {/* Card shell */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2ddd3",
          borderTop: "4px solid #2B338A",
          borderRadius: "4px",
          padding: "32px 36px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ghost watermark */}
        <span
          aria-hidden="true"
          style={{
            
            fontSize: "120px",
            fontWeight: 900,
            color: "#f0ece3",
            position: "absolute",
            bottom: "-18px",
            right: "20px",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          {record.year}
        </span>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              {/* Tag + current badge */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#EEF0F8",
                    color: "#2B338A",
                    fontSize: "11px",
                    fontWeight: 700,
                    
                    letterSpacing: "0.07em",
                    padding: "4px 12px",
                    borderRadius: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {record.tag}
                </span>

                {record.current && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#2B338A",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 700,
                      
                      letterSpacing: "0.08em",
                      padding: "4px 11px",
                      borderRadius: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#C28934",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    Current Theme
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                style={{
                  
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1e244f",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {record.title}
              </h3>
            </div>

            {/* Year pill */}
            <span
              style={{
                
                fontSize: "15px",
                fontWeight: 700,
                color: "#C28934",
                background: "#fdf5e8",
                border: "1px solid #e8c87a",
                borderRadius: "3px",
                padding: "4px 12px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                alignSelf: "flex-start",
                marginTop: "2px",
              }}
            >
              {record.year}
            </span>
          </div>

          {/* Bullets */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
            {record.bullets.map((bullet, i) => (
              <li
                key={i}
                style={{
                  fontSize: "14px",
                  color: "#4a4540",
                  lineHeight: 1.65,
                  paddingLeft: "20px",
                  position: "relative",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "8px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#C28934",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "16px",
              borderTop: "1px solid #ece8e0",
            }}
          >
            <a
              href={record.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "#2B338A",
                color: "#ffffff",
                
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "10px 22px",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e256b")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2B338A")}
            >
              Read More <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TrackRecordClient() {
  const LAST = RECORDS.length - 1;
  const [current, setCurrent] = useState(LAST);
  const [cardStates, setCardStates] = useState(() => {
    // All hidden except last
    return RECORDS.map((_, i) => (i === LAST ? "visible" : "hidden"));
  });
  const transitioning = useRef(false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function goTo(idx) {
    if (transitioning.current || idx === current || idx < 0 || idx >= RECORDS.length) return;
    transitioning.current = true;

    const goRight = idx > current;
    const oldIdx = current;

    // 1. Slide old card out; prime new card to enter
    setCardStates((prev) => {
      const next = [...prev];
      next[oldIdx] = goRight ? "exit-left" : "exit-right";
      // new card starts off-screen in the incoming direction (handled via "hidden" + we swap below)
      next[idx] = goRight ? "hidden-right" : "hidden-left";
      return next;
    });

    // 2. One frame later: slide new card in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCurrent(idx);
        setCardStates((prev) => {
          const next = [...prev];
          next[idx] = "visible";
          return next;
        });
      });
    });

    // 3. Clean up exited card after animation
    setTimeout(() => {
      setCardStates((prev) => {
        const next = [...prev];
        next[oldIdx] = "hidden";
        return next;
      });
      transitioning.current = false;
    }, 420);
  }

  // Map our internal states to style definitions
  function resolveState(rawState, idx) {
    if (rawState === "visible") return "visible";
    if (rawState === "exit-left") return "exit-left";
    if (rawState === "exit-right") return "exit-right";
    // "hidden-left" / "hidden-right" / "hidden" all collapse to hidden
    return "hidden";
  }

  return (
    <>
      <section
        style={{
          
          background: "#F5F4EF",
          padding: "48px 20px 60px",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2
            style={{
              
              fontSize: "clamp(22px, 4vw, 30px)",
              fontWeight: 900,
              color: "#2B338A",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            A Decade of Thinking Ahead
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#7a7368",
              marginTop: "8px",
              lineHeight: 1.6,
            }}
          >
            Our timestamped investment views — anticipating market shifts, challenging consensus,
            positioning capital ahead of the curve.
          </p>
        </div>

        {/* ── Year Rail ── */}
        <div
          style={{
            position: "relative",
            margin: "0 auto 32px",
            padding: "0 8px",
          }}
        >
          {/* Connecting line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "14px",
              left: "36px",
              right: "36px",
              height: "2px",
              background: "#ddd8cc",
              zIndex: 0,
            }}
          />

          {/* Year buttons */}
          <div
            role="tablist"
            aria-label="Select year"
            className="tablist"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
              gap: "20px",
              zIndex: 1,
            }}
          >
            {RECORDS.map((rec, i) => {
              const isActive = i === current;
              return (
                <button
                  key={rec.year}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${rec.year}`}
                  onClick={() => goTo(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    flex: 1,
                    maxWidth: "72px",
                    outline: "none",
                  }}
                >
                  {/* Dot */}
                  <span
                    style={{
                      display: "block",
                      width: isActive ? "18px" : "12px",
                      height: isActive ? "18px" : "12px",
                      borderRadius: "50%",
                      background: isActive ? "#C28934" : "#ccc7bb",
                      border: `2px solid ${isActive ? "#C28934" : "#ccc7bb"}`,
                      boxShadow: isActive ? "0 0 0 5px rgba(194,137,52,0.15)" : "none",
                      transition: "all 0.22s ease",
                    }}
                  />
                  {/* Label */}
                  <span
                    style={{
                      
                      fontSize: isActive ? "11px" : "10px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#C28934" : "#aaa69c",
                      letterSpacing: "0.03em",
                      whiteSpace: "nowrap",
                      transition: "color 0.22s ease, font-size 0.22s ease",
                    }}
                  >
                    {rec.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Card Stage ── */}
        <div
          aria-live="polite"
          className="polite"
          style={{
            position: "relative",
            margin: "0 auto",
          }}
        >
          {RECORDS.map((rec, i) => (
            <RecordCard
              key={rec.year}
              record={rec}
              state={resolveState(cardStates[i], i)}
            />
          ))}
        </div>

        {/* ── Nav Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "28px",
          }}
        >
          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous year"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: `1.5px solid ${current === 0 ? "#d4d0c8" : "#2B338A"}`,
              background: "#ffffff",
              color: current === 0 ? "#d4d0c8" : "#2B338A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: current === 0 ? "not-allowed" : "pointer",
              flexShrink: 0,
              outline: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (current !== 0) {
                e.currentTarget.style.background = "#2B338A";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = current === 0 ? "#d4d0c8" : "#2B338A";
            }}
          >
            <ArrowLeft />
          </button>

          {/* Counter */}
          <span
            style={{
              
              fontSize: "13px",
              color: "#a09890",
              minWidth: "56px",
              textAlign: "center",
              letterSpacing: "0.05em",
            }}
          >
            {current + 1} / {RECORDS.length}
          </span>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === RECORDS.length - 1}
            aria-label="Next year"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: `1.5px solid ${current === RECORDS.length - 1 ? "#d4d0c8" : "#2B338A"}`,
              background: "#ffffff",
              color: current === RECORDS.length - 1 ? "#d4d0c8" : "#2B338A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: current === RECORDS.length - 1 ? "not-allowed" : "pointer",
              flexShrink: 0,
              outline: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (current !== RECORDS.length - 1) {
                e.currentTarget.style.background = "#2B338A";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color =
                current === RECORDS.length - 1 ? "#d4d0c8" : "#2B338A";
            }}
          >
            <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}