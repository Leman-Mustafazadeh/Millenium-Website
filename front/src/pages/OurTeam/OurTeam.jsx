import React, { useEffect, useState } from 'react';
import img1 from "../../assets/img/bg/breadcumb-bg.jpg"; // Regular image import
import controller from '../../API';
import { endpoints } from '../../API/constant';

// Component for displaying each team member
const TeamMember = ({ name, position, email, imageUrl }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
      <div className="tour-box th-ani">
        <div className="tour-box_img global-img">
          {/* Ensure image is displayed correctly as a Base64 image */}
          <img src={`data:image/jpeg;base64,${imageUrl}`} alt={`${name}`} />
        </div>
        <div className="tour-content">
          <h4 className="">
            <span className="currency">{name}</span>
          </h4>
          <div className="tour-rating">{position}</div>
          <div className="tour-action">
            <span><i className="fa-light fa-clock"></i><a href="" style={{color:"black"}}> {email}</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component for displaying the team section
const OurTeam = () => {
  const [data, setData] = useState([]);

  // Fetch team data from the API
  useEffect(() => {
    controller.getAll(endpoints.team).then((res) => {
      setData(res); // Set the fetched data to state
    });
  }, []);

  return (
    <div>
      {/* Breadcrumb section */}
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${img1})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Our Team</h1>
          </div>
        </div>
      </div>

      {/* Team members section */}
      <section className="space">
        <div className="container">
          <div className="row gy-24 gx-24">
            {/* Map over the fetched team data and display each member */}
            {data.map((member, index) => (
              <TeamMember
                key={index}
                name={member.fullName_EN}
                position={member.position_EN}
                email={member.eMail}  
                imageUrl={member.image}  
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
