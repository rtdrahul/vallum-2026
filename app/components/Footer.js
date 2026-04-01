"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer({ settingsData }) {

  const [footerData, setFooterData] = useState(null);

  const siteSettings = settingsData?.sitesettings;

  // 🔥 Fetch Footer API
  useEffect(() => {
    fetch("https://badmin.vallum.in/api/footer-data") // 🔁 replace with your API URL
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFooterData(data.footerData);
        }
      })
      .catch((err) => console.error("Footer API Error:", err));
  }, []);

  return (
    <footer className="footerthree">
      <div className="container">

        {/* ================= TOP SECTION ================= */}
        <div className="row justify-content-between">
          <div className="col-lg-12 fthead">
            <div className="row">

              {/* ✅ Dynamic Footer 1 */}
              {footerData?.footer_desc1 && (
                <div
                  className="footer1 col-lg-2 col-6 mt30"
                  dangerouslySetInnerHTML={{ __html: footerData.footer_desc1 }}
                />
              )}

              {/* ✅ Dynamic Footer 2 */}
              {footerData?.footer_desc2 && (
                <div
                  className="col-lg-2 col-6 mt30 footer2"
                  dangerouslySetInnerHTML={{ __html: footerData.footer_desc2 }}
                />
              )}

              {/* ✅ Dynamic Footer 3 */}
              {footerData?.footer_desc3 && (
                <div
                  className="footer3 col-lg-5 mt30"
                  dangerouslySetInnerHTML={{ __html: footerData.footer_desc3 }}
                />
              )}

              {/* ================= CONTACT (STATIC) ================= */}
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

                    {siteSettings?.linkedin_url && (
                      <li>
                        <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <img src="/assets/images/Linkedin.png" alt="Linkedin" />
                        </a>
                      </li>
                    )}

                    {siteSettings?.instagram_url && (
                      <li>
                        <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                          <img src="/assets/images/Instagram.png" alt="Instagram" />
                        </a>
                      </li>
                    )}

                    {siteSettings?.youtube_url && (
                      <li>
                        <a href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer">
                          <img src="/assets/images/youtube.png" alt="Youtube" />
                        </a>
                      </li>
                    )}

                    {siteSettings?.twitter_url && (
                      <li>
                        <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer">
                          <img src="/assets/images/X.png" alt="X" />
                        </a>
                      </li>
                    )}

                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="row justify-content-between">

          {/* ✅ Dynamic Footer 5 */}
          {footerData?.footer_desc5 && (
            <div
              className="footer5 col-lg-7 fthead"
              dangerouslySetInnerHTML={{ __html: footerData.footer_desc5 }}
            />
          )}

          {/* ✅ Dynamic Footer 6 */}
          {footerData?.footer_desc6 && (
            <div
              className="col-lg-5 right-border-footer mt-4 mt-lg-0 footer6"
              dangerouslySetInnerHTML={{ __html: footerData.footer_desc6 }}
            />
          )}

        </div>
      </div>

      {/* ================= FOOTER END ================= */}
      <div className="footer-end">
        <div className="container">
          <div className="row">

            <div className="col-lg-7">
              <p className="small">
                © {new Date().getFullYear()}{" "}
                {siteSettings?.site_title || "Vallum Capital Advisors Pvt Ltd"}.
                All Rights Reserved.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="ft-linkz">
                <Link href="/terms-conditions" style={{borderRight: "1px solid",paddingRight: "10px"}}>Terms and Conditions</Link>
                <Link href="/privacy-policy" style={{borderRight: "1px solid",paddingRight: "10px"}}>Privacy Policy</Link>
                <Link href="/disclaimer">Disclaimer</Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}