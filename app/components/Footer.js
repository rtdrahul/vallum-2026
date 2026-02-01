import Link from "next/link";

export default function Footer({ settingsData }) {
  // Extracting dynamic data from the API response
  const settings = settingsData?.sitesettings;

  return (
    <footer className="footerthree">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-12 fthead">
            <div className="row">
              {/* Company Links */}
              <div className="col-lg-3 mt30">
                <h5>Company</h5>
                <ul className="footer-links-list">
                  <li><Link href="/about-us">About Us</Link></li>
                  <li><Link href="/philosophy">Philosophy</Link></li>
                  <li><Link href="/blog/all">Insights</Link></li>
                  <li><Link href="/career">Career</Link></li>
                </ul>
              </div>

              {/* Products Links */}
              <div className="col-lg-3 mt30">
                <h5>Products</h5>
                <ul className="footer-links-list">
                  <li><Link href="/products/discovery">Vallum India Discovery</Link></li>
                  <li><Link href="/products/multi-activa">Vallum India Multi-Activa</Link></li>
                  <li><Link href="/products/jan-principles">Vallum JAN Principles</Link></li>
                </ul>
              </div>

              {/* Investor Links */}
              <div className="col-lg-3 mt30">
                <h5>Investors</h5>
                <ul className="footer-links-list">
                  <li><Link href="/faqs">FAQs</Link></li>
                  <li><Link href="/disclosure">Disclosure Document</Link></li>
                  <li><a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer">SCORES</a></li>
                  <li><Link href="/upi-id">UPI Id</Link></li>
                </ul>
              </div>

              {/* Dynamic Contact & Socials */}
              <div className="col-lg-3 mt30">
                <h5>Contact</h5>
                <ul className="footer-links-list">
                  <li>
                    <a href={`tel:${settings?.admin_mobile || "9326576656"}`}>
                      {settings?.admin_mobile || "9326576656"}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${settings?.admin_email || "connect.vallum@vallum.in"}`}>
                      {settings?.admin_email || "connect.vallum@vallum.in"}
                    </a>
                  </li>
                </ul>
                <h6 className="mt-4">Reach us on Social Media</h6>
                <div className="infobblk">
                  <ul className="socialmedia">
                    {/* Only show icons if the URL is provided in the API and is not "#" */}
                    {settings?.linkedin_url && settings.linkedin_url !== "#" && (
                      <li><a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/Linkedin.png" alt="Linkedin" /></a></li>
                    )}
                    {settings?.instagram_url && settings.instagram_url !== "#" && (
                      <li><a href={settings.instagram_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/Instagram.png" alt="Instagram" /></a></li>
                    )}
                    {settings?.youtube_url && settings.youtube_url !== "#" && (
                      <li><a href={settings.youtube_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/youtube.png" alt="Youtube" /></a></li>
                    )}
                    {settings?.twitter_url && settings.twitter_url !== "#" && (
                      <li><a href={settings.twitter_url} target="_blank" rel="noopener noreferrer"><img src="/assets/images/X.png" alt="X" /></a></li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal and Grievances Section */}
        <div className="row justify-content-between pb-5">
          <div className="col-lg-7 fthead">
            <div className="row">
              <div className="col-lg-12 mt30">
                <h5>Investor Grievances</h5>
                <p className="mb-2">For any grievances, email to <strong>{settings?.admin_support_email || "pms.grievances@vallum.in"}</strong></p>
                <p className="mb-2">
                  In case the grievance is not redressed the investor can take up the matter 
                  with SEBI through SCORES (SEBI COMPLAINTS REDRESS SYSTEM)
                </p>
                <p className="fw-bold">Filling complaints on SCORES - Easy & Quick</p>
                <ul className="footer-links-list small opacity-75">
                  <li>a. Register on SCORES portal</li>
                  <li>b. Mandatory details for filling complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID</li>
                  <li>c. Benefits: i. Effective Communication ii. Speedy redressal of the grievances</li>
                  <li>d. For online dispute resolution platform - <a href="https://smartodr.in/" target="_blank" className="text-white text-decoration-underline">Smart ODR</a></li>
                </ul>
                <p className="mt30 small opacity-50">
                  © {new Date().getFullYear()} {settings?.site_title || "Vallum Capital Advisors"}. All Rights Reserved.<br />
                  Securities markets are subject to market risks.
                </p>
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
                    <li>
                      <strong>CIN: U67190MH2010PTC206628 <br /> SEBI PMS Reg. No: INP000007650</strong>
                    </li>
                    <li className="mt-2">
                        {/* Dynamic Address from API */}
                        {settings?.address || "B-403, Kanakia Wall Street, Andheri Kurla Road, Chakala MIDC, Mumbai, India - 400 093"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-lg-12 mt30 ps-lg-5 border-top pt-4">
                {/* Static Sebi Logo */}
                <img className="footer-logo mb-3" src="/assets/images/Sebi.png" style={{ width: "125px" }} alt="Sebi" />
                <div className="footercompanyinfo">
                  <ul className="footer-links-list contactlistx small opacity-75">
                    <li>Local Office Address: Securities and Exchange Board of India Southern Regional Office, Overseas Towers, 7th floor, 756-L Anna Salai, Chennai - 600 002.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}