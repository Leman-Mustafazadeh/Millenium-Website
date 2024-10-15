import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/img/bg/breadcumb-bg.jpg'; // Background image path
import controller from '../../API';
import { endpoints } from '../../API/constant';
import "./style.css"
const Activities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.activity).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <section>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Activities</h1>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="row">
            <div>
              <div className="row">
                {data.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <ActivityBox
                      image={item.image} // Dynamic image from API
                      name_EN={item.name_EN} // Dynamic name from API
                      title_EN={item.title_EN} // Dynamic title from API
                      text_EN={item.text_EN} // Dynamic description from API
                      link={`activities-details/${item.id}`} // Dynamic link to details page
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ActivityBox Component for reusability
const ActivityBox = ({ image, name_EN, title_EN, text_EN, link }) => {
  return (
    <div className="tour-box th-ani">
      <div className="tour-box_img global-img">
        <img src={image} alt={`Image of ${title_EN}`} />
      </div>
      <div className="tour-content">
        <h4 className=""><span className="currency">{name_EN}</span></h4>
        <h2 className="box-title"><a href={link}>{title_EN}</a></h2>
        <div className="tour-action">
          <span><i className="fa-light fa-clock"></i>{text_EN}</span>
        </div>
      </div>
    </div>
  );
};

export default Activities;
