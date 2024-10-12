import React, { useState } from 'react';
import "../../assets/css/style.css";
import "../../assets/css/app.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/fontawesome.min.css";
import "../../assets/css/magnific-popup.min.css";
import "../../assets/css/swiper-bundle.min.css";
import logo from "../../assets/img/logo-mill.jpeg";

const Navbar = () => {
  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Wrapper */}
      <div className={`th-menu-wrapper onepage-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="th-menu-area text-center">
          <button className="th-menu-toggle" onClick={toggleMenu}>
            <i className="fal fa-times"></i>
          </button>
          <div className="mobile-logo">
            <a href="/">
              <img src={logo} alt="Tourm" />
            </a>
          </div>
          <div className="th-mobile-menu">
            <ul>
              <li>
                <a className="active" href="/">Home</a>
              </li>
              <li className="menu-item-has-children">
                <a href="/about">About Us</a>
                <ul className="sub-menu">
                  <li><a href="/about">Our Company</a></li>
                  <li><a href="/ourteam">Our Team</a></li>
                  <li><a href="/award">Awards And Licenses</a></li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Tours</a>
                <ul className="sub-menu">
                  <li><a href="/incoming">Incoming</a></li>
                  <li><a href="/outgoing">Outgoing</a></li>
                </ul>
              </li>
              <li>
                <a href="/activities">Activities</a>
              </li>
              <li>
                <a href="/servicies">Services</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <header className="th-header header-layout1">
        <div className="header-top">
          <div className="th-container">
            <div className="row justify-content-center justify-content-xl-between align-items-center">
              <div className="col-auto d-none d-md-block">
                <div className="header-links">
                  <ul>
                    <li className="d-none d-xl-inline-block">
                      <i className="fa-sharp fa-regular fa-location-dot"></i>
                      <span>492, I.Gutgashinli str. , AZ1073 Baku, Republic of Azerbaijan</span>
                    </li>
                    <li className="d-none d-xl-inline-block">
                      <i className="fa-regular fa-clock"></i>
                      <span>Monday to Friday: 09:30 am - 18:00 pm</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-auto">
                <div className="header-right">
                  <div className="currency-menu">
                    <select className="form-select nice-select" defaultValue="USD">
                      <option value="USD">USD</option>
                      <option value="CNY">CNY</option>
                      <option value="EUR">EUR</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky-wrapper">
          <div className="menu-area">
            <div className="th-container">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="header-logo" style={{ width: '100%', height: '90px' }}>
                    <a href="/">
                      <img
                        style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                        src={logo}
                        alt="Tourm"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-auto me-xl-auto">
                  <nav className="main-menu d-none d-xl-inline-block">
                    <ul style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <li><a className="active" href="/">Home</a></li>
                      <li className="menu-item-has-children">
                        <a href="/about">About Us</a>
                        <ul className="sub-menu">
                          <li><a href="/about">Our Company</a></li>
                          <li><a href="/ourteam">Our Team</a></li>
                          <li><a href="/award">Awards And Licenses</a></li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Tours</a>
                        <ul className="sub-menu">
                          <li><a href="/incoming">Incoming</a></li>
                          <li><a href="/outgoing">Outgoing</a></li>
                        </ul>
                      </li>
                      <li><a href="/activities">Activities</a></li>
                      <li><a href="/servicies">Services</a></li>
                      <li><a href="/contact">Contact us</a></li>
                    </ul>
                  </nav>
                  <button type="button" className="th-menu-toggle d-block d-xl-none" onClick={toggleMenu}>
                    <i className="far fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="logo-bg" data-mask-src="assets/img/logo_bg_mask.png"></div>
          </div>
        </div>
      </header>

      {/* Additional CSS to handle the mobile menu visibility */}
      <style jsx>{`
        .th-menu-wrapper {
          display: none;
        }

        .th-menu-wrapper.open {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 999;
        }

        .th-mobile-menu {
          background-color: #fff;
          padding: 20px;
          width: 80%;
          margin: 0 auto;
        }

        .th-menu-toggle {
          cursor: pointer;
          font-size: 24px;
        }

        @media (max-width: 1200px) {
          .th-menu-wrapper {
            display: none;
          }

          .th-menu-wrapper.open {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
