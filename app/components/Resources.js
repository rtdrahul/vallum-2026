'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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
    },
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
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <h2 className="insight-heading">Resources</h2>
            <p className="mt-2">
              Structured guides to help you evaluate portfolio managers,
              understand risk and decide if a PMS is suitable for you.
            </p>
          </div>
        </div>
        <div className="swiper-btns">
          <div className="custom-prev">‹</div>
          <div className="custom-next">›</div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          centeredSlides={true}
          loop={true}
          loopAdditionalSlides={3}
          // loopFillGroupWithBlank={true}
          speed={800}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <div className="card-wrapper">
                <div className="sw-img-card">
                  <img src={article.image} alt={article.title} />
                  <h5 className="mt-3">
                    <a href={article.link}>{article.title}</a>
                  </h5>
                  <p>{article.description}</p>
                  <a href={article.link} className="readmore-btn">
                    Read More →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
}