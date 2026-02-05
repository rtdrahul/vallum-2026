export default function Features() {
  const cards = [
    { title: "Evidence Over Emotion", desc: "We study businesses, cycles & leadership quality with forensic clarity." },
    { title: "Clarity Builds Trust", desc: "Every significant decision comes with clear reasoning and audited statements." },
    { title: "Temperament Drives Returns", desc: "Staying consistent through market cycles following a steady process." },
    { title: "25+ Years of Experience", desc: "Led by Manish Bhandari - recognized as one of the Wizards of Dalal Street." }
  ];
  return (
    <section className="sec-pad dotcirclebg">
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
                  <h4 className="mb-2">{card.title}</h4>
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