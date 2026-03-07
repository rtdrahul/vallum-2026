"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

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
  // Navigation items for the top bar (The 4 Main Types)
  const mainTypes = [
    { label: "Blogs", slug: "blog" }, 
    { label: "Media", slug: "media" },
    { label: "Stakeholders Letters", slug: "stakeholders-letters" },
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
    desc:
      "A research-driven PMS built on GARP, cycle awareness, and risk discipline – designed for HNIs, NRIs, and Family Offices who value clarity over speculation.",
    img: "https://badmin.vallum.in/img/uploads/media/1770023897.jpg",
  },
};

const data = breadcrumbData[currentType];
 
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
                      <img src={data.img || "https://badmin.vallum.in/public/img/uploads/media/1772871903.png"} className="w-100" alt="" />
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

              {/* {tags.length > 0 && (
                <>
                  <h5 className="mb-2 mt-4">Popular Tags</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link 
                        key={tag.tag_id} 
                        href={`/blog/tag/${tag.tag_slug}`}
                        className="badge bg-light text-dark text-decoration-none border p-2"
                      >
                        # {tag.tag_name}
                      </Link>
                    ))}
                  </div>
                </>
              )} */}
            </div>

            {/* Blog List Dynamic Rendering */}
            <div className="col-lg-9">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div className="sw--card shadow" key={blog.blog_id}>

                    <div className="sw--card-img">
                    <Link href={`/blog/${currentType}/${blog.blog_slug}`}>
                      <img 
                        src={blog.blog_image} 
                        alt={blog.blog_name} 
                        className="img-fluid"
                        style={{ objectFit: 'cover', height: '100%' }}
                        onError={(e) => { e.target.src = "/assets/images/blogs/placeholder.png"; }} 
                      />
                      </Link>
                    </div>

                    <div className="sw--card-content"> 
                      <Link href={`/blog/${currentType}/${blog.blog_slug}`}>
                      <h3 className="mb10 btitle">{blog.blog_name}</h3>
                      </Link>                     
                      <p className="sw--card-desc">{blog.blog_short_description}</p>
                      
                      <div className="timeanddate">
                        <span>
                          <i className="ri-calendar-line"></i> {new Date(blog.blog_start_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span>
                          <i className="ri-user-follow-line"></i> Vallum Capital
                        </span>
                      </div>
                      <Link href={`/blog/${currentType}/${blog.blog_slug}`}>
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
                <nav aria-label="Blog navigation" className="mt-5">
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

            </div>
          </div>
        </div>
      </section>
    </>
  );
}