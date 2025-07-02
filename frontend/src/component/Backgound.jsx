import React from 'react';
import back1 from '../assets/back1.jpg';
import back2 from '../assets/back2.jpg';
import back3 from '../assets/back3.jpg';
import back4 from '../assets/back4.jpg';

function Background({ heroCount }) {
  const backgrounds = [back2, back1, back3, back4]; // Order as per your logic

  const imageToShow = backgrounds[heroCount] || back1; // fallback to back1

  return (
    <img
      src={imageToShow}
      alt="Background"
      className="w-full h-full object-cover float-left overflow-auto"
    />
  );
}

export default Background;
