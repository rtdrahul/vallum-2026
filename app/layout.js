import { Cormorant_Garamond, Outfit } from 'next/font/google'
import Script from "next/script";
import 'remixicon/fonts/remixicon.css'

import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UIEffects from "./components/UIEffects";
import CookieConsentBar from "./components/CookieConsentBar";
import UX4GWidget from "./components/UX4GWidget";

// Lazy-load non-critical widget (no SSR needed)

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300','400','500','600'],
    style: ['normal','italic'],
    variable: '--font-display',
    display: 'swap', // ✅ prevents invisible text while font loads
})

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300','400','500','600','700'],
    variable: '--font-body',
    display: 'swap', // ✅ prevents invisible text while font loads
});

async function getSiteSettings() {
  try {
    const res = await fetch("https://badmin.vallum.in/api/setting-data", {
      next: { revalidate: 3600 }, // ✅ ISR: cached + auto-refreshed every hour
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

// ✅ Generate metadata dynamically from API data
export async function generateMetadata() {
  const data = await getSiteSettings();
  return {
    title: data?.site_title ?? "Vallum | Invest With Discipline",
    description: data?.site_description ?? "A research-driven PMS built on GARP and risk discipline.",
  };
}

export default async function RootLayout({ children }) {
  const settingsData = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${outfit.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to Main Content
        </a>

        <main id="main-content">
          <Header settingsData={settingsData} />
          {children}
          <Footer settingsData={settingsData} />
          <CookieConsentBar />
        <UIEffects />
        <UX4GWidget />
        </main>

        
        {/* <AccessibilityWidget /> */}
      </body>
    </html>
  );
}