"use client";

import { useState, useRef, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_API = "https://badmin.vallum.in/api";

const MAIN_TYPES = [
  { label: "Blogs",                   slug: "blog" },
  { label: "Media",                   slug: "media" },
  { label: "Letter to Stakeholders",  slug: "stakeholders-letters" },
  { label: "Vallum Weekend Reading",  slug: "weekend-reading" },
];

const BREADCRUMB = {
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
    img: "https://badmin.vallum.in/img/uploads/media/1770023897.jpg",
  },
};

const FALLBACK_IMG = "https://badmin.vallum.in/img/uploads/media/1772871903.png";

/* ─── Helpers ──────────────────────────────────────────────────────── */

function fallback(e) {
  e.target.src = FALLBACK_IMG;
}

function blogHref(type, blog) {
  if (type === "stakeholders-letters" && blog.blog_pdf) return blog.blog_pdf;
  if (type === "weekend-reading") return blog.blog_weekend_link;
  return `/perspective/${type}/${blog.blog_slug}`;
}

function isDownload(type, blog) {
  return type === "stakeholders-letters" && !!blog.blog_pdf;
}

/* ─── Sub-components ───────────────────────────────────────────────── */

function ArticleSwiper({ blogs }) {
  if (!blogs.length) return null;
  return (
    <div className="media-section">
      <div className="media-section-header">
        <div>
          <p className="media-section-label">Editorial</p>
          <h3 className="media-section-title">Published Insights</h3>
        </div>
        <span className="media-section-count">
          {blogs.length} article{blogs.length !== 1 ? "s" : ""}
        </span>
      </div>
      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        loop={blogs.length > 3}
        breakpoints={{ 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.blog_id} style={{ height: "auto" }}>
            <Link
              href={blog.blog_weekend_link}
              className="article-card"
              style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
            >
              <img
                src={blog.blog_image || FALLBACK_IMG}
                alt={blog.blog_name}
                className="article-card-img"
                onError={fallback}
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
        <span className="media-section-count">
          {blogs.length} video{blogs.length !== 1 ? "s" : ""}
        </span>
      </div>
      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={blogs.length > 3}
        breakpoints={{ 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
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
              
              {/* <div className="visually-hidden">{blog.blog_short_description}</div> */}
              <div className="video-card-body">
                <div className="video-card-play-icon">
                  <svg viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l10 6-10 6V1z" />
                  </svg>
                </div>
                <p className="video-card-title">{blog.blog_name}</p>
                
              </div>
              <details className="video-transcript px-4 pb-2">
                  <summary>View transcript</summary>
                  <p style={{fontSize:"14px",lineHeight:"18px"}}>
                    [{blog.blog_short_description}]
                  </p>
                </details>
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
        <span className="media-section-count">
          {blogs.length} report{blogs.length !== 1 ? "s" : ""}
        </span>
      </div>
      <Swiper
        className="media-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
        loop={blogs.length > 3}
        breakpoints={{ 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
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
                  src={blog.blog_image || FALLBACK_IMG}
                  alt={blog.blog_name}
                  className="pdf-card-img"
                  onError={fallback}
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

/* ─── Pagination Bar ───────────────────────────────────────────────── */

function PaginationBar({ links, onPageChange }) {
  if (!links || links.length <= 3) return null; // only prev + pages + next

  return (
    <div className="pagination-wrap mt-4 d-flex gap-2 flex-wrap">
      {links.map((link, i) => {
        if (!link.url) {
          return (
            <span key={i} className="page-btn page-btn--disabled"
              dangerouslySetInnerHTML={{ __html: link.label }} />
          );
        }
        const pageNum = new URL(link.url).searchParams.get("page");
        return (
          <button
            key={i}
            className={`page-btn${link.active ? " page-btn--active" : ""}`}
            onClick={() => onPageChange(Number(pageNum))}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </div>
  );
}

/* ─── Spinner ──────────────────────────────────────────────────────── */

function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading…</span>
      </div>
    </div>
  );
}

/* ─── Main Export ──────────────────────────────────────────────────── */

export default function BlogListClient({ allData, initialType, initialPage = 1 }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // ── Tab / category state ──────────────────────────────────────────
  const [activeType, setActiveType]         = useState(initialType);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePage, setActivePage]         = useState(initialPage);

  // ── Data cache: starts with server-prefetched data ─────────────────
  // Shape: { [type]: { [categorySlug|"__all__"]: { [page]: apiData } } }
  const cache = useRef({});

  // Seed the cache with what the server already fetched (page 1 for all types)
  const initOnce = useRef(false);
  if (!initOnce.current) {
    initOnce.current = true;
    Object.entries(allData).forEach(([type, data]) => {
      if (data) {
        cache.current[type] = { __all__: { 1: data } };
      }
    });
  }

  // ── Loading state ──────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);

  // ── Displayed data (from cache) ────────────────────────────────────
  const cacheKey   = activeCategory || "__all__";
  const pageData   = cache.current[activeType]?.[cacheKey]?.[activePage] ?? null;
  const blogs      = pageData?.blogsData?.data       || [];
  const categories = pageData?.categoryData          || allData[activeType]?.categoryData || [];
  const pagLinks   = pageData?.blogsData?.links      || [];

  // ── Fetch helper ───────────────────────────────────────────────────
  const fetchAndCache = useCallback(async (type, category, page) => {
    const key = category || "__all__";
    if (cache.current[type]?.[key]?.[page]) return; // already cached

    setLoading(true);
    try {
      const categorySegment = category ? `/category/${category}` : "";
      const url = `${BASE_API}/blog-list/${type}${categorySegment}?page=${page}`;
      const res  = await fetch(url, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (data.status === "success") {
        cache.current[type]           = cache.current[type]           || {};
        cache.current[type][key]      = cache.current[type][key]      || {};
        cache.current[type][key][page] = data;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Tab switch ─────────────────────────────────────────────────────
  const switchTab = useCallback(async (slug) => {
    if (slug === activeType) return;

    // Update URL without navigation (SEO-friendly, back button works)
    startTransition(() => {
      router.replace(`/perspective/${slug}`, { scroll: false });
    });

    setActiveType(slug);
    setActiveCategory(null);
    setActivePage(1);

    await fetchAndCache(slug, null, 1);
  }, [activeType, fetchAndCache, router]);

  // ── Category switch ────────────────────────────────────────────────
  const switchCategory = useCallback(async (categorySlug) => {
    const next = categorySlug === activeCategory ? null : categorySlug;
    setActiveCategory(next);
    setActivePage(1);
    await fetchAndCache(activeType, next, 1);
  }, [activeType, activeCategory, fetchAndCache]);

  // ── Page switch ────────────────────────────────────────────────────
  const switchPage = useCallback(async (page) => {
    setActivePage(page);
    await fetchAndCache(activeType, activeCategory, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeType, activeCategory, fetchAndCache]);

  // ── Media split ────────────────────────────────────────────────────
  const articleMedia = blogs.filter((b) => b.blog_media_type === "article");
  const linkMedia    = blogs.filter((b) => b.blog_media_type === "youtube");
  const pdfMedia     = blogs.filter((b) => b.blog_media_type === "pdf");

  const breadcrumb = BREADCRUMB[activeType];

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <>
      {/* HERO */}
      <div className="contactblocks pt-5 pb-0">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            {breadcrumb && (
              <>
                <div className="col-lg-8">
                  <div className="blogcotact">
                    <h2>{breadcrumb.title}</h2>
                    {breadcrumb.desc && <p className="mt10">{breadcrumb.desc}</p>}
                  </div>
                </div>
                <div className="col-lg-4 mmt40">
                  <div className="about-img blogcotact-img">
                    <img src={breadcrumb.img} className="w-100" alt={breadcrumb.title} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section className="sec-pad pt-5" aria-label="Insights and perspectives section">
        <div className="container">

          {/* TOP NAVIGATION TABS */}
          <div className="row event-row">
            <div className="col-lg-5">
              <h2 className="blog-heading">Insights That Reflect How We Think</h2>
            </div>
            <div className="col-lg-7">
              <nav aria-label="Perspective types">
                <ul className="events-ul">
                  {MAIN_TYPES.map((item) => (
                    <li
                      key={item.slug}
                      className={activeType === item.slug ? "li-active li-div p-0" : "p-0 li-div"}
                    >
                      {/*
                        Use a button instead of Link so clicking never triggers
                        a full page navigation — switchTab handles everything.
                      */}
                      <button
                        className={`tab-btn${activeType === item.slug ? " active" : ""}`}
                        onClick={() => switchTab(item.slug)}
                        aria-current={activeType === item.slug ? "page" : undefined}
                        disabled={isPending}
                        style={{padding:"0 20px"}}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="row mt30">

            {/* SIDEBAR FILTERS */}
            <div className="col-lg-3">
              <h3 className="mb-2">Filter by Category</h3>
              <nav aria-label="Blog categories">
                <ul className="sidebar-events-ul">
                  {/* "All Categories" resets to no filter */}
                  <li className={!activeCategory ? "li-active p-0" : "p-0"}>
                    <button
                      className={`category-btn${!activeCategory ? " active" : ""}`}
                      onClick={() => switchCategory(null)}
                      aria-current={!activeCategory ? "page" : undefined}
                    >
                      All Categories
                    </button>
                  </li>

                  {categories.map((cat) => (
                    <li
                      key={cat.category_id}
                      className={activeCategory === cat.category_slug ? "li-active" : ""}
                    >
                      <button
                        className={`category-btn${activeCategory === cat.category_slug ? " active" : ""}`}
                        onClick={() => switchCategory(cat.category_slug)}
                        aria-current={activeCategory === cat.category_slug ? "page" : undefined}
                      >
                        {cat.category_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* MAIN CONTENT */}
            <div className="col-lg-9">
              {loading ? (
                <Spinner />
              ) : activeType === "media" ? (
                /* ── MEDIA TAB ── */
                <div>
                  {articleMedia.length === 0 && linkMedia.length === 0 && pdfMedia.length === 0 ? (
                    <div className="media-empty">No media found.</div>
                  ) : (
                    <>
                      <section role="region" aria-label="Article media carousel">
                        <ArticleSwiper blogs={articleMedia} />
                      </section>
                      <section role="region" aria-label="Video media carousel">
                        <VideoSwiper blogs={linkMedia} />
                      </section>
                      <section role="region" aria-label="PDF media carousel">
                        <PdfSwiper blogs={pdfMedia} />
                      </section>
                    </>
                  )}
                </div>
              ) : (
                /* ── BLOG / STAKEHOLDER / WEEKEND TABS ── */
                <>
                  {blogs.length > 0 ? (
                    <>
                      {blogs.map((blog) => (
                        <article className="sw--card blog-card shadow" key={blog.blog_id}>
                          <div className="sw--card-img">
                            <Link
                              href={blogHref(activeType, blog)}
                              download={isDownload(activeType, blog)}
                              aria-label={`Open article: ${blog.blog_name}`}
                            >
                              <img
                                src={blog.blog_image || FALLBACK_IMG}
                                alt={blog.blog_name}
                                className="img-fluid"
                                onError={fallback}
                              />
                            </Link>
                          </div>
                          <div className="sw--card-content">
                            <Link
                              href={blogHref(activeType, blog)}
                              download={isDownload(activeType, blog)}
                            >
                              <h3 className="mb10 btitle">{blog.blog_name}</h3>
                            </Link>
                            <p className="sw--card-desc">{blog.blog_short_description}</p>
                            <Link
                              className="btn btn-indigo"
                              href={blogHref(activeType, blog)}
                              download={isDownload(activeType, blog)}
                              aria-label={`Read more about ${blog.blog_name}`}
                            >
                              Read More
                            </Link>
                          </div>
                        </article>
                      ))}

                      {/* CLIENT-SIDE PAGINATION */}
                      <PaginationBar links={pagLinks} onPageChange={switchPage} />
                    </>
                  ) : (
                    <div className="text-center py-5 border rounded bg-light">
                      <h4>No articles found.</h4>
                      <p>Check back later for new updates.</p>
                    </div>
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
