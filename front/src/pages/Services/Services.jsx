import React, { useEffect, useState } from "react";
import destinationInnerImage from "../../assets/img/destination/servic.jpeg";
import breadcrumbBg from "../../assets/img/bg/serviceheads.jpg";
import offerBg from "../../assets/img/bg/widget_bg_1.jpg";
import mapIcon from "../../assets/img/theme-img/map.svg";
import shape1 from "../../assets/img/shape/shape_1.png";
import shape2 from "../../assets/img/shape/shape_2.png";
import shape3 from "../../assets/img/shape/shape_3.png";
import "./style.css";
import controller from "../../API";
import { endpoints } from "../../API/constant";

const Services = () => {
  const [serviceImage, setServiceImage] = useState(destinationInnerImage);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.servicecategory).then((res) => {
      setServices(res);
    });

    controller.getAll(endpoints.service).then((res) => {
      setDescription(res);
    });
  }, []);

  const handleCategoryClick = (serviceId) => {
    const selected = description.find(
      (item) => item.serviceCategoryId === serviceId
    ); 
    setSelectedService(selected);
    console.log(selected);
    

    if (selected) {
      setServiceImage(selected.image);
    }
  };
  console.log(services);
  console.log(description);
  console.log(selectedService);

  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{ backgroundImage: `url(${breadcrumbBg})` }}
      >
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
                <div className="page-content">
                  {selectedService ? (
                    <div>
                      <h2 className="box-title">{selectedService.name_EN}</h2>
                      <div className="service-inner-img mb-40">
                        <img
                          src={selectedService.image || serviceImage}
                          alt={selectedService.name_EN}
                        />
                      </div>
                      <p className="box-text mb-30">
                        {selectedService.text_EN}
                      </p>

                      
                    </div>
                  ) : (
                    <>
                      <img src={serviceImage} alt="" />
                      {/* <h1>Domestic tourism</h1>
                      <p>
                        Organization of hotels, transport, visa, tourism and
                        migration services by our professional team;
                      </p>
                      <ul>
                        <li>
                          One-day and weekend trips to all regions of
                          Azerbaijan. Historical and ethnographic tours of Baku
                          and its surroundings.
                        </li>
                        <li>Internal religious tours to Azerbaijan.</li>
                        <li>
                          Adventure tours (climbing, jeep tour, fishing and
                          hunting). National cuisine and wine tours.
                        </li>
                      </ul>
                      <h1>Foreign tourism</h1>
                      <p>
                        Optimal organization of business or leisure trips to any
                        foreign country.
                      </p>
                      <ul>
                        <li>
                          Hotel bookings in any country as soon as possible.
                        </li>
                        <li>
                          Organization of recreational and therapeutic tours in
                          local and foreign sanatoriums.
                        </li>
                      </ul> */}
                      <p className="pt-40">Millennium Travel offers a wide range of services to make your travel experiences unforgettable. Our visa services simplify the application process for various countries, providing you with the support you need. With a personalized approach for each client, we assist you at every stage of the visa application, from document preparation to submission.
 <br />
Our transportation services ensure that you travel comfortably and reliably. With airport transfers, car rentals, and other transport options, we provide you with maximum convenience. Our airline ticket sales allow you to compare offers from various airlines to find the best options for you.
<br />
Our cargo services provide excellent solutions for safely and timely shipping your goods. Our F.I.T (Fully Independent Traveler) services help you plan your travel experiences tailored to your interests. Meanwhile, our M.I.C.E services ensure perfect event organization for meetings, conferences, and exhibitions.
<br />
Additionally, our hotel reservations help you choose the most suitable and comfortable accommodations in your destination area. Travel with Millennium Travel, experience new adventures, and make the most of every moment!</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-lg-5">
              <aside className="sidebar-area style3">
                <div className="widget widget_categories">
                  <h3 className="widget_title">Categories</h3>
                  <ul>
                    {services.map((category) => (
                      <li key={category.id}>
                        <a
                          href="javascript:void(0);"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <img src={mapIcon} alt="Map Icon" />
                          {category.name_EN}
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="widget widget_offer"
                  style={{ backgroundImage: `url(${offerBg})` }}
                >
                  <div className="offer-banner">
                    <div className="offer">
                      <h6 className="box-title">
                        Need Help? We Are Here To Help You
                      </h6>
                      <div className="offer">
                        <h6 className="offer-title">You Get Online support</h6>
                        <a className="offter-num" href="tel:+994124975400">
                          +99412 4975400
                        </a>
                      </div>
                      <a href="/contact" className="th-btn style2 th-icon">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div
          className="shape-mockup shape1 d-none d-xxl-block"
          style={{ bottom: "35%", right: "12%" }}
        >
          <img src={shape1} alt="Shape 1" />
        </div>
        <div
          className="shape-mockup shape2 d-none d-xl-block"
          style={{ bottom: "31%", right: "8%" }}
        >
          <img src={shape2} alt="Shape 2" />
        </div>
        <div
          className="shape-mockup shape3 d-none d-xxl-block"
          style={{ bottom: "33%", right: "5%" }}
        >
          <img src={shape3} alt="Shape 3" />
        </div>
      </section>
    </div>
  );
};

export default Services;
