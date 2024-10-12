import React, { useEffect, useState } from 'react';
import img1 from "../../assets/img/bg/breadcumb-bg.jpg";
import controller from '../../API';
import { endpoints } from '../../API/constant';

const TeamMember = ({ name, position, email, imageUrl }) => {

  useEffect(()=>{
controller.getAll(endpoints.team).then((res)=>{
  console.log(res);
  
})
  },[])
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
      <div className="tour-box th-ani">
        <div className="tour-box_img global-img">
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <div className="tour-content">
          <h4 className="">
            <span className="currency">{name}</span>
          </h4>
          <div className="tour-rating">{position}</div>
          <div className="tour-action">
            <span><i className="fa-light fa-clock"></i> {email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Ruslan Guliyev",
      position: "Director",
      email: "gmanager@millenniumtour.az",
      imageUrl: "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png"
    },
    {
      name: "Vugar Aliyev",
      position: "Founder",
      email: "vugar@millenniumtour.az",
      imageUrl: "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png"
    },
    {
      name: "Husniya Mammadova",
      position: "Finance Director",
      email: "finance@millenniumtour.az",
      imageUrl: "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png"
    },
    {
      name: "Ruslan Guliyev",
      position: "Director",
      email: "gmanager@millenniumtour.az",
      imageUrl: "https://millenniumtour.az/uploads/images/team/e8b9d52b1bf4be192775956d441cf12f.png"
    },
  ];
  const[data,setData] = useState([])
  useEffect(()=>{
controller.getAll(endpoints.team).then((res)=>{
  setData(res)
})
  },[])

  return (
    <div>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${img1})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Our Team</h1>
          </div>
        </div>
      </div>

      <section className="space">
        <div className="container">
          <div className="row gy-24 gx-24">
            {data.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.fullName_EN}
                position={member.position_EN}
                email={member.email}
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
