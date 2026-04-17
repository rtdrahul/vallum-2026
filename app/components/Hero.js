const Hero = () => (
  <section className="hero">
  <div className="container">
    <div className="hero-grid">
      <div className="hero-content">
        <div className="hero-badge"><span className="dot"></span>SEBI Registered Portfolio Manager</div>
        <h1>Invest With <span className="accent">Discipline.</span><br/>Build Wealth That Endures.</h1>
        <p className="hero-sub">A research-driven PMS built on GARP, cycle awareness, and risk discipline — designed for HNIs, NRIs, and Family Offices who value clarity over speculation.</p>
        <div className="hero-ctas mb-5">
          <a className="btn btn-indigo" href="/contact-us">Get in Touch <span className="arrow">→</span></a>
          <a className="btn btn-ghost" href="/about-us">Learn Our Approach</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-img-wrapper">
          <img src="/assets/images/common/hero-banner.webp?w=600&h=500&fit=crop&q=80" alt="Vallum Capital - Disciplined investing approach"/>
        </div>
      </div>
    </div>
  </div>
</section>
  );
  
  export default Hero;