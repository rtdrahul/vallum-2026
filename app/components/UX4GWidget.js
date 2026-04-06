"use client";

import Script from "next/script";

export default function UX4GWidget() {
  const handleOpen = () => window.openMain && window.openMain();
  const handleClose = () => window.closeMain && window.closeMain();
  const handleHighlightLinks = () => window.highlightLinks && window.highlightLinks();
  const handleTextSpacing = () => window.increaseAndReset && window.increaseAndReset();
  const handleDyslexiaFont = () => window.toggleFontFeature && window.toggleFontFeature();
  const handleHideImages = () => window.toggleImages && window.toggleImages();
  const handleCursor = () => window.toggleCursorFeature && window.toggleCursorFeature();
  const handleReset = () => window.resetAll && window.resetAll();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://img1.digitallocker.gov.in/ux4g/UX4G-CDN-accessibility/css/accesibility-style-v2.1.css"
      />
      <Script
        src="https://img1.digitallocker.gov.in/ux4g/UX4G-CDN-accessibility/js/weights-v1.js"
        strategy="lazyOnload"
      />

      <div className="uwaw uw-light-theme gradient-head uwaw-initial paid_widget" id="uw-main">
        <div className="relative second-panel" style={{paddingBlock:"2px",backgroundColor:"#3e3e8a"}}>
          <h3>Accessibility Options </h3>
          <div className="uwaw-close" onClick={handleClose}></div>
        </div>

        <div className="uwaw-body">
          <div className="h-scroll">
            <div className="uwaw-features">

              {/* Text To Speech */}
              <div className="uwaw-features__item reset-feature" id="featureItem_sp">
                <button id="speak" className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-speaker"></span>
                  </span>
                  <span className="uwaw-features__item__name">Text To Speech</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon_sp" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Bigger Text */}
              <div className="uwaw-features__item reset-feature" id="featureItem">
                <button id="btn-s9" className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-bigger-text"></span>
                  </span>
                  <span className="uwaw-features__item__name">Bigger Text</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Small Text */}
              <div className="uwaw-features__item reset-feature" id="featureItem-st">
                <button id="btn-small-text" className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-small-text"></span>
                  </span>
                  <span className="uwaw-features__item__name">Small Text</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-st"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-st" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Line Height */}
              <div className="uwaw-features__item reset-feature" id="featureItem-lh">
                <button id="btn-s12" className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-line-hight"></span>
                  </span>
                  <span className="uwaw-features__item__name">Line Height</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-lh"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-lh" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Highlight Links */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ht">
                <button id="btn-s10" onClick={handleHighlightLinks} className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-highlight-links"></span>
                  </span>
                  <span className="uwaw-features__item__name">Highlight Links</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ht" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Text Spacing */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ts">
                <button id="btn-s13" onClick={handleTextSpacing} className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-text-spacing"></span>
                  </span>
                  <span className="uwaw-features__item__name">Text Spacing</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-ts"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ts" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Dyslexia Friendly */}
              <div className="uwaw-features__item reset-feature" id="featureItem-df">
                <button id="btn-df" onClick={handleDyslexiaFont} className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-dyslexia-font"></span>
                  </span>
                  <span className="uwaw-features__item__name">Dyslexia Friendly</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-df" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Hide Images */}
              <div className="uwaw-features__item reset-feature" id="featureItem-hi">
                <button id="btn-s11" onClick={handleHideImages} className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-hide-images"></span>
                  </span>
                  <span className="uwaw-features__item__name">Hide Images</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-hi" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Cursor */}
              <div className="uwaw-features__item reset-feature" id="featureItem-Cursor">
                <button id="btn-cursor" onClick={handleCursor} className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-cursor"></span>
                  </span>
                  <span className="uwaw-features__item__name">Cursor</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-cursor" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* ✅ FIX: Light-Dark — removed nested <button>, input is now outside button with aria-label and min 24px size */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ht-dark">
                <div className="uwaw-features__item__i" id="dark-btn" role="presentation">
                  <span className="uwaw-features__item__name">
                    <span className="light_dark_icon">
                      {/* ✅ FIX 1: aria-label added for label requirement */}
                      {/* ✅ FIX 2: input moved BEFORE label so label's htmlFor works correctly */}
                      {/* ✅ FIX 3: minWidth/minHeight set to 24px for touch target requirement */}
                      <input
                        type="checkbox"
                        className="light_mode"
                        id="checkbox"
                        aria-label="Toggle Light and Dark mode"
                        style={{ minWidth: "24px", minHeight: "24px" }}
                      />
                      <label htmlFor="checkbox" className="checkbox-label">
                        <i className="fas fa-moon-stars">
                          <span className="ux4g-icon icon-moon"></span>
                        </i>
                        <i className="fas fa-sun">
                          <span className="ux4g-icon icon-sun"></span>
                        </i>
                        <span className="ball"></span>
                      </label>
                    </span>
                    <span className="uwaw-features__item__name">Light-Dark</span>
                  </span>
                  <span
                    className="tick-active uwaw-features__item__enabled reset-tick"
                    id="tickIcon-ht-dark"
                    style={{ display: "none", pointerEvents: "none" }}
                  ></span>
                </div>
              </div>

              {/* Invert Colors */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ic">
                <button id="btn-invert" className="uwaw-features__item__i">
                  <span className="uwaw-features__item__icon">
                    <span className="ux4g-icon icon-invert"></span>
                  </span>
                  <span className="uwaw-features__item__name">Invert Colors</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ic" style={{ display: "none" }}></span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Reset Panel */}
        <div className="reset-panel" style={{paddingBottom:"10px!important"}}>
          <div className="copyrights-accessibility">
            <button className="btn-reset-all" id="reset-all" onClick={handleReset}>
              <span className="reset-icon"></span>
              <span className="reset-btn-text">Reset All Settings</span>
            </button>
            {/* <a
              href="https://www.ux4g.gov.in"
              target="_blank"
              rel="noreferrer"
              className="copyright-text"
              style={{ cursor: "pointer" }}
            >
              <span className="uwaw-features__item__name ux4g-copy ux4g-copyright">Created by</span>
              <img src="https://www.ux4g.gov.in/assets/img/logo/ux4g-logo.svg" alt="UX4G logo" loading="lazy" />
            </a> */}
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      
    </>
  );
}