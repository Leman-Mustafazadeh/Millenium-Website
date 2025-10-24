import React from "react";
import { useSelector } from "react-redux"; // Import useSelector from redux
import logo from "../../assets/img/logos.jpeg";
import phoneIcon from "../../assets/img/icon/phone.svg";
import envelopeIcon from "../../assets/img/icon/envelope.svg";
import locationIcon from "../../assets/img/icon/location-dot.svg";
import gallery1 from "../../assets/img/widget/gallery_1_1.jpg";
import gallery2 from "../../assets/img/widget/gallery_1_2.jpg";
import gallery3 from "../../assets/img/widget/gallery_1_3.jpg";
import gallery4 from "../../assets/img/widget/gallery_1_4.jpg";
import gallery5 from "../../assets/img/widget/gallery_1_5.jpg";
import gallery6 from "../../assets/img/widget/gallery_1_6.jpg";
import { footer, home } from "../../i18n";

const Footer = () => {
  const selectedLanguage = useSelector(
    (state) => state.languages.currentLanguage
  );

  // Use selected language to get the correct content from the footer object
  const description = footer.description[selectedLanguage];
  const footertitle = footer.footertitle[selectedLanguage];
  const address = footer.address[selectedLanguage];
  // Get the correct home menu links based on selected language
  const homeLink = home.home[selectedLanguage];
  const aboutLink = home.about[selectedLanguage];
  const activitiesLink = home.activities[selectedLanguage];
  const servicesLink = home.services[selectedLanguage];
  const contactLink = home.contact[selectedLanguage];

  return (
    <footer className="footer-wrapper footer-layout1">
      <div className="widget-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget">
                <div className="th-widget-about">
                  <div className="footer-logo">
                    <a href="/">
                      <img
                        src={logo}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                        alt="Tourm"
                      />
                    </a>
                  </div>
                  <p className="about-text">{description}</p>
                  <div className="th-social">
                    <a
                      target="blank"
                      href="https://www.facebook.com/people/Millenium-Tour/61553073116344/"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      target="blank"
                      href="https://www.linkedin.com/company/millennium-tour"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a target="blank" href="https://www.whatsapp.com/">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a
                      target="blank"
                      href="https://www.instagram.com/millenniumtour.az?igsh=c3BiYW5sZWk0YWRj"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">{footertitle}</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <a href="/">{homeLink}</a>
                    </li>
                    <li>
                      <a href="/about">{aboutLink}</a>
                    </li>
                    <li>
                      <a href="/activities">{activitiesLink}</a>
                    </li>
                    <li>
                      <a href="/servicies">{servicesLink}</a>
                    </li>
                    <li>
                      <a href="/contact">{contactLink}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">{address}</h3>
                <div className="th-widget-contact">
                  <div className="info-box_text">
                    <div className="icon">
                      <img src={phoneIcon} alt="Phone Icon" />
                    </div>
                    <div className="details">
                      <p>
                        <a
                          href="tel:+99412 4975400"
                          className="info-box_link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +994 12 497 54 00
                        </a>
                      </p>
                      <p>
                        <a
                          href="tel:+994702219119"
                          className="info-box_link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +994 70 221 91 19
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="info-box_text">
                    <div className="icon">
                      <img src={envelopeIcon} alt="Email Icon" />
                    </div>
                    <div className="details">
                      <p>
                        <a
                          href="mailto:manager@milleniumtour.az"
                          className="info-box_link"
                        >
                          manager@milleniumtour.az
                        </a>
                      </p>
                  
                    </div>
                  </div>
                  <div className="info-box_text">
                    <div className="icon">
                      <img src={locationIcon} alt="Location Icon" />
                    </div>
                    <div className="details">
                      <p>{home.location[selectedLanguage]}</p>
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
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery2} alt="Gallery Image 2" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery3} alt="Gallery Image 3" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery4} alt="Gallery Image 4" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery5} alt="Gallery Image 5" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                  <div className="gallery-thumb">
                    <img src={gallery6} alt="Gallery Image 6" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/"
                      className="gallery-btn"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
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
