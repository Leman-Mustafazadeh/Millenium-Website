import React from 'react';
import './style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

const Outgoing = () => {
  const tours = [
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/87d8920a4c24d3c27122f2a795a1c3d7_thumb.jpg",
      name: "Sharm el Sheikh Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/f070efc9ec71e670b79427b1765bf7c9_thumb.jpg",
      name: "Amsterdam Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/48dfdb10c7d85c7fb8a983d74bba1a47_thumb.jpg",
      name: "Tour Italy"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/36b826f0569e0fca7bae80b3c196b450_thumb.jpg",
      name: "New York Tour"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/another_image_3.jpg",
      name: "Tour to Israel"
    },
    {
      image: "https://millenniumtour.az/uploads/images/catalogs_products/d0721a707ca2c1c8d7d3e09c90fcd395_thumb.jpg",
      name: "Sri Lanka Tour"
    }
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
