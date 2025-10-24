import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import controller from '../../API';
import { BASE_URL, endpoints } from '../../API/constant';
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

    console.log(getData);
    
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
        
            }}>
                 <Carousel autoplay autoplaySpeed={2000} arrows infinite touchMove={false} slidesToScroll={1}>
                    {getData.outGoingImages.map((image, index) => (
                        <div className='carousel_item' key={index} style={{ height: '200px !important', position: 'relative' }}>
                            <img
                                src={BASE_URL+image.image   }
                                alt={`${getData.name_EN} image ${index + 1}`}
                                style={{ width: '100%', height: '100% !important', objectFit: 'cover' }}
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
