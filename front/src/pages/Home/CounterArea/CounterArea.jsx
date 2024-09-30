import React from 'react';
import img1 from "../../../assets/img/shape/shape_1.png";
import shape2 from "../../../assets/img/shape/shape_2.png";
import shape3 from "../../../assets/img/shape/shape_3.png";
import shape6 from "../../../assets/img/shape/shape_6.png";
import shape5 from "../../../assets/img/shape/shape_5.png";

const CounterArea = () => {
  return (
    <div className="counter-area space">
      <div className="container">
        <div className="row">
          {/* Çalışan Sayısı */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number"><span className="counter-number">170</span></h3>
                <h6 className="counter-title">Employees</h6>
              </div>
            </div>
          </div>

          {/* Alt Ajan Sayısı */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number"><span className="counter-number">500</span></h3>
                <h6 className="counter-title">Sub-Agents</h6>
              </div>
            </div>
          </div>

          {/* Uçak Bileti Sayısı */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number"><span className="counter-number">40000</span></h3>
                <h6 className="counter-title">Flight Tickets</h6>
              </div>
            </div>
          </div>

          {/* Telefon Arama Sayısı */}
          <div className="col-sm-6 col-xl-3 counter-card-wrap">
            <div className="counter-card">
              <div className="counter-shape"><span></span></div>
              <div className="media-body">
                <h3 className="box-number"><span className="counter-number">20000</span></h3>
                <h6 className="counter-title">Phone Calls</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Şekil Mockup */}
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
