import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { BASE_URL, endpoints } from '../../API/constant';
import controller from '../../API';
import { useSelector } from 'react-redux';

const IncomingDetail = () => {
  const [getData, setGetData] = useState({
    name_EN: '',
    text_EN: '',
    inComingImages: [],
  });

  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentLanguage = useSelector((state) => state.languages.currentLanguage);

  useEffect(() => {
    controller.getAll(`${endpoints.getoneicomig}/${id}`).then((res) => {
      setGetData(res);
    });
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === getData.inComingImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? getData.inComingImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section>
      <div className="containerdetails">
        <div className="image-slider">
          <button onClick={prevImage} className="slider-button">‹</button>
          <div className="slider_image" autoplay={{
          delay: 2000, 
          disableOnInteraction: false, 
        }}>
            {getData.inComingImages.length > 0 && (
              <img
                src={BASE_URL+getData.inComingImages[currentImageIndex]?.base64}
                alt={`Slide ${currentImageIndex + 1}`}
                className="slider_images"
              />
            )}
          </div>
          <button onClick={nextImage} className="slider-button">›</button>
        </div>

        <div className="tour-details">
          <div className="additional-info">
            <h3>{getData[`name_${currentLanguage}`]}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: getData[`text_${currentLanguage}`],
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomingDetail;
