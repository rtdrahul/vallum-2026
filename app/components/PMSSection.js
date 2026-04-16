export default function PMSSection() {
  return (
    <>
      <div className="pms-wrap">
        <div className="pms-topbar" />

        <div className="pms-hero">
          {/* LEFT: Image Panel */}
          <div className="pms-img-panel">
            <span className="pms-chip">Equity &amp; Multi Asset</span>
            <div className="pms-dots" />
            <div className="pms-img-inner">
              <img
                src="/assets/images/common/PMS.webp"
                alt="Portfolio Management Services illustration"
              />
            </div>
          </div>

          {/* RIGHT: Content Panel */}
          <div className="pms-content">
            <span className="pms-eyebrow">Our Offering</span>
            <h2 className="pms-title">
              Portfolio Management<br /><em>Services</em>
            </h2>
            <div className="pms-divider" />
            <div className="pms-body">
              <p>
                Vallum PMS offers <strong>Equity and Multi Asset strategies</strong> based
                on research depth, valuation discipline and structured risk management.
              </p>
              <p>
                Our process integrates <strong>bottom-up company analysis</strong> with
                top-down macro assessment so that portfolio construction reflects both
                business quality and market cycles.
              </p>
              <p>
                Decisions are guided by <strong>defined position sizing</strong>,
                continuous review and a long-term investment horizon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
