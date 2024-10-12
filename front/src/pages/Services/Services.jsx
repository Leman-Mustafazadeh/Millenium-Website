import React, { useState } from "react";
import destinationDetailsImage from "../../assets/img/destination/destination-details.jpg";
import destinationInnerImage from "../../assets/img/destination/destination-inner-1.jpg";
import galleryImage1 from "../../assets/img/gallery/gallery_6_1.jpg";
import galleryImage2 from "../../assets/img/gallery/gallery_6_2.jpg";
import galleryImage3 from "../../assets/img/gallery/gallery_6_3.jpg";
import galleryImage4 from "../../assets/img/gallery/gallery_6_4.jpg";
import breadcrumbBg from "../../assets/img/bg/breadcumb-bg.jpg";
import offerBg from "../../assets/img/bg/widget_bg_1.jpg";
import mapIcon from "../../assets/img/theme-img/map.svg";
import shape1 from "../../assets/img/shape/shape_1.png";
import shape2 from "../../assets/img/shape/shape_2.png";
import shape3 from "../../assets/img/shape/shape_3.png";

const Services = () => {
  const [serviceImage, setServiceImage] = useState(destinationDetailsImage);
  const [description, setDescription] = useState("General Information");

  const handleCategoryClick = (image, desc) => {
    setServiceImage(image);
    setDescription(desc);
  };

  const descriptionContent = {
    "Visa Support": (
      <>
        Support in obtaining electronic visas through the "ASAN Visa" system; <br />
        Support for people who want to travel to Azerbaijan for business purposes in obtaining a work visa and bringing and settling in the country.
      </>
    ),
    "Air Ticket": (
      <>
        Our company cooperates with the biggest airlines and helps to buy tickets to any destination.
      </>
    ),
    "Transfer": (
      <>
        - Car rental and transfer services <br />
        - A friendly and professional team <br />
        - Private car park with about 40 cars to introduce the brand
      </>
    ),
    "Cargo": (
      <>
        Millennium Tourism Azerbaijan also represents the cargo services of Flynas, Jazeera, and Pegasus airlines in Azerbaijan.
      </>
    ),
    "MICE": (
      <>
        Our experts are ready to help you organize the best business trips according to your client's preferences.
      </>
    ),
    "FIAT": (
      <>
        Our company uses all opportunities to professionally fulfill the client's requirements. We can offer exclusive hotel prices and various excursions that may be very interesting and attractive for clients.
      </>
    ),
  };

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
               
                <div className="page-content">
                 
                  <h2 className="box-title">{description}</h2>
                  <p className="box-text mb-30">{descriptionContent[description]}</p>

                  {/* Inner Image */}
                  <div className="service-inner-img mb-40">
                    <img src={destinationInnerImage} alt="Inner Destination" />
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
                    {[
                      { name: "Visa Support", image: "path/to/visaImage.jpg", desc: "Visa Support" },
                      { name: "Air Ticket", image: "path/to/airTicketImage.jpg", desc: "Air Ticket" },
                      { name: "Hotel", image: "path/to/hotelImage.jpg", desc: "Hotel" },
                      { name: "Transfer", image: "path/to/TransferImage.jpg", desc: "Transfer" },
                      { name: "Cargo", image: "path/to/cargoImage.jpg", desc: "Cargo" },
                      { name: "MICE", image: "path/to/miceImage.jpg", desc: "MICE" },
                      { name: "FIAT", image: "path/to/fiatImage.jpg", desc: "FIAT" },
                    ].map((category, index) => (
                      <li key={index}>
                        <a href="#" onClick={() => handleCategoryClick(category.image, category.desc)}>
                          <img src={mapIcon} alt="Map Icon" />
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
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
};

export default Services;
