import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./style.css";
import tourImage1 from "../../../assets/img/tour/tour_box_1.jpg";
import tourImage2 from "../../../assets/img/tour/tour_box_2.jpg";
import tourImage3 from "../../../assets/img/tour/tour_box_3.jpg";
import tourImage4 from "../../../assets/img/tour/tour_box_4.jpg";
import backgroundImg from "../../../assets/img/bg/tour_bg_1.jpg";
import "../../../assets/css/style.css";
import controller from "../../../API";
import { BASE_URL, endpoints } from "../../../API/constant";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { popularTeam } from "../../../i18n";

const ServiceArea = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    controller.getAll(endpoints.tour).then((res) => {
      setPopular(res);
    });
  }, []);
  const currentlanguage = useSelector(
    (state) => state.languages.currentLanguage
  );
  const populars = (key) => popularTeam[key]?.[currentlanguage] || key;
  return (
    <section
      className="position-relative bg-top-center overflow-hidden space"
      id="service-sec"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="title-area text-center">
              <h2 className="sec-title">{populars("populars")}</h2>
              <p className="sec-text">{populars("populartitle")}</p>
            </div>
          </div>
        </div>
        <div className="slider-area tour-slider">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {popular?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link style={{ width: "100%" }} to={"/outgoing"}>
                  {" "}
                  <div className="tour-box th-ani gsap-cursor">
                    <div className="tour-box_img global-img">
                      <img
                        src={BASE_URL+item.image}
                        alt={item[`name_${currentlanguage}`]}
                      />
                    </div>
                    <div className="tour-content">
                      <h3 className="box-title">
                        <a href="tour-details.html">
                          {item[`name_${currentlanguage}`]}{" "}
                        </a>
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
