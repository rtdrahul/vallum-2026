import Link from "next/link";

export default function Footer({ settingsData }) {
  // Extracting dynamic data from the API response
  const basePath = settingsData?.setting_image_path;
  const siteSettings = settingsData?.sitesettings;
  const investorDocs = [
  {
    label: "FAQ on Investment in PMS",
    link: siteSettings?.faq_pms ? basePath + siteSettings.faq_pms : null,
  },
  {
    label: "Disclosure Document",
    link: siteSettings?.disclosure_document
      ? basePath + siteSettings.disclosure_document
      : null,
  },
  {
    label: "Investor Charter",
    link: siteSettings?.investor_charter
      ? basePath + siteSettings.investor_charter
      : null,
  },
  {
    label: "Investor Complaints Data",
    link: siteSettings?.investor_complaints
      ? basePath + siteSettings.investor_complaints
      : null,
  },
  {
    label: "FAQ on SEBI Validated UPI ID",
    link: siteSettings?.faq_upi
      ? basePath + siteSettings.faq_upi
      : null,
  },
  {
    label: "SEBI Master Circular for Online Resolution of Disputes",
    link: siteSettings?.sebi_circular
      ? basePath + siteSettings.sebi_circular
      : null,
  },
  {
    label: "Centralised Reporting Mechanism for Demised Investor",
    link: siteSettings?.demised_investor
      ? basePath + siteSettings.demised_investor
      : null,
  },
].filter((item) => item.link);
  return (
    <footer className="footerthree">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-12 fthead">
            <div className="row">
              {/* Company Links */}
              <div className="col-lg-2 col-6 mt30">
                <h5>Company</h5>
                <ul className="footer-links-list">
                  <li><Link href="/about-us">About Us</Link></li>
                  <li><Link href="/contact-us">Contact Us</Link></li>
                  <li><Link href="/blog/blog">Insights</Link></li>
                  <li><Link href="/contact-us">Career</Link></li>
                </ul>
              </div>
              {/* Products Links */}
              <div className="col-lg-2 col-6 mt30">
                <h5>Products</h5>
                <ul className="footer-links-list">
                  <li><Link href="/vallum-india-discovery">Vallum India Discovery</Link></li>
                  <li><Link href="/vallum-multi-activa">Vallum India Multi-Activa</Link></li>
                  <li><Link href="/vallum-jan-principle">Vallum <img
                      src="https://badmin.vallum.in/img/uploads/media/1770089775.png"
                      alt="JAN Logo"
                      className="jan-white-14"
                    /> Principles</Link></li>

                </ul>
              </div>

              {/* Investor Links */}
              <div className="col-lg-5 mt30">
                <h5>Investors</h5>
                <ul className="footer-links-list">
                  {investorDocs.map((doc, index) => (
                    <li key={index}>
                      <Link href={doc.link} target="_blank">
                        {doc.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="https://badmin.vallum.in/img/Vallum_Capital_Advisors_Fee_Illustration.xlsx" target="_blank">
                      PMS Calculator
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Dynamic Contact & Socials */}
              <div className="col-lg-3 mt30">
                <h5>Contact</h5>
                <ul className="footer-links-list">
                  <li>
                    <a href={`tel:${siteSettings?.admin_mobile || "9326576656"}`}>
                      {siteSettings?.admin_mobile || "9326576656"}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${siteSettings?.admin_email || "connect.vallum@vallum.in"}`}>
                      {siteSettings?.admin_email || "connect.vallum@vallum.in"}
                    </a>
                  </li>
                </ul>
                <h6 className="mt-2">Reach us on Social Media</h6>
                <div className="infobblk">
                  <ul className="socialmedia">
                    {/* Only show icons if the URL is provided in the API and is not "#" */}
                    {siteSettings?.linkedin_url && siteSettings.linkedin_url !== "" && (
                      <li><a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/Linkedin.png" alt="Linkedin" /></a></li>
                    )}
                    {siteSettings?.instagram_url && siteSettings.instagram_url !== "" && (
                      <li><a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/Instagram.png" alt="Instagram" /></a></li>
                    )}
                    {siteSettings?.youtube_url && siteSettings.youtube_url !== "" && (
                      <li><a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/youtube.png" alt="Youtube" /></a></li>
                    )}
                    {siteSettings?.twitter_url && siteSettings.twitter_url !== "" && (
                      <li><a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/X.png" alt="X" /></a></li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal and Grievances Section */}
        <div className="row justify-content-between">
          <div className="col-lg-7 fthead">
            <div className="row">
              <div className="col-lg-12 mt30">
                <h5>Investor Grievances</h5>
                <p className="mb-2">For any grievances, email to <strong>{siteSettings?.admin_support_email || "pms.grievances@vallum.in"}</strong></p>
                <p className="my-4">
                  In case the grievance is not redressed the investor can take up the matter 
                  with SEBI through SCORES (SEBI COMPLAINTS REDRESS SYSTEM)
                </p>
                <p>Filling complaints on SCORES - Easy & Quick</p>
                <ul className="footer-links-list small ">
                  <li className="d-flex align-items-center">a. Register on &nbsp;<a href="https://scores.sebi.gov.in/" target="_blank" className="text-white text-decoration-underline">SCORES</a> &nbsp;portal</li>
                  <li>b. Mandatory details for filling complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID</li>
                  <li>c. Benefits: i. Effective Communication ii. Speedy redressal of the grievances</li>
                  <li className="d-flex align-items-center">d. For online dispute resolution platform - <a href="https://smartodr.in/" target="_blank" className="text-white text-decoration-underline">&nbsp;Smart ODR</a></li>
                </ul>
                
              </div>
            </div>
          </div>

          {/* Registration and Dynamic Address Section */}
          <div className="col-lg-5 right-border-footer mt-4 mt-lg-0">
            <div className="row justify-content-between">
              <div className="col-lg-12 mt30 ps-lg-5">
                {/* Static Logo from your assets */}
                <Link href="/">
                  <img className="footer-logo mb-3" src="/assets/images/logo-white.png" style={{ width: "125px" }} alt="Vallum" />
                </Link>
                <div className="footercompanyinfo">
                  <ul className="footer-links-list contactlistx">
                    <li style={{ fontSize: "16px" }}>
                      <strong>Vallum Capital Advisors Pvt Ltd.</strong>
                    </li>
                    <li>
                      <strong>CIN: U67190MH2010PTC206628 <br /> SEBI PMS Reg. No: INP000007650</strong>
                    </li>
                    <li className="mt-2">
                        {/* Dynamic Address from API */}
                        {siteSettings?.address || "B-403, Kanakia Wall Street, Andheri Kurla Road, Chakala MIDC, Mumbai, India - 400 093"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-lg-12 mt30 ps-lg-5 border-top pt-4">
                {/* Static Sebi Logo */}
                <img className="footer-logo mb-3" src="/assets/images/Sebi.png" style={{ width: "75px" }} alt="Sebi" />
                <div className="footercompanyinfo">
                  <ul className="footer-links-list contactlistx small ">
                    <li>Local Office Address: Securities and Exchange Board of India SEBI Bhavan, Plot No. C4-A, G Block, Bandra Kurla Complex, Bandra (East), Mumbai – 400051</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-end">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="ft-copyright">
								<p className="small">
                  © {new Date().getFullYear()} {siteSettings?.site_title || "Vallum Capital Advisors Pvt Ltd"}. All Rights Reserved. Securities markets are subject to market risks.
                </p>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="ft-linkz">                    
								<a href="/terms-conditions">Terms and Conditions </a>                   
								<a href="/privacy-policy">Privacy Policy </a>                                          
								<a href="/disclaimer">Disclaimer </a>                                          
							</div>
						</div>
					</div>
				</div>
			</div>
    </footer>
  );
}