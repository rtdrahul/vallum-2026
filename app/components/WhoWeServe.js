export default function WhoWeServe() {
    const items = [
      { name: "High-Net-Worth Individuals", img: "/assets/images/individual.webp" },
      { name: "Family Offices", img: "/assets/images/family.webp" },
      { name: "NRIs & Global Indians", img: "/assets/images/nri.webp" },
      { name: "Institutional Investors", img: "/assets/images/investor.webp" }
    ];
  
    return (
      <section className="sec-pad">
        <div className="container">
          <h2 className="heading-main text-center mb-5">Who We Serve</h2>
          <div className="row justify-content-center">
            {items.map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6 mt30">
                <div className="iconblockcard text-center">
                  <div className="iconblock">
                    <img src={item.img} alt={item.name} className="img-fluid" />
                  </div>
                  <div className="icondata mt20">
                    <h4 className="mb-3">{item.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }