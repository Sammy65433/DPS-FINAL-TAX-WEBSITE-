import Layout from "../components/Layout";
import RealtyIntro from "../components/RealtyIntro";
import RealtyBookingForm from "../components/RealtyBookingForm";

function RealEstateBookingPage() {
  return (
    <Layout>
      <RealtyIntro />
      <RealtyBookingForm />
    </Layout>
  );
}

export default RealEstateBookingPage;
