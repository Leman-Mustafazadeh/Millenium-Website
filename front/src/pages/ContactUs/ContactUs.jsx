import React from 'react';
import locationIcon from '../../assets/img/icon/location-dot2.svg';
import phoneIcon from '../../assets/img/icon/call.svg';
import emailIcon from '../../assets/img/icon/mail.svg';
import mapIcon from '../../assets/img/icon/location-dot3.svg';
import bgImage from '../../assets/img/bg/breadcumb-bg.jpg'; // Change the path as needed
import videoBg from '../../assets/img/bg/video_bg_1.jpg'; // Change the path as needed
import "../../assets/css/style.css"
const ContactUs = () => {
  return (
    <div>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <h2 className="sec-title">Our Contact Information</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid style2">
                <div className="about-contact-icon">
                  <img src={locationIcon} alt="Location Icon" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Our Address</h6>
                  <p className="about-contact-details-text">492, I.Gutgashinli str., AZ1073 Baku,</p>
                  <p className="about-contact-details-text">Republic of Azerbaijan</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid">
                <div className="about-contact-icon">
                  <img src={phoneIcon} alt="Phone Icon" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Phone Number</h6>
                  <p className="about-contact-details-text">
                    <a href="tel:+994124975400">+99412 4975400</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="about-contact-grid">
                <div className="about-contact-icon">
                  <img src={emailIcon} alt="Email Icon" />
                </div>
                <div className="about-contact-details">
                  <h6 className="box-title">Email Address</h6>
                  <p className="about-contact-details-text">
                    <a href="mailto:manager@milleniumtour.az">manager@milleniumtour.az</a>
                  </p>
                  <p className="about-contact-details-text">
                    <a href="mailto:support24@tourm.com">team@milleniumtour.az</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-extra2-top space-extra2-bottom" style={{ backgroundImage: `url(${videoBg})` ,backgroundPosition:'center'}}>
        {/* Additional content can go here if needed */}
      </div>

      <div className="">
        <div className="container-fluid">
          <div className="contact-map style2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.641772189313!2d49.8211467!3d40.3724668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d8921ec9c01%3A0x65ae469af86ceb4e!2sMillennium%20Tourism!5e0!3m2!1str!2saz!4v1725476195345!5m2!1str!2saz"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
            <div className="contact-icon">
              <img src={mapIcon} alt="Map Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
