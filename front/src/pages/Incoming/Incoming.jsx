import React from 'react';
import hy from '../../assets/img/incoming/hy.jpg';
import './style.css'; // Assuming this is your custom stylesheet

const daysData = [
  {
    day: "Day 1",
    activities: [
      "Arrival at Airport",
      "Transfer from Airport to Hotel",
      "Accommodation in Hotel. Leisure time",
      "Assembly at hotel Lobby for Panoramic tour. Visit to Highland Park, Alley of Martyrs, The National Assembly (Milli Majlis), Flame Towers—the tallest skyscraper in Baku.",
      "Back to Hotel",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 2",
    activities: [
      "Breakfast in hotel",
      "Excursion to Gobustan. In 2007, Gobustan was declared a UNESCO World Heritage Site. It is renowned for its rock art engravings, cultural evidence, and historical significance.",
      "Excursion to Mud volcanoes. The mud volcanoes at Dashgil, near the Gobustan Reserve, are popular for their geological features and significance in Zoroastrianism.",
      "Old City (Inner City) Tour. The most ancient part of Baku, classified as a UNESCO World Heritage Site.",
      "Visit Nizami Street for shopping, one of Baku's most famous streets.",
      "Visit Fountains Square, a public square known for its numerous fountains and lively atmosphere.",
      "Back to Hotel",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 3",
    activities: [
      "Breakfast in Hotel",
      "Tour starts with Ateshgah (Fire Worshippers Temple). Based on Persian and Indian inscriptions, the temple was used as a Hindu and Zoroastrian place of worship.",
      "Trip to 'Fire Mountain' - Yanardag, located 25 km north of Baku on the Absheron Peninsula. Azerbaijan is known as the 'land of fire.'",
      "Tour continues with a visit to the iconic Heydar Aliyev Center, a masterpiece of modern architecture designed by Zaha Hadid. (Photoshoot outside)",
      "Back to Hotel",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 4",
    activities: [
      "Breakfast in Hotel",
      "Proceed to Departure to Guba in the north-west of Azerbaijan",
      "Observation of Beshbarmag Mountain on the way",
      "Arrival in Guba. City tour includes visits to the oldest parts of the city, Old Mosques, hamams, and the city bazaar.",
      "Quba tours will reveal one of the most beautiful cities and carpet weaving centers of Azerbaijan. Many tourists choose the Gyachresh area to relax in the shady woods.",
      "Return to Baku",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 5",
    activities: [
      "Breakfast in Hotel",
      "Tour in Gabala",
      "Excursion at Tufandag Winter-Summer Tourism Complex, which offers cable car rides year-round.",
      "Nohur Lake, located in Gabala, is a beautiful destination where you can enjoy stunning views and even take a small boat voyage.",
      "Back to Baku",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 6",
    activities: [
      "Breakfast in Hotel",
      "Boulevard tour - Baku Boulevard is a breezy promenade hugging the Baku seafront.",
      "Continues shopping tour with Ganjlik Mall - Located just 10 minutes from the city center.",
      "Back to Hotel",
      "Overnight at Hotel"
    ]
  },
  {
    day: "Day 7",
    activities: [
      "Breakfast in Hotel",
      "Departure to Airport for return flight",
      "Thank you, we are looking forward to welcoming you in Baku"
    ]
  }
];

const Incoming = () => {
  return (
    <section className="incoming-section">
      <div className="container">
        {daysData.map((dayData, index) => (
         <>
            <button className="btn-day1">{dayData.day}</button>
          <div className="row incoming-image-wrapper mt-4" key={index}>

            {/* Image Columns */}
            {[...Array(4)].map((_, imgIndex) => (
              <div className="col-12 col-md-3 mb-4" key={imgIndex}>
                <img src={hy} alt={`Incoming feature ${imgIndex + 1}`} className="incoming-image img-fluid" />
              </div>
            ))}

            {/* Day Text Block */}
            <div className="col-12">
              <div className="text-content mt-2">
                <ul>
                  {dayData.activities.map((activity, activityIndex) => (
                    <li key={activityIndex}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
         </>
        ))}
      </div>
    </section>
  );
};

export default Incoming;
