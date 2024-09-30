import React from 'react';
import "../../assets/css/style.css"
import "../../assets/css/app.min.css"
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/fontawesome.min.css"
import "../../assets/css/magnific-popup.min.css"
// import "../../assets/css/style.css.map"
import "../../assets/css/swiper-bundle.min.css"
import  logo from "../../assets/img/logo-mill.jpeg"
const Navbar = () => {
  return (
    <>
    

<div class="th-menu-wrapper onepage-nav">
      <div class="th-menu-area text-center">
        <button class="th-menu-toggle"><i class="fal fa-times"></i></button>
        <div class="mobile-logo">
          <a href="home-travel.html"
            ><img src="assets/img/logo-mill.jpeg" alt="Tourm"
          /></a>
        </div>
        <div class="th-mobile-menu">
          <ul >
            <li >
              <a class="active" href="/">Home</a>
            
            </li>
            <li class="menu-item-has-children">
              <a href="/about">About Us</a>
              <ul class="sub-menu">
                  <li><a href="/about">Our Company</a></li>
                  <li><a href="/ourteam">Our Team</a></li>
                  <li><a href="/award">Awards And Licenses</a></li>

              </ul></li>
            <li class="menu-item-has-children">
              <a href="#">Tours</a>
              <ul class="sub-menu">
                <li><a href="/incoming">Incoming</a></li>
                <li>
                  <a href="destination-details.html">Outgoing Details</a>
                </li>
              </ul>
            </li>

            <li >
              <a href="/activities">Activities</a>
             
            </li>
            <li >
              <a href="/servicies">Services</a>
            </li>
           
           
            <li>
              <a href="/contact">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <header className="th-header header-layout1">
        <div className="header-top">
          <div className=" th-container">
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
            <div className=" th-container">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="header-logo" style={{ width: '100%', height: '90px' }}>
                    <a href="">
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
                      <li>
                        <a  className="active" href="/">Home</a>
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
                          <li><a href="destination-details.html">Outgoing</a></li>
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
                  </nav>
                  <button type="button" className="th-menu-toggle d-block d-xl-none">
                    <i className="far fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="logo-bg" data-mask-src="assets/img/logo_bg_mask.png"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
