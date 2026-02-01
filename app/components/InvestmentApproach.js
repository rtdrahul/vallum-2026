export default function InvestmentApproach() {
  const approaches = [
    {
      title: "Vallum India Discovery Strategy",
      description: "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and fundamental analysis.",
      image: "/assets/images/common/approach.webp",
      reverse: false,
    },
    {
      title: "Vallum India Multi-Activa Strategy",
      description: "A diversified investment approach designed to achieve long-term capital appreciation by dynamically allocating across multiple asset classes based on market conditions. The strategy seeks to optimise risk-adjusted returns through active and flexible asset allocation within the regulatory framework.",
      image: "/assets/images/common/activa.webp",
      reverse: true,
    },
    {
      title: "Vallum Principles Approach",
      description: "Focus on investing in equity and equity-linked securities of Indian companies with strong growth potential and sustainable business models. The strategy aims to identify quality businesses with above-average prospects for long-term value creation, backed by sound research and cycle awareness.",
      image: "/assets/images/common/temple.webp",
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
              <h2 className="mb20">Investment Approach</h2>
            </div>
          </div>
        </div>

        {/* Dynamic Approach Rows */}
        {approaches.map((item, index) => (
          <div key={index} className="row justify-content-between vcenter mt-5">
            {/* Text Column */}
            <div className={`col-lg-6 col-sm-12 ${item.reverse ? "order-lg-2" : "order-lg-1"}`}>
              <div className="position-stick">
                <h3 className="mb15">{item.title}</h3>
                <p className="mt15 color-black">{item.description}</p>
                <button className="client-button mt-5">
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className={`col-lg-6 col-sm-12 ${item.reverse ? "order-lg-1" : "order-lg-2"}`}>
              <div className="roundimg">
                <img 
                  className={item.reverse ? "" : "text-end"} 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', borderRadius: '15px' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}