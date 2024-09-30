import React from 'react';
import destinationDetailsImage from '../../assets/img/destination/destination-details.jpg';
import destinationInnerImage from '../../assets/img/destination/destination-inner-1.jpg';
import galleryImage1 from '../../assets/img/gallery/gallery_6_1.jpg';
import galleryImage2 from '../../assets/img/gallery/gallery_6_2.jpg';
import galleryImage3 from '../../assets/img/gallery/gallery_6_3.jpg';
import galleryImage4 from '../../assets/img/gallery/gallery_6_4.jpg';
import breadcrumbBg from '../../assets/img/bg/breadcumb-bg.jpg';
import offerBg from '../../assets/img/bg/widget_bg_1.jpg';
import mapIcon from '../../assets/img/theme-img/map.svg';
import shape1 from '../../assets/img/shape/shape_1.png';
import shape2 from '../../assets/img/shape/shape_2.png';
import shape3 from '../../assets/img/shape/shape_3.png';

const Services = () => {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${breadcrumbBg})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Services</h1>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="space">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-7">
              <div className="page-single">
                <div className="service-img">
                  <img src={destinationDetailsImage} alt="Destination" />
                </div>
                <div className="page-content">
                  <div className="page-meta mt-50 mb-45">
                    <a className="page-tag">Featured</a>
                    <span className="ratting">
                      <i className="fa-sharp fa-solid fa-star"></i>
                      <span>4.8</span>
                    </span>
                  </div>
                  <h2 className="box-title">General Information</h2>
                  <p className="box-text mb-30">
                    • 6 nights
                    <br />
                    • Time Zone: GMT+4
                    <br />
                    • Language: Official language is Azerbaijani. Russian is widely spoken in the country. English usage is high among the young and the tourism workforce.
                    <br />
                    • International Dialling Codes:
                    <br />
                    994 – Country Code of Azerbaijan
                    <br />
                    12 - City Code of Baku
                    <br />
                    • Emergency Calls:
                    <br />
                    101 – Fire Department
                    <br />
                    102 – Police call center
                    <br />
                    103 – Ambulance
                    <br />
                    919 – Migration Service
                    <br />
                    • Currency, Credit Cards, and Exchange:
                    <br />
                    The official currency in Azerbaijan is the Manat (AZN). Major credit cards are accepted by hotels, restaurants, and shops. Banks will exchange foreign currency and traveller’s cheques with your passport as a proof of identity.
                  </p>

                  {/* Inner Image */}
                  <div className="service-inner-img mb-40">
                    <img src={destinationInnerImage} alt="Inner Destination" />
                  </div>

                  <h2 className="box-title">Highlights</h2>
                  <div className="checklist">
                    <ul>
                      <li>Visit most popular locations in Maldives</li>
                      <li>Buffet Breakfast for all travelers with good quality.</li>
                      <li>Expert guide always provides valuable information.</li>
                      <li>Best Hotels with great food.</li>
                      <li>Help travelers with Money Exchange.</li>
                    </ul>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="destination-gallery-wrapper">
                  <h3 className="page-title mt-30 mb-30">From our gallery</h3>
                  <div className="row gy-4 gallery-row filter-active">
                    {[galleryImage1, galleryImage2, galleryImage3, galleryImage4].map((image, index) => (
                      <div className="col-xxl-auto filter-item" key={index}>
                        <div className="gallery-box style3">
                          <div className="gallery-img global-img">
                            <img src={image} alt={`Gallery ${index + 1}`} />
                            <a href={image} className="icon-btn popup-image">
                              <i className="fal fa-magnifying-glass-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="col-xxl-4 col-lg-5">
              <aside className="sidebar-area style3">
                <div className="widget widget_categories">
                  <h3 className="widget_title">Categories</h3>
                  <ul>
                    {['City Tour', 'Beach Tours', 'Wildlife Tours', 'News & Tips', 'Adventure Tours', 'Mountain Tours'].map((category, index) => (
                      <li key={index}>
                        <a href="blog.html">
                          <img src={mapIcon} alt="Map Icon" />
                          {category}
                        </a>
                        <span>({Math.floor(Math.random() * 10) + 1})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Tags Widget */}
                <div className="widget widget_tag_cloud">
                  <h3 className="widget_title">Popular Tags</h3>
                  <div className="tagcloud">
                    {['Tour', 'Adventure', 'Rent', 'Innovate', 'Hotel', 'Modern', 'Luxury', 'Travel'].map((tag, index) => (
                      <a href="blog.html" key={index}>{tag}</a>
                    ))}
                  </div>
                </div>

                {/* Offer Widget */}
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

        {/* Shape Mockups */}
        <div className="shape-mockup shape1 d-none d-xxl-block" style={{ bottom: '35%', right: '12%' }}>
          <img src={shape1} alt="Shape 1" />
        </div>
        <div className="shape-mockup shape2 d-none d-xl-block" style={{ bottom: '31%', right: '8%' }}>
          <img src={shape2} alt="Shape 2" />
        </div>
        <div className="shape-mockup shape3 d-none d-xxl-block" style={{ bottom: '33%', right: '5%' }}>
          <img src={shape3} alt="Shape 3" />
        </div>
      </section>
    </div>
  );
};

export default Services;
