const Hero = () => (
    <div className="head-section">
      <div className="container index-up">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-5 col-lg-6">
            <div className="paragraph">
              <h1 className="typewriter text-start">
                <span>Invest With Discipline. Build Wealth That Endures.</span>
              </h1>
              <p className="color-black text-start">
                A research-driven PMS built on GARP, cycle awareness, and risk discipline...
              </p>
              <a href="/contact-us">
              <button className="client-button"><span>Get in Touch</span></button>
              </a>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <img src="/assets/images/common/hero-banner.webp" alt="Hero" className="hero-img"/>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default Hero;