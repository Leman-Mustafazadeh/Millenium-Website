import React from 'react';
import CountUp from 'react-countup';
import img1 from "../../../assets/img/shape/shape_1.png";
import shape2 from "../../../assets/img/shape/shape_2.png";
import shape3 from "../../../assets/img/shape/shape_3.png";
import shape6 from "../../../assets/img/shape/shape_6.png";
import shape5 from "../../../assets/img/shape/shape_5.png";
import { counter } from '../../../i18n';
import { useSelector } from 'react-redux';


const CounterArea = () => {
  const selectedLanguage = useSelector((state) => state.languages.currentLanguage);
  const count = (key) => counter[key]?.[selectedLanguage] || key;
  return (
    <div className="counter-area space">
      <div className="container">
        <div className="row">
          {/* Employees */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number">
                  <CountUp start={1} end={170} duration={2.5} className="counter-number" />
                </h3>
                <h6 className="counter-title">{count('employees')}</h6>
              </div>
            </div>
          </div>

          {/* Sub-Agents */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number">
                  <CountUp start={1} end={500} duration={2.5} className="counter-number" />
                </h3>
                <h6 className="counter-title">{count('agent')}</h6>
              </div>
            </div>
          </div>

          {/* Flight Tickets */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number">
                  <CountUp start={1} end={40000} duration={2.5} className="counter-number" />
                </h3>
                <h6 className="counter-title">{count('ticket')}</h6>
              </div>
            </div>
          </div>

          {/* Phone Calls */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number">
                  <CountUp start={1} end={20000} duration={2.5} className="counter-number" />
                </h3>
                <h6 className="counter-title">{count('phone')}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shape Mockups */}
      <div className="shape-mockup shape1 d-none d-xl-block" data-top="30%" data-left="2%">
        <img src={img1} alt="shape" />
      </div>
      <div className="shape-mockup shape2 d-none d-xl-block" data-top="45%" data-left="2%">
        <img src={shape2} alt="shape" />
      </div>
      <div className="shape-mockup shape3 d-none d-xl-block" data-top="32%" data-left="7%">
        <img src={shape3} alt="shape" />
      </div>
      <div className="shape-mockup d-none d-xl-block" data-bottom="0%" data-left="3%">
        <img src={shape6} alt="shape" />
      </div>
      <div className="shape-mockup jump d-none d-xl-block" data-top="5%" data-right="5%">
        <img src={shape5} alt="shape" />
      </div>
    </div>
  );
}

export default CounterArea;
