export default function PMSSection() {
    return (
      <section className="sec-pad rg-bg-2">
        <div className="container">
          <div className="row vcenter justify-content-between">
            <div className="col-lg-12 text-center mb-5">
              <h2 className="heading-main">Portfolio Management Services (PMS)</h2>
            </div>
            
            <div className="col-lg-6">
              <div className="single-image roundimg">
                {/* Ensure this image path exists in your public folder */}
                <img src="/assets/images/common/PMS.webp" alt="PMS Strategy" className="w-100" />
              </div>
            </div>
  
            <div className="col-lg-6 mmt40 px-5 py-3 pms-div">
              <p className="mt20">
                A long-only, research-driven equity PMS focused on mid and small-cap businesses with durable potential.
              </p>
              <p className="mt20">
                We combine bottom-up research with cycle awareness, valuation discipline, and thoughtful risk management - 
                building portfolios meant to grow steadily over time.
              </p>
              <button className="client-button mt-3">
                <span>Explore PMS Strategy</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }