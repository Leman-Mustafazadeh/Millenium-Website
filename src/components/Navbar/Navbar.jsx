import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; // Import NavLink
import { changeLanguage } from "../../services/redux/languages";
import "../../assets/css/style.css";
import "../../assets/css/app.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/fontawesome.min.css";
import "../../assets/css/magnific-popup.min.css";
import "../../assets/css/swiper-bundle.min.css";
import logo from "../../assets/img/logos.jpeg";
import { home } from "../../i18n";
import "./style.css";
import flag1 from "../../assets/img/flag/flag1.png";
import flag2 from "../../assets/img/flag/flag2.webp";
import flag3 from "../../assets/img/flag/flag3.png";
import { Select } from "antd";

const { Option } = Select;
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // Get the selected language from the Redux store
  const selectedLanguage = useSelector(
    (state) => state.languages.currentLanguage
  );

  // Translate function based on the selected language
  const translate = (key) => home[key]?.[selectedLanguage] || key;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLanguageChange = (language) => {
    dispatch(changeLanguage(language)); // Update language in Redux state
  };

  return (
    <>
      {/* Mobile Menu Wrapper */}
      <div className={`th-menu ${isMenuOpen ? "open" : ""}`}>
        <span className="th-menu-close" onClick={toggleMenu}>
          &times; {/* Menü kapatma butonu */}
        </span>
        <ul>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              {translate("home")}
            </NavLink>
          </li>
          <li className="menu-item-has-children">
                        <NavLink to="/about" activeClassName="active">
                          {translate("about")}
                        </NavLink>
                        <ul className="sub-menu">
                          <li>
                            <NavLink to="/about" activeClassName="active">
                              {translate("our_company")}
                            </NavLink>
                          </li>

                          
                          <li>
                            <NavLink to="/ourteam" activeClassName="active">
                              {translate("our_team")}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/award" activeClassName="active">
                              {translate("awards_licenses")}
                            </NavLink>
                          </li>
                        </ul>
                        
                      </li>


                      <li className="menu-item-has-children">
                        <NavLink to="/incoming" activeClassName="active">
                          {translate("tours")}
                        </NavLink>
                        <ul className="sub-menu">
                          <li>
                            <NavLink to="/incoming" activeClassName="active">
                              {translate("incoming")}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/outgoing" activeClassName="active">
                              {translate("outgoing")}
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <NavLink to="/activities" activeClassName="active">
                          {translate("activities")}
                        </NavLink>
                      </li>
          <li>
            <NavLink to="/services" onClick={toggleMenu}>
              {translate("services")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleMenu}>
              {translate("contact")}
            </NavLink>
          </li>

                     
                      <li>
                        <NavLink to="/servicies" activeClassName="active">
                          {translate("services")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" activeClassName="active">
                          {translate("contact")}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/activities" activeClassName="active">
                          {translate("activities")}
                        </NavLink>
                      </li>
        </ul>
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
                      <span>{translate("location")}</span>
                    </li>
                    <li className="d-none d-xl-inline-block">
                      <i className="fa-regular fa-clock"></i>
                      <span>{translate("open")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Language Selector */}
              <div className="col-auto lang">
                <div className="">
                  <Select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="selectflags"
                    style={{ width: 120 }}
                  >
                    <Option
                      value="AZ"
                      className={selectedLanguage === "AZ" ? "active" : ""}
                    >
                      <div className="">
                        <img
                          src={flag1}
                          alt="Azerbaijani"
                          className="flag-icon"
                        />
                        AZ
                      </div>
                    </Option>
                    <Option
                      value="EN"
                      className={selectedLanguage === "EN" ? "active" : ""}
                    >
                      <div className="">
                        <img src={flag2} alt="English" className="flag-icon" />
                        EN
                      </div>
                    </Option>
                    <Option
                      value="RU"
                      className={selectedLanguage === "RU" ? "active" : ""}
                    >
                      <div className="flag-icon-wrapper">
                        <img src={flag3} alt="Russian" className="flag-icon" />
                        RU
                      </div>
                    </Option>
                  </Select>
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
                  <div
                    className="headers-logos"
                    style={{ width: "100%", height: "90px" }}
                  >
                    <a href="/">
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                        src={logo}
                        alt="Tourm"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-auto me-xl-auto">
                  <nav className="main-menu d-none d-xl-inline-block">
                    <ul
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <li>
                        <NavLink exact to="/" activeClassName="active">
                          {translate("home")}
                        </NavLink>
                      </li>
                      <li className="menu-item-has-children">
                        <NavLink to="/about" activeClassName="active">
                          {translate("about")}
                        </NavLink>
                        <ul className="sub-menu">
                          <li>
                            <NavLink to="/about" activeClassName="active">
                              {translate("our_company")}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/ourteam" activeClassName="active">
                              {translate("our_team")}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/award" activeClassName="active">
                              {translate("awards_licenses")}
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <NavLink to="/incoming" activeClassName="active">
                          {translate("tours")}
                        </NavLink>
                        <ul className="sub-menu">
                          <li>
                            <NavLink to="/incoming" activeClassName="active">
                              {translate("incoming")}
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/outgoing" activeClassName="active">
                              {translate("outgoing")}
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <NavLink to="/activities" activeClassName="active">
                          {translate("activities")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/servicies" activeClassName="active">
                          {translate("services")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" activeClassName="active">
                          {translate("contact")}
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                  <button
                    type="button"
                    className="th-menu-toggle d-block d-xl-none"
                    onClick={toggleMenu}
                  >
                    <i className={isMenuOpen ? "far fa-times" : "far fa-bars"}></i>
                  </button>

                </div>
              </div>
            </div>
            <div
              className="logo-bg"
              data-mask-src="assets/img/logo_bg_mask.png"
            ></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
