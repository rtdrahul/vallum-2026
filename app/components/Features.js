export default function Features() {
  const cards = [
    { title: "Evidence Over Emotion", desc: "Decisions based on business quality, valuation and cycle analysis. Opinions are tested with data before capital is committed." },
    { title: "Clarity Builds Trust", desc: "Rationale is documented for every entry, sizing and exit. Clients can follow how the portfolio evolves over time." },
    { title: "Temperament Drives Returns", desc: "Consistency through market cycles with low portfolio churn. We act when risk reward changes, not on market noise." },
    { title: "25+ Years of Experience", desc: "Led by Manish Bhandari, featured on CNBC TV18 Wizards of Dalal Street. Team experience across research, risk and operations." }
  ];
  return (
    <section className="sec-pad dotcirclebg pb-0">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <h2 className="heading-main">Built on Clarity. <br/>Guided by Discipline.</h2>
          </div>
          <div className="col-lg-6">
            <p className="fs-2429">We follow a structured investment process rooted in research depth and valuation realism.</p>
          </div>
        </div>
        <div className="row justify-content-center mt30">
          {cards.map((card, i) => (
            <div key={i} className="col-lg-6 col-md-12 mt30">
              <div className="r-g-card">
                <div className="icondata">
                  <h4 className="icondata-title mb-2">{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}