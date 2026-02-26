import { Lora, Manrope } from "next/font/google";
import Script from "next/script";
import 'remixicon/fonts/remixicon.css'
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UIEffects from "./components/UIEffects";
import AccessibilityWidget from "./components/AccessibilityWidget";
import UX4GWidget from "./components/UX4GWidget";
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

async function getSiteSettings() {
  try {
    const res = await fetch("https://badmin.vallum.in/api/setting-data", {
    });
    if (!res.ok) return null;
    return res.json();
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
      <body className={`${lora.variable} ${manrope.variable}`}>
        <main>
        <Header />
        {children}
        <Footer settingsData={settingsData} />
        </main>
        <UIEffects />
        <UX4GWidget />
        {/* <AccessibilityWidget></AccessibilityWidget> */}
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}