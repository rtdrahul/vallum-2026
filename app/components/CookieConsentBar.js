"use client";

import { useEffect, useState } from "react";

export default function CookieConsentBar() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");

    if (!consent) {
      setTimeout(() => {
        setShowBar(true);
      }, 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBar(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShowBar(false);
  };

  if (!showBar) return null;

  return (
    <div
      className="position-fixed start-0 end-0 bottom-0 bg-white shadow-lg border-top"
      style={{
        zIndex: 9999,
        padding: "18px 24px",
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center g-3">
          
          {/* Left Content */}
          <div className="col-lg-9 col-md-12">
            <p
              className="mb-0"
              style={{
                fontSize: "16px",
                color: "#6b7280",
                lineHeight: "1.7",
              }}
            >
              We use cookies and similar technologies for website analytics when
              you consent. You can view our{" "}
              <a
                href="/privacy-policy"
                style={{
                  color: "#111827",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                privacy policy here.
              </a>
            </p>
          </div>

          {/* Right Buttons */}
          <div className="col-lg-3 col-md-12 text-lg-end text-center">
            <button
              onClick={rejectCookies}
              className="btn btn-outline me-2 py-2"              
            >
              Reject
            </button>

            <button
              onClick={acceptCookies}
              className="btn btn-indigo py-2"
              
            >
              Accept
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}