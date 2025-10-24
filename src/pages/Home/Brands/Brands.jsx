import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../assets/css/style.css';
import controller from '../../../API';
import { BASE_URL, endpoints } from '../../../API/constant';
import "./style.css"
const Brands = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.logo).then(async (res) => {

      const updatedData = await Promise.all(
        
        res.map(async (item) => {
          return { ...item };
        })
      );
      setData(updatedData);
    });
  }, []);

  
  
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
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="brand-box">
                <a href="#">
                  <img className="original" src={BASE_URL+item.image} alt="Brand Logo" />
                  <img className="gray" src={BASE_URL+item.image} alt="Brand Logo" />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
