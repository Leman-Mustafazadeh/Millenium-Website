import React, { useEffect, useState } from 'react';
import './style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';
import controller from '../../API';
import { BASE_URL, endpoints } from '../../API/constant';
import { useSelector } from 'react-redux';
import { outGoing } from '../../i18n';

const Outgoing = () => {
  const currentlanguage = useSelector(
    (state) => state.languages.currentLanguage
  );

  
  const[outgoing,setOutgoing]=useState([])
  useEffect(()=>{
    controller.getAll(endpoints.outgoing).then((res)=>{
      setOutgoing(res)
    })
  },[])
  console.log(outgoing);
  
  return (
    <section className='outgoing'>
      <div className="container">
        <div className="outgoing_head text-center">
          <h1> {outGoing[currentlanguage]}</h1>
          <div className="row outgoing_hero">
            {outgoing.map((tour, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
               <Link to={"/outgoingdetail/" +tour.id}>
               <div className="tour-item text-center">
                  <div className="tour-image">
                    <img src={BASE_URL+tour.image} alt= {tour[`name_${currentlanguage}`]} className="img-fluid" />
                  </div>
                  <p> {tour[`name_${currentlanguage}`]}</p>  
                </div>
               </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outgoing;
