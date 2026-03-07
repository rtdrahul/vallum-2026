"use client";

import Link from "next/link";

export default function BlogDetailClient({ blogData, relatedBlogs, type }) {
  // If blogData isn't loaded yet
  if (!blogData) return null;

  return (
    <>
      {/* Header Section */}
      <div className="py-4 bg-white headbg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="paragraph">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent p-0 mb-0">
                    <li className="breadcrumb-item"><Link href="/blog/all">Blog</Link></li>
                    <li className="breadcrumb-item"><Link href={`/blog/${type || 'all'}`}>{type?.toUpperCase() || 'Category'}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{blogData.blog_name}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="sec-pad pt-4">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="blog-detail-container card shadow-sm p-4 border-0">
                {/* Featured Image */}
                <div className="mb-4 text-center">
                  <img 
                    src={blogData?.blog_image || "https://badmin.vallum.in/public/img/uploads/media/1772871903.png"}
                    alt={blogData.blog_name} 
                    className="img-fluid rounded w-100"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>

                {/* Meta Info */}
                <h1>{blogData.blog_name}</h1>
                <div className="timeanddate pb-3 border-bottom d-flex gap-4">
                  <span><i className="ri-calendar-line"></i> {new Date(blogData.created_at).toLocaleDateString()}</span>
                  <span><i className="ri-user-follow-line"></i> Vallum Capital</span>
                </div>

                {/* Article Content - Rendering HTML Safely */}
                <div 
                  className="blog-content-body" 
                  dangerouslySetInnerHTML={{ __html: blogData.blog_desc }} 
                />
              </div>
            </div>

            {/* Sidebar: Related Posts */}
            <div className="col-lg-4">
              <div className="sidebar-sticky" style={{ position: 'sticky', top: '120px' }}>
                {relatedBlogs && relatedBlogs.length > 0 ? (
                  <>
                    <h4 className="mb-4">Related Articles</h4>

                    {relatedBlogs.map((rel) => (
                      <div
                        className="card mb-3 border-0 shadow-sm overflow-hidden"
                        key={rel.blog_id}
                      >
                        <div className="row g-0">
                          <div className="col-4">
                            <img
                              src={rel?.blog_image || "https://badmin.vallum.in/public/img/uploads/media/1772871903.png"}
                              className="img-fluid h-100"
                              alt={rel.blog_name}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="col-8">
                            <div className="card-body p-2">
                              <Link
                                href={`/blog/${type || "all"}/${rel.blog_slug}`}
                                className="text-decoration-none text-dark"
                              >
                                <h6 className="card-title mb-1 small fw-bold text-truncate-2">
                                  {rel.blog_name}
                                </h6>
                              </Link>
                              <p className="card-text small text-muted m-0">
                                {new Date(rel.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}

                
                <div className="mt-5 p-4 bg-light rounded text-center">
                   <h5>Need more info?</h5>
                   <p className="small mb-2">Contact us for professional investment advice.</p>
                   <Link href="/contact-us" className="btn btn-primary btn-sm px-4 rounded-pill">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Scoped Styling for HTML Content */}
      <style jsx global>{`
        .blog-content-body h2, .blog-content-body h3 {
          margin-top: 1.5rem;
          color: #222;
        }
        .blog-content-body p {
          line-height: 1.8;
          color: #444;
          font-size: 1.1rem;
        }
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </>
  );
}