"use client"
import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

const navData = [
  { id: 1, label: 'Home', link: '/', type: 'link' },
  { id: 2, label: 'About Us', link: '/about-us', type: 'link' },
  { id: 3, label: 'Investor Corner', link: 'https://www.viblo.in/public/img/uploads/pdfs/Investor_Charter_PMS.pdf', type: 'external' },
  {
    id: 4,
    label: 'Our Products',
    type: 'dropdown',
    children: [
      { label: 'Vallum India Discovery', link: '/vallum-india-discovery' },
      { label: 'Vallum India Multi-Activa', link: '/vallum-multi-activa' },
      { label: 'Vallum Principles', link: '/vallum-jan-principle', imgSrc: 'https://www.viblo.in/public/img/uploads/media/1770088614.png' },
    ]
  },
  {
    id: 5,
    label: 'Perspectives',
    type: 'dropdown',
    children: [
      { label: 'Blogs', link: '/blog/blog' },
      { label: 'Stakeholders Letter', link: '/blog/stakeholders-letters' },
      { label: 'Media', link: '/blog/media' },
      { label: 'Weekend Reading', link: '/blog/weekend-reading' },
    ]
  }
];

export default function Header() {
  const [show, setShow] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleClose = () => {
    setShow(false);
    setActiveDropdown(null);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <header className="sw-header fixed-top animation" style={{ background: '#fff', borderBottom: '1px solid #eee', minHeight: '70px', zIndex: 1030 }}>
        <div className="container-fluid">
          <div className="menu-header d-flex align-items-center justify-content-between" style={{ padding: '10px 0' }}>
            
            {/* Logo */}
            <div className="menu-logo">
              <a className="nav-brand" href="/">
                <img src="/assets/images/logo.png" alt="Logo" style={{ maxHeight: '50px' }} />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="sw-nav d-none d-lg-block">
              <ul className="navbar-nav d-flex flex-row gap-4">
                {navData.map((item) => (
                  <li key={item.id} className="nav-item">
                    <a className="nav-link" href={item.link} style={{ color: '#000', fontWeight: '500' }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Buttons & Mobile Trigger */}
            <div className="sw-nav-cta">
              <ul className="d-flex align-items-center list-unstyled gap-3 mb-0">
                <li className="d-none d-lg-block"><a href="#" className="onboard">Direct Onboarding</a></li>
                <li>
                  <a href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in" target="_blank" rel="noreferrer">
                    <button className="client-button btn btn-primary btn-sm">Client Login</button>
                  </a>
                </li>
                {/* Burger Menu Button - ONLY VISIBLE ON MOBILE */}
                <li className="d-lg-none">
                  <button className="btn p-0" onClick={handleShow} style={{ fontSize: '24px' }}>
                    <i className="ri-menu-line"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Offcanvas Menu for Mobile */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img src="/assets/images/logo.png" alt="Logo" style={{ maxHeight: '40px' }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            {navData.map((item) => (
              <li key={item.id} className="py-2 border-bottom">
                {item.type === 'dropdown' ? (
                  <div>
                    <strong onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)} style={{ cursor: 'pointer' }}>
                      {item.label} {activeDropdown === item.id ? '−' : '+'}
                    </strong>
                    {activeDropdown === item.id && (
                      <ul className="list-unstyled ms-3 mt-2">
                        {item.children.map((child, i) => (
                          <li key={i} className="py-1">
                            <a href={child.link} onClick={handleClose} className="text-decoration-none text-dark">{child.label}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a href={item.link} onClick={handleClose} className="text-decoration-none text-dark font-weight-bold">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}