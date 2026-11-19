import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
