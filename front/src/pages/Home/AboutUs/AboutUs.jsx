import React from 'react';
import aboutUsImage from '../../../assets/img/bg/breadcumb-bg.jpg'; // Path to image
import { ourCompany } from '../../../i18n';
import { useSelector } from 'react-redux';

const AboutUs = () => {
  // Example: Selecting language dynamically. Here 'EN' is hardcoded, but you can replace it dynamically based on user selection.
  const language = useSelector((state) => state.languages.currentLanguage);

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
            <h1 className="breadcumb-title">
              {ourCompany.our_company_title[language]}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div style={{ margin: '100px 0' }}>
          <h2 style={{ textAlign: 'center' }}>{ourCompany.our_company_title[language]}</h2>
          <p>{ourCompany.our_company[language]}</p>
         
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
