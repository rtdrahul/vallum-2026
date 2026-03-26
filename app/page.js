import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhoWeServe from './components/WhoWeServe';
import InvestmentApproach from './components/InvestmentApproach';
import Footer from './components/Footer';
import PMSSection from './components/PMSSection';
import Testimonial from './components/Testimonial';
import Resources from './components/Resources';
import ContactCTA from './components/ContactCTA';

export default function Home() {
  return (
    <>
      
      <Hero />
      
      {/* Floating Stats Bar */}
      <div className="float-bnr">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="floatbox text-white">
                <div className="floatrightbox">
                  <div className="pointswithimganddata col-lg-4">
                    <h2 className="big-info">15+</h2>
                    <p>Years of Experience</p>
                  </div>
                  <div className="pointswithimganddata col-lg-4">
                    <h2 className="big-info">3</h2>
                    <p>Investment Approach</p>
                  </div>
                  {/* <div className="pointswithimganddata col-lg-4">
                    <h2 className="big-info">500+</h2>
                    <p>Investors</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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