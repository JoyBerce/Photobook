import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Design.css";

export default function Design() {
  const location = useLocation();
  const navigate = useNavigate();
  const { photos } = location.state;
  const stripRef = useRef(null);

  const colors = [
    { name: "Pink", value: "#ffc0cb" },
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Light Blue", value: "#add8e6" },
    { name: "Brown", value: "#a52a2a" }
  ];

  const stickers = ["❤️", "✨", "😎", "🌸", "⭐"];

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
      <div className="design-layout">

        {/* COLUMN 1 — STRIP */}
        <div className="column strip-column">
          <div
  className="photo-strip"
  ref={stripRef}
  style={{ backgroundColor: bgColor }}
>
  {photos.map((p, i) => (
    <div
      key={i}
      className="photo-frame"
      style={{ height: `${100 / photos.length}%` }} // evenly divide height
    >
      <img src={p} alt={`strip-${i}`} />
      {sticker && <div className="sticker">{sticker}</div>}
    </div>
  ))}
</div>

        </div>

        {/* COLUMN 2 — CONTROLS */}
        <div className="column controls-column">
          <h1>🎨 Design Your Photostrip</h1>

          <div className="color-picker">
            <p>Strip Color</p>
            {colors.map(c => (
              <button
                key={c.value}
                className="color-btn"
                style={{ backgroundColor: c.value }}
                onClick={() => setBgColor(c.value)}
              />
            ))}
          </div>

          <div className="sticker-picker">
            <p>Stickers</p>
            <div className="sticker-row">
              {stickers.map(s => (
                <span
                  key={s}
                  className="sticker-option"
                  onClick={() => setSticker(s)}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 3 — ACTIONS */}
        <div className="column actions-column">
          <button className="download-btn" onClick={downloadStrip}>
            Download Image 📥
          </button>

          <button
            className="again-btn"
            onClick={() => navigate("/")}
          >
            Take Again 🔄
          </button>
        </div>

      </div>
    </div>
  );
}
