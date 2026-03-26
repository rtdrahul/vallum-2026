'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Resources() {
  const [data, setData] = useState({});
  const typeArr = ['blog', 'stakeholders-letters', 'weekend-reading'];

  useEffect(() => {
    fetch('https://badmin.vallum.in/api/featured-blog-list')
      .then((res) => res.json())
      .then((res) => {
        const grouped = {};

        typeArr.forEach((type) => {
          grouped[type] = res.blogsData.filter(
            (item) => item.blog_type === type
          );
        });

        setData(grouped);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-white sec-pad pb-0">
      <div className="container">

        {typeArr.map((type, i) => {
  const items = data[type] || [];

  if (items.length === 0) return null;

  return (
    
    <div key={i} className='mb-5'>
      <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <h2 className="insight-heading text-capitalize">{type.replace(/-/g, ' ')}</h2>
          </div>
        </div>
      
      {/* <div className="swiper-btns">
        <div className={`custom-prev-${i}`}>‹</div>
        <div className={`custom-next-${i}`}>›</div>
      </div> */}

      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        speed={800}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={{
          nextEl: `.custom-next-${i}`,
          prevEl: `.custom-prev-${i}`,
        }}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="card-wrapper py-5">
              <div className="sw-img-card">
                <a
                  href={
                    item.blog_type === "stakeholders-letters" && item.blog_pdf !== ""
                      ? item.blog_pdf
                      : item.blog_type === "weekend-reading"
                      ? item.blog_weekend_link
                      : `/blog/${item.blog_type}/${item.blog_slug}`
                  }
                  download={item.blog_type === "stakeholders-letters" && item.blog_pdf !== "" ? true : false}
                >
                <img src={item.blog_image} alt={item.blog_name}  className='resource-img'/>
                </a>
                <h5 className="mt-3">
                  <a
                  href={
                    item.blog_type === "stakeholders-letters" && item.blog_pdf !== ""
                      ? item.blog_pdf
                      : item.blog_type === "weekend-reading"
                      ? item.blog_weekend_link
                      : `/blog/${item.blog_type}/${item.blog_slug}`
                  }
                  download={item.blog_type === "stakeholders-letters" && item.blog_pdf !== "" ? true : false}
                >
                    {item.blog_name}
                  </a>
                </h5>

                <p>
                  {item.blog_short_description || ''}
                </p>

                <a
                  href={
                    item.blog_type === "stakeholders-letters" && item.blog_pdf !== ""
                      ? item.blog_pdf
                      : item.blog_type === "weekend-reading"
                      ? item.blog_weekend_link
                      : `/blog/${item.blog_type}/${item.blog_slug}`
                  }
                  download={item.blog_type === "stakeholders-letters" && item.blog_pdf !== "" ? true : false}
                  className='front-blog'
                >
                  Read More →
                </a>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
})}

      </div>
    </section>
  );
}