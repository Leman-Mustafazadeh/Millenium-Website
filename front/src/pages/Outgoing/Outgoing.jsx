import React from 'react';
import './style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

const Outgoing = () => {
  const tours = [
    {
      image: "https://www.alisontravelgroup.com/uploads/cea8bd89af7ff1a38e03.avif",
      name: "Georgia Tour",
    },
    {
      image: "https://www.alisontravelgroup.com/uploads/a1c7590700a9730416af.webp",
      name: "Turkey Tour"
    },
    {
      image: "https://www.alisontravelgroup.com/uploads/8b38900a6c5770a65796.webp",
      name: "Russia Tour"
    },   
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShIZCzZyghDDE4cFh7ITqh_7NzLLsfc8SQTg&s",
      name: "Dubai Tour Package"
    },   
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/87d8920a4c24d3c27122f2a795a1c3d7_thumb.jpg",
      name: "Sharm el Sheikh tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/f070efc9ec71e670b79427b1765bf7c9_thumb.jpg",
      name: "Amsterdam Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/c8783141d33b0f9639daf8dca3857d14_thumb.jpg",
      name: "Bosnia and Herzegovina Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/a2b0868630799ba0a409597c3acc5d29_thumb.jpg",
      name: "Montenegro Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/d0721a707ca2c1c8d7d3e09c90fcd395_thumb.jpg",
      name: "Sri Lanka Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/48dfdb10c7d85c7fb8a983d74bba1a47_thumb.jpg",
      name: " Italy Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/36b826f0569e0fca7bae80b3c196b450_thumb.jpg",
      name: "Israel Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/b8137d6d84a7f0db20429462c3ea1108_thumb.jpg",
      name: "Thailand tour"
    },

    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/0ed5246edcfd4899615d115f276773ee_thumb.jpg",
      name: "Excursion around St.Petersburg Tour"
    },


    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/2e6fdbdba20cff6b5a6f0497a24b3aae_thumb.jpg",
      name: "Magical Paris Tour"
    },

    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/f4b16400ad54f9a9314331403fbfbf3c_thumb.jpg",
      name: "Rogaska Tour"
    },

    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/c104163dd7adba790700151656e83898_thumb.jpg",
      name: "Express Tour to Paris"
    },
  ];
  
  return (
    <section className='outgoing'>
      <div className="container">
        <div className="outgoing_head text-center">
          <h1>Outgoing Tours</h1>
          <div className="row">
            {tours.map((tour, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
               <Link to={"/outgoingdetail/" +tour.id}>
               <div className="tour-item text-center">
                  <div className="tour-image">
                    <img src={tour.image} alt={tour.name} className="img-fluid" />
                  </div>
                  <p>{tour.name}</p>
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
