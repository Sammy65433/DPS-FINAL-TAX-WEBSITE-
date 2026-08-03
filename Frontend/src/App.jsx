import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import TaxPrep from "./pages/TaxPrep";
import Notary from "./pages/Notary";
import InsuranceServices from "./pages/InsuranceServices";
import CopyFax from "./pages/CopyFax";
import Immigration from "./pages/Immigration";
import Translation from "./pages/Translation";
import AdminPage from "./pages/AdminPage";
import BookingPage from "./pages/BookingPage";
import RealEstateBookingPage from "./pages/RealEstateBookingPage";
import PurposePage from "./pages/PurposePage";
import FAQPage from "./pages/FAQPage";
import MomentsPage from "./pages/MomentsPage";
import HowItWorksPage from "./pages/HowItWorksPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/tax-preparation" element={<TaxPrep />} />
        <Route path="/notary" element={<Notary />} />
        <Route path="/insurance-services" element={<InsuranceServices />} />
        <Route path="/copy-fax" element={<CopyFax />} />
        <Route path="/immigration" element={<Immigration />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/real-estate-booking" element={<RealEstateBookingPage />} />
        <Route path="/purpose" element={<PurposePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/moments" element={<MomentsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
