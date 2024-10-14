// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button onClick={handleBack} className="back-button">
      Back
    </button>
  );
};

export default BackButton;
