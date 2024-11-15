import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import controller from '../../API';
import { endpoints } from '../../API/constant';
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import "./style.css"
const OutgoingDetail = () => {
    const { id } = useParams();
    const [getData, setGetData] = useState({
        name: "",
        title: "",
        outGoingImages: [],
        text_EN: ""
    });

    useEffect(() => {
        controller.getAll(`${endpoints.getOneOutgoing}/${id}`)
            .then((res) => setGetData(res))
            .catch((err) => console.error("Error fetching outgoing details:", err));
    }, [id]);

    const currentlanguage = useSelector(
        (state) => state.languages.currentLanguage
      );
    return (
        <div style={{
            display: 'flex',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            gap: '20px'
        }}>
            {/* Left side: Image Slider */}
            <div style={{
                flex: '1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                height:'100% !important'
            }}>
                 <Carousel autoplay autoplaySpeed={3000} arrows infinite touchMove={false} slidesToScroll={1}>
                    {getData.outGoingImages.map((image, index) => (
                        <div key={index} style={{ height: '500px !important', position: 'relative' }}>
                            <img
                                src={image.base64}
                                alt={`${getData.name_EN} image ${index + 1}`}
                                style={{ width: '100%', height: '600px !important', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Right side: Text Content */}
            <div style={{ flex: '1', paddingLeft: '20px' }}>
                <h1 style={{
                    fontSize: '2em',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                 {getData[`name_${currentlanguage}`]}
                </h1>
                <p style={{
                    fontSize: '1.1em',
                    lineHeight: '1.6',
                    color: '#555',
                    textAlign: 'left'
                }}>
                   
                    {getData[`text_${currentlanguage}`]}
                </p>
            </div>
        </div>
    );
};

export default OutgoingDetail;
