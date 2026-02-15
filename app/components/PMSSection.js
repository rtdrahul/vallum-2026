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
  
            <div className="col-lg-6 mmt40 px-3 py-3 pms-div">
              <p className="mt20">
                Vallum PMS offers Equity and Multi Asset strategies based on research depth, valuation discipline and structured risk management.
                </p>
              <p className="mt20">
                Our process integrates bottom up company analysis with top down macro assessment so that portfolio construction reflects both business quality and market cycles.
              </p>
              <p className="mt20">
                Decisions are guided by defined position sizing, continuous review and a long term investment horizon.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }