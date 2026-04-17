"use client";
import { useState, useEffect, useCallback, useMemo } from "react";


/* ─────────── Flag emoji from 2-letter ISO ─────────── */
function toFlag(iso) {
  if (!iso || iso.length !== 2) return "🌐";
  return iso.toUpperCase().split("").map(c =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  ).join("");
}

/* ─────────────────────────────────────────
   Pure validation — OUTSIDE the component
   so it never causes re-creation
───────────────────────────────────────── */
function validateField(name, value, formData, hasStates) {
  switch (name) {
    case "contact_name":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 2) return "Minimum 2 characters required";
      return "";
    case "contact_email":
      if (!value.trim()) return "Email address is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address";
      return "";
    case "contact_mobile":
    value = value.trim().replace(/\s/g, "");

    // Remove leading 0 if first digit is 0
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    if (!value) return "Contact number is required";

    if (!/^\d{9,12}$/.test(value)) {
      return "Enter a valid mobile number (9–12 digits)";
    }

    return "";
    case "contact_profile":
      if (!value) return "Please select your visitor type";
      return "";
    case "contact_message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 20)
        return `At least 20 characters required (${value.trim().length}/20)`;
      return "";
    case "contact_country":
      if (!value) return "Country is required";
      return "";
    case "contact_state":
      if (hasStates && !value) return "State is required";
      return "";
    default:
      return "";
  }
}

