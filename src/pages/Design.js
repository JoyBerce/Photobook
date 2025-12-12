import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Design.css";

export default function Design() {
  const location = useLocation();
  const { photos } = location.state;
  const stripRef = useRef(null);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [sticker, setSticker] = useState(null);

  const downloadStrip = async () => {
    const canvas = await html2canvas(stripRef.current);
    const link = document.createElement("a");
    link.download = "photobooth-strip.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="design-container">
      <h1>🎨 Design Your Photostrip</h1>

      <div className="controls">
        <label>Background Color:</label>
        <input
          type="color"
          value={bgColor}
          onChange={e => setBgColor(e.target.value)}
        />

        <label>Add Sticker:</label>
        <select onChange={(e) => setSticker(e.target.value)}>
          <option value="">None</option>
          <option value="❤️">Heart</option>
          <option value="✨">Sparkle</option>
          <option value="😎">Cool</option>
        </select>
      </div>

      <div
        className="photo-strip"
        ref={stripRef}
        style={{ backgroundColor: bgColor }}
      >
        {photos.map((p, i) => (
          <div key={i} className="photo-frame">
            <img src={p} alt="strip" />
            {sticker && <div className="sticker">{sticker}</div>}
          </div>
        ))}
      </div>

      <button className="download-btn" onClick={downloadStrip}>
        Download Image 📥
      </button>
    </div>
  );
}
