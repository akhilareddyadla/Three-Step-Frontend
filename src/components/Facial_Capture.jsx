import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const FacialCapture = () => {
  const location = useLocation();
  const userId = location.state?.data?.data?.userid;
  console.log("User---",userId)
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState('');
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

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

  const handleSubmitImage = () => {
    if (!imageSrc) {
      setStatus('No image to submit');
      return;
    }

    const imageData = {
      user_id: userId,
      image: imageSrc,
    };
    console.log("Data",location.state)
    console.log("UserId:",userId)

    fetch('http://127.0.0.1:8000/api/facial_capture', {
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
          localStorage.setItem("userId",data.user_id)
          navigate("/first_level")
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

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-64 h-64 border-2 border-gray-300 mb-4"
      />

      <button
        onClick={captureImage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Capture Image
      </button>

      <p className="mb-4">OR</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

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

      {status && <p className="mt-4 text-red-500">{status}</p>}
    </div>
  );
};

export default FacialCapture;
