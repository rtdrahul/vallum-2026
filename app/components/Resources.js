export default function Resources() {
    const articles = [
      {
        title: "India’s Acceleration Phenomenon",
        description: "Understanding the structural forces reshaping India’s growth trajectory.",
        image: "/assets/images/common/imager-1.webp",
        link: "#"
      },
      {
        title: "Understanding Cycles in Equity Investing",
        description: "Why cycle awareness matters more than stock price movements.",
        image: "/assets/images/common/imager-2.webp",
        link: "#"
      },
      {
        title: "GARP in Today’s Market",
        description: "Applying valuation discipline in an environment driven by narratives.",
        image: "/assets/images/common/imager-3.webp",
        link: "#"
      }
    ];
  
    return (
      <section className="bg-white sec-pad pt-0">
        <div className="container">
          {/* Section Header */}
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 paragraph text-center">
              <h2 className="insight-heading">Resources</h2>
              <p className="mt-2">
                Structured guides to help you evaluate portfolio managers, 
                understand risk and decide if a PMS is suitable for you.
              </p>
            </div>
          </div>
  
          {/* Article Grid */}
          <div className="row justify-content-around">
            {articles.map((article, index) => (
              <div key={index} className="col-lg-4 col-md-6 mt30">
                <div className="sw-img-card">
                  <img 
                    className="insight-img" 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', borderRadius: '12px' }}
                  />
                  <h5 className="mt-3">
                    <a href={article.link}>{article.title}</a>
                  </h5>
                  <p>{article.description}</p>
                  <a href={article.link} className="readmore-btn">
                    Read More 
                    <img 
                      src="https://waterfieldadvisors.com/_next/static/media/btn-arrow.ea861bdc.svg" 
                      alt="arrow" 
                      style={{ marginLeft: '8px' }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }