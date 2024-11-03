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
      {
        title: "Gabala Adventure Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/b55ce8b829bb77bb9a46.webp",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.7",
        reviewCount: "8 reviews",
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
  Sheki: {
    name: "Sheki",
    description:
      "Shaki (Sheki), a small town in the lower slopes of Greater Caucasus. The main attractions in Shaki, alongside the surrounding forested mountains and snow-topped peaks of Caucasus, are related to the colorful history of the city. The first settlements in the area date back to the Bronze Age, but the present day city was established in 18th century, after floods destroyed the original Shaki. The town, and royal capital was moved to Nukha Fortress, built by Khan Haji Chalabi in year 1772. In early 19th century Shaki flourished as a trade town between caravan routes, and as a silk-weaving town. The walled fortress is well-preserved, and on a stroll in the old town, tourists can visit beautifully restored royal palaces and historical caravanserais.",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/091549b5131d92bff881.jpg",
    tours: [
      {
        title: " Azerbaijan Guided tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/ba1ae0e6ddb33cc11b8f.webp",
        daysNights: "12 Days / 11 Nights",
        reviews: "4.7",
        reviewCount: "15 reviews",
      },
    ],
  },
  Shamakhi: {
    name: "Shamakhi",
    description:
      "Shamakhi is in the east-central Azerbaijan. It is located 76 miles (122 km) west of Baku and is one of the oldest cities in the republic, dating from the 6th century AD, but the modern city was not incorporated until 1824. From the 9th to the 16th century, it was the residence of the Shirvan shahs. There are numerous historical buildings, including a mosque and a mausoleum, which have been damaged by the frequent earthquakes. Şamaxı is now a centre of food industries and is especially noted for wines. A brocaded, flat-stitch carpet with mosaic-tile patterns is produced in the surrounding area",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/e1877fc3f43e1fb6df87.jpg",
    tours: [
      {
        title: "Baku-Shamakhi-Gabala tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/e11936cedb82db81fd88.webp",
        daysNights: "2 Days / 1 Night",
        reviews: "4.5",
        reviewCount: "6 reviews",
      },
      {
        title: "Great Azerbaijan tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/447c35f5e28d0ada8886.webp",
        daysNights: "9 days |8 nights",
        reviews: "4.5",
        reviewCount: "6 reviews",
      },
      {
        title: " Baku-Shamakhi-Gabala tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/e11936cedb82db81fd88.webp",
        daysNights: "7 days | 6 night",
        reviews: "4.5",
        reviewCount: "6 reviews",
      },

      {
        title: "Great Azerbaijan tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/447c35f5e28d0ada8886.webp",
        daysNights: "2 Days / 1 Night",
        reviews: "4.5",
        reviewCount: "6 reviews",
      },
    ],
  },
  Quba: {
    name: "Guba",
    description:
      "Located in the picturesque north-east of Azerbaijan, Guba is a prime destination for experiencing the natural beauty of the Caucasus Mountains. This charming town is surrounded by timeless mountain villages, each with its own distinct culture and traditions, reflecting the diversity of the people who call this region home. Visitors to Guba can immerse themselves in the serene landscapes and breathtaking scenery that make the area perfect for hiking, nature walks, and ecotourism. The rolling hills and mountain trails offer unique opportunities to explore untouched wilderness, making it a haven for adventure enthusiasts and nature lovers alike.Guba also boasts a rich cultural and culinary heritage. The city is known for its delicious local cuisine, with dishes that showcase the area's fresh produce and time-honored recipes passed down through generations. In the surrounding villages, traditional crafts are still very much alive, with local women creating some of the finest handmade carpets in the Caucasus. These intricately woven carpets are renowned for their vibrant colors, detailed patterns, and exceptional craftsmanship, and they reflect centuries of skill and artistry unique to this region.Whether you’re drawn to Guba for its natural beauty, cultural richness, or the welcoming hospitality of its people, this region offers an unforgettable experience for travelers looking to connect with Azerbaijan’s traditional way of life.",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/6934b250101f8ea9be29.jpg",
    tours: [
      {
        title: "Quba Nature Tour ",
        image:
          "https://www.alisontravelgroup.com/uploads/f9e31bb3e378f92eeab1.webp",
        daysNights: "11 Days / 10 Nights",
        reviews: "4.6",
        reviewCount: "12 reviews",
      },
      {
        title: "Quba Nature Tour ",
        image:
          "https://www.alisontravelgroup.com/uploads/f9e31bb3e378f92eeab1.webp",
        daysNights: "11 Days / 10 Nights",
        reviews: "4.6",
        reviewCount: "12 reviews",
      },

      {
        title: "Quba Nature Tour ",
        image:
          "https://www.alisontravelgroup.com/uploads/f9e31bb3e378f92eeab1.webp",
        daysNights: "11 Days / 10 Nights",
        reviews: "4.6",
        reviewCount: "12 reviews",
      },

      {
        title: "Quba Nature Tour ",
        image:
          "https://www.alisontravelgroup.com/uploads/f9e31bb3e378f92eeab1.webp",
        daysNights: "11 Days / 10 Nights",
        reviews: "4.6",
        reviewCount: "12 reviews",
      },
    ],
  },
  Shahdag: {
    name: "Shahdag",
    description:
      "Shahdag is an enchanting destination that feels like stepping into a true winter wonderland. Nestled in the breathtaking Greater Caucasus Mountains, Shahdag is the perfect escape for anyone yearning for the beauty and tranquility of snow-covered landscapes. Imagine vast, pristine white fields stretching as far as the eye can see, kissed by the bright mountain sun. The crisp, refreshing mountain air and serene surroundings provide the ideal antidote to the hustle and bustle of city life, making Shahdag a haven of peace and relaxation.As Azerbaijan’s first ski resort, Shahdag has quickly become a favorite getaway for both locals and visitors alike. Opened in 2012, it offers a wide range of winter sports and activities, from skiing and snowboarding to sledding and snowshoeing, ensuring there’s something for everyone, whether you’re an experienced adventurer or a beginner. With modern facilities, equipment rentals, and well-groomed slopes suitable for all skill levels, Shahdag is the go-to spot for winter sports enthusiasts in AzerbaijanShahdag is also a popular destination for celebrating special occasions, especially during the New Year season. The resort's cozy chalets, luxurious hotels, and scenic views make it an ideal spot for ringing in the New Year or spending a memorable winter weekend with family and friends. ",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/8179236789b95eaca003.webp",
    tours: [
      {
        title: "10-day Azerbaijan nature tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/d5115a501d0dbe62865b.webp",
        daysNights: "10 Days / 9 Nights",
        reviews: "5.0",
        reviewCount: "20 reviews",
      },

      {
        title: "10-day Azerbaijan nature tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/d5115a501d0dbe62865b.webp",
        daysNights: "10 Days / 9 Nights",
        reviews: "5.0",
        reviewCount: "20 reviews",
      },

      {
        title: "10-day Azerbaijan nature tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/d5115a501d0dbe62865b.webp",
        daysNights: "10 Days / 9 Nights",
        reviews: "5.0",
        reviewCount: "20 reviews",
      },
      {
        title: "10-day Azerbaijan nature tour package",
        image:
          "https://www.alisontravelgroup.com/uploads/d5115a501d0dbe62865b.webp",
        daysNights: "10 Days / 9 Nights",
        reviews: "5.0",
        reviewCount: "20 reviews",
      },
    ],
  },
  Ganja: {
    name: "Ganja",
    description:
      "Ganja, the second-largest city in Azerbaijan, is a captivating destination that leaves a lasting impression on its visitors with its rich history, stunning architecture, and vibrant culture. Known for its unique name, Ganja boasts an array of beautiful red brick structures that reflect its historical significance and architectural heritage. The city serves as an excellent base for exploring the stunning natural landscapes nearby, particularly the picturesque lakes of Goygol and Maralgol, both renowned for their serene beauty and recreational opportunities.Ganja is also a significant cultural center, recognized as the birthplace of some of Azerbaijan’s most celebrated literary figures. The renowned poet Nizami Ganjavi, a pivotal figure in Persian literature, hailed from Ganja. His legacy is honored at the Mausoleum of Nizami Ganjavi, located at the city's entrance. This mausoleum has been a site of pilgrimage for centuries, attracting visitors who come to pay their respects to the poet who has had a profound influence on Azerbaijani and Persian literature. Alongside Nizami, Ganja is also the home of the poetess Mahsati Ganjavi and Mirza Shafi Vazeh, often referred to as the sage of Ganja. Their contributions to literature and poetry further enhance the city’s cultural significance.",

    imageUrl:
      "https://www.alisontravelgroup.com/uploads/04c0a5a7eb038a001e1b.webp",
    tours: [
      {
        title: "Ganja Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/4cb5e5a201e125bdb921.webp",
        daysNights: "13 Days / 12 Nights",
        reviews: "4.4",
        reviewCount: "5 reviews",
      },
      {
        title: "Ganja Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/4cb5e5a201e125bdb921.webp",
        daysNights: "13 Days / 12 Nights",
        reviews: "4.4",
        reviewCount: "5 reviews",
      },

      {
        title: "Ganja Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/4cb5e5a201e125bdb921.webp",
        daysNights: "13 Days / 12 Nights",
        reviews: "4.4",
        reviewCount: "5 reviews",
      },
      {
        title: "Ganja Historical Tour",
        image:
          "https://www.alisontravelgroup.com/uploads/4cb5e5a201e125bdb921.webp",
        daysNights: "13 Days / 12 Nights",
        reviews: "4.4",
        reviewCount: "5 reviews",
      },
    ],
  },
  Lankaran: {
    name: "Lankaran",
    description:
      "Lankaran is a fascinating region in southern Azerbaijan, nestled between the serene Caspian Sea and the lush, green Talysh Mountains. Known for its unique natural diversity, Lankaran’s landscapes blend coastal beauty with mountainous terrain, making it a captivating destination for nature lovers. This area is not only rich in scenic beauty but also steeped in history and culture, with a variety of experiences to offer to visitors.The city of Lankaran itself is an ancient port town, once fortified with walls that protected its strategic location on the Caspian coast. Its history dates back centuries, and remnants of the old fortifications still whisper stories of past empires and the city's importance as a trading hub. Walking through Lankaran, you can sense the blend of its historical significance and modern charm. The region also benefits from a subtropical climate, which makes it ideal for agriculture and adds to its lush, green landscapes year-round.Lankaran is also celebrated for its citrus orchards and flavorsome cuisine, which are unique to the region. The mild, humid climate creates ideal conditions for growing lemons, oranges, and other citrus fruits, which are a point of local pride. In fact, Lankaran is often referred to as Azerbaijan’s “citrus capital.” The regional cuisine reflects this abundance, with dishes that incorporate fresh, locally grown ingredients, offering a delicious and distinctive taste of Azerbaijani food.",
    imageUrl:
      "https://www.alisontravelgroup.com/uploads/f7d0b6f6817c5481ac5c.webp",
    tours: [
      {
        title: "Lankaran Coastal Tour",
        image:
          "data:image/jpeg;base64,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",
        daysNights: "3 Days / 2 Nights",
        reviews: "4.8",
        reviewCount: "9 reviews",
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
