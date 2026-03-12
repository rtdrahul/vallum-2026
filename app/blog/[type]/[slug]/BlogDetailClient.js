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
                    <li className="breadcrumb-item"><Link href="javascript:void(0);">Perspectives</Link></li>
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
                    src={blogData?.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
                    alt={blogData.blog_name} 
                    className="img-fluid rounded w-100"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>

                {/* Meta Info */}
                <h1 className="blog-title">{blogData.blog_name}</h1>
                <div className="timeanddate pb-3 border-bottom d-flex gap-4">
                  <span><i className="ri-calendar-line"></i> {new Date(blogData.blog_start_date ? blogData.blog_start_date : blogData.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                  <span><i className="ri-user-follow-line"></i> Vallum Capital</span>
                </div>
                <a href={blogData.blog_pdf} download className="pdf-button">
                  <span className="button__text">Download PDF</span>
                  <span className="button__icon"><svg className="svg" data-name="Layer 2" id="bdd05811-e15d-428c-bb53-8661459f9307" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                </a>
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
                              src={rel?.blog_image || "https://badmin.vallum.in/img/uploads/media/1772871903.png"}
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