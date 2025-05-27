// src/components/ImageTiltCard.jsx
import React from 'react';
import Tilt from 'react-parallax-tilt';
import '../../css/ImageTiltCard.css';

const ImageTiltCard = ({ image, alt }) => {
  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.45} scale={1.05} transitionSpeed={250}>
      <div className="tilt-card">
        <img src={image} alt={alt} className="tilt-image" />
      </div>
    </Tilt>
  );
};

export default ImageTiltCard;