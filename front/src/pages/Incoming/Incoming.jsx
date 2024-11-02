import React, { useState } from "react";
import "./style.css";

const destinationsData = {
  Baku: {
    name: "Baku",
    description:
      "Baku, far more than just the capital of Azerbaijan, sits as the historical, cultural and business center of this West Asian country. Aptly nicknamed the City of Winds, Baku’s location on the western shore of the Caspian Sea subjects it to strong winds throughout the year while also gracing the city with gorgeous seaside views. With a population of over 2 million people, Baku is the largest city on the Caspian Sea and in the entire Caucasus region. Baku offers attractions for everybody: Sunny beaches provide a prime spot to unwind, while elegant theaters and quirky museums will satisfy the cultured tourist. Modern architecture creates an otherworldly contrast with Old City quarters, while beautifully designed parks provide the perfect place to unwind in a serene environ. Trendy cafes and nights clubs attract young people, and delicious cuisine will satisfy taste buds of every type. The city offers dozens of pedestrian-friendly streets and entertainment centers for the comfort of its residents and visitors. No matter your age or sphere of interest, Baku’s diversity and festive vibe are hard to resist.",
    imageUrl: "https://alisontravelgroup.com/uploads/86fe41f6d09c15b358f8.webp",
    tours: [
      {
        title: "Baku Shopping Tour Package",
        image:
          "https://www.alisontravelgroup.com/uploads/ee60e4de3d4e8ff2fe99.jpg",
        daysNights: "4 Days / 3 Nights",
        reviews: "5.0",
        reviewCount: "1 review",
      },
      {
        title: "Baku Historical Tour",
        image: "https://alisontravelgroup.com/uploads/d841c7baf3ec1e329f94.jpg",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.8",
        reviewCount: "10 reviews",
      },
      {
        title: "Baku Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/972c040bc1590de1ad1f.jpg",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.8",
        reviewCount: "10 reviews",
      },
      {
        title: "Baku Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/f01dfa516fca67304c9d.jpg",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.8",
        reviewCount: "10 reviews",
      },
    ],
  },
  Gabala: {
    name: "Gabala",
    description:
      "Gabala is considered a popular tourist destination due to the combination of a very good spring climate, woods along the mountains and beautiful nature was exploited by the construction of large numbers of hotels and apartments in city. The city contains “Gabaland” amusement park, There are all conditions for recreation and entertainment for children an ice skating rink Gabala has several shopping malls; the most famous city center mall is Gabala Mall. Tufan Dag Ski Complex, one of the biggest mountain resorts in Caucasus located in Gabala Since 2009, city has been home of Gabala International Music Festival, which included performances from classical and jazz performers Here tourists are available for restaurants and hotel services at a high level.",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/05804b7c5c17fcc4c389.jpeg", 
    tours: [
      {
        title: "Gabala Ski Resort Package",
        image:
          "data:image/jpeg;base64,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",
        daysNights: "5 Days / 4 Nights",
        reviews: "4.9",
        reviewCount: "15 reviews",
      },
      {
        title: "Gabala Adventure Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/b55ce8b829bb77bb9a46.webp",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.7",
        reviewCount: "8 reviews",
      },
    ],
  },
};

const Incoming = () => {
  const [selectedDestination, setSelectedDestination] = useState("Baku");

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <section className="incoming_head">
      <div className="container">
        <div className="incoming">
          <div className="incoming_title">
            <h1 className="incoming_heading1">Azerbaijan Best Travel Tours</h1>
            <p className="incoming_wrap">Discover Azerbaijan</p>

            <div className="incoming_tabs">
              {Object.keys(destinationsData).map((destination) => (
                <button
                  key={destination}
                  className={`incoming_tab ${
                    selectedDestination === destination ? "active" : ""
                  }`}
                  onClick={() => handleDestinationClick(destination)}
                >
                  {destination}
                </button>
              ))}
            </div>

            <div className="row mt-4">
              <div className="col-lg-6 incoming_content">
                <img
                  src={destinationsData[selectedDestination].imageUrl}
                  alt={selectedDestination}
                  className="img-fluid"
                />
              </div>

              <div className="col-lg-6">
                <h2>{destinationsData[selectedDestination].name}</h2>
                <p>{destinationsData[selectedDestination].description}</p>

                {/* <div className="sightseeing_buttons mt-4">
              <div className="row sight_row">
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="https://www.alisontravelgroup.com/uploads/de3c07ce47139a688b4d.svg" alt="Sightseeing tours" />
                    <span>Sightseeing tours</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-day-trips.svg" alt="Day trips" />
                    <span>Day trips</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-historical-places.svg" alt="Historical places" />
                    <span>Historical places</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-transportation.svg" alt="Transportation" />
                    <span>Transportation</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-boat-tours.svg" alt="Boat tours" />
                    <span>Boat tours</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-local-culture.svg" alt="Local culture" />
                    <span>Local culture</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-food-drink.svg" alt="Food & drink" />
                    <span>Food & drink</span>
                  </button>
                </div>
                <div className="col-md-4 col-sm-4 sightseeing-button">
                  <button>
                    <img src="icon-url-for-nature-adventure.svg" alt="Nature & adventure" />
                    <span>Nature & adventure</span>
                  </button>
                </div>
              </div>
            </div> */}
              </div>
            </div>

            <div className="row incoming_slider">
              {destinationsData[selectedDestination].tours.map(
                (tour, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                    <div className="tour-boxs">
                      <div className="tour_img">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="tour-box-image"
                        />
                      </div>
                      <div className="tour-box-content">
                        <div className="tour-box-time">
                          <div>
                            <img
                              src="https://www.alisontravelgroup.com/front_assets/static/assets/svg/iconoir_clock-outline.svg"
                              alt=""
                            />
                          </div>
                          <p>{tour.daysNights}</p>
                        </div>
                        <h4>{tour.title}</h4>
                        <div className="review-section">
                          <span className="stars">
                            ⭐ ⭐ ⭐ ⭐ ⭐ {tour.reviews}
                          </span>
                          <span> ({tour.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incoming;
