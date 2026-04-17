import { Cormorant_Garamond, Outfit } from 'next/font/google'
import Script from "next/script";
import 'remixicon/fonts/remixicon.css'

import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";


import Header from "./components/Header";
import Footer from "./components/Footer";
import UIEffects from "./components/UIEffects";
import SebiNoticePopup from "./components/SebiNoticePopup";
import CookieConsentBar from "./components/CookieConsentBar";
import AccessibilityWidget from "./components/AccessibilityWidget";
import UX4GWidget from "./components/UX4GWidget";

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300','400','500','600'],
    style: ['normal','italic'],
    variable: '--font-display',
  })
  const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300','400','500','600','700'],
    variable: '--font-body',
  });

async function getSiteSettings() {
  try {
    const res = await fetch("https://badmin.vallum.in/api/setting-data", {
      cache: "no-store",
    });

    const data = await res.json();

    return data; // return full response

  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export const metadata = {
  title: "Vallum | Invest With Discipline",
  description: "A research-driven PMS built on GARP and risk discipline.",
};

export default async function RootLayout({ children }) {

  const settingsData = await getSiteSettings();

  return (
    <html lang="en">

      <body className={`${cormorant.variable} ${outfit.variable}`}>
        <SebiNoticePopup />
        <main>

          {/* PASS SETTINGS TO HEADER ALSO */}
          <Header settingsData={settingsData} />

          {children}

          <Footer settingsData={settingsData} />

        </main>
        <CookieConsentBar />
        <UIEffects />
        <UX4GWidget />
        {/* <AccessibilityWidget /> */}

        <Script
          src="/assets/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

      </body>

    </html>
  );
}