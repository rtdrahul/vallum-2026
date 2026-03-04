"use client";

import { useState } from "react";

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_mobile: "",
    contact_country: "",
    contact_state: "",
    contact_city: "",
    contact_profile: "Select Your Profile",
    contact_approch: "Website Form", // Default value for the approach parameter
    business: "", // Internal field if needed, otherwise ignore
  });

  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "Submitting your request...", type: "info" });

    try {
      // Create FormData to send as multipart/form-data or JSON depending on API preference
      // Here we use JSON which is standard for modern Next.js apps
      const response = await fetch("https://badmin.vallum.in/api/contact-us-process", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success" || response.ok) {
        setStatus({ 
          loading: false, 
          message: result.message || "Thank you! Your message has been sent successfully.", 
          type: "success" 
        });
        // Reset form
        setFormData({
          contact_name: "",
          contact_email: "",
          contact_mobile: "",
          contact_country: "",
          contact_state: "",
          contact_city: "",
          contact_profile: "Select Your Profile",
          contact_approch: "Website Form",
          business: ""
        });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setStatus({ 
        loading: false, 
        message: error.message || "An error occurred. Please try again later.", 
        type: "error" 
      });
    }
  };

  return (
        <>
              <div className="contactblocks sec-pad">

<div className="container">

   <div className="row justify-content-between">

      <div className="col-lg-6">

         <div className="quickcotact">

            <h2>Let’s Have a Thoughtful Conversation</h2>

            <p className="mt10">Choosing an investment manager is a long-term decision. If you’d like to understand how we work, ask questions, or explore alignment, we welcome a measured discussion.</p>
            <p className="mt20">There is no obligation - only clarity.</p>
            <button className="client-button mt-3"><span>Get in Touch</span></button>
         </div>

      </div>

      <div className="col-lg-6 mmt40">
              <div className="form-block border mob-t30">
                <div className="form-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="fieldsets row">
                      <div className="col-md-6 mb-3">
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          name="contact_name" 
                          value={formData.contact_name} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          name="contact_email" 
                          value={formData.contact_email} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="fieldsets row">
                      <div className="col-md-6 mb-3">
                        <input 
                          type="text" 
                          placeholder="Contact Number" 
                          name="contact_mobile" 
                          value={formData.contact_mobile} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <select 
                          name="contact_profile" 
                          value={formData.contact_profile} 
                          onChange={handleChange}
                          required
                        >
                          <option value="Select Your Profile" disabled>Select Your Profile</option>
                          <option value="Business">Business</option>
                          <option value="Working Professional">Working Professional</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <input type="text" placeholder="City" name="contact_city" value={formData.contact_city} onChange={handleChange} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input type="text" placeholder="State" name="contact_state" value={formData.contact_state} onChange={handleChange} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input type="text" placeholder="Country" name="contact_country" value={formData.contact_country} onChange={handleChange} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input type="text" placeholder="Nature of Business" name="business" value={formData.business} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="fieldsets d-flex flex-column align-items-center">
                      <button className="client-button mt-3" type="submit" disabled={status.loading}>
                        <span>{status.loading ? "Processing..." : "Let's Connect"}</span>
                      </button>
                      
                      {status.message && (
                        <div className={`mt-3 p-2 rounded small ${status.type === 'success' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                          {status.message}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

   </div>            

</div>

</div>

<div className="contactblocks sec-pad pt-0">

<div className="container">

   <div className="row justify-content-between mt-5">

      <div className="col-lg-6">

         <div className="quickcotact">

            <h2>Contact Details</h2>

            <p className="mt20">B-403, Kanakia Wall Street, Andheri Kurla Road, Chakala <br/>MIDC, Mumbai, India - 400 093 </p><p className="mt10">+91 8655664539 | +91 9326576656 </p><p className="mt10">connect.vallum@vallum.in </p><p className="mt10">www.vallum.in</p>
         </div>
      </div>

      <div className="col-lg-6 mmt40">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.827797267082!2d72.85875567368157!3d19.115208982097435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9213e321aa3%3A0xa293d8a0155390ed!2sVallum%20Capital%20Advisors%20Private%20Limited!5e0!3m2!1sen!2sin!4v1772627530765!5m2!1sen!2sin"  frameBorder="0" allowFullScreen="" style={{border: '0px', pointerEvents: 'none', width: '100%', height: '400px'}}></iframe>
      </div>

   </div>            

</div>

</div>
        </>
  );
}
