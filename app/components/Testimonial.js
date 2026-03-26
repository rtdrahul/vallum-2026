"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://badmin.vallum.in/api/featured-testimonials") // change URL
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTestimonials(data.testimonialData);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Hide section if no data
  if (!loading && testimonials.length === 0) {
    return null;
  }

  // ⭐ Rating Stars Component
  const renderStars = (rating = 5) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: "#3e3e8a", fontSize: "27px" }}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <section className="sec-pad rg-bg-2">
      <div className="container">
        <div className="row vcenter justify-content-between">

          <div className="col-lg-12 text-center mb-5">
            <h2 className="heading-main">What Clients say About Us</h2>
          </div>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade" // 🔥 fade animation
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card text-center">
                  
                  <div className="testimonial-content">
                    <div className="d-flex align-items-center">                    
                        <div className="me-2">
                        <img
                            src={
                            item.testimonial_image
                                ? item.testimonial_image
                                : "https://badmin.vallum.in/img/uploads/media/1774506701.png" // fallback
                            }
                            alt={item.testimonial_name}
                            className="rounded-circle"
                            style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            }}
                        />
                        </div>
                        <div className="testimonial-header">
                        <strong>{item.testimonial_name}</strong>
                        <p className="testimonial-para">
                            {item.testimonial_designation}
                        </p>
                        </div>
                    </div>
                    <div className="mb-2 text-start">
                      {renderStars(item.testimonial_rating)}
                    </div>

                    {/* 💬 Message */}
                    <div className="testimonial-footer">
                      <p className="testimonial-para text-start" dangerouslySetInnerHTML={{ __html: item.testimonial_desc }} />
                    </div>

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}