"use client";

import { useState, useEffect } from "react";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    biggerText: false,
    textSpacing: false,
    highlightLinks: false,
    dyslexiaFriendly: false,
    hideImages: false,
    invertColors: false,
  });

  // Toggle individual settings
  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset all settings to default
  const resetAll = () => {
    setSettings({
      biggerText: false,
      textSpacing: false,
      highlightLinks: false,
      dyslexiaFriendly: false,
      hideImages: false,
      invertColors: false,
    });
  };

  // Generate dynamic CSS based on active settings
  const generateDynamicCSS = () => {
    let css = "";

    if (settings.biggerText) {
      css += `html { font-size: 115% !important; } `;
    }
    if (settings.textSpacing) {
      css += `* { letter-spacing: 0.12em !important; word-spacing: 0.16em !important; line-height: 1.6 !important; } `;
    }
    if (settings.highlightLinks) {
      css += `a, button { background-color: #ffeb3b !important; color: #000 !important; text-decoration: underline !important; font-weight: bold !important; } `;
    }
    if (settings.dyslexiaFriendly) {
      css += `* { font-family: "OpenDyslexic", "Comic Sans MS", Arial, Helvetica, sans-serif !important; } `;
    }
    if (settings.hideImages) {
      css += `img, svg, video, [style*="background-image"] { opacity: 0 !important; visibility: hidden !important; } `;
    }
    if (settings.invertColors) {
      // Inverts the whole body, but re-inverts images/video so they don't look like photo negatives
      css += `
        body { filter: invert(100%) hue-rotate(180deg) !important; background-color: #111 !important; } 
        img, video { filter: invert(100%) hue-rotate(180deg) !important; }
      `;
    }

    return css;
  };

  return (
    <>
      {/* Dynamic Style Injection */}
      <style>{generateDynamicCSS()}</style>

      {/* Floating Trigger Button */}
      <button
        className="btn rounded-circle position-fixed shadow d-flex align-items-center justify-content-center"
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          zIndex: 9999,
          backgroundColor: "#6244C5", // The purple from your screenshot
          color: "white",
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Accessibility Menu"
      >
        <span style={{ fontSize: "30px" }}>🚹</span>
      </button>

      {/* The Accessibility Menu Panel */}
      {isOpen && (
        <div
          className="card position-fixed shadow-lg border-0"
          style={{
            bottom: "100px",
            right: "30px",
            width: "340px",
            zIndex: 9999,
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#f8f9fa"
          }}
        >
          {/* Header */}
          <div 
            className="card-header text-white d-flex justify-content-between align-items-center py-3 border-0"
            style={{ backgroundColor: "#6244C5" }}
          >
            <h5 className="mb-0 fw-normal fs-6">Accessibility options</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            ></button>
          </div>

          {/* Grid of Options */}
          <div className="card-body">
            <div className="row g-2">
              {/* Option: Bigger Text */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.biggerText ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("biggerText")}
                >
                  <span className="fs-3 mb-1">Tt</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Bigger Text</span>
                </button>
              </div>

              {/* Option: Text Spacing */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.textSpacing ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("textSpacing")}
                >
                  <span className="fs-3 mb-1">↔️</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Text Spacing</span>
                </button>
              </div>

              {/* Option: Highlight Links */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.highlightLinks ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("highlightLinks")}
                >
                  <span className="fs-3 mb-1">🔗</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Highlight Links</span>
                </button>
              </div>

              {/* Option: Dyslexia Friendly */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.dyslexiaFriendly ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("dyslexiaFriendly")}
                >
                  <span className="fs-3 mb-1">Df</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Dyslexia Friendly</span>
                </button>
              </div>

              {/* Option: Hide Images */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.hideImages ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("hideImages")}
                >
                  <span className="fs-3 mb-1">🚫</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Hide Images</span>
                </button>
              </div>

              {/* Option: Invert Colors */}
              <div className="col-4">
                <button
                  className={`btn w-100 h-100 p-2 d-flex flex-column align-items-center justify-content-center shadow-sm ${settings.invertColors ? "border-primary text-primary" : "border-0 bg-white"}`}
                  style={{ borderRadius: "10px", minHeight: "85px" }}
                  onClick={() => toggleSetting("invertColors")}
                >
                  <span className="fs-3 mb-1">◑</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Invert Colors</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer / Reset */}
          <div className="card-footer bg-white border-0 py-3 text-center">
            <button 
              className="btn btn-light text-dark w-100 fw-bold shadow-sm"
              style={{ backgroundColor: "#eaddff" }} // Light purple button
              onClick={resetAll}
            >
              🔄 Reset All Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
}