"use client";

import React, { useState } from "react";
import { Offcanvas, Dropdown, Nav, Container } from "react-bootstrap";

export default function Header({ settingsData }) {

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

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
                className="onboard d-none d-md-block text-decoration-none"
                style={{ color: "#000" }}
              >
                Direct Onboarding
              </a>

              <a
                href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in"
                target="_blank"
                rel="noreferrer"
              >
                <button className="client-button btn btn-dark d-none d-md-block">
                  Client Login
                </button>
              </a>

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