import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules'; // Import modules from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import "./sponsoredpopup.css";
   

const SponsoredPopup = ({ onClose }) => {
    const sponsoredAds = [
        {
          image: "/madmonkey_1.png",
          link: "https://sponsoredlink1.com",
        },
        {
          image: "/netflix_logo.png",
          link: "https://sponsoredlink2.com",
        },
        {
          image: "/madmonkey_1.png",
          link: "https://sponsoredlink3.com",
        },
      ];

  return (
    <div className="sponsored-popup">
      <div className="popup-content">
        <button className="close-popup" onClick={onClose}>
          &times;
        </button>
        <h3>Sponsored Ads</h3>
        <Swiper
          modules={[Autoplay, Pagination]} // Add the modules
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // Time between auto slides in milliseconds
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
        >
          {sponsoredAds.map((ad, index) => (
            <SwiperSlide key={index}>
              <a href={ad.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={ad.image}
                  alt={`Sponsored Ad ${index + 1}`}
                  className="sponsored-image"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SponsoredPopup;