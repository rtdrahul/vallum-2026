'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const getHref = (item) => {
  if (
    item.blog_type === 'stakeholders-letters' &&
    item.blog_pdf !== ''
  ) {
    return item.blog_pdf;
  }

  if (item.blog_type === 'weekend-reading') {
    return item.blog_weekend_link;
  }

  return `/perspective/${item.blog_type}/${item.blog_slug}`;
};

const isDownload = (item) =>
  item.blog_type === 'stakeholders-letters' &&
  item.blog_pdf !== '';

export default function Resources() {
  const [data, setData] = useState({});
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const typeArr = [
    'blog',
    'stakeholders-letters',
    'weekend-reading',
  ];

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
    <section
      className="resources-section"
      aria-labelledby="resources-heading"
    >
      <div className="container">

        <h2 id="resources-heading" className="sr-only">
          Featured Resources and Articles
        </h2>

        {typeArr.map((type, i) => {
          const items = data[type] || [];

          if (items.length === 0) return null;

          const labelMap = {
            blog: 'Insights & Analysis',
            'stakeholders-letters':
              'Investor Communications',
            'weekend-reading': 'Curated Reads',
          };

          const regionLabel =
            labelMap[type] || 'Resources';

          return (
            <section
              key={i}
              className="resource-block"
              role="region"
              aria-label={`${regionLabel} carousel`}
            >
              <div className="resource-header">

                <h3 className="resource-title">
                  <span>{regionLabel}</span>{' '}
                  {type.replace(/-/g, ' ')}
                </h3>

                <div
                  className="swiper-nav-group"
                  aria-label={`${regionLabel} carousel controls`}
                >

                  {/* PREV BUTTON */}
                  <button
                    type="button"
                    className={`nav-btn custom-prev-${i}`}
                    aria-label={`Previous slide in ${regionLabel}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M10 3L5 8L10 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* NEXT BUTTON */}
                  <button
                    type="button"
                    className={`nav-btn custom-next-${i}`}
                    aria-label={`Next slide in ${regionLabel}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* AUTOPLAY CONTROL */}
                  <button
                    type="button"
                    className="nav-btn autoplay-toggle"
                    aria-label={
                      autoplayEnabled
                        ? `Pause ${regionLabel} carousel autoplay`
                        : `Resume ${regionLabel} carousel autoplay`
                    }
                    onClick={() =>
                      setAutoplayEnabled(!autoplayEnabled)
                    }
                  >
                    {autoplayEnabled ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>

              <Swiper
                className="resources-swiper"
                modules={[Navigation, Autoplay, A11y]}
                loop={true}
                speed={800}
                autoplay={
                  autoplayEnabled
                    ? {
                        delay: 2500,
                        disableOnInteraction: false,
                      }
                    : false
                }
                navigation={{
                  nextEl: `.custom-next-${i}`,
                  prevEl: `.custom-prev-${i}`,
                }}
                a11y={{
                  enabled: true,
                  prevSlideMessage: 'Previous slide',
                  nextSlideMessage: 'Next slide',
                  slideRole: 'group',
                }}
                keyboard={{
                  enabled: true,
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
                  <SwiperSlide
                    key={index}
                    role="group"
                    aria-label={`Slide ${index + 1} of ${items.length}`}
                  >
                    <article className="res-card">

                      <div className="res-card-img-wrap">
                        <a
                          href={getHref(item)}
                          download={
                            isDownload(item) || undefined
                          }
                          aria-label={`Open article: ${item.blog_name}`}
                        >
                          <img
                            src={item.blog_image}
                            alt={item.blog_name}
                          />
                        </a>
                      </div>

                      <div className="res-card-body">

                        <h4 className="res-card-title">
                          <a
                            href={getHref(item)}
                            download={
                              isDownload(item) || undefined
                            }
                            aria-label={`Read article titled ${item.blog_name}`}
                          >
                            {item.blog_name}
                          </a>
                        </h4>

                        {item.blog_short_description && (
                          <p className="res-card-desc">
                            {item.blog_short_description}
                          </p>
                        )}

                        <a
                          href={getHref(item)}
                          download={
                            isDownload(item) || undefined
                          }
                          className="res-read-more"
                          aria-label={
                            isDownload(item)
                              ? `Download PDF for ${item.blog_name}`
                              : `Read article about ${item.blog_name}`
                          }
                        >
                          {isDownload(item)
                            ? 'Download PDF'
                            : 'Read Article'}

                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              d="M2 7H12M7 2L12 7L7 12"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          );
        })}
      </div>
    </section>
  );
}