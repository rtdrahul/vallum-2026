"use client";

import { useEffect, useRef } from "react";


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const strategies = [
  {
    index: "01",
    tag: "Equity Strategy",
    title: "Vallum India Discovery Strategy",
    description:
      "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and fundamental analysis.",
    image: "/assets/images/common/approach.webp",
    url: "/vallum-india-discovery",
    reverse: false,
  },
  {
    index: "02",
    tag: "Multi-Asset Strategy",
    title: "Vallum India Multi-Activa Strategy",
    description:
      "A diversified investment approach designed to achieve long-term capital appreciation by dynamically allocating across multiple asset classes based on market conditions. The strategy seeks to optimise risk-adjusted returns through active and flexible asset allocation within the regulatory framework.",
    image: "https://badmin.vallum.in/img/uploads/media/1769971331.webp",
    url: "/vallum-multi-activa",
    reverse: true,
  },
  {
    index: "03",
    tag: "Principles Based",
    titleStart: "Vallum",
    titleEnd: "Principles Approach",
    showLogo: true,
    description:
      "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and cycle awareness.",
    image: "/assets/images/common/temple.webp",
    url: "/vallum-jan-principle",
    reverse: false,
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function InvestmentApproach() {
  const sectionRef = useRef(null);

  /* Intersection observer for reveal animations */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".ia-reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ia-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="ia-section" ref={sectionRef} id="approach">
        {/* Subtle background texture */}
        <div className="ia-bg-texture" aria-hidden="true" />

        <div className="ia-container">
          <div className="sec-header reveal">
            <span className="overline">Our Strategies</span>
            <h2>Investment Approach</h2>
            <div className="ornament"><svg viewBox="0 0 16 16"><path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6Z"/></svg></div>
            <p>Three distinct lenses through which we identify, evaluate and hold
              positions — each grounded in discipline, research depth and
              valuation realism.</p>
        </div>
          {/* ── Strategy Rows ── */}
          <div className="ia-rows">
            {strategies.map((s, i) => (
              <StrategyRow key={i} item={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────
   STRATEGY ROW
───────────────────────────────────────────── */
function StrategyRow({ item }) {
  const isReverse = item.reverse;

  return (
    <article
      className={`ia-row ${isReverse ? "ia-row--rev" : ""}`}
      aria-label={item.title || `${item.titleStart} ${item.titleEnd}`}
    >
      {/* ── img side ── */}
      <div className="ia-img-col ia-reveal">
        <div className="ia-img-frame">
          {/* Gold corner accents */}
          <span className="ia-corner ia-corner--tl" aria-hidden="true" />
          <span className="ia-corner ia-corner--br" aria-hidden="true" />

          <div className="ia-img-inner">
            <img
              src={item.image}
              alt={item.title ?? `${item.titleStart} ${item.titleEnd}`}
              sizes="(max-width:768px) 100vw, 50vw"
              className="ia-img"
              style={{ objectFit: "cover" }}
            />
            {/* Overlay on hover */}
            <div className="ia-img-overlay" aria-hidden="true" />
          </div>

          {/* Strategy index badge */}
          <div className="ia-badge">{item.index}</div>
        </div>
      </div>

      {/* ── Content side ── */}
      <div className="ia-text-col ia-reveal ia-reveal-d1">
        {/* Index watermark */}
        <span className="ia-index-wm" aria-hidden="true">
          {item.index}
        </span>

        {/* Tag */}
        <span className="ia-tag">{item.tag}</span>

        {/* Title */}
        <h3 className="ia-strategy-title">
          {item.showLogo ? (
            <>
              {item.titleStart}&nbsp;
              <span className="ia-jan-wrap">
                <img
                  src="https://badmin.vallum.in/img/uploads/media/1770088614.png"
                  alt="JAN"
                  width={72}
                  height={28}
                  className="ia-jan-logo"
                  style={{ objectFit: "contain" }}
                />
              </span>
              &nbsp;{item.titleEnd}
            </>
          ) : (
            item.title
          )}
        </h3>

        {/* Divider */}
        <div className="ia-divider" aria-hidden="true">
          <span className="ia-div-line" />
          <span className="ia-div-dot" />
        </div>

        {/* Description */}
        <p className="ia-desc">{item.description}</p>

        {/* CTA */}
        <a href={item.url} className="btn btn-indigo">
          Explore the Investment Approach<span className="arrow"><svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg></span>          
        </a>
      </div>

      {/* Vertical connector (between rows) */}
    </article>
  );
}
