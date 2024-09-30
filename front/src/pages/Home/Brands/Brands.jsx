import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../assets/css/style.css';

import brand1 from "../../../assets/img/brand/brand_1_1.png";
import brand2 from "../../../assets/img/brand/brand_1_2.png";
import brand3 from "../../../assets/img/brand/brand_1_3.png";
import brand4 from "../../../assets/img/brand/brand_1_4.jpg";
import brand5 from "../../../assets/img/brand/brand_1_5.jpg";
import brand6 from "../../../assets/img/brand/brand_1_6.png";
import brand7 from "../../../assets/img/brand/brand_1_7.png";
import brand8 from "../../../assets/img/brand/brand_1_8.png";
import brand9 from "../../../assets/img/brand/brand_1_9.png";
import brand10 from "../../../assets/img/brand/brand_1_10.png";
import brand11 from "../../../assets/img/brand/brand_1_11.png";
import brand12 from "../../../assets/img/brand/brand_1_12.png";
import brand13 from "../../../assets/img/brand/brand_1_13.png";
import brand14 from "../../../assets/img/brand/brand_1_14.png";
import brand15 from "../../../assets/img/brand/brand_1_15.png";
import brand16 from "../../../assets/img/brand/brand_1_16.png";
import brand17 from "../../../assets/img/brand/brand_1_17.png";
import brand18 from "../../../assets/img/brand/brand_1_18.png";
import brand19 from "../../../assets/img/brand/brand_1_19.jpg";
import brand20 from "../../../assets/img/brand/brand_1_20.png";
import brand21 from "../../../assets/img/brand/brand_1_21.png";
import brand22 from "../../../assets/img/brand/brand_1_22.jpg";
import brand23 from "../../../assets/img/brand/brand_1_23.png";
import brand24 from "../../../assets/img/brand/brand_1_24.png";

const Brands = () => {
  return (
    <div className="brand-area overflow-hidden space-bottom">
      <div className="container th-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand1} alt="Brand Logo" />
                <img className="gray" src={brand1} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand2} alt="Brand Logo" />
                <img className="gray" src={brand2} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand3} alt="Brand Logo" />
                <img className="gray" src={brand3} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand4} alt="Brand Logo" />
                <img className="gray" src={brand4} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand5} alt="Brand Logo" />
                <img className="gray" src={brand5} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand6} alt="Brand Logo" />
                <img className="gray" src={brand6} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand7} alt="Brand Logo" />
                <img className="gray" src={brand7} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand8} alt="Brand Logo" />
                <img className="gray" src={brand8} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand9} alt="Brand Logo" />
                <img className="gray" src={brand9} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand10} alt="Brand Logo" />
                <img className="gray" src={brand10} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand11} alt="Brand Logo" />
                <img className="gray" src={brand11} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand12} alt="Brand Logo" />
                <img className="gray" src={brand12} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand13} alt="Brand Logo" />
                <img className="gray" src={brand13} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand14} alt="Brand Logo" />
                <img className="gray" src={brand14} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand15} alt="Brand Logo" />
                <img className="gray" src={brand15} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand16} alt="Brand Logo" />
                <img className="gray" src={brand16} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand17} alt="Brand Logo" />
                <img className="gray" src={brand17} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand18} alt="Brand Logo" />
                <img className="gray" src={brand18} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand19} alt="Brand Logo" />
                <img className="gray" src={brand19} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand20} alt="Brand Logo" />
                <img className="gray" src={brand20} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand21} alt="Brand Logo" />
                <img className="gray" src={brand21} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand22} alt="Brand Logo" />
                <img className="gray" src={brand22} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand23} alt="Brand Logo" />
                <img className="gray" src={brand23} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="brand-box">
              <a href="#">
                <img className="original" src={brand24} alt="Brand Logo" />
                <img className="gray" src={brand24} alt="Brand Logo" />
              </a>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
