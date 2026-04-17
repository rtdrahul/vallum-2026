"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer({ settingsData }) {
  const [footerData, setFooterData] = useState(null);
  const siteSettings = settingsData?.sitesettings;

  useEffect(() => {
    fetch("https://badmin.vallum.in/api/footer-data")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFooterData(data.footerData);
        }
      })
      .catch((err) => console.error("Footer API Error:", err));
  }, []);

  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-grid">

          {/* ===== BRAND SECTION ===== */}
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={siteSettings?.site_logo || "https://vallum.in/assets/images/logo.png"}
              alt={siteSettings?.site_title || "Vallum Capital"}
            />
            <p>A research-driven PMS built on GARP, cycle awareness, and risk discipline — designed for HNIs, NRIs, and Family Offices who value clarity over speculation.</p>

            
            <div className="footer-col">
              {siteSettings?.admin_support_mobile && (
                <a href="tel:{siteSettings.admin_support_mobile}">{siteSettings.admin_support_mobile}</a>
              )}
              {siteSettings?.admin_support_email && (
                <a href="mailto:{siteSettings.admin_support_email}">{siteSettings.admin_support_email}</a>
              )}
                  <a href="https://vallum.in" target="_blank">www.vallum.in</a>
            </div>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              {siteSettings?.linkedin_url && (
                <a className="social-link" href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ width: "34px", height: "34px", borderRadius: "8px" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" fill="white" /><rect x="2" y="9" width="4" height="12" fill="white" /><circle cx="4" cy="4" r="2" fill="white" /></svg>
                </a>
              )}
              {siteSettings?.twitter_url && (
                <a className="social-link" href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" style={{ width: "34px", height: "34px", borderRadius: "8px" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white" /></svg>
                </a>
              )}
              {siteSettings?.youtube_url && (
                <a className="social-link" href={siteSettings.youtube_url} target="_blank" rel="noopener noreferrer" style={{ width: "34px", height: "34px", borderRadius: "8px" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" fill="white" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="var(--charcoal)" /></svg>
                </a>
              )}
            </div>
          </div>

          {/* ===== DYNAMIC FOOTER COLUMNS (footer_desc2, 3, 4) ===== */}
          {footerData?.footer_desc1 && (
            <div className="footer-col" dangerouslySetInnerHTML={{ __html: footerData.footer_desc1 }} />
          )}
          {footerData?.footer_desc2 && (
            <div className="footer-col" dangerouslySetInnerHTML={{ __html: footerData.footer_desc2 }} />
          )}
          {footerData?.footer_desc3 && (
            <div className="footer-col" dangerouslySetInnerHTML={{ __html: footerData.footer_desc3 }} />
          )}

        </div>

        {/* ===== GRIEVANCE SECTION ===== */}
        {footerData?.footer_desc4 ? (
          <div className="footer-grievance" dangerouslySetInnerHTML={{ __html: footerData.footer_desc4 }} />
        ) : (
          <div className="footer-grievance">
            <strong>Investor Grievances:</strong> For any grievances, email to <strong>connect.vallum@vallum.in</strong>.
      If the grievance is not redressed, the investor can take up the matter with SEBI through SCORES.
      <br/>
      Filing complaints on <a href="https://scores.sebi.gov.in/" target="_blank">SCORES</a> — Easy & Quick.
      Mandatory details: Name, PAN, Address, Mobile Number, E-mail ID.
      For online dispute resolution: <a href="https://smartodr.in/" target="_blank">Smart ODR</a>.
          </div>
        )}

        {/* ===== SEBI SECTION ===== */}
        {footerData?.footer_desc5 ? (
          <div className="footer-sebi" dangerouslySetInnerHTML={{ __html: footerData.footer_desc5 }} />
        ) : (
          <div className="footer-sebi">
            <div className="footer-sebi-inner">
        <div>
          <strong>Vallum Capital Advisors Pvt Ltd.</strong><br/>
          CIN: U67190MH2010PTC206628 · SEBI PMS Reg. No: INP000007650<br/>
          B-403, Kanakia Wall Street, Andheri Kurla Road, Chakala MIDC, Mumbai, India - 400 093
        </div>
        <div>
          <strong>SEBI Local Office:</strong><br/>
          SEBI Bhavan, Plot No. C4-A, G Block, Bandra Kurla Complex, Bandra (East), Mumbai – 400051
        </div>
      </div>
          </div>
        )}

        {/* ===== FOOTER BOTTOM ===== */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div>
              © {new Date().getFullYear()}{" "}
              {siteSettings?.site_title || "Vallum Capital Advisors Pvt Ltd"}.
              All Rights Reserved. Securities markets are subject to market risks.
            </div>
            <div className="footer-legal-links">
              <Link href="/terms-conditions">Terms & Conditions</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}