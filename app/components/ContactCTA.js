export default function ContactCTA() {
    return (
      <section className="bg-grey sec-pad">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12 paragraph text-center insights justify-content-center">
              <h2 className="insight-heading">A Thoughtful Conversation Starts Here</h2>
            </div>
            <div className="col-lg-6 paragraph text-center insights justify-content-center">
              <p className="mt-2">
                If you represent a Family Office, Institution, Corporate Treasury or are an HNI or NRI seeking a process driven PMS, we would be glad to connect and understand your objectives before proposing a mandate.
              </p>
              <button className="client-button mt-3" style={{ display: 'inline' }}>
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }