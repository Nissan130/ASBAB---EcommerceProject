import React, { useState, useEffect } from 'react'
import './BannerImage.css'
import banner_image from '../Assets/banner_image'

const BannerImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banner_image.length - 1 ? 0 : prevIndex + 1
    );
  };

   // Function to go to the previous slide
   const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banner_image.length - 1 : prevIndex - 1
    );
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay the slider
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className='sliderContainer'>
      <img
        src={banner_image[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className='image'
      />

      {/* Previous Button */}
      <button onClick={prevSlide} className='button-prev'>
        &#10094;
      </button>

      {/* Next Button */}
      <button onClick={nextSlide} className='button-next'>
        &#10095;
      </button>

      {/* Hover Dots */}
      <div className='dotsContainer'>
        {banner_image.map((_, index) => (
          <div
            key={index}
            className='dot'
            style={{
                backgroundColor: currentIndex === index ? "#ff4141" : "#bbb",
              }}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}


export default BannerImage
