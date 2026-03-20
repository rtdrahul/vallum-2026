"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogListClient({ initialData, currentCategory = null }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentType = params.type || "all";
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  // Data Extraction from API Response
  const blogs = initialData?.blogsData?.data || [];
  const categories = initialData?.categoryData || [];
  const tags = initialData?.tagData || [];
  const paginationLinks = initialData?.blogsData?.links || [];
  
  // Navigation items for the top bar
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

  // Filtering for Media Tab
  const videoMedia = blogs.filter(blog => blog.blog_weekend_link);
  const pdfMedia = blogs.filter(blog => blog.blog_pdf);
 
  return (
    <>
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
                  <li key={item.slug} className={currentType === item.slug ? "li-active li-div" : "li-div"}>
                    <Link href={`/blog/${item.slug}`} className={currentType === item.slug ? "active" : ""}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row mt30">
            {/* Dynamic Sidebar Filters */}
            <div className="col-lg-3">
              <h5 className="mb-2">Filter by Category</h5>
              <ul className="sidebar-events-ul">
                <li className={currentType === 'all' ? "li-active" : ""}>
                   <Link href="/blog/all" className={currentType === 'all' ? "active" : ""}>All Categories</Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.category_id} className={currentCategory === cat.category_slug ? "li-active" : ""}>
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

            {/* Blog List Dynamic Rendering */}
            <div className="col-lg-9">
              {currentType === "media" ? (
                /* MEDIA TAB: Only Swipers, Videos embedded & auto-played */
                <div className="media-swipers">
                  
                  {/* Swiper 1: Videos */}
                  {videoMedia.length > 0 && (
                    <div className="mb-0" style={{height:"350px"}}>
                      <h4 className="mb-4">YouTube Videos</h4>
                      
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        loop={true}
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
                        {videoMedia.map((blog) => (
                          <SwiperSlide key={blog.blog_id}>
                            <div className="sw--card blog-card shadow h-100 d-flex flex-column pe-0">
                              
                              <div className="sw--card-img" style={{ position: "relative", height: "190px" }}>
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={blog.blog_weekend_link}
                                  title={blog.blog_name}
                                  frameBorder="0"
                                  allow="autoplay; encrypted-media"
                                  allowFullScreen
                                  style={{ borderRadius: "5px" }}
                                ></iframe>
                              </div>

                              <div className="sw--card-content flex-grow-1 pt-3 pb-3"> 
                                  <h3 className="mb0 btitle">{blog.blog_name}</h3>
                              </div>

                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="swiper-btns" style={{bottom:"175px"}}>
                        <div className="custom-prev">‹</div>
                        <div className="custom-next">›</div>
                      </div>
                    </div>
                  )}

                  {/* Swiper 2: PDFs */}
                  {pdfMedia.length > 0 && (
                    <div>
                      <h4 className="mb-4 mt-4">PDF Documents</h4>
                      <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                          768: { slidesPerView: 3 },
                          1024: { slidesPerView: 3 },
                        }}
                        className="pb-5"
                      >
                        {pdfMedia.map(blog => (
                          <SwiperSlide key={blog.blog_id}>
                            <div className="sw--card blog-card shadow h-100 d-flex flex-column pe-0">
                              <div className="sw--card-img">
                                <Link href={blog.blog_pdf} download target="_blank">
                                  <img 
                                    src={blog?.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                                    alt={blog.blog_name} 
                                    className="img-fluid w-100"
                                    style={{ objectFit: 'fill', maxWidth:"100%" }}
                                    onError={(e) => { e.target.src = "https://badmin.vallum.in/img/uploads/media/1772871903.png"; }} 
                                  />
                                </Link>
                              </div>
                              <div className="sw--card-content flex-grow-1 pt-3 pb-3"> 
                                <Link href={blog.blog_pdf} download target="_blank">
                                  <h3 className="mb0 btitle">{blog.blog_name}</h3>
                                </Link>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                  
                  {videoMedia.length === 0 && pdfMedia.length === 0 && (
                    <div className="text-center py-5 border rounded bg-light">
                      <h4>No media found.</h4>
                    </div>
                  )}

                </div>
              ) : (
                /* ALL OTHER TABS: Your exact original design */
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
                            download={currentType === "stakeholders-letters" && blog.blog_pdf !== "" ? true : false}
                          >
                          <img 
                            src={blog?.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                            alt={blog.blog_name} 
                            className="img-fluid"
                            onError={(e) => { e.target.src = "https://badmin.vallum.in/img/uploads/media/1772871903.png"; }} 
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
                            download={currentType === "stakeholders-letters" && blog.blog_pdf !== "" ? true : false}
                          >
                          <h3 className="mb10 btitle">{blog.blog_name}</h3>
                          </Link>                      
                          <p className="sw--card-desc">{blog.blog_short_description}</p>
                          
                          <div className="timeanddate">
                            <span>
                              <i className="ri-calendar-line"></i> {new Date(blog.blog_start_date ? blog.blog_start_date : blog.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span>
                              <i className="ri-user-follow-line"></i> Vallum Capital
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
                            download={currentType === "stakeholders-letters" && blog.blog_pdf !== "" ? true : false}
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
                            className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
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