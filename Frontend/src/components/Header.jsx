import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="logo-wrap">
          
          <img
            src="/DPS-LOGO1.png"
            alt="DPS Professional Tax Services logo"
            className="site-logo"
          />
          <div className="logo-text">
            DPS Professional Tax Services
            <span>Maplewood, NJ · IRS e-file Authorized</span>
          </div>
        </div>

        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/purpose">Purpose</Link>
          <Link to="/how-it-works">Process</Link>
          <Link to="/real-estate-booking">Real Estate</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          
          <Link to="/booking" className="nav-call">Book Now</Link>
          <Link to="/booking#payment" className="nav-call">Payments</Link>



          <a href="tel:+19733272340" className="nav-call">Call Now</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
