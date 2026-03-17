"use client";
import { useState, useEffect } from "react";

export default function ContactUsClient() {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_mobile: "",
    contact_country: "",
    contact_state: "",
    contact_city: "",
    contact_profile: "",
    contact_approch: "Website Form",
    business: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  // ✅ Load Countries
  useEffect(() => {
    fetch("https://badmin.vallum.in/api/countries-data")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCountries(data.countriesData);
        }
      });
  }, []);

  // ✅ Handle Change (FIXED)
  const handleChange = async (e) => {
  const { name, value } = e.target;

  let updatedForm = { ...formData, [name]: value };

  // Profile logic
  if (name === "contact_profile" && value !== "1" && value !== "2") {
    updatedForm.business = "";
  }

  // Country change
  if (name === "contact_country") {
    updatedForm.contact_state = "";
    updatedForm.contact_city = "";
    setStates([]);
    setCities([]);

    try {
      const res = await fetch(`https://badmin.vallum.in/api/state-data/${value}`);
      const data = await res.json();
      if (data.status === "success") {
        setStates(data.stateData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // State change
  if (name === "contact_state") {
    updatedForm.contact_city = "";
    setCities([]);

    try {
      const res = await fetch(`https://badmin.vallum.in/api/city-data/${value}`);
      const data = await res.json();
      if (data.status === "success") {
        setCities(data.citiesData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  setFormData(updatedForm);
};

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
      message: "Submitting your request...",
      type: "info",
    });

    try {
      const response = await fetch(
        "https://badmin.vallum.in/api/contact-us-process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "success" || response.ok) {
        setStatus({
          loading: false,
          message:
            result.message ||
            "Thank you! Your message has been sent successfully.",
          type: "success",
        });

        // Reset form
        setFormData({
          contact_name: "",
          contact_email: "",
          contact_phonecode: "+91",
          contact_mobile: "",
          contact_country: "",
          contact_state: "",
          contact_city: "",
          contact_profile: "",
          contact_approch: "Website Form",
          business: "",
          contact_message: "",
        });

        setStates([]);
        setCities([]);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setStatus({
        loading: false,
        message:
          error.message || "An error occurred. Please try again later.",
        type: "error",
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
         </div>

      </div>

      <div className="col-lg-6 mmt40">
          <div className="form-block border mob-t30">
            <div className="form-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="fieldsets row">
                  <div className="col-md-6 mb-3">
                    <select 
                      name="contact_profile" 
                      value={formData.contact_profile} 
                      onChange={handleChange}
                      required
                    >
                      <option value="" >Select Visitor Type</option>
                      <option value="1">Prospective Client</option>
                      <option value="2">Distributor / Partner</option>
                      <option value="3">Vendor</option>
                      <option value="4">Internship / Job Candidate</option>
                    </select>
                  </div>
                  {(formData.contact_profile === "1" || formData.contact_profile === "2") && (
                    <div className="col-md-6 mb-3">
                      <select 
                        name="business" 
                        value={formData.business} 
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Investment Strategy</option>
                        <option value="Vallum India Discovery Strategy (VDIS)">
                          Vallum India Discovery Strategy (VIDS)
                        </option>
                        <option value="Vallum J.A.N. Principles">
                          Vallum J.A.N. Principles
                        </option>
                        <option value="Vallum India Multi-Activa">
                          Vallum India Multi-Activa
                        </option>
                      </select>
                    </div>
                  )}
                  </div>
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
                  <div className="col-md-6 mb-3 d-flex gap-0">
                    <select 
                      name="contact_phonecode" 
                      style={{width: '70px',paddingInline: '3px'}}
                      value={formData.contact_phonecode} 
                      onChange={handleChange}
                    >
                      <option value="+91">+91</option>
                      {countries.map((country) => (
                        <option key={country.country_id} value={country.country_phonecode}>
                          {country.country_phonecode}
                        </option>
                      ))}
                    </select>
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
                    name="contact_country" 
                    value={formData.contact_country} 
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.country_id} value={country.country_id}>
                        {country.country_name}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="col-md-6 ">
                    <select 
                    name="contact_state" 
                    value={formData.contact_state} 
                    onChange={handleChange}
                    disabled={!states.length}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="col-md-6 ">
                    <select 
                      name="contact_city" 
                      value={formData.contact_city} 
                      onChange={handleChange}
                      disabled={!cities.length}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <textarea 
                      type="text" 
                      placeholder="Message" 
                      name="contact_message" 
                      value={formData.contact_message} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                 
                </div>

                <div className="fieldsets d-flex flex-column align-items-center">
                  <button className="client-button mt-3 d-block w-100" type="submit" disabled={status.loading}>
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
