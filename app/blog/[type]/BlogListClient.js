"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/* ─── Sub-components ─────────────────────────────────────────────── */

function ArticleSwiper({ blogs, currentType }) {
  if (!blogs.length) return null;
  return (
    <div className="media-section">
      <div className="media-section-header">
        <div>
          <p className="media-section-label">Editorial</p>
          <h3 className="media-section-title">Published Insights</h3>
        </div>
        <span className="media-section-count">{blogs.length} article{blogs.length !== 1 ? "s" : ""}</span>
      </div>

      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        loop={blogs.length > 3}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.blog_id} style={{ height: "auto" }}>
            <Link
              href={blog.blog_weekend_link}
              className="article-card"
              style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
            >
              <img
                src={blog.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                alt={blog.blog_name}
                className="article-card-img"
                onError={(e) => { e.target.src = "https://badmin.vallum.in/img/uploads/media/1772871903.png"; }}
              />
              <div className="article-card-body">
                <span className="article-card-tag">Article</span>
                <h4 className="article-card-title">{blog.blog_name}</h4>
                <span className="article-card-arrow">Explore →</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function VideoSwiper({ blogs }) {
  if (!blogs.length) return null;
  return (
    <div className="media-section">
      <div className="media-section-header">
        <div>
          <p className="media-section-label">Video</p>
          <h3 className="media-section-title">Conversations & Perspectives</h3>
        </div>
        <span className="media-section-count">{blogs.length} video{blogs.length !== 1 ? "s" : ""}</span>
      </div>

      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={blogs.length > 3}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.blog_id} style={{ height: "auto" }}>
            <div className="video-card">
              <iframe
                className="video-card-frame"
                src={blog.blog_weekend_link}
                title={blog.blog_name}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className="video-card-body">
                <div className="video-card-play-icon">
                  <svg viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l10 6-10 6V1z" />
                  </svg>
                </div>
                <p className="video-card-title">{blog.blog_name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function PdfSwiper({ blogs }) {
  if (!blogs.length) return null;
  return (
    <div className="media-section">
      <div className="media-section-header">
        <div>
          <p className="media-section-label">Research</p>
          <h3 className="media-section-title">Deep Dives & Reports</h3>
        </div>
        <span className="media-section-count">{blogs.length} report{blogs.length !== 1 ? "s" : ""}</span>
      </div>

      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        loop={blogs.length > 3}
        breakpoints={{
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.blog_id} style={{ height: "auto" }}>
            <a
              href={blog.blog_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-card"
              style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
            >
              <div className="pdf-card-img-wrap">
                <img
                  src={blog.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                  alt={blog.blog_name}
                  className="pdf-card-img"
                  onError={(e) => { e.target.src = "https://badmin.vallum.in/img/uploads/media/1772871903.png"; }}
                />
                <span className="pdf-card-badge">PDF</span>
              </div>
              <div className="pdf-card-body">
                <h4 className="pdf-card-title">{blog.blog_name}</h4>
                <span className="pdf-card-cta">
                  Download
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12l-5-5h3V1h4v6h3L8 12zm-6 2h12v1.5H2V14z" />
                  </svg>
                </span>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */
export default function BlogListClient({ initialData, currentCategory = null }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentType = params.type || "all";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const blogs = initialData?.blogsData?.data || [];
  const categories = initialData?.categoryData || [];
  const tags = initialData?.tagData || [];
  const paginationLinks = initialData?.blogsData?.links || [];

  const mainTypes = [
    { label: "Blogs", slug: "blog" },
    { label: "Media", slug: "media" },
    { label: "Letter to Stakeholders", slug: "stakeholders-letters" },
    { label: "Vallum Weekend Reading", slug: "weekend-reading" },
  ];

  const getPaginationUrl = (url) => {
    if (!url) return "#";
    const urlObj = new URL(url);
    const pageNum = urlObj.searchParams.get("page");
    return `/blog/${currentType}?page=${pageNum}`;
  };

  const breadcrumbData = {
    blog: {
      title: "Articles & Perspectives",
      img: "https://badmin.vallum.in/img/uploads/media/1770087115.webp",
    },
    "weekend-reading": {
      title: "Articles & Perspectives",
      img: "https://badmin.vallum.in/img/uploads/media/1770087115.webp",
    },
    media: {
      title: "In Conversation With the Markets",
      img: "https://badmin.vallum.in/img/uploads/media/1770086970.jpg",
    },
    "stakeholders-letters": {
      title: "Reflections on markets, decisions, and long-term thinking",
      desc: "A research-driven PMS built on GARP, cycle awareness, and risk discipline – designed for HNIs, NRIs, and Family Offices who value clarity over speculation.",
      img: "https://badmin.vallum.in/img/uploads/media/1770023897.jpg",
    },
  };

  const data = breadcrumbData[currentType];

  // Split blogs by blog_media_type for the media tab
  const articleMedia = blogs.filter((b) => b.blog_media_type === "article");
  const linkMedia    = blogs.filter((b) => b.blog_media_type === "link");
  const pdfMedia     = blogs.filter((b) => b.blog_media_type === "pdf");

  return (
    <>
      {/* Inject scoped styles once */}
      <div className="contactblocks pt-5 pb-0">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            {data && (
              <>
                <div className="col-lg-8">
                  <div className="blogcotact">
                    <h2>{data.title}</h2>
                    {data.desc && <p className="mt10">{data.desc}</p>}
                  </div>
                </div>
                <div className="col-lg-4 mmt40">
                  <div className="about-img blogcotact-img">
                    <img src={data.img} className="w-100" alt="" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="sec-pad pt-5">
        <div className="container">
          <div className="row event-row">
            <div className="col-lg-5">
              <p className="blog-heading">Insights That Reflect How We Think</p>
            </div>
            <div className="col-lg-7">
              <ul className="events-ul">
                {mainTypes.map((item) => (
                  <li
                    key={item.slug}
                    className={currentType === item.slug ? "li-active li-div" : "li-div"}
                  >
                    <Link
                      href={`/blog/${item.slug}`}
                      className={currentType === item.slug ? "active" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row mt30">
            {/* Sidebar Filters */}
            <div className="col-lg-3">
              <h5 className="mb-2">Filter by Category</h5>
              <ul className="sidebar-events-ul">
                <li className={currentType === "all" ? "li-active" : ""}>
                  <Link href="/blog/all" className={currentType === "all" ? "active" : ""}>
                    All Categories
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.category_id}
                    className={currentCategory === cat.category_slug ? "li-active" : ""}
                  >
                    <Link
                      href={`/blog/${currentType}/category/${cat.category_slug}`}
                      className={currentCategory === cat.category_slug ? "active" : ""}
                    >
                      {cat.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {currentType === "media" ? (
                /* ── MEDIA TAB ── */
                <div>
                  {articleMedia.length === 0 && linkMedia.length === 0 && pdfMedia.length === 0 ? (
                    <div className="media-empty">No media found.</div>
                  ) : (
                    <>
                      <ArticleSwiper blogs={articleMedia} currentType={currentType} />
                      <VideoSwiper  blogs={linkMedia} />
                      <PdfSwiper    blogs={pdfMedia} />
                    </>
                  )}
                </div>
              ) : (
                /* ── ALL OTHER TABS ── */
                <>
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <div className="sw--card blog-card shadow" key={blog.blog_id}>
                        <div className="sw--card-img">
                          <Link
                            href={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? blog.blog_pdf
                                : currentType === "weekend-reading"
                                ? blog.blog_weekend_link
                                : `/blog/${currentType}/${blog.blog_slug}`
                            }
                            download={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? true
                                : false
                            }
                          >
                            <img
                              src={blog?.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                              alt={blog.blog_name}
                              className="img-fluid"
                              onError={(e) => {
                                e.target.src = "https://badmin.vallum.in/img/uploads/media/1772871903.png";
                              }}
                            />
                          </Link>
                        </div>
                        <div className="sw--card-content">
                          <Link
                            href={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? blog.blog_pdf
                                : currentType === "weekend-reading"
                                ? blog.blog_weekend_link
                                : `/blog/${currentType}/${blog.blog_slug}`
                            }
                            download={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? true
                                : false
                            }
                          >
                            <h3 className="mb10 btitle">{blog.blog_name}</h3>
                          </Link>
                          <p className="sw--card-desc">{blog.blog_short_description}</p>

                          <div className="timeanddate">
                            <span>
                              <i className="ri-calendar-line"></i>{" "}
                              {new Date(
                                blog.blog_start_date ? blog.blog_start_date : blog.created_at
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span>
                              <i className="ri-user-follow-line"></i>{" "}
                              {blog.blog_author_name || "Vallum Capital"}
                            </span>
                          </div>

                          <Link
                            href={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? blog.blog_pdf
                                : currentType === "weekend-reading"
                                ? blog.blog_weekend_link
                                : `/blog/${currentType}/${blog.blog_slug}`
                            }
                            download={
                              currentType === "stakeholders-letters" && blog.blog_pdf !== ""
                                ? true
                                : false
                            }
                          >
                            <button className="client-button">
                              <span>Read More</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 border rounded bg-light">
                      <h4>No articles found in {currentType}.</h4>
                      <p>Check back later for new updates.</p>
                    </div>
                  )}

                  {paginationLinks.length > 3 && (
                    <nav className="mt-5">
                      <ul className="pagination justify-content-center">
                        {paginationLinks.map((link, index) => (
                          <li
                            key={index}
                            className={`page-item ${link.active ? "active" : ""} ${
                              !link.url ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              href={getPaginationUrl(link.url)}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}