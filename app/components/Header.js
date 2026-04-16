"use client";

import React, { useState } from "react";
import { Offcanvas, Dropdown, Nav, Container } from "react-bootstrap";

export default function Header({ settingsData }) {

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const handleOpen = () => window.openMain && window.openMain();
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

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
    {
      label: "PMS Calculator",
      link: 'https://badmin.vallum.in/img/Vallum_Capital_Advisors_Fee_Illustration.xlsx',
    },
  ].filter((item) => item.link);

  const navData = [
    { id: 1, label: "Home", link: "/", type: "link" },
    { id: 2,
      label: "About Us",
      // link: "/about-us",
      type: "dropdown",
      children: [
        { label: "About Vallum", link: "/about-us" },
        { label: "CSR", link: "/vallum-capital-csr" },
        { label: "Vallum Track Record", link: "/vallum-track-record" },
      ], 
    },
    {
      id: 3,
      label: "Our Products",
      type: "dropdown",
      children: [
        { label: "Vallum India Discovery", link: "/vallum-india-discovery" },
        { label: "Vallum India Multi-Activa", link: "/vallum-multi-activa" },
        {
          label: "Vallum Principles",
          link: "/vallum-jan-principle",
          imgSrc:
            "https://badmin.vallum.in/img/uploads/media/1770088614.png",
        },
      ],
    },
    {
      id: 4,
      label: "Perspectives",
      type: "dropdown",
      children: [
        { label: "Blogs", link: "/blog/blog" },
        { label: "Letter to Stakeholders", link: "/blog/stakeholders-letters" },
        { label: "Media", link: "/blog/media" },
        { label: "Weekend Reading", link: "/blog/weekend-reading" },
      ],
    },
    {
      id: 5,
      label: "Investors",
      type: "dropdown",
      children: investorDocs,
      isExternal: true,
    },
  ];

  return (
    <>
      <style>{`
        .nav-item .dropdown-menu{
          margin-top:0;
          border-radius:8px;
        }

        .offcanvas{
          z-index:9999 !important;
        }

        .offcanvas-backdrop{
          z-index:9998 !important;
        }

        .btn-close-mobile{
          background:#fff;
          box-shadow:1px 1px 2px #c9d4c9;
          border:1px solid #dee2e6;
          border-radius:50%;
          padding:9px;
          font-size:16px;
          cursor:pointer;
        }

        .sw-header{
          z-index:1030;
        }
      `}</style>

      <header className="sw-header fixed-top animation bg-white border-bottom">
        <Container>
          <div className="menu-header d-flex align-items-center justify-content-between py-2">

            {/* LOGO */}
            <div className="menu-logo">
              <a href="/">
                <img src="/assets/images/logo.png" alt="Logo" />
              </a>
            </div>

            {/* DESKTOP NAV */}
            <nav className="d-none d-lg-block">
              <ul className="nav d-flex align-items-center gap-1">

                {navData.map((item) => (
                  <li key={item.id} className="nav-item">

                    {item.type === "dropdown" ? (
                      <Dropdown
                        show={hoveredDropdown === item.id}
                        onMouseEnter={() => setHoveredDropdown(item.id)}
                        onMouseLeave={() => setHoveredDropdown(null)}
                      >
                        <Dropdown.Toggle
                          as="button"
                          className="nav-link dropdown-toggle"
                          style={{
                            cursor: "pointer",
                            color: "#000",
                            textDecoration: "none",
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          {item.label}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="signledropdown shadow border-0">
                          {item.children?.map((child, idx) => (
                            <Dropdown.Item
                              key={idx}
                              href={child.link}
                              className="dd-item"
                              target={item.isExternal ? "_blank" : "_self"}
                            >
                              {child.imgSrc ? (
                                <span className="d-flex align-items-center">
                                  Vallum
                                  <img
                                    src={child.imgSrc}
                                    alt=""
                                    className="mx-1"
                                    style={{ height: "14px" }}
                                  />
                                  Principles
                                </span>
                              ) : (
                                child.label
                              )}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <a
                        href={item.link}
                        className="nav-link"
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}

              </ul>
            </nav>

            {/* RIGHT SECTION */}
            <div className="sw-nav-cta d-flex align-items-center gap-3">

              <a
                href="/contact-us"
                className="btn btn-outline d-none d-md-block text-decoration-none"
              >
                Direct Onboarding
              </a>

              <a
                href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in"
                target="_blank"
                rel="noreferrer"
                className="btn btn-indigo d-none d-md-block"
              >
                  Client Login
              </a>
              <button
                id="uw-widget-custom-trigger"
                className="uw-widget-custom-trigger"
                aria-label="Accessibility Widget"
                onClick={handleOpen}
                style={{backgroundColor:"#3e3e8a",position:"static",padding:"10px"}}
              >
                <img src="data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_1506)'%3E%3Cpath d='M16 7C15.3078 7 14.6311 6.79473 14.0555 6.41015C13.4799 6.02556 13.0313 5.47894 12.7664 4.83939C12.5015 4.19985 12.4322 3.49612 12.5673 2.81719C12.7023 2.13825 13.0356 1.51461 13.5251 1.02513C14.0146 0.535644 14.6383 0.202301 15.3172 0.0672531C15.9961 -0.0677952 16.6999 0.00151652 17.3394 0.266423C17.9789 0.53133 18.5256 0.979934 18.9101 1.55551C19.2947 2.13108 19.5 2.80777 19.5 3.5C19.499 4.42796 19.1299 5.31762 18.4738 5.97378C17.8176 6.62994 16.928 6.99901 16 7Z' fill='white'/%3E%3Cpath d='M27 7.05L26.9719 7.0575L26.9456 7.06563C26.8831 7.08313 26.8206 7.10188 26.7581 7.12125C25.595 7.4625 19.95 9.05375 15.9731 9.05375C12.2775 9.05375 7.14313 7.67875 5.50063 7.21188C5.33716 7.14867 5.17022 7.09483 5.00063 7.05063C3.81313 6.73813 3.00063 7.94438 3.00063 9.04688C3.00063 10.1388 3.98188 10.6588 4.9725 11.0319V11.0494L10.9238 12.9081C11.5319 13.1413 11.6944 13.3794 11.7738 13.5856C12.0319 14.2475 11.8256 15.5581 11.7525 16.0156L11.39 18.8281L9.37813 29.84C9.37188 29.87 9.36625 29.9006 9.36125 29.9319L9.34688 30.0112C9.20188 31.0206 9.94313 32 11.3469 32C12.5719 32 13.1125 31.1544 13.3469 30.0037C13.5813 28.8531 15.0969 20.1556 15.9719 20.1556C16.8469 20.1556 18.6494 30.0037 18.6494 30.0037C18.8838 31.1544 19.4244 32 20.6494 32C22.0569 32 22.7981 31.0162 22.6494 30.0037C22.6363 29.9175 22.6206 29.8325 22.6019 29.75L20.5625 18.8294L20.2006 16.0169C19.9387 14.3788 20.1494 13.8375 20.2206 13.7106C20.2225 13.7076 20.2242 13.7045 20.2256 13.7013C20.2931 13.5763 20.6006 13.2963 21.3181 13.0269L26.8981 11.0763C26.9324 11.0671 26.9662 11.0563 26.9994 11.0438C27.9994 10.6688 28.9994 10.15 28.9994 9.04813C28.9994 7.94625 28.1875 6.73813 27 7.05Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_1506'%3E%3Crect width='32' height='32' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A" alt="Accessibility Icon" />
              </button>
              <button
                className="btn d-lg-none p-0 border-0"
                onClick={handleShow}
              >
                <span style={{ fontSize: "28px" }}>☰</span>
              </button>

            </div>

          </div>
        </Container>
      </header>

      {/* MOBILE MENU */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start">

        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            style={{ height: "40px" }}
          />

          <button className="btn-close-mobile" onClick={handleClose}>
            ✕
          </button>
        </div>

        <Offcanvas.Body>

          <Nav className="flex-column">

            {navData.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.id} className="p-3">

                  <div className="fw-bold mb-2 text-muted small text-uppercase">
                    {item.label}
                  </div>

                  <ul className="list-unstyled ms-3">
                    {item.children?.map((child, idx) => (
                      <li key={idx} className="p-2">
                        <a
                          href={child.link}
                          target={item.isExternal ? "_blank" : "_self"}
                          onClick={handleClose}
                          className="text-decoration-none text-dark d-block"
                        >
                          - {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                </div>
              ) : (
                <a
                  key={item.id}
                  href={item.link}
                  onClick={handleClose}
                  className="nav-link text-dark py-3 border-bottom"
                >
                  {item.label}
                </a>
              )
            )}

          </Nav>

          <div className="mt-4 d-grid gap-2">

            <a href="/contact-us" className="btn btn-outline-dark w-100">
              Direct Onboarding
            </a>

            <a
              href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in"
              className="btn btn-outline-dark w-100"
            >
              Client Login
            </a>

          </div>

        </Offcanvas.Body>

      </Offcanvas>

      <div style={{ marginTop: "80px" }}></div>
    </>
  );
}