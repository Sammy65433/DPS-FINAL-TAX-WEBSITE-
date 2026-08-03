import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Languages from "../components/Languages";
import Purpose from "../components/Purpose";
import WhyChoose from "../components/WhyChoose";
import Booking from "../components/Booking";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
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
      {/* <Purpose /> */}
      <WhyChoose />
      <HowItWorks />
      {/* <Booking /> */}
      <RealtyPreview />
      <FAQ />
      {/* <Gallery /> */}
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
