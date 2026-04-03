"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const DELAY = 3000;

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    fetch("https://badmin.vallum.in/api/featured-testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTestimonials(data.testimonialData);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    startTimeRef.current = null;
    cancelAnimationFrame(rafRef.current);
    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const pct = Math.min(((ts - startTimeRef.current) / DELAY) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeIndex]);

  if (!loading && testimonials.length === 0) return null;

  const renderStars = (rating = 5) =>
    [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#c9a84c" : "#3a3a60", fontSize: "15px" }}>
        ★
      </span>
    ));

  return (
    <>

      <section className="testi-section">
        <div className="testi-inner">

          <p className="testi-eyebrow">Client Voices</p>
          <h2 className="testi-heading">What Clients say About Us</h2>

          <Swiper
            className="testi-swiper"
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: DELAY, disableOnInteraction: false }}
            spaceBetween={24}
            breakpoints={{
              0:    { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testi-card">
                  <span className="testi-quote-mark">"</span>

                  <div
                    className="testi-body"
                    dangerouslySetInnerHTML={{ __html: item.testimonial_desc }}
                  />

                  <div className="testi-divider" />

                  <div className="testi-author-row">
                    <div className="testi-author-left">
                      <div className="testi-avatar-wrap">
                        <img
                          src={
                            item.testimonial_image
                              ? item.testimonial_image
                              : "https://badmin.vallum.in/img/uploads/media/1774506701.png"
                          }
                          alt={item.testimonial_name}
                        />
                      </div>
                      <div>
                        <p className="testi-name">{item.testimonial_name}</p>
                        <p className="testi-designation">{item.testimonial_designation}</p>
                      </div>
                    </div>
                    <div>{renderStars(item.testimonial_rating)}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testi-progress-bar">
            <div className="testi-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {testimonials.length > 1 && (
            <div className="testi-nav">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === activeIndex ? "active" : ""}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}