import React from 'react';
import img1 from "../../../assets/img/bg/category_bg_1.png"; // Arka plan resmi
import img2 from "../../../assets/img/category/category_1_1.jpg";
import img3 from "../../../assets/img/category/category_1_2.jpg";
import img4 from "../../../assets/img/category/category_1_3.jpg";
import img5 from "../../../assets/img/category/category_1_4.jpg";
import img6 from "../../../assets/img/category/category_1_5.jpg";
import "../../../assets/css/style.css"; // Kendi stilleriniz

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// Resim dizisi
const images = [
  img2,
  img3,
  img4,
  img5,
  img6,
  img2,
  img3,
  img4,
  img5,
  img6,
];

const CategoryArea = () => {
  return (
    <section
      className="category-area bg-top-center"
      style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover' }} // Arka plan resmi
    >
      <div className="container th-container">
        <div className="title-area text-center">
          <h2 className="section-title">Our Categories</h2> {/* Başlık ekleyin */}
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
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="category-card single">
                <div className="box-img global-img">
                  <img src={src} alt={`Category ${index + 1}`} />
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
