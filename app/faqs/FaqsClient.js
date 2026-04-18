"use client";
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   Component
══════════════════════════════════════════ */
export default function FaqsClient() {

  const [faqs, setFaqs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [openId, setOpenId]     = useState(null);
  const [query, setQuery]       = useState("");

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
          // Open first FAQ by default
          if (d.faqData && d.faqData.length > 0) {
            setOpenId(d.faqData[0].faq_id);
          }
        } else {
          setError("Failed to load FAQs.");
        }
      })
      .catch(() => setError("Unable to connect. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  /* ── Intersection observer for stagger-in ── */
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
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
      (f.faq_description   || "").toLowerCase().includes(q)
    );
  });

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  /* ── Render ── */
  return (
    <div className="vf-root">

      {/* ══ HERO ══ */}
      <section className="vf-hero">
        <div className="vf-hero-grid" />
        <div className="vf-hero-rule" />
        <div className="vf-hero-orb vf-hero-orb-1" />
        <div className="vf-hero-orb vf-hero-orb-2" />

        <div className="vf-hero-inner">
          
          <div className="vf-hero-label">Frequently Asked Questions</div>

          <h1>
            Questions We<br />
            <em>Hear Most Often</em>
          </h1>

          <p className="vf-hero-sub">
            Investing is a serious, long-term commitment. Below you'll find clear, candid
            answers to the questions investors ask us most — about our philosophy,
            process, fees, and the path to getting started.
          </p>

          {/* Stats */}
          {!loading && !error && faqs.length > 0 && (
            <div className="vf-hero-stats">
              <div className="vf-stat">
                <span className="vf-stat-num">{faqs.length}</span>
                <span className="vf-stat-label">Questions Answered</span>
              </div>
              <div className="vf-stat-sep" />
              <div className="vf-stat">
                <span className="vf-stat-num">15+</span>
                <span className="vf-stat-label">Years of Practice</span>
              </div>
              <div className="vf-stat-sep" />
              <div className="vf-stat">
                <span className="vf-stat-num">SEBI</span>
                <span className="vf-stat-label">Registered PMS</span>
              </div>
            </div>
          )}
        </div>

        <div className="vf-hero-border" />
      </section>

      {/* ══ FAQ BODY ══ */}
      <div className="vf-body">

        {/* Loading */}
        {loading && (
          <div className="vf-skeleton-list">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="vf-skeleton-item" style={{animationDelay:`${i*0.1}s`}} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="vf-error-box">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
            </svg>
            {error}
          </div>
        )}

        {/* FAQ List */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="vf-no-results">
                <strong>No results found</strong>
                Try a different search term or{" "}
              </div>
            ) : (
              <div className="vf-faq-list">
                {filtered.map((faq, idx) => {
                  const isOpen = openId === faq.faq_id;
                  return (
                    <div
                      key={faq.faq_id}
                      ref={el => { itemRefs.current[faq.faq_id] = el; }}
                      className={`vf-faq-item${isOpen ? " active" : ""}`}
                      style={{ transitionDelay: `${Math.min(idx * 60, 400)}ms` }}
                    >
                      <button
                        className="vf-faq-btn"
                        onClick={() => toggle(faq.faq_id)}
                        aria-expanded={isOpen}
                      >
                        <span className="vf-faq-num">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="vf-faq-q">{faq.faq_title}</span>
                        <span className="vf-faq-icon">
                          <svg viewBox="0 0 14 14">
                            <path d="M7 2v10M2 7h10"/>
                          </svg>
                        </span>
                      </button>

                      <div className={`vf-faq-answer${isOpen ? " open" : ""}`}>
                        <div
                        className="vf-faq-answer-inner"
                        dangerouslySetInnerHTML={{
                            __html: faq.faq_description || "",
                        }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom CTA */}
            {filtered.length > 0 && (
              <div className="vf-cta">
                <div className="vf-cta-left">
                  <p className="vf-cta-label">Still have questions?</p>
                  <h3>We welcome a<br /><em>direct conversation.</em></h3>
                  <p>Our team is available to answer any question not covered above with complete candour.</p>
                </div>
                <a href="/contact-us" className="vf-cta-btn">
                  Get in Touch
                  <svg viewBox="0 0 14 14">
                    <path d="M2 7h10M8 3l4 4-4 4"/>
                  </svg>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
