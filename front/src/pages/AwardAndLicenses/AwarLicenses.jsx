import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/bg/breadcumb-bg.jpg";
import controller from "../../API";
import { BASE_URL, endpoints } from "../../API/constant";
import "./style.css";
import { home } from "../../i18n";
import { useSelector } from "react-redux";

const AwarLicenses = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    controller.getAll(endpoints.award).then((res) => {
      setData(res);
    });
  }, []);
  const selectedLanguage = useSelector((state) => state.languages.currentLanguage)
  const translate = (key) => home[key]?.[selectedLanguage] || key;
  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">{translate('awards_licenses')}</h1>
          </div>
        </div>
      </div>

      <section className="awards_head">
        <div className="container">
          <div className="row gy-24 gx-24 awards_hero">
            {data?.map((imageUrl, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={index}
              >
                <div className="awards-img">
                  <img
                    src={BASE_URL+imageUrl.image}
                    alt={`Award ${index + 1}`}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwarLicenses;
