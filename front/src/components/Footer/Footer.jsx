import React from 'react';
import logo from '../../assets/img/logo-mill.jpeg';
import phoneIcon from '../../assets/img/icon/phone.svg';
import envelopeIcon from '../../assets/img/icon/envelope.svg';
import locationIcon from '../../assets/img/icon/location-dot.svg';
import gallery1 from '../../assets/img/widget/gallery_1_1.jpg';
import gallery2 from '../../assets/img/widget/gallery_1_2.jpg';
import gallery3 from '../../assets/img/widget/gallery_1_3.jpg';
import gallery4 from '../../assets/img/widget/gallery_1_4.jpg';
import gallery5 from '../../assets/img/widget/gallery_1_5.jpg';
import gallery6 from '../../assets/img/widget/gallery_1_6.jpg';

const Footer = () => {
  return (
    <footer className="footer-wrapper footer-layout1">
      <div className="widget-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget">
                <div className="th-widget-about">
                  <div className="about-logo" style={{ width: '90%', height: '90px' }}>
                    <a href="home-travel.html">
                      <img src={logo} style={{ width: '100%', height: '100%', borderRadius: '10px' }} alt="Tourm" />
                    </a>
                  </div>
                  <p className="about-text">
                    Millennium tourism, the leading Azerbaijan travel agency, we outdo at helping you get your trip planned. Not just a trip, but exceptional trips filled with exciting and life-enriching experiences.
                  </p>
                  <div className="th-social">
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.whatsapp.com/"><i className="fab fa-whatsapp"></i></a>
                    <a href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Quick Links</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/servicies">Our Service</a></li>
                    <li><a href="/contact">Terms of Service</a></li>
                    <li><a href="/contact">Tour Booking Now</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">Address</h3>
                <div className="th-widget-contact">
                  <div className="info-box_text">
                    <div className="icon">
                      <img src={phoneIcon} alt="Phone Icon" />
                    </div>
                    <div className="details">
                      <p>
                        <a href="tel:+99412 4975400" className="info-box_link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          +99412 4975400
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="info-box_text">
                    <div className="icon">
                      <img src={envelopeIcon} alt="Email Icon" />
                    </div>
                    <div className="details">
                      <p><a href="mailto:mailinfo00@tourm.com" className="info-box_link">manager@milleniumtour.az</a></p>
                      <p><a href="mailto:support24@tourm.com" className="info-box_link">team@milleniumtour.az</a></p>
                    </div>
                  </div>
                  <div className="info-box_text">
                    <div className="icon"><img src={locationIcon} alt="Location Icon" /></div>
                    <div className="details">
                      <p>492, I.Gutgashinli str. , AZ1073 Baku, Republic of Azerbaijan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <div className="sidebar-gallery">
                  <div className="gallery-thumb">
                    <img src={gallery1} alt="Gallery Image 1" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery2} alt="Gallery Image 2" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery3} alt="Gallery Image 3" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery4} alt="Gallery Image 4" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery5} alt="Gallery Image 5" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery6} alt="Gallery Image 6" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="gallery-btn"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
