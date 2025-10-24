import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/bg/breadcumb-bg.jpg";
import controller from "../../API";
import { BASE_URL, endpoints } from "../../API/constant";
import "./style.css";
import { useSelector } from "react-redux";
import { ourCompanyteam } from "../../i18n";

const TeamMember = ({ name, position, eMail, imageUrl }) => {
  return (
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-4">
      <div className="team-member-box">
        <div className="team-member-image">
          <img src={BASE_URL+imageUrl} alt={name} />
        </div>
        <div className="team-member-content">
          <h4>{name}</h4>
          <div className="position">{position}</div>
          <div className="email">
            <a href={`mailto:${eMail}`}>{eMail}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    controller
      .getAll(endpoints.team)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setLoading(false);
      });
  }, []);
 console.log(data);
 
  const currentlanguage = useSelector((state) => state.languages.currentLanguage);

  return (
    <div>
      <div
        className="breadcumb-wrapper"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title"> {ourCompanyteam[currentlanguage]}</h1>
          </div>
        </div>
      </div>

             

      <section className="space">
        <div className="container">
          <div className="row gy-4 gx-4 team_hero ">
            {loading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              data?.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member[`fullName_${currentlanguage}`]} 
                  position={member[`position_${currentlanguage}`]} 
                  eMail={member.eMail} 
                  imageUrl={ member.image}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
