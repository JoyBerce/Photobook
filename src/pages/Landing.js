import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/photobook");
  };

  return (
    <div className="home-container">
      <div className="photobooth-card">
        <h1>📸 Welcome to Photobook App</h1>
        <p> → Created by Jody</p>
        <button className="getstarted-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}
