
const items = [
  {
    name: "HNI",
    img: "/assets/images/individual.webp",
    desc: "₹50L+ long-term allocation",
    tag: "High Net Worth",
  },
  {
    name: "Family Offices",
    img: "/assets/images/family.webp",
    desc: "Custom mandates & reporting",
    tag: "Wealth Stewardship",
  },
  {
    name: "NRIs / OCIs",
    img: "https://badmin.vallum.in/img/uploads/media/1775032892.webp",
    desc: "Rupee and repatriable structures",
    tag: "Global Indians",
  },
  {
    name: "Institutional",
    img: "https://badmin.vallum.in/img/uploads/media/1775032880.webp",
    desc: "Segregated accounts",
    tag: "Asset Managers",
  },
  {
    name: "Corporate Treasuries",
    img: "https://badmin.vallum.in/img/uploads/media/1775032903.webp",
    desc: "Surplus deployment with risk controls",
    tag: "Enterprises",
  },
];

export default function WhoWeServe() {

  return (
    <>
      <section className="wws-section section">
        <div className="container">
          <div className="sec-header reveal">
            <span className="overline">Our Clientele</span>
            <h2 className="text-white">Who We Serve</h2>
            <div className="ornament"><svg viewBox="0 0 16 16"><path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6Z"/></svg></div>
          </div>
          <div className="wws-grid">
            {items.map((item, i) => (
              <div
                key={i}
                className={`wws-card reveal reveal-d${i}`}
              >
                <span className="wws-number">0{i + 1}</span>
                <span className="wws-tag">{item.tag}</span>
                <div className="wws-img-wrap">
                  <img src={item.img} alt={item.name} />
                </div>
                <h3 className="wws-name">{item.name}</h3>
                <p className="wws-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
