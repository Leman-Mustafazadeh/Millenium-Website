import React from 'react';
import bakuImage from '../../assets/img/tour/baku.jpg'; // Adjust the path as necessary
import culturalCenterImage from '../../assets/img/tour/baku1.jpg'; // Adjust the path as necessary
import bgImage from '../../assets/img/bg/breadcumb-bg.jpg'; // Background image path

const Activities = () => {
  return (
    <section>
      <div className="breadcumb-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Activities</h1>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-7">
              <div className="row gx-24 gx-24">
                {/* Activity 1 */}
                <div className="col-md-6">
                  <ActivityBox
                    image={bakuImage}
                    title="Baku Old City"
                    rating="5.00"
                    description="Historic quarter with a blend of ancient sites and modern touches, featuring pedestrian streets and local crafts. Home to UNESCO sites and vibrant street life."
                    link="activities-details.html"
                  />
                </div>

                {/* Activity 2 */}
                <div className="col-md-6">
                  <ActivityBox
                    image={culturalCenterImage}
                    title="Heydar Aliyev Cultural Center"
                    rating="5.00"
                    description="Cultural center with a striking design, displaying an extensive musical instrument collection, classic cars, and traditional crafts, ideal for history and automobile aficionados."
                    link="activities-details.html"
                  />
                </div>

                {/* Repeated Activity Example */}
                <div className="col-md-6">
                  <ActivityBox
                    image={culturalCenterImage}
                    title="Heydar Aliyev Cultural Center"
                    rating="5.00"
                    description="Cultural center with a striking design, displaying an extensive musical instrument collection, classic cars, and traditional crafts, ideal for history and automobile aficionados."
                    link="activities-details.html"
                  />
                </div>

                {/* More activities can be added here */}
              </div>
            </div>

            <div className="col-xxl-4 col-lg-5">
              <aside className="sidebar-area">
                <div className="widget widget_categories">
                  <h3 className="widget_title">Activity Type</h3>
                  <ul>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Food and drink</a><span>(10)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Entertainment</a><span>(6)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Sports</a><span>(2)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Nature and outdoors</a><span>(7)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Culture and events</a><span>(9)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Mountain Campaigning</a><span>(10)</span></li>
                  </ul>
                </div>

                <div className="widget widget_categories">
                  <h3 className="widget_title">Duration</h3>
                  <ul>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Gozayan Tour, BD</a><span>(26)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>Tourope UK</a><span>(27)</span></li>
                    <li><a href="blog.html"><i className="fa-light fa-square-check"></i>European Tours Limited</a><span>(29)</span></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ActivityBox Component for reusability
const ActivityBox = ({ image, title, rating, description, link }) => {
  return (
    <div className="tour-box th-ani">
      <div className="tour-box_img global-img">
        <img src={image} alt={`Image of ${title}`} />
      </div>
      <div className="tour-content">
        <h4 className=""><span className="currency">{title}</span></h4>
        <div className="tour-rating">
          <div className="star-rating" role="img" aria-label={`Rated ${rating} out of 5`}>
            <span style={{ width: '100%' }}>Rated <strong className="rating">{rating}</strong> out of 5</span>
          </div>
        </div>
        <h2 className="box-title"><a href={link}>Speciality Museums</a></h2>
        <div className="tour-action">
          <span><i className="fa-light fa-clock"></i>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default Activities;
