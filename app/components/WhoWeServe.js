export default function WhoWeServe() {
    const items = [
      { name: "HNI", img: "/assets/images/individual.webp", desc: "₹50L+ long-term allocation" },
      { name: "Family Offices", img: "/assets/images/family.webp", desc: "Custom mandates & reporting" },
      { name: "NRIs / OCIs", img: "/assets/images/nri.webp", desc: "Rupee and repatriable structures" },
      { name: "Institutional", img: "/assets/images/investor.webp", desc: "Segregated accounts" },
      { name: "Corporate Treasuries", img: "/assets/images/investor.webp", desc: "Surplus deployment with risk controls" }
    ];
  
    return (
      <section className="sec-pad">
        <div className="container">
          <h2 className="heading-main text-center mb-5">Who We Serve</h2>
          <div className="row justify-content-center">
            {items.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-6 mt30">
                <div className="iconblockcard text-center">
                  <div className="iconblock">
                    <img src={item.img} alt={item.name} className="img-fluid iconblock-img" />
                  </div>
                  <div className="icondata mt20">
                    <h4>{item.name}</h4>
                    <p className="mb-3 text-center">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }