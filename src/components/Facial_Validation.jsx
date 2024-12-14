import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const FacialRecognition = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState('');
  const webcamRef = useRef(null);

  // Capture image from webcam
  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  // Handle manual file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Submit the captured/uploaded image to backend for facial recognition
  const handleSubmitImage = () => {
    if (!imageSrc) {
      setStatus('No image to submit');
      return;
    }

    const imageData = {
      image: imageSrc,
    };
    console.log("Submitting image:", imageData);

    fetch('http://localhost:8000/api/facial_validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStatus('Facial verification successful!');
        } else {
          setStatus('Facial verification failed. Try again.');
        }
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
        setStatus('Error during submission.');
      });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Facial Recognition</h2>

      {/* Webcam component */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-64 h-64 border-2 border-gray-300 mb-4"
      />

      {/* Capture image from webcam */}
      <button
        onClick={captureImage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Capture Image
      </button>

      <p className="mb-4">OR</p>

      {/* File upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Display captured or uploaded image */}
      {imageSrc && (
        <div className="flex flex-col items-center">
          <img src={imageSrc} alt="Captured" className="w-64 h-64 mb-4" />
          <button
            onClick={handleSubmitImage}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Image
          </button>
        </div>
      )}

      {/* Display status message */}
      {status && <p className="mt-4 text-red-500">{status}</p>}
    </div>
  );
};

export default FacialRecognition;
