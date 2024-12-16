import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const FacialCapture = () => {
  let userId = localStorage.getItem("userId");
  console.log("User---", userId);
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState("");
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageSrc(URL.createObjectURL(file)); // display selected image
  };

  const handleSubmitImage = () => {
    if (!imageSrc) {
      setStatus("No image to submit");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);

    // Convert base64 image to a Blob
    if (imageSrc.startsWith("data:image")) {
      const blob = dataURLtoBlob(imageSrc); // Convert base64 string to Blob
      formData.append("file", blob, `${userId}.jpg`); // Append the file with a name
    } else {
      // If it's not a base64 image, we assume it's a selected file
      const file = document.querySelector('input[type="file"]').files[0];
      formData.append("file", file);
    }

    fetch("http://127.0.0.1:8000/facial-register/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStatus("Facial verification successful!");
          localStorage.setItem("userId", data.user_id);
          navigate("/first_level");
        } else {
          setStatus("Facial verification failed. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        setStatus("Error during submission.");
      });
  };

  // Helper function to convert base64 to Blob
  const dataURLtoBlob = (dataUrl) => {
    const [metadata, base64Data] = dataUrl.split(",");
    const mime = metadata.match(/:(.*?);/)[1];
    const binary = atob(base64Data);
    const length = binary.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < length; i++) {
      view[i] = binary.charCodeAt(i);
    }
    return new Blob([buffer], { type: mime });
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
