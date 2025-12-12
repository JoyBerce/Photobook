import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([null, null, null]); // 3 slots
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const takePhotoWithTimer = () => {
    let time = 3;
    setCountdown(time);

    const interval = setInterval(() => {
      time--;
      setCountdown(time);

      if (time === 0) {
        clearInterval(interval);
        capturePhoto();
      }
    }, 1000);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const nextIndex = photos.findIndex(p => p === null);
    if (nextIndex !== -1) {
      const updated = [...photos];
      updated[nextIndex] = imageSrc;
      setPhotos(updated);
    }
  };

  const retakePhotos = () => {
    setPhotos([null, null, null]);
  };

  const proceedToDesign = () => {
    navigate("/design", { state: { photos } });
  };

  return (
    <div className="landing-container">

<div className="top-section">
  {photos.includes(null) && (
    <button className="capture-btn" onClick={takePhotoWithTimer}>
      Take Photo ({photos.filter(p => p === null).length} left)
    </button>
  )}

  <div className="camera-wrapper">
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      className="webcam"
    />
    {countdown > 0 && <div className="countdown">{countdown}</div>}
  </div>
</div>


<div className="three-photo-grid">
  {photos.map((p, i) => (
    <div key={i} className="photo-slot">
      {p ? (
        <img src={p} alt={`photo-${i}`} className="photo-img" />
      ) : (
        <span className="empty-box"></span>
      )}
    </div>
  ))}
</div>


      {!photos.includes(null) && (
        <div className="after-buttons">
          <button className="retake-btn" onClick={retakePhotos}>
            Retake Photos
          </button>

          <button className="design-btn" onClick={proceedToDesign}>
            Proceed to Design ➜
          </button>
        </div>
      )}
    </div>
  );
}
