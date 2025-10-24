import React from 'react';
import aboutImage1 from '../../../assets/img/normal/about_1_1.jpg';
import aboutImage2 from '../../../assets/img/normal/about_1_2.jpg';
import aboutImage3 from '../../../assets/img/normal/about_1_3.jpg';
import mapIcon from '../../../assets/img/icon/map3.svg';
import guideIcon from '../../../assets/img/icon/guide.svg';
import shape1 from '../../../assets/img/shape/shape_1.png';
import shape2 from '../../../assets/img/shape/shape_2.png';
import shape3 from '../../../assets/img/shape/shape_3.png';
import aboutSlideImg from '../../../assets/img/normal/about-slide-img.png';
import emojiIcon from '../../../assets/img/icon/emoji.png';
import "../../../assets/css/style.css"; // Kendi stilleriniz
import { useSelector } from 'react-redux';
import { plan } from '../../../i18n';

const AboutArea = () => {

  const currentlanguage = useSelector((state) => state.languages.currentLanguage);   
  const plans = (key) => plan[key]?.[currentlanguage] || key;
  return (
    <div className="about-area position-relative overflow-hidden space" id="about-sec">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="img-box1">
              <div className="img1">
                <img src={aboutImage1} alt="About 1" />
              </div>
              <div className="img2">
                <img src={aboutImage2} alt="About 2" />
              </div>
              <div className="img3">
                <img src={aboutImage3} alt="About 3" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ps-xl-4 ms-xl-2">
              <div className="title-area mb-20 pe-xl-5 me-xl-5">
                <h2 className=" mb-20 sec-title  heading pe-xl-5 me-xl-5">{plans('plan')}</h2>
                <p className="sec-text mb-30">
                {plans('plantitle')}
                </p>
              </div>
              <div className="about-item-wrap">
                <div className="about-item">
                  <div className="about-item_img">
                    <img src={mapIcon} alt="Map Icon" />
                  </div>
                  <div className="about-item_content">
                    <h5 className="box-title"> {plans('comfortrip')}</h5>
                    <p className="about-item_text"> {plans('comfortitle')}</p>
                  </div>
                </div>
                <div className="about-item">
                  <div className="about-item_img">
                    <img src={guideIcon} alt="Guide Icon" />
                  </div>
                  <div className="about-item_content">
                    <h5 className="box-title">{plans('professional')}</h5>
                    <p className="about-item_text">
                    {plans('professionaltitle')}                 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shape Mockups */}
      <div className="shape-mockup shape1 d-none d-xl-block" data-top="12%" data-left="2%">
        <img src={shape1} alt="shape" />
      </div>
      <div className="shape-mockup shape2 d-none d-xl-block" data-top="20%" data-left="3%">
        <img src={shape2} alt="shape" />
      </div>
      <div className="shape-mockup shape3 d-none d-xl-block" data-top="14%" data-left="8%">
        <img src={shape3} alt="shape" />
      </div>
      
      <div className="shape-mockup about-shape movingX d-none d-xxl-block" data-bottom="0%" data-right="8%">
        <img src={aboutSlideImg} alt="shape" />
      </div>
      <div className="shape-mockup about-rating d-none d-xxl-block" data-bottom="45%" data-right="2%">
        <i className="fa-sharp fa-solid fa-star"></i><span>4.9k</span>
      </div>
      <div className="shape-mockup about-emoji d-none d-xxl-block" data-bottom="25%" data-right="22%">
        <img src={emojiIcon} alt="emoji" />
      </div>
    </div>
  );
};

export default AboutArea;
