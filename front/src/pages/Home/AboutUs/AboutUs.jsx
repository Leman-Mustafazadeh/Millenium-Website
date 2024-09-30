import React from 'react';
import aboutUsImage from '../../../assets/img/bg/breadcumb-bg.jpg'; // Resmin yolu

const AboutUs = () => {
  return (
    <div>
      {/* Breadcrumb Wrapper */}
      <div 
        className="breadcumb-wrapper" 
        style={{ 
          backgroundImage: `url(${aboutUsImage})`, 
          height: '300px', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Our Company</h1>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="container">
        <div style={{ margin: '100px 0' }}>
          <h2 style={{ textAlign: 'center' }}>Millennium Tourism</h2>
          <p>
            Millennium Tourism & Congress DMC LLC is one of the leading Azerbaijani Tourism Agencies locally and internationally. Since 2006, we are actively participating in the Tourism Industry and are advocates of sustainable and responsible Tourism Development. We are members of UNWTO, IATA, Lufthansa City Center Franchisee (Top Performer of 2017), ETOA (European Tour Operators Association) which connects us to 650 agencies Worldwide with unlimited possibilities. We also have a dedicated and passionate team that provides unique experiences to each traveler. With offices in Baku (Azerbaijan), we ensure to be closer to our travelers worldwide. The main directions of our company are incoming and outgoing tourism and MICE.
          </p>
          <p>
            “Millennium Tourism & Congress DMC” LLC is the only company in Azerbaijan that is a member of ETOA. ETOA (European Tour Operators Association) is the leading trade association for tour operators and suppliers with business in European destinations. Over 900 members contribute more than €12bn of business within Europe and include tour and online operators, intermediaries and wholesalers; European tourist boards, hotels, attractions, and other tourism suppliers. “Millennium Tourism & Congress DMC” LLC is a member of ATAA (Association of Travel Agencies of Azerbaijan). The Association, which has been operating since 2018, is currently one of the largest non-governmental organizations providing training and development solutions for the tourism and hotel sector in Azerbaijan. It includes more than 100 travel agencies and more than 80 hotel complexes.
          </p>
          <p>
            MICE tourism: Our specialists are ready to help you in organizing business trips as per your clients' preferences. 
            FIT tourism: Our company uses all opportunities to meet the customers’ requirements in the best way. We can offer exclusive prices in hotels and various excursions that can be very interesting and attractive for clients.
          </p>
          <p>
            Our Company is the GSA of Air Arabia in Azerbaijan. Air Arabia, the Middle East and North Africa's first and largest Low Cost Carrier (LCC). Air Arabia flies over 155 destinations spread across the Middle East, North Africa, Asia, and Europe. We are the only DMC partner in Azerbaijan that provides rates and services for holidays.airarabia.com online system. Air Arabia Holidays is a subsidiary of the Middle East and North Africa’s largest Low Cost Carrier, Air Arabia. Air Arabia Holidays allows you to tailor-make your own vacation package and choose what to include like hotels, transfers, and tours.
          </p>
          <p>
            From 01.01.2019, we will become the Air Arabia Cargo representative office in Azerbaijan. In addition to providing air transportation to passengers, Air Arabia also provides cargo services with a set mission to remain the most innovative, the most creative, and the most secure in order to provide customers with best practices, best services, and best tools for cargo business. Air Arabia’s vision is to be the leading cargo trendsetter in the Air Cargo Industry. The carrier operates cargo to more than 50 destinations throughout the network and is in a state of continuous growth. One of the major products handled by Air Arabia is express products which suit the carrier’s operation.
          </p>
          <p>
            Our Company is also the GSA of ISR AIR in Azerbaijan. Israir Airlines Ltd. is an Israeli airline headquartered in Tel Aviv. It operates domestic scheduled and air taxi flights from Sde Dov Airport, Ben Gurion International Airport, and Eilat Airport, as well as international charter services from Ben Gurion International Airport to Europe and Asia.
          </p>
          <p>
            Our achievements include: 2008 – “The best tourism company of the year”, 2010 – “Award of the year”, 2010 - “The first national award in tourism sphere”, 2011 – “The second national award in tourism sphere”, 2016 - The highest award for his contribution to the development of tourism in the region, 2017- LCC top performer in 2017. Member of JATA, ASTA, ABTA, IATA, SKAL, AZTA.
          </p>
          <p>
            The company is mostly engaged in the services related to the Incoming Tourism Department. We offer such tourism services as: individual tours, VISA-support service, regional & city tours, professional English, Russian, Arabic, Turkish, Hebrew language speaking guides, excursions, transfer/transport service, car rentals, treatment tours to local sanatoriums & health improvement centers, hotel reservations, air ticket sales to all destinations, MICE, and more.
          </p>
          <p>
            As outgoing tourism, we organize treatment, vocational, cultural, religious, and honeymoon tours to many different destinations worldwide.
          </p>
          <p>
            In addition, our company regularly takes part in international tourism fairs both in Azerbaijan and abroad (Russia, Israel, Ukraine, Kazakhstan, Georgia, Great Britain, Germany, Turkey, France, South Korea, Dubai, etc.), which allows us to communicate, establish new connections, and share our experience with international companies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
