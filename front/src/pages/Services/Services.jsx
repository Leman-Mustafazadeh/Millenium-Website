import React from 'react';
import destinationDetailsImage from '../../assets/img/destination/destination-details.jpg';
import destinationInnerImage from '../../assets/img/destination/destination-inner-1.jpg';
import galleryImage1 from '../../assets/img/gallery/gallery_6_1.jpg';
import galleryImage2 from '../../assets/img/gallery/gallery_6_2.jpg'; // Updated to match path format
import galleryImage3 from '../../assets/img/gallery/gallery_6_3.jpg'; // Updated to match path format
import galleryImage4 from '../../assets/img/gallery/gallery_6_4.jpg'; // Updated to match path format
import breadcrumbBg from '../../assets/img/bg/breadcumb-bg.jpg'; // Updated to match path format
import offerBg from '../../assets/img/bg/widget_bg_1.jpg'; // Updated to match path format
import mapIcon from '../../assets/img/theme-img/map.svg'; // Updated to match path format
import shape1 from '../../assets/img/shape/shape_1.png'; // Updated to match path format
import shape2 from '../../assets/img/shape/shape_2.png'; // Updated to match path format
import shape3 from '../../assets/img/shape/shape_3.png'; // Updated to match path format



const Services = () => {
  return (
    <div>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${breadcrumbBg})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Services</h1>
          </div>
        </div>
      </div>

      <section className="space">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-7">
              <div className="page-single">
                <div className="service-img"><img src={destinationDetailsImage} alt="Destination" /></div>
                <div className="page-content">
                  <div className="page-meta mt-50 mb-45">
                    <a className="page-tag">Featured</a>
                    <span className="ratting"><i className="fa-sharp fa-solid fa-star"></i><span>4.8</span></span>
                  </div>
                  <h2 className="box-title">Explore the Beauty of Maldives and enjoy</h2>
                  <p className="box-text mb-30">voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    Dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Quis autem vel
                    eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur Quis autem vel eum iure
                    reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                    dolorem eum fugiat quo voluptas nulla pariatur</p>
                  <p className="box-text mb-50">Whether you work from home or commute to a nearby office, the
                    energy-efficient features of your home contribute to a productive and eco-conscious workday.
                    Smart home systems allow you to monitor and control energy usage, ensuring that your
                    environmental impact remains minimal.</p>
                  <div className="service-inner-img mb-40"><img src={destinationInnerImage} alt="Inner Destination" /></div>
                  <h2 className="box-title">Highlights</h2>
                  <div className="checklist">
                    <ul>
                      <li>Visit most popular location of Maldives</li>
                      <li>Buffet Breakfast for all traveler with good quality.</li>
                      <li>Expert guide always guide you and give informations.</li>
                      <li>Best Hotel for all also great food.</li>
                      <li>Helping all traveler for Money Exchange.</li>
                      <li>Buffet Breakfast for all traveler with good quality..</li>
                      <li>Buffet Breakfast for all traveler with good quality.</li>
                    </ul>
                  </div>
                </div>
                <div className="destination-gallery-wrapper">
                  <h3 className="page-title mt-30 mb-30">From our gallery</h3>
                  <div className="row gy-4 gallery-row filter-active">
                    <div className="col-xxl-auto filter-item">
                      <div className="gallery-box style3">
                        <div className="gallery-img global-img">
                          <img src={galleryImage1} alt="Gallery 1" />
                          <a href={galleryImage1} className="icon-btn popup-image"><i className="fal fa-magnifying-glass-plus"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-auto filter-item">
                      <div className="gallery-box style3">
                        <div className="gallery-img global-img">
                          <img src={galleryImage2} alt="Gallery 2" />
                          <a href={galleryImage2} className="icon-btn popup-image"><i className="fal fa-magnifying-glass-plus"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-auto filter-item">
                      <div className="gallery-box style3">
                        <div className="gallery-img global-img">
                          <img src={galleryImage3} alt="Gallery 3" />
                          <a href={galleryImage3} className="icon-btn popup-image"><i className="fal fa-magnifying-glass-plus"></i></a>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-auto filter-item">
                      <div className="gallery-box style3">
                        <div className="gallery-img global-img">
                          <img src={galleryImage4} alt="Gallery 4" />
                          <a href={galleryImage4} className="icon-btn popup-image"><i className="fal fa-magnifying-glass-plus"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-5">
              <aside className="sidebar-area style3">
                <div className="widget widget_categories">
                  <h3 className="widget_title">Categories</h3>
                  <ul>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />City Tour</a>
                      <span>(8)</span>
                    </li>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />Beach Tours</a>
                      <span>(6)</span>
                    </li>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />Wildlife Tours</a>
                      <span>(2)</span>
                    </li>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />News & Tips</a>
                      <span>(7)</span>
                    </li>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />Adventure Tours</a>
                      <span>(9)</span>
                    </li>
                    <li>
                      <a href="blog.html"><img src={mapIcon} alt="Map Icon" />Mountain Tours</a>
                      <span>(10)</span>
                    </li>
                  </ul>
                </div>

                <div className="widget widget_tag_cloud">
                  <h3 className="widget_title">Popular Tags</h3>
                  <div className="tagcloud">
                    <a href="blog.html">Tour</a>
                    <a href="blog.html">Adventure</a>
                    <a href="blog.html">Rent</a>
                    <a href="blog.html">Innovate</a>
                    <a href="blog.html">Hotel</a>
                    <a href="blog.html">Modern</a>
                    <a href="blog.html">Luxury</a>
                    <a href="blog.html">Travel</a>
                  </div>
                </div>

                <div className="widget widget_offer" style={{ backgroundImage: `url(${offerBg})` }}>
                  <div className="offer-banner">
                    <div className="offer">
                      <h6 className="box-title">Need Help? We Are Here To Help You</h6>
                      <div className="offer">
                        <h6 className="offer-title">You Get Online support</h6>
                        <a className="offter-num" href="tel:+994124975400">+99412 4975400</a>
                      </div>
                      <a href="/contact" className="th-btn style2 th-icon">Read More</a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="shape-mockup shape1 d-none d-xxl-block" style={{ bottom: "35%", right: "12%" }}>
          <img src={shape1} alt="Shape 1" />
        </div>
        <div className="shape-mockup shape2 d-none d-xl-block" style={{ bottom: "31%", right: "8%" }}>
          <img src={shape2} alt="Shape 2" />
        </div>
        <div className="shape-mockup shape3 d-none d-xxl-block" style={{ bottom: "33%", right: "5%" }}>
          <img src={shape3} alt="Shape 3" />
        </div>
      </section>
    </div>
  );
}

export default Services;
