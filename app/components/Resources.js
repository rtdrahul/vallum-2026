'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const getHref = (item) => {
  if (item.blog_type === 'stakeholders-letters' && item.blog_pdf !== '') return item.blog_pdf;
  if (item.blog_type === 'weekend-reading') return item.blog_weekend_link;
  return `/blog/${item.blog_type}/${item.blog_slug}`;
};

const isDownload = (item) =>
  item.blog_type === 'stakeholders-letters' && item.blog_pdf !== '';

export default function Resources() {
  const [data, setData] = useState({});
  const typeArr = ['blog', 'stakeholders-letters', 'weekend-reading'];

  useEffect(() => {
    fetch('https://badmin.vallum.in/api/featured-blog-list')
      .then((res) => res.json())
      .then((res) => {
        const grouped = {};
        typeArr.forEach((type) => {
          grouped[type] = res.blogsData.filter((item) => item.blog_type === type);
        });
        setData(grouped);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="resources-section">
        <div className="resources-container">
          {typeArr.map((type, i) => {
            const items = data[type] || [];
            if (items.length === 0) return null;

            const labelMap = {
              blog: 'Insights & Analysis',
              'stakeholders-letters': 'Investor Communications',
              'weekend-reading': 'Curated Reads',
            };

            return (
              <div key={i} className="resource-block">
                <div className="resource-header">
                  <h2 className="resource-title">
                    <span>{labelMap[type] || 'Resources'}</span>
                    {type.replace(/-/g, ' ')}
                  </h2>
                  <div className="swiper-nav-group">
                    <div className={`nav-btn custom-prev-${i}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={`nav-btn custom-next-${i}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <Swiper
                  className="resources-swiper"
                  modules={[Navigation, Autoplay]}
                  loop={true}
                  speed={800}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  navigation={{
                    nextEl: `.custom-next-${i}`,
                    prevEl: `.custom-prev-${i}`,
                  }}
                  spaceBetween={24}
                  slidesPerView={3}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {items.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="res-card">
                        <div className="res-card-img-wrap">
                          <a href={getHref(item)} download={isDownload(item) || undefined}>
                            <img src={item.blog_image} alt={item.blog_name} />
                          </a>
                        </div>
                        <div className="res-card-body">
                          <h5 className="res-card-title">
                            <a href={getHref(item)} download={isDownload(item) || undefined}>
                              {item.blog_name}
                            </a>
                          </h5>
                          {item.blog_short_description && (
                            <p className="res-card-desc">{item.blog_short_description}</p>
                          )}
                          <a
                            href={getHref(item)}
                            download={isDownload(item) || undefined}
                            className="res-read-more"
                          >
                            {isDownload(item) ? 'Download' : 'Read Article'}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
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
    </>
  );
}