/* ─────────── Inline field-error (NOT a wrapper) ─────────── */
function FieldError({ show, msg }) {
  if (!show || !msg) return null;
  return (
    <div className="vc-field-error">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
      </svg>
      {msg}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
export default function ContactUsClient() {

  const [countries, setCountries] = useState([]);
  const [states,    setStates]    = useState([]);
  const [cities,    setCities]    = useState([]);
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});

  const [form, setForm] = useState({
    contact_name:      "",
    contact_email:     "",
    contact_phonecode: "+91",
    contact_phoneflag: "IN",
    contact_mobile:    "",
    contact_profile:   "",   // "1"–"8"
    others_visitor:    "",   // optional, shown when profile="8"
    business:          "",   // optional, shown when profile="1"|"2"
    contact_message:   "",
    contact_country:   "",
    contact_state:     "",
    contact_city:      "",
    contact_approch:   "Website Form",
  });

  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const visitorOptions = [
    { value: "1", label: "Individual" },
    { value: "2", label: "Wealth Manager / Advisor" },
    { value: "3", label: "Distributor / Partner" },
    { value: "4", label: "Institutional / Family Office" },
    { value: "5", label: "Existing Investor" },
    { value: "6", label: "Media" },
    { value: "7", label: "Exploring Opportunities" },
    { value: "8", label: "Others" },
  ];

  // Backend expects contact_profile in:1,2,3,4
  const profileToBackend = { "1":"1","2":"2","3":"2","4":"3","5":"1","6":"4","7":"4","8":"4" };

  /* ─── Progress ─── */
  const requiredKeys = useMemo(() => {
    const base = ["contact_name","contact_email","contact_mobile","contact_profile","contact_message","contact_country"];
    if (states.length) base.push("contact_state");
    return base;
  }, [states.length]);

  const progress = useMemo(() => {
    const n = requiredKeys.filter(k => (form[k] || "").trim() !== "").length;
    return Math.round((n / requiredKeys.length) * 100);
  }, [form, requiredKeys]);

  /* ─── Load countries ─── */
  useEffect(() => {
    fetch("https://badmin.vallum.in/api/countries-data")
      .then(r => r.json())
      .then(d => { if (d.status === "success") setCountries(d.countriesData); })
      .catch(() => {});
  }, []);

  /* ─── Handlers ───
     KEY FIX for issue #4:
     Use functional setForm(prev => ...) so these callbacks
     never need `form` in their dependency array and never
     get re-created, which would unmount/remount inputs.
  ─── */
  const handleChange = useCallback(async (e) => {
    const { name, value } = e.target;

    if (name === "contact_country") {
      setForm(p => ({ ...p, contact_country: value, contact_state: "", contact_city: "" }));
      setStates([]); setCities([]);
      if (value) {
        try {
          const r = await fetch(`https://badmin.vallum.in/api/state-data/${value}`);
          const d = await r.json();
          if (d.status === "success") setStates(d.stateData);
        } catch {}
      }
      setTouched(p => ({ ...p, contact_country: true }));
      setErrors(p => ({ ...p, contact_country: value ? "" : "Country is required" }));
      return;
    }

    if (name === "contact_state") {
      setForm(p => ({ ...p, contact_state: value, contact_city: "" }));
      setCities([]);
      if (value) {
        try {
          const r = await fetch(`https://badmin.vallum.in/api/city-data/${value}`);
          const d = await r.json();
          if (d.status === "success") setCities(d.citiesData);
        } catch {}
      }
      return;
    }

    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => {
      if (!touched[name]) return p;
      return { ...p, [name]: validateField(name, value, form, states.length > 0) };
    });
  // touched & form are read but we don't want re-creation on every keystroke
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.length]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validateField(name, value, form, states.length > 0) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, states.length]);

  const handlePhoneCode = useCallback((e) => {
    const opt = e.target.options[e.target.selectedIndex];
    setForm(p => ({
      ...p,
      contact_phonecode: opt.value,
      contact_phoneflag: opt.dataset.iso || "",
    }));
  }, []);

  const handleRadio = useCallback((value) => {
    setForm(p => ({
      ...p,
      contact_profile: value,
      others_visitor:  value !== "8" ? "" : p.others_visitor,
      business:        (value !== "1" && value !== "2") ? "" : p.business,
    }));
    setTouched(p => ({ ...p, contact_profile: true }));
    setErrors(p => ({ ...p, contact_profile: "" }));
  }, []);

  /* ─── Submit ─── */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Validate all required fields at once
    const requiredSet = ["contact_name","contact_email","contact_mobile","contact_profile","contact_message","contact_country","contact_state"];
    const newErrors = {};
    requiredSet.forEach(k => {
      newErrors[k] = validateField(k, form[k] || "", form, states.length > 0);
    });
    setErrors(newErrors);
    setTouched(Object.fromEntries(requiredSet.map(k => [k, true])));
    if (Object.values(newErrors).some(v => v)) return;

    setStatus({ loading: true, message: "Submitting your request…", type: "info" });

    const payload = {
      contact_name:      form.contact_name,
      contact_email:     form.contact_email,
      contact_phonecode: form.contact_phonecode,
      contact_mobile:    form.contact_mobile,
      contact_profile:   profileToBackend[form.contact_profile] || "4",
      contact_message:   form.contact_message,
      contact_country:   form.contact_country,
      contact_state:     form.contact_state,
      contact_city:      form.contact_city,
      contact_approch:   form.contact_approch,
      business:          form.business,
    };

    try {
      const res    = await fetch("https://badmin.vallum.in/api/contact-us-process", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.status === "success" || res.ok) {
        setStatus({ loading: false, message: result.message || "Thank you! We'll be in touch shortly.", type: "success" });
        setForm({ contact_name:"",contact_email:"",contact_phonecode:"+91",contact_phoneflag:"IN",contact_mobile:"",contact_profile:"",others_visitor:"",business:"",contact_message:"",contact_country:"",contact_state:"",contact_city:"",contact_approch:"Website Form" });
        setTouched({}); setErrors({}); setStates([]); setCities([]);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      setStatus({ loading: false, message: err.message || "An error occurred. Please try again.", type: "error" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, states.length]);

  /* ─── CSS class helpers ─── */
  const ic = (n) => `vc-input${touched[n] ? (errors[n] ? " error" : " valid") : ""}`;
  const sc = (n) => `vc-select${touched[n] ? (errors[n] ? " error" : " valid") : ""}`;

  const showStrategy  = form.contact_profile === "1" || form.contact_profile === "2";
  const showOthers    = form.contact_profile === "8";
  const statesLoaded  = states.length > 0;
  const citiesLoaded  = cities.length > 0;

  const flagEmoji = toFlag(form.contact_phoneflag || "IN");

  return (
    <div className="vc-contact-root">

      {/* Hero */}
      <section className="vc-hero">
        <div className="vc-hero-inner">
          <div className="vc-eyebrow">Vallum Capital Advisors</div>
          <h1>Let's Have a<br /><em>Thoughtful Conversation</em></h1>
          <p>Choosing an investment manager is a long-term decision. We welcome a measured discussion — no obligation, only clarity.</p>
        </div>
      </section>

      {/* Main */}
      <section>
        <div className="vc-main">

          {/* Left panel */}
          <div className="vc-info-panel">
            <p className="vc-info-tagline">Begin with a<br /><em>single conversation.</em></p>
            <p className="vc-info-desc">If you'd like to understand how we work, ask questions, or explore alignment — we're here. Every inquiry is handled with discretion and care.</p>
            <div className="vc-divider" />
            <div className="vc-contact-cards">
              {[
                {
                  label:"Office",
                  value:"B-403, Kanakia Wall Street, Andheri Kurla Road,\nChakala MIDC, Mumbai — 400 093",
                  icon:<><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></>,
                },
                {
                  label:"Phone",
                  value:"+91 8655664539",
                  icon:<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>,
                },
                {
                  label:"Email",
                  value:"connect.vallum@vallum.in",
                  icon:<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                },
              ].map(c => (
                <div key={c.label} className="vc-contact-card">
                  <div className="vc-card-icon"><svg viewBox="0 0 24 24">{c.icon}</svg></div>
                  <div>
                    <p className="vc-card-label">{c.label}</p>
                    <p className="vc-card-value" style={{whiteSpace:"pre-line"}}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="vc-form-card">
            <div className="vc-form-header">
              <p className="vc-form-header-title">Send Us a Message</p>
              <span className="vc-form-header-badge">Secure Form</span>
            </div>

            <div className="vc-form-body">
              <div className="vc-progress-wrap">
                <div className="vc-progress-bar">
                  <div className="vc-progress-fill" style={{width:`${progress}%`}} />
                </div>
                <p className="vc-progress-label">{progress}% complete</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>

                {/* ── Visitor Type ── */}
                <div className="vc-section-label">Enquiry Type</div>
                <div className="vc-row vc-row-1" style={{marginBottom:20}}>
                  <div className="vc-field">
                    <div className="vc-radio-group">
                      {visitorOptions.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`vc-radio-pill${form.contact_profile === opt.value ? " selected" : ""}`}
                          onClick={() => handleRadio(opt.value)}
                        >
                          <span className="vc-radio-dot" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <FieldError show={touched.contact_profile} msg={errors.contact_profile} />
                  </div>
                </div>

                {/* Conditional: Investment Strategy (optional) for profile 1 & 2 */}
                <div className={`vc-conditional${showStrategy ? " open" : ""}`}>
                  <div className="vc-cond-inner">
                    <div className="vc-field">
                      <label className="vc-label">Investment Strategy <span className="vc-opt">(optional)</span></label>
                      <select className="vc-select" name="business" value={form.business} onChange={handleChange}>
                        <option value="">Select Strategy</option>
                        <option value="Vallum India Discovery Strategy (VDIS)">Vallum India Discovery Strategy (VIDS)</option>
                        <option value="Vallum J.A.N. Principles">Vallum J.A.N. Principles</option>
                        <option value="Vallum India Multi-Activa">Vallum India Multi-Activa</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Conditional: Others specify (optional) for profile 8 */}
                <div className={`vc-conditional${showOthers ? " open" : ""}`}>
                  <div className="vc-cond-inner">
                    <div className="vc-field">
                      <label className="vc-label">Please specify <span className="vc-opt">(optional)</span></label>
                      <input
                        className="vc-input"
                        name="others_visitor"
                        value={form.others_visitor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Describe your visitor type"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Personal Details ── */}
                <div className="vc-section-label" style={{marginTop:8}}>Your Details</div>
                <div className="vc-row vc-row-2">
                  <div className="vc-field">
                    <label className="vc-label">Full Name <span className="vc-required">*</span></label>
                    <input
                      className={ic("contact_name")}
                      name="contact_name"
                      value={form.contact_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    <FieldError show={touched.contact_name} msg={errors.contact_name} />
                  </div>
                  <div className="vc-field">
                    <label className="vc-label">Email Address <span className="vc-required">*</span></label>
                    <input
                      className={ic("contact_email")}
                      type="email"
                      name="contact_email"
                      value={form.contact_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    <FieldError show={touched.contact_email} msg={errors.contact_email} />
                  </div>
                </div>

                <div className="vc-row vc-row-2">
                  {/* Phone with flag + code */}
                  <div className="vc-field">
                    <label className="vc-label">Phone Number <span className="vc-required">*</span></label>
                    <div className="vc-phone-group">
                      <div className="vc-phone-flag-wrap">
                        <div className="vc-phone-flag-display">
                          <span className="pflag">{flagEmoji}</span>
                          <span className="pcode">{form.contact_phonecode}</span>
                          <span className="parrow">▼</span>
                        </div>
                        {/* Invisible native select overlays the display */}
                        <select
                          className="vc-phone-flag-select"
                          value={form.contact_phonecode}
                          onChange={handlePhoneCode}
                          aria-label="Country code"
                        >
                          <option value="+91" data-iso="IN">🇮🇳 IN +91 — India</option>
                          {countries.map(c => (
                            <option
                              key={c.country_id}
                              value={c.country_phonecode}
                              data-iso={c.country_sortname || ""}
                            >
                              {c.country_sortname
                                ? `${toFlag(c.country_sortname)} ${c.country_sortname} ${c.country_phonecode} — ${c.country_name}`
                                : `${c.country_phonecode} — ${c.country_name}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        className={`vc-input vc-phone-input${touched.contact_mobile ? (errors.contact_mobile ? " error" : " valid") : ""}`}
                        type="number"
                        name="contact_mobile"
                        value={form.contact_mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="XXXXX XXXXX"
                        maxLength={12}
                        inputMode="numeric"
                        autoComplete="tel"
                      />
                    </div>
                    <FieldError show={touched.contact_mobile} msg={errors.contact_mobile} />
                  </div>

                  {/* Country */}
                  <div className="vc-field">
                    <label className="vc-label">Country <span className="vc-required">*</span></label>
                    <select
                      className={sc("contact_country")}
                      name="contact_country"
                      value={form.contact_country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c.country_id} value={c.country_id}>{c.country_name}</option>
                      ))}
                    </select>
                    <FieldError show={touched.contact_country} msg={errors.contact_country} />
                  </div>
                </div>

                <div className="vc-row vc-row-2">
                  {/* State: required only when states are loaded */}
                  <div className="vc-field">
                    <label className="vc-label">
                      State{" "}
                      {statesLoaded
                        ? <span className="vc-required">*</span>
                        : <span className="vc-opt">(optional)</span>}
                    </label>
                    <select
                      className={sc("contact_state")}
                      name="contact_state"
                      value={form.contact_state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!statesLoaded}
                    >
                      <option value="">{statesLoaded ? "Select State" : "Select country first"}</option>
                      {states.map(s => <option key={s.state_id} value={s.state_id}>{s.state_name}</option>)}
                    </select>
                    <FieldError show={touched.contact_state} msg={errors.contact_state} />
                  </div>

                  {/* City: always optional */}
                  <div className="vc-field">
                    <label className="vc-label">City <span className="vc-opt">(optional)</span></label>
                    <select
                      className="vc-select"
                      name="contact_city"
                      value={form.contact_city}
                      onChange={handleChange}
                      disabled={!citiesLoaded}
                    >
                      <option value="">{citiesLoaded ? "Select City" : "Select state first"}</option>
                      {cities.map(c => <option key={c.cities_id} value={c.cities_id}>{c.cities_name}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── Message ── */}
                <div className="vc-section-label" style={{marginTop:8}}>Your Message</div>
                <div className="vc-row vc-row-1">
                  <div className="vc-field">
                    <label className="vc-label">Message <span className="vc-required">*</span></label>
                    <textarea
                      className={`vc-textarea${touched.contact_message ? (errors.contact_message ? " error" : " valid") : ""}`}
                      rows={4}
                      name="contact_message"
                      value={form.contact_message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Share your thoughts, questions, or any specific context you'd like us to know…"
                    />
                    <p className={`vc-char-count${form.contact_message.length > 0 && form.contact_message.length < 20 ? " warn" : ""}`}>
                      {form.contact_message.length} chars
                      {form.contact_message.length > 0 && form.contact_message.length < 20
                        ? ` — ${20 - form.contact_message.length} more needed`
                        : form.contact_message.length >= 20 ? " ✓" : " (min 20)"}
                    </p>
                    <FieldError show={touched.contact_message} msg={errors.contact_message} />
                  </div>
                </div>

                {/* Submit */}
                <button className="vc-submit-btn" type="submit" disabled={status.loading}>
                  <div className="vc-submit-inner">
                    {status.loading
                      ? <><div className="vc-spinner" /> Processing…</>
                      : <><span className="vc-submit-line" />Let's Connect<span className="vc-submit-line" /></>}
                  </div>
                </button>

                {status.message && (
                  <div className={`vc-alert vc-alert-${status.type === "success" ? "success" : "error"}`}>
                    <svg className="vc-alert-icon" viewBox="0 0 20 20" fill="currentColor">
                      {status.type === "success"
                        ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                        : <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>}
                    </svg>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="vc-map-section">
        <div className="vc-map-inner">
          <div className="vc-map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.827797267082!2d72.85875567368157!3d19.115208982097435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9213e321aa3%3A0xa293d8a0155390ed!2sVallum%20Capital%20Advisors%20Private%20Limited!5e0!3m2!1sen!2sin!4v1772627530765!5m2!1sen!2sin"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Vallum Capital Office"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
