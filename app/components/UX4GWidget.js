"use client";

import Script from "next/script";

export default function UX4GWidget() {
  // Helper functions to call the vanilla JS methods securely from React
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
      {/* Load the required UX4G CSS */}
      <link 
        rel="stylesheet" 
        href="https://img1.digitallocker.gov.in/ux4g/UX4G-CDN-accessibility/css/accesibility-style-v2.1.css" 
      />

      {/* Load the required UX4G script */}
      <Script 
        src="https://img1.digitallocker.gov.in/ux4g/UX4G-CDN-accessibility/js/weights-v1.js" 
        strategy="lazyOnload" 
      />

      {/* Accessibility Panel */}
      <div className="uwaw uw-light-theme gradient-head uwaw-initial paid_widget" id="uw-main">
        <div className="relative second-panel">
          <h3>Accessibility options by UX4G</h3>
          <div className="uwaw-close" onClick={handleClose}></div>
        </div>
        
        <div className="uwaw-body">
          <div className="h-scroll">
            <div className="uwaw-features">
              
              {/* Text To Speech */}
              <div className="uwaw-features__item reset-feature" id="featureItem_sp">
                <button id="speak" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-speaker"> </span> </span>
                  <span className="uwaw-features__item__name">Text To Speech</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon_sp" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Bigger Text */}
              <div className="uwaw-features__item reset-feature" id="featureItem">
                <button id="btn-s9" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-bigger-text"> </span> </span>
                  <span className="uwaw-features__item__name">Bigger Text</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Small Text */}
              <div className="uwaw-features__item reset-feature" id="featureItem-st">
                <button id="btn-small-text" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-small-text"> </span> </span>
                  <span className="uwaw-features__item__name">Small Text</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-st"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-st" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Line Height */}
              <div className="uwaw-features__item reset-feature" id="featureItem-lh">
                <button id="btn-s12" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-line-hight"> </span> </span>
                  <span className="uwaw-features__item__name">Line Height</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-lh"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-lh" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Highlight Links */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ht">
                <button id="btn-s10" onClick={handleHighlightLinks} className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-highlight-links"> </span> </span>
                  <span className="uwaw-features__item__name">Highlight Links</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ht" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Text Spacing */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ts">
                <button id="btn-s13" onClick={handleTextSpacing} className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-text-spacing"> </span> </span>
                  <span className="uwaw-features__item__name">Text Spacing</span>
                  <div className="uwaw-features__item__steps reset-steps" id="featureSteps-ts"></div>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ts" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Dyslexia Friendly */}
              <div className="uwaw-features__item reset-feature" id="featureItem-df">
                <button id="btn-df" onClick={handleDyslexiaFont} className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-dyslexia-font"> </span> </span>
                  <span className="uwaw-features__item__name">Dyslexia Friendly</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-df" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Hide Images */}
              <div className="uwaw-features__item reset-feature" id="featureItem-hi">
                <button id="btn-s11" onClick={handleHideImages} className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-hide-images"> </span> </span>
                  <span className="uwaw-features__item__name">Hide Images</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-hi" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Cursor */}
              <div className="uwaw-features__item reset-feature" id="featureItem-Cursor">
                <button id="btn-cursor" onClick={handleCursor} className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-cursor"> </span> </span>
                  <span className="uwaw-features__item__name">Cursor</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-cursor" style={{ display: "none" }}></span>
                </button>
              </div>

              {/* Light-Dark */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ht-dark">
                <button id="dark-btn" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__name">
                    <span className="light_dark_icon">
                      <input type="checkbox" className="light_mode uwaw-featugres__item__i" id="checkbox" />
                      <label htmlFor="checkbox" className="checkbox-label">
                        <i className="fas fa-moon-stars"> <span className="ux4g-icon icon-moon"></span> </i>
                        <i className="fas fa-sun"> <span className="ux4g-icon icon-sun"></span> </i>
                        <span className="ball"></span>
                      </label>
                    </span>
                    <span className="uwaw-features__item__name">Light-Dark</span>
                  </span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ht-dark" style={{ display: "none", pointerEvents: "none" }}></span>
                </button>
              </div>

              {/* Invert Colors */}
              <div className="uwaw-features__item reset-feature" id="featureItem-ic">
                <button id="btn-invert" className="uwaw-features__item__i" aria-label="Enable the UserWay screen reader" aria-pressed="false">
                  <span className="uwaw-features__item__icon"> <span className="ux4g-icon icon-invert"> </span> </span>
                  <span className="uwaw-features__item__name">Invert Colors</span>
                  <span className="tick-active uwaw-features__item__enabled reset-tick" id="tickIcon-ic" style={{ display: "none" }}></span>
                </button>
              </div>

            </div>
          </div>
        </div>
        
        {/* Reset Panel */}
        <div className="reset-panel">
          <div className="copyrights-accessibility">
            <button className="btn-reset-all" id="reset-all" onClick={handleReset}>
              <span className="reset-icon"> </span> <span className="reset-btn-text">Reset All Settings</span>
            </button>
            <a href="https://www.ux4g.gov.in" target="_blank" rel="noreferrer" className="copyright-text" style={{ cursor: "pointer" }}>
              <span className="uwaw-features__item__name ux4g-copy ux4g-copyright">Created by</span>
              <img src="https://www.ux4g.gov.in/assets/img/logo/ux4g-logo.svg" alt="logo" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        id="uw-widget-custom-trigger"
        className="uw-widget-custom-trigger"
        aria-label="Accessibility Widget"
        onClick={handleOpen}
      >
        <img src="data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_1506)'%3E%3Cpath d='M16 7C15.3078 7 14.6311 6.79473 14.0555 6.41015C13.4799 6.02556 13.0313 5.47894 12.7664 4.83939C12.5015 4.19985 12.4322 3.49612 12.5673 2.81719C12.7023 2.13825 13.0356 1.51461 13.5251 1.02513C14.0146 0.535644 14.6383 0.202301 15.3172 0.0672531C15.9961 -0.0677952 16.6999 0.00151652 17.3394 0.266423C17.9789 0.53133 18.5256 0.979934 18.9101 1.55551C19.2947 2.13108 19.5 2.80777 19.5 3.5C19.499 4.42796 19.1299 5.31762 18.4738 5.97378C17.8176 6.62994 16.928 6.99901 16 7Z' fill='white'/%3E%3Cpath d='M27 7.05L26.9719 7.0575L26.9456 7.06563C26.8831 7.08313 26.8206 7.10188 26.7581 7.12125C25.595 7.4625 19.95 9.05375 15.9731 9.05375C12.2775 9.05375 7.14313 7.67875 5.50063 7.21188C5.33716 7.14867 5.17022 7.09483 5.00063 7.05063C3.81313 6.73813 3.00063 7.94438 3.00063 9.04688C3.00063 10.1388 3.98188 10.6588 4.9725 11.0319V11.0494L10.9238 12.9081C11.5319 13.1413 11.6944 13.3794 11.7738 13.5856C12.0319 14.2475 11.8256 15.5581 11.7525 16.0156L11.39 18.8281L9.37813 29.84C9.37188 29.87 9.36625 29.9006 9.36125 29.9319L9.34688 30.0112C9.20188 31.0206 9.94313 32 11.3469 32C12.5719 32 13.1125 31.1544 13.3469 30.0037C13.5813 28.8531 15.0969 20.1556 15.9719 20.1556C16.8469 20.1556 18.6494 30.0037 18.6494 30.0037C18.8838 31.1544 19.4244 32 20.6494 32C22.0569 32 22.7981 31.0162 22.6494 30.0037C22.6363 29.9175 22.6206 29.8325 22.6019 29.75L20.5625 18.8294L20.2006 16.0169C19.9387 14.3788 20.1494 13.8375 20.2206 13.7106C20.2225 13.7076 20.2242 13.7045 20.2256 13.7013C20.2931 13.5763 20.6006 13.2963 21.3181 13.0269L26.8981 11.0763C26.9324 11.0671 26.9662 11.0563 26.9994 11.0438C27.9994 10.6688 28.9994 10.15 28.9994 9.04813C28.9994 7.94625 28.1875 6.73813 27 7.05Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_1506'%3E%3Crect width='32' height='32' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A" alt="Accessibility Icon" />
        <span>Accessibility Options</span>
      </button>
    </>
  );
}