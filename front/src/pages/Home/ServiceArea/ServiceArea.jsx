import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

// Resimleri içe aktar
import tourImage1 from '../../../assets/img/tour/tour_box_1.jpg';
import tourImage2 from '../../../assets/img/tour/tour_box_2.jpg';
import tourImage3 from '../../../assets/img/tour/tour_box_3.jpg';
import tourImage4 from '../../../assets/img/tour/tour_box_4.jpg';
import backgroundImg from '../../../assets/img/bg/tour_bg_1.jpg'; // Arka plan resmi
import '../../../assets/css/style.css'; // Kendi stilleriniz

const ServiceArea = () => {
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
              <h2 className="sec-title">Most Popular Tour</h2>
              <p className="sec-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
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
            {/* Tour 1 */}
            <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage1} alt="Greece Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Greece Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Tour 2 */}
            <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage2} alt="Italy Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Italy Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Tour 3 */}
            <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage3} alt="Dubai Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Dubai Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Tour 4 */}
            <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage4} alt="Switzerland Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Switzerland Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
    {/* Tour 2 */}
    <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage2} alt="Italy Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Italy Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Tour 3 */}
            <SwiperSlide>
              <div className="tour-box th-ani gsap-cursor">
                <div className="tour-box_img global-img">
                  <img src={tourImage3} alt="Dubai Tour Package" />
                </div>
                <div className="tour-content">
                  <h3 className="box-title"><a href="tour-details.html">Dubai Tour Package</a></h3>
                  <div className="tour-rating">
                    <div className="star-rating" role="img" aria-label="Rated 5.00 out of 5">
                      <span style={{ width: '100%' }}>Rated <strong className="rating">5.00</strong> out of 5 based on <span className="rating">4.8</span> (4.8 Rating)</span>
                    </div>
                    <a href="tour-details.html" className="woocommerce-review-link">(<span className="count">4.8</span> Rating)</a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
