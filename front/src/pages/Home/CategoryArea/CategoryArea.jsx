import React, { useEffect, useState } from 'react';
import "../../../assets/css/style.css"; 
import "./style.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import controller from '../../../API';
import { endpoints } from '../../../API/constant';


const CategoryArea = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.gallery).then(async (res) => {
      console.log(res);

      const updatedData = await Promise.all(
        
        res.map(async (item) => {
          return { ...item };
        })
      );
      setData(updatedData);
    });
  }, []);

  return (
    <section className="category-area bg-top-center">
      <div className="container th-container category_container">
        <div className="title-area text-center">
          <h1>Our Categories</h1>
        </div>

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
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src={`data:image/jpeg;base64,${item.image}`} alt={`Category ${index + 1}`} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryArea;
