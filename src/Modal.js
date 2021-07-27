import React from "react";
import "./Modal.css";

export default function Modal({ open, feature, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="modal_background" />
      <div className="feature_modal">
        <div className="left">
          <h2 className="movie-title">
            {feature?.title}({feature?.status})
          </h2>
          <button className="play_button" onClick={onClose}>
            <i className="fas fa-times"></i>
            Close
          </button>
        </div>
        <div className="right">
          <img src={feature?.wall} alt="poster" />
          <div className="poster-fadeleft"></div>
        </div>
      </div>
    </>
  );
}
