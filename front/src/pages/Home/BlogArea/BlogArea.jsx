import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'; // Pagination modülünü ekleyin
import img1 from "../../../assets/img/shape/shape_1.png"; // Şekil 1 resmi
import img2 from "../../../assets/img/shape/shape_2.png"; // Şekil 2 resmi
import img3 from "../../../assets/img/shape/shape_3.png"; // Şekil 3 resmi
import './style.css'; // CSS dosyanızı burada içe aktarın

// Blog resimleri
import blogImg1 from "../../../assets/img/blog/blog_1_1.jpg"; // Blog 1 Resmi
import blogImg2 from "../../../assets/img/blog/blog_1_2.jpg"; // Blog 2 Resmi
import blogImg3 from "../../../assets/img/blog/blog_1_3.jpg"; // Blog 3 Resmi

const BlogArea = () => {
  return (
    <section className="bg-smoke overflow-hidden space" id="blog-sec">
      <div className="container">
        <div className="mb-30 text-center text-md-start">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-7">
              <div className="title-area mb-md-0">
                <h2 className="sec-title">News & Articles From Tourm</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-area">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="th-slider has-shadow"
          >
            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg1} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg2} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg3} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg1} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg2} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="blog-box th-ani">
                <div className="blog-img global-img">
                  <img src={blogImg3} alt="blog image" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="shape-mockup shape1 d-none d-xxl-block" data-bottom="20%" data-left="2%">
        <img src={img1} alt="shape" />
      </div>
      <div className="shape-mockup shape2 d-none d-xl-block" data-bottom="5%" data-left="2%">
        <img src={img2} alt="shape" />
      </div>
      <div className="shape-mockup shape3 d-none d-xxl-block" data-bottom="12%" data-left="7%">
        <img src={img3} alt="shape" />
      </div>
    </section>
  );
};

export default BlogArea;
