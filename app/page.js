import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import Hero from './components/Hero';
import Features from './components/Features';
import SebiNoticePopupWrapper from './components/SebiNoticePopupWrapper'; // ✅ use wrapper

const WhoWeServe         = dynamic(() => import('./components/WhoWeServe'));
const InvestmentApproach = dynamic(() => import('./components/InvestmentApproach'));
const PMSSection         = dynamic(() => import('./components/PMSSection'));
const Testimonial        = dynamic(() => import('./components/Testimonial'));
const Resources          = dynamic(() => import('./components/Resources'));
const ContactCTA         = dynamic(() => import('./components/ContactCTA'));

export default function Home() {
  return (
    <>
      <SebiNoticePopupWrapper />

      <Hero />
      <Features />

      <Suspense fallback={null}><WhoWeServe /></Suspense>
      <Suspense fallback={null}><PMSSection /></Suspense>
      <Suspense fallback={null}><InvestmentApproach /></Suspense>
      <Suspense fallback={null}><Testimonial /></Suspense>
      <Suspense fallback={null}><Resources /></Suspense>
      <Suspense fallback={null}><ContactCTA /></Suspense>
    </>
  );
}