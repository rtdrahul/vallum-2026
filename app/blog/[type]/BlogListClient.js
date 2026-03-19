"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BlogListClient({ initialData, currentCategory = null }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentType = params.type || "all";

  const [videoUrl, setVideoUrl] = useState(null);

  // Data
  const blogs = initialData?.blogsData?.data || [];
  const categories = initialData?.categoryData || [];
  const paginationLinks = initialData?.blogsData?.links || [];

  // Split MEDIA
  const videoMedia = blogs.filter((b) => b.blog_media_type == 1);
  const pdfMedia = blogs.filter((b) => b.blog_media_type == 2);

  // Extract YouTube ID
  const getYoutubeId = (url) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }

    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
};

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

  return (
    <>
      {/* ================= HEADER ================= */}
      <section className="sec-pad pt-5">
        <div className="container">
          <div className="row event-row">
            <div className="col-lg-5">
              <p className="blog-heading">
                Insights That Reflect How We Think
              </p>
            </div>

            <div className="col-lg-7">
              <ul className="events-ul">
                {mainTypes.map((item) => (
                  <li
                    key={item.slug}
                    className={
                      currentType === item.slug
                        ? "li-active li-div"
                        : "li-div"
                    }
                  >
                    <Link
                      href={`/blog/${item.slug}`}
                      className={
                        currentType === item.slug ? "active" : ""
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row mt30">
            {/* ================= SIDEBAR ================= */}
            <div className="col-lg-3">
              <h5>Filter by Category</h5>
              <ul className="sidebar-events-ul">
                <li>
                  <Link href="/blog/all">All Categories</Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.category_id}>
                    <Link
                      href={`/blog/${currentType}/category/${cat.category_slug}`}
                    >
                      {cat.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="col-lg-9">
              {/* ================= MEDIA VIEW ================= */}
              {/* ================= MEDIA VIEW ================= */}
              {currentType === "media" ? (
                <>
                  {/* ===== VIDEO SWIPER ===== */}
                  {videoMedia.length > 0 && (
                    <>
                      <h3 className="mb-3">Videos</h3>

                      <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        breakpoints={{
                          320: { slidesPerView: 1.2 },
                          768: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                        }}
                      >
                        {videoMedia.map((item) => {
                          const videoId = getYoutubeId(item.blog_media_link);

                          if (!videoId) return null; // prevent crash

                          return (
                            <SwiperSlide key={item.blog_id}>
                              <div
                                className="video-card"
                                onClick={() =>
                                  setVideoUrl(
                                    `https://www.youtube.com/embed/${videoId}?autoplay=1`
                                  )
                                }
                              >
                                <div className="thumb-wrapper">
                                  <img
                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                    className="img-fluid"
                                  />
                                  <div className="play-btn">▶</div>
                                </div>

                                <h5 className="mt-2">{item.blog_name}</h5>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </>
                  )}

                  {/* ===== PDF SWIPER ===== */}
                  {pdfMedia.length > 0 && (
                    <>
                      <h3 className="mt-5 mb-3">Documents</h3>

                      <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        breakpoints={{
                          320: { slidesPerView: 1.2 },
                          768: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                        }}
                      >
                        {pdfMedia.map((item) => (
                          <SwiperSlide key={item.blog_id}>
                            <Link href={item.blog_pdf} target="_blank">
                              <div className="pdf-card">
                                <img
                                  src={
                                    item.blog_image ||
                                    "https://via.placeholder.com/400x250?text=PDF"
                                  }
                                  className="img-fluid"
                                />
                                <h5 className="mt-2">{item.blog_name}</h5>
                              </div>
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </>
                  )}
                </>
              ) : (
                /* ================= NORMAL BLOG VIEW ================= */
                blogs.map((blog) => (
                  <div
                    className="sw--card blog-card shadow"
                    key={blog.blog_id}
                  >
                    <div className="sw--card-img">
                      <Link
                        href={`/blog/${currentType}/${blog.blog_slug}`}
                      >
                        <img
                          src={blog.blog_image}
                          className="img-fluid"
                        />
                      </Link>
                    </div>

                    <div className="sw--card-content">
                      <h3>{blog.blog_name}</h3>
                      <p>{blog.blog_short_description}</p>

                      <Link
                        href={`/blog/${currentType}/${blog.blog_slug}`}
                      >
                        <button className="client-button">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* ================= PAGINATION ================= */}
              {currentType !== "media" &&
                paginationLinks.length > 3 && (
                  <ul className="pagination mt-5">
                    {paginationLinks.map((link, i) => (
                      <li key={i}>
                        <Link href={getPaginationUrl(link.url)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {videoUrl && (
        <div className="video-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setVideoUrl(null)}
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title="Video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}