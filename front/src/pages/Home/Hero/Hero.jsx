import React from 'react';
import "../../../assets/css/style.css";
import "../../../assets/css/app.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/fontawesome.min.css";
import "../../../assets/css/magnific-popup.min.css";
// import "../../assets/css/style.css.map";
import "../../../assets/css/swiper-bundle.min.css";
import img1 from "../../../assets/img/hero/hero_bg_1_1.jpg";
import img2 from "../../../assets/img/hero/hero_bg_1_2.jpg";
import img3 from "../../../assets/img/hero/hero_bg_1_3.jpg";
import img4 from "../../../assets/img/icon/right-arrow.svg";
import img5 from "../../../assets/img/icon/left-arrow.svg";

const Hero = () => {
  return (
    <div className="th-hero-wrapper hero-1" id="hero">
      <div
        className="swiper th-slider hero-slider-1"
        id="heroSlide1"
        data-slider-options='{"effect":"fade","menu": ["", "", ""],"heroSlide1": {"swiper-container": {"pagination": {"el": ".swiper-pagination", "clickable": true }}}}'
      >
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{ backgroundImage: `url(${img1})` }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Travel knows no borders
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{ backgroundImage: `url(${img2})` }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Let’s make your best trip with us
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="hero-inner">
              <div
                className="th-hero-bg"
                style={{ backgroundImage: `url(${img3})` }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    Explore beauty of the whole world
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="th-swiper-custom">
          <button
            data-slider-prev="#heroSlide1"
            className="slider-arrow slider-prev"
          >
            <img src={img5} alt="left arrow" />
          </button>
          <div className="slider-pagination"></div>
          <button
            data-slider-next="#heroSlide1"
            className="slider-arrow slider-next"
          >
            <img src={img4} alt="right arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
