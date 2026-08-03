import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RealtyPreview from "../components/RealtyPreview";

function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <WhyChoose />
      <HowItWorks />
      <RealtyPreview />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
