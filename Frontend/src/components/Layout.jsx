import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import DPSChatWidget from "./DPSChatWidget";

function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <DPSChatWidget />
    </>
  );
}

export default Layout;
