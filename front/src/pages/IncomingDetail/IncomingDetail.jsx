import React, { useState } from 'react';
import "./style.css";

// Sample data for tours with extended information
const tourData = [
  {
    id: 1,
    title: 'Beautiful Beach',
    description: 'Enjoy a beautiful beach with clear blue waters and golden sand.',
    images: [
      'https://alisontravelgroup.com/uploads/d841c7baf3ec1e329f94.jpg',
      'https://www.alisontravelgroup.com/uploads/972c040bc1590de1ad1f.jpg',
      'https://www.alisontravelgroup.com/uploads/f01dfa516fca67304c9d.jpg'
    ],
    highlights: [
      'Crystal-clear blue water',
      'Golden sandy beaches',
      'Sunsets over the horizon'
    ],
    additionalInfo: `
      Relax on the shore, swim in the warm sea, or explore the local marine life with snorkeling tours. 
      Nearby cafes offer local delicacies and refreshing drinks. Family-friendly environment with activities 
      for all ages, and plenty of photo opportunities with stunning landscapes.
    `,
  },
  {
    id: 2,
    title: 'Mountain Adventure',
    description: 'Explore breathtaking mountain views and challenging trails.',
    images: [
      'https://www.alisontravelgroup.com/uploads/972c040bc1590de1ad1f.jpg',
      'https://www.alisontravelgroup.com/uploads/f01dfa516fca67304c9d.jpg',
      'https://alisontravelgroup.com/uploads/d841c7baf3ec1e329f94.jpg'
    ],
    highlights: [
      'Stunning mountain views',
      'Challenging hiking trails',
      'Peaceful natural surroundings'
    ],
    additionalInfo: `
      Gear up for an adventure through some of the most scenic mountains. Trails are accessible for both 
      beginners and advanced hikers. Enjoy fresh air, observe local wildlife, and capture panoramic views 
      from the top. Guided tours are available for added safety and insights about the area's history and 
      ecosystems.
    `,
  },
];

const IncomingDetail = () => {
  const [selectedTour, setSelectedTour] = useState(tourData[0]); // Default to the first tour
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track which image to show in the slider

  const handleImageClick = (tour) => {
    setSelectedTour(tour);     // Update selected tour details
    setCurrentImageIndex(0);    // Reset image index for the new tour
  };

  // Function to go to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedTour.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedTour.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section>
      <div className="containerdetails">
        
        {/* Left Side - Image Slider */}
        <div className="image-slider">
          <button onClick={prevImage} className="slider-button">‹</button>
          <div className="slider_image">
            <img
              src={selectedTour.images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="slider_images"
            />
          </div>
          <button onClick={nextImage} className="slider-button">›</button>
        </div>

        {/* Right Side - Tour Details with extended information */}
        <div className="tour-details">
          <h2>{selectedTour.title}</h2>
          <p>{selectedTour.description}</p>
          
          <div className="highlights">
            <h3>Highlights</h3>
            <ul>
              {selectedTour.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="additional-info">
            <h3>More Information</h3>
            <p>{selectedTour.additionalInfo}</p>
          </div>
          
          <div className="tour-list">
            {tourData.map((tour) => (
              <button
                key={tour.id}
                onClick={() => handleImageClick(tour)}
                className={`tour-button ${selectedTour.id === tour.id ? 'active' : ''}`}
              >
                {tour.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomingDetail;
