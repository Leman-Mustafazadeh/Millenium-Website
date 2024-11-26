import React, { useEffect, useState } from "react";
import "./style.css";
import controller from "../../API";
import { BASE_URL, endpoints } from "../../API/constant";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Awards, Awardstitle, incomingword } from "../../i18n";

const Incoming = () => {
  const [incoming, setIncoming] = useState([]);
  const [incomingbox, setIncomingBox] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(incoming[0]);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  useEffect(() => {
   setSelectedDestination(incoming[0]);
  }, [incoming]);

  useEffect(() => {
    controller
      .getAll(endpoints.categoryincoming)
      .then((res) => {
        setIncoming(res);
      })
      .catch((err) => console.log(err));

    controller
      .getAll(endpoints.incoming)
      .then((res) => {
        console.log(res, "res");

        setIncomingBox(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const currentlanguage = useSelector(
    (state) => state.languages.currentLanguage
  );
  const selectedDestinationData = incomingbox?.filter(
    (item) => item.serialNumber === selectedDestination?.id
  ); 
  return (
    <section className="incoming_head">
      <div className="container">
        <div className="incoming">
          <div className="incoming_title">
            <h1 className="incoming_heading1">{Awards[currentlanguage]}</h1>
            <p className="incoming_wrap"> {Awardstitle[currentlanguage]}</p>
            <div className="incoming_tabs">
              {incoming?.map((item, index) => (
                <button
                  key={index}
                  className={`incoming_tab ${
                    selectedDestination?.id === item?.id ? "active" : ""
                  }`}
                  onClick={() => handleDestinationClick(item)}
                >
                  {item[`name_${currentlanguage}`]}
                </button>
              ))}
            </div>

           
            <div className="row mt-4">
              {selectedDestination ? (
                <>
                  <div className="col-lg-6 incoming_content">
                    <img
                      src={BASE_URL + selectedDestination.image}
                      alt={selectedDestination.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-lg-6">
                    <h2>{selectedDestination[`name_${currentlanguage}`]} </h2>
                    <p>{selectedDestination[`text_${currentlanguage}`]} </p>
                  </div>

                  <h1 className="seesight">{incomingword[currentlanguage]}</h1>
                  <div className="row incoming_slider">
                    {selectedDestinationData?.map((tour, index) => (
                    <div  className="incoming_hero col-lg-3 col-md-6 col-sm-12">
                        <Link to={"/incomingdetail/" + tour.id}>
                        <div
                          key={index}
                        >
                          <div className="tour-boxs">
                            <div className="tour_img">
                              <img
                                src={BASE_URL+tour.image}
                                alt="dhdhhd"
                                className="tour-box-image"
                              />
                            </div>
                            <div className="tour-box-content">
                              <div className="tour-box-time">
                               
                                {/* <div
                                  dangerouslySetInnerHTML={{
                                    __html: tour[`text_${currentlanguage}`],
                                  }}
                                /> */}
                              </div>
                              <h4>{tour[`name_${currentlanguage}`]} </h4>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    ))}
                  </div>
                </>
              ) : (
                <p>No data available for this destination.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incoming;
