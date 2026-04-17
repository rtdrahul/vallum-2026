"use client";

import { useEffect, useRef } from "react";

export default function SebiNoticePopup() {
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    const seenPopup = localStorage.getItem("sebi_notice_seen");

    if (!seenPopup && typeof window !== "undefined") {
      const loadModal = async () => {
        const bootstrap = await import("bootstrap");

        bsModal.current = new bootstrap.Modal(modalRef.current, {
          backdrop: true,
          keyboard: true,
        });

        setTimeout(() => {
          bsModal.current.show();
        }, 700);
      };

      loadModal();
    }
  }, []);

  const acceptNotice = () => {
    localStorage.setItem("sebi_notice_seen", "true");
    bsModal.current?.hide();
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-hidden="true"
      ref={modalRef}
    >
      {/* Smaller popup */}
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0 shadow-lg"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            maxWidth: "560px",
            margin: "auto",
          }}
        >
          {/* Header */}
          <div
            className="modal-header text-white border-0 py-3 px-4"
            style={{ background: "#161853" }}
          >
            <div>
              <h5 className="modal-title mb-1 fw-semibold">
                Beware of Impersonation
              </h5>
              <small className="text-light opacity-75">
                Important security notice
              </small>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Scrollable Body */}
          <div
            className="modal-body px-4 py-3"
            style={{
              maxHeight: "420px",
              overflowY: "auto",
              fontSize: "15px",
              lineHeight: "1.7",
            }}
          >
            <p>
              Vallum Capital Advisors Private Limited, or any of its employees,
              directors, or representatives (“Vallum”), will never contact you
              to solicit investments through cash transactions, promise assured
              or guaranteed returns, or offer advisory services related to
              cryptocurrencies, derivatives (F&O), or any “get rich quick”
              schemes.
            </p>

            <p>
              Vallum does not provide unsolicited stock tips or free portfolio
              recommendations.
            </p>

            <p>
              Vallum does not operate any unofficial social media groups or
              channels offering investment advice, job opportunities, or paid
              meetings with our team.
            </p>

            <p>
              All official communication from Vallum is conducted only through
              our verified channels and official domain.
            </p>

            <p>
              If you come across suspicious activity or impersonation, please
              report it immediately at{" "}
              <a href="mailto:connect.vallum@vallum.in">
                connect.vallum@vallum.in
              </a>
            </p>

            <p>
              Your vigilance helps protect both you and the integrity of our
              firm.
            </p>

            <p className="mb-0 fw-semibold text-danger">
              Click “I Understand” to avoid seeing this notice again.
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light border-0 px-4 py-3">
            <button
              type="button"
              className="btn text-white px-4"
              onClick={acceptNotice}
              style={{
                background: "#161853",
                borderRadius: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}