export default function InvestmentApproach() {
  const approaches = [
    {
      title: "Vallum India Discovery Strategy",
      description: "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and fundamental analysis.",
      image: "/assets/images/common/approach.webp",
      url: "/vallum-india-discovery",
      reverse: false,
    },
    {
      title: "Vallum India Multi-Activa Strategy",
      description: "A diversified investment approach designed to achieve long-term capital appreciation by dynamically allocating across multiple asset classes based on market conditions. The strategy seeks to optimise risk-adjusted returns through active and flexible asset allocation within the regulatory framework.",
      image: "https://badmin.vallum.in/img/uploads/media/1769971331.webp",
      url: "/vallum-multi-activa",
      reverse: true,
    },
    {
      titleStart: "Vallum",
      titleEnd: "Principles Approach",
      showLogo: true,
      description: "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and cycle awareness.",
      image: "/assets/images/common/temple.webp",
      url: "/vallum-jan-principle",
      reverse: false,
    }
  ];

  return (
    <section className="sec-pad">
      <div className="container">
        {/* Section Heading */}
        <div className="row justify-content-center text-center">
          <div className="col-xl-8 co-md-8 col-sm-12">
            <div className="cta-heading">
              <h2 className="mb20 heading-main">Investment Approach</h2>
            </div>
          </div>
        </div>

        {/* Dynamic Approach Rows */}
        {approaches.map((item, index) => (
          <div key={index} className="row justify-content-between vcenter mt-5">
            {/* Text Column */}
            <div className={`col-lg-6 col-sm-12 ${item.reverse ? "order-lg-1" : "order-lg-2"}`}>
              <div className="roundimg my-4">
                <img 
                  className={item.reverse ? "" : "text-end"} 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', borderRadius: '15px' }}
                />
              </div>
            </div>
            <div className={`col-lg-6 col-sm-12 ${item.reverse ? "order-lg-2" : "order-lg-1"}`}>
              <div className="position-stick">
                <h3 className="mb15 d-flex align-items-center gap-2 flex-wrap">{item.showLogo ? (
                  <>
                    {item.titleStart}
                    <img
                      src="https://badmin.vallum.in/img/uploads/media/1770088614.png"
                      alt="JAN Logo"
                      className="jan-logo"
                    />
                    {item.titleEnd}
                  </>
                ) : (
                  item.title
                )}
                </h3>
                <p className="mt15 color-black">{item.description}</p>
                <a href={item.url}>
                <button className="client-button mt-4">
                  <span>Explore the Investment Approach</span>
                </button>
                </a>
              </div>
            </div>

            {/* Image Column */}
            
          </div>
        ))}
      </div>
    </section>
  );
}