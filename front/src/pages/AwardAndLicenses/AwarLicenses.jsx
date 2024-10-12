import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/bg/breadcumb-bg.jpg"; 
import controller from "../../API";
import { endpoints } from "../../API/constant";

const AwarLicenses = () => {
  const awardImages = [
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
    "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png",
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    controller.getAll(endpoints.award).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Awards & Licenses</h1>
          </div>
        </div>
      </div>

      <section className="space">
        <div className="container">
          <div className="row gy-24 gx-24">
            {awardImages.map((imageUrl, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"  
                key={index}
              >
                <div className="tour-box th-ani">
                  <div className="tour-box_img global-img">
                    <img src={imageUrl} alt={`Award ${index + 1}`} className="img-fluid" /> 
                  </div>
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
