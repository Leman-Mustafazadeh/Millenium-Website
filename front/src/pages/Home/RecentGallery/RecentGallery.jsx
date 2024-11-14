import React from 'react';
import img1 from "../../../assets/img/gallery/gallery_1_1.jpg";
import img2 from "../../../assets/img/gallery/gallery_1_2.jpg";
import img3 from "../../../assets/img/gallery/gallery_1_3.jpg";
import img4 from "../../../assets/img/gallery/gallery_1_4.jpg";
import img5 from "../../../assets/img/gallery/gallery_1_5.jpg";
import img6 from "../../../assets/img/gallery/gallery_1_6.jpg";
import img7 from "../../../assets/img/gallery/gallery_1_7.jpg";
import img8 from "../../../assets/img/shape/line.png"
import img9 from "../../../assets/img/shape/shape_4.png"

import "../../../assets/css/style.css";
import "../../../assets/css/app.min.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/fontawesome.min.css";
import "../../../assets/css/magnific-popup.min.css";
import { useSelector } from 'react-redux';
import { recent } from '../../../i18n';
const RecentGallery = () => {

  const selectedLanguage = useSelector((state) => state.languages.currentLanguage);
  const count = (key) => recent[key]?.[selectedLanguage] || key;
  
  return (
    <div className="gallery-area">
      <div className="container th-container">
        {/* Başlık */}
        <div className="title-area text-center">
          <h2 className="sec-title">{count('recent')}</h2>
          <p className="sec-text">{count('recentgallery')}
              </p>
        </div>
        <div className="row gy-10 gx-10 justify-content-center align-items-center">
          {/* Galeri Öğeleri */}
          <div className="col-md-6 col-lg-2">
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img1} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img1} alt="Gallery 1" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2">
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img2} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img2} alt="Gallery 2" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img3} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img3} alt="Gallery 3" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2">
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img4} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img4} alt="Gallery 4" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2">
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img5} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img5} alt="Gallery 5" className="img-fluid" />
                </a>
              </div>
            </div>
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img6} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img6} alt="Gallery 6" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2">
            <div className="gallery-card">
              <div className="box-img global-img">
                <a href={img7} className="popup-image">
                  <div className="icon-btn">
                    <i className="fal fa-magnifying-glass-plus"></i>
                  </div>
                  <img src={img7} alt="Gallery 7" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Şekil Mockup */}
      <div className="shape-mockup d-none d-xl-block" data-top="-25%" data-left="0%">
        <img src={img8} alt="Shape" />
      </div>
      <div className="shape-mockup movingX d-none d-xl-block" data-top="30%" data-left="3%">
        <img className="gmovingX" src={img9} alt="Shape" />
      </div>
    </div>
  );
}

export default RecentGallery;
