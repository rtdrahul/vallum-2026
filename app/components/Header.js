"use client"
import React, { useState } from 'react';
import { Offcanvas, Dropdown, Nav, Container } from 'react-bootstrap';

// 1. Centralized Data
const navData = [
  { id: 1, label: 'Home', link: '/', type: 'link' },
  { id: 2, label: 'About Us', link: '/about-us', type: 'link' },
  {
    id: 3,
    label: 'Our Products',
    type: 'dropdown',
    children: [
      { label: 'Vallum India Discovery', link: '/vallum-india-discovery' },
      { label: 'Vallum India Multi-Activa', link: '/vallum-multi-activa' },
      { label: 'Vallum Principles', link: '/vallum-jan-principle', imgSrc: 'https://badmin.vallum.in/public/img/uploads/media/1770088614.png' },
    ]
  },
  {
    id: 4,
    label: 'Perspectives',
    type: 'dropdown',
    children: [
      { label: 'Blogs', link: '/blog/blog' },
      { label: 'Stakeholders Letter', link: '/blog/stakeholders-letters' },
      { label: 'Media', link: '/blog/media' },
      { label: 'Weekend Reading', link: '/blog/weekend-reading' },
    ]
  },
  { id: 5, label: 'Investor Corner', link: 'https://badmin.vallum.in/public/img/uploads/pdfs/Investor_Charter_PMS.pdf', type: 'external' },
];

export default function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <style>{`
        /* 1. Desktop Hover bridge gap: prevents menu closing when moving mouse from toggle to menu */
        .nav-item .dropdown-menu {
          margin-top: 0; 
          border-radius: 8px;
        }

        /* 2. Z-Index Fix: Ensures Offcanvas is on top of the fixed header */
        .offcanvas {
          z-index: 9999 !important; 
        }
        .offcanvas-backdrop {
          z-index: 9998 !important;
        }

        /* 3. Custom Close Button styling for Mobile */
        .btn-close-mobile {
          background: #ffffff;
          box-shadow: 1px 1px 2px #c9d4c9;
          border: 1px solid #dee2e6;
          border-radius: 50%;
          padding: 9px;
          font-size: 16px;
          line-height: 1;
          color: #333;
          cursor: pointer;
        }
        
        .sw-header {
            z-index: 1030; /* Standard Bootstrap fixed-top z-index */
        }
      `}</style>

      <header className="sw-header fixed-top animation bg-white border-bottom">
        <Container fluid>
          <div className="menu-header d-flex align-items-center justify-content-between py-2">
            
            {/* --- LOGO --- */}
            <div className="menu-logo">
              <a href="/">
                <img src="/assets/images/logo.png" alt="Logo"/>
              </a>
            </div>

            {/* --- DESKTOP NAV (Hover Logic) --- */}
            <nav className="d-none d-lg-block">
              <ul className="nav d-flex align-items-center gap-1">
                {navData.map((item) => (
                  <li key={item.id} className="nav-item">
                    {item.type === 'dropdown' ? (
                      <Dropdown 
                        show={hoveredDropdown === item.id}
                        onMouseEnter={() => setHoveredDropdown(item.id)}
                        onMouseLeave={() => setHoveredDropdown(null)}
                      >
                        <Dropdown.Toggle as="a" className="nav-link dropdown-toggle" style={{ cursor: 'pointer', color: '#000', textDecoration: 'none' }}>
                          {item.label}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="signledropdown shadow border-0">
                          {item.children.map((child, idx) => (
                            <Dropdown.Item key={idx} href={child.link} className="dd-item">
                              {child.imgSrc ? (
                                <span className="d-flex align-items-center">
                                  Vallum <img src={child.imgSrc} alt="icon" className="mx-1" style={{height:'14px'}} /> Principles
                                </span>
                              ) : child.label}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <a href={item.link} className="nav-link" style={{ color: '#000', textDecoration: 'none' }}>{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* --- RIGHT SECTION & MOBILE TOGGLE --- */}
            <div className="sw-nav-cta d-flex align-items-center gap-3">
              <a href="#" className="onboard d-none d-md-block text-decoration-none" style={{ color: '#000' }}>Direct Onboarding</a>
              <a href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in" target="_blank" rel="noreferrer">
                <button className="client-button btn btn-dark">Client Login</button>
              </a>
              
              {/* Mobile Burger Icon */}
              <button className="btn d-lg-none p-0 border-0" onClick={handleShow}>
                <span style={{ fontSize: '28px', lineHeight: '1' }}>☰</span>
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* --- MOBILE OFFCANVAS --- */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start">
        {/* Custom Header to ensure visibility and z-index priority */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <img src="/assets/images/logo.png" alt="Logo" style={{ height: '40px' }} />
            <button className="btn-close-mobile" onClick={handleClose}>
                ✕
            </button>
        </div>
        
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navData.map((item) => (
              item.type === 'dropdown' ? (
                <div key={item.id} className="p-3">
                  <div className="fw-bold mb-2 text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>{item.label}</div>
                  <ul className="list-unstyled ms-3">
                    {item.children.map((child, idx) => (
                      <li key={idx} className="p-2">
                        <a href={child.link} onClick={handleClose} className="text-decoration-none text-dark d-block">
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a key={item.id} href={item.link} onClick={handleClose} className="nav-link text-dark py-3 border-bottom">
                  {item.label}
                </a>
              )
            ))}
          </Nav>
          
          <div className="mt-4 d-grid gap-2">
             <a href="#" className="btn btn-outline-dark w-100">Direct Onboarding</a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Spacer */}
      <div style={{ marginTop: '80px' }}></div>
    </>
  );
}