import React, { useEffect, useState } from 'react';
import "../../../assets/css/style.css";
import "../../../assets/css/app.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/fontawesome.min.css";
import "../../../assets/css/magnific-popup.min.css";
import "../../../assets/css/swiper-bundle.min.css";
import img4 from "../../../assets/img/icon/right-arrow.svg";
import img5 from "../../../assets/img/icon/left-arrow.svg";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';
import controller from '../../../API';
import { endpoints } from '../../../API/constant';

const Hero = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.hero).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="th-hero-wrapper hero-1" id="hero">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* Map through the data array */}
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="hero-inner">
              {/* Assuming item has a 'backgroundImage' field */}
              <div
                className="th-hero-bg"
                style={{ backgroundImage: `url(${item.image})`,backgroundPosition:"center",backgroundSize:"cover" }}
              ></div>
              <div className="container">
                <div className="hero-style1">
                  <h1
                    className="hero-title"
                    data-ani="slideinup"
                    data-ani-delay="0.4s"
                  >
                    {item.name_EN} {/* Assuming item has a 'title' field */}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>
  );
};

export default Hero;
