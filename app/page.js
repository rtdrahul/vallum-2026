import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhoWeServe from './components/WhoWeServe';
import InvestmentApproach from './components/InvestmentApproach';
import Footer from './components/Footer';
import SebiNoticePopup from "./components/SebiNoticePopup";
import PMSSection from './components/PMSSection';
import Testimonial from './components/Testimonial';
import Resources from './components/Resources';
import ContactCTA from './components/ContactCTA';

export default function Home() {
  return (
    <>
      <SebiNoticePopup />
      <Hero />
      <Features />
      <WhoWeServe />
      <PMSSection /> 
      <InvestmentApproach />
      <Testimonial />
      <Resources />
      <ContactCTA />
    </>
  );
}