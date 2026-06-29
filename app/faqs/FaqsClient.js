"use client";
import { useState, useEffect, useRef } from "react";

export default function FaqsClient() {
  const [faqs, setFaqs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [openIdx, setOpenIdx] = useState(0);
  const [query, setQuery]     = useState("");

  const itemRefs = useRef({});

  /* ── Fetch FAQs ── */
  useEffect(() => {
    fetch("https://badmin.vallum.in/api/faq-list", {
      headers: { Accept: "application/json" },
    })
      .then(r => r.json())
      .then(d => {
        if (d.status === "success") {
          setFaqs(d.faqData || []);
          setOpenIdx(0);
        } else {
          setError("Failed to load FAQs.");
        }
      })
      .catch(() => setError("Unable to connect. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  /* ── Stagger-in observer ── */
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    Object.values(itemRefs.current).forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loading, faqs]);

  /* ── Filtered FAQs ── */
  const filtered = faqs.filter(f => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      (f.faq_title || "").toLowerCase().includes(q) ||
      (f.faq_description || "").toLowerCase().includes(q)
    );
  });

  const toggle = (idx) => setOpenIdx(prev => prev === idx ? null : idx);

  /* ── Render ── */
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-label">
            <span className="line"></span>
            FREQUENTLY ASKED QUESTIONS
            <span className="line"></span>
          </div>
          <h1 className="hero-title">
            Questions We <br /><span>Hear Most Often</span>
          </h1>
          <p className="hero-desc">
            Investing is a serious, long-term commitment. Below you'll find clear, candid answers
            to the questions investors ask us most — about our philosophy, process, fees, and the
            path to getting started.
          </p>
          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-n">{loading ? "…" : filtered.length}</span>
              <span className="stat-l">QUESTIONS ANSWERED</span>
            </div>
            <div className="stat-box">
              <span className="stat-n">15+</span>
              <span className="stat-l">YEARS OF PRACTICE</span>
            </div>
            <div className="stat-box">
              <span className="stat-n">SEBI</span>
              <span className="stat-l">REGISTERED PMS</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content-section">
        <div className="container">

          {/* States */}
          {loading && <p className="faq-status">Loading…</p>}
          {error   && <p className="faq-status faq-error">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="faq-status">No results found for "{query}".</p>
          )}

          {/* Accordion */}
          {!loading && !error && (
            <div className="faq-accordion">
              {filtered.map((faq, idx) => {
                const isOpen = openIdx === idx;
                const inputId = `faq-${idx}`;
                return (
                  <div
                    key={faq.faq_id ?? idx}
                    className="accordion-item"
                    ref={el => { itemRefs.current[idx] = el; }}
                  >
                    {/* ✅ Hidden checkbox — drives ALL the CSS selectors */}
                    <input
                      type="checkbox"
                      id={inputId}
                      className="acc-toggle"
                      checked={isOpen}
                      onChange={() => toggle(idx)}
                    />

                    {/* Header — must be sibling immediately after input */}
                    <label
                      htmlFor={inputId}
                      className="acc-header"
                    >
                      <span className="acc-num">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="acc-question">{faq.faq_title}</span>
                      <div className="acc-icon" />
                    </label>

                    {/* Body — must be sibling after input for ~ selector */}
                    <div className="acc-body">
                      <div
                        className="acc-inner"
                        dangerouslySetInnerHTML={{ __html: faq.faq_description }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="cta-card">
            <div className="cta-info">
              <span className="cta-small">STILL HAVE QUESTIONS?</span>
              <h2 className="cta-head">
                We welcome a <br /><i>direct conversation.</i>
              </h2>
              <p className="cta-para">
                Our team is available to answer any question not covered above with complete candour.
              </p>
            </div>
            <div className="cta-btn-wrap mt-3">
              <a href="/contact-us" aria-label="Contact us" className="btn-gold">
                Contact Us{" "}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}