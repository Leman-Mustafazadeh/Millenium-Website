import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/img/bg/serviceheadd.jpg';
import controller from '../../API';
import { BASE_URL, endpoints } from '../../API/constant';
import "./style.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { home } from '../../i18n';

const Activities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.activity).then((res) => {
      setData(res);
    });
  }, []);
  const currentlanguage = useSelector((state) => state.languages.currentLanguage);

  const translate = (key) => home[key]?.[currentlanguage] || key;
  return (
    <section>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">{translate('activities')}</h1>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="row acitivit_hero">
            {data?.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <Link to={`/activities-details/${item.id}`}>
                  <ActivityBox
                    image={BASE_URL+item.image}
                    name_EN= {item[`name_${currentlanguage}`]} 
            
                    title_EN= {item[`title_${currentlanguage}`]} 
                    text_EN={item[`text_${currentlanguage}`]} 
                    link={`activities-details/${item.id}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ActivityBox = ({ image, name_EN, title_EN, text_EN, link }) => {
  return (
    <div className="tour-box th-ani">
      <div className="tour-box_img global-img">
        <img src={image} alt={`Image of ${title_EN}`} />
      </div>
      <div className="tour-content">
        <h4><span className="currency">{name_EN}</span></h4>
        <h2 className="box-title"><a href={link}>{title_EN}</a></h2>
      </div>
    </div>
  );
};

export default Activities;
