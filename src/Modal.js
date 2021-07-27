import React, { useState } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Modal.css";

export default function Modal({ open, feature, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const playTrailer = (movieTitle) => {
    movieTrailer(movieTitle || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal_background" />
      <div className="feature">
        <div className="left">
          <h2 className="movie-title">
            {feature?.title}({feature?.status})
          </h2>
          {feature?.tagline && <h3 className="tagline">{feature?.tagline}</h3>}
          <div className="movie-genre">
            <span>Genres : </span>

            {feature?.genres.map((genre) => (
              <span className="genre-name" key={genre?.name}>
                {genre?.name}
              </span>
            ))}
          </div>
          <div className="movie-meta">
            <p>Release Date : {feature?.date}</p>
            <p>Runtime : {feature?.time}</p>
            <p className="rating">{feature?.ratings}</p>
          </div>

          <div className="movie-lang">
            <span>Available In : </span>
            {feature?.spoken_lang.map((lang) => (
              <span
                className="lang-name"
                style={{ color: "#d72323" }}
                key={lang?.english_name}
              >
                {lang?.english_name}
              </span>
            ))}
          </div>
          <p className="movie-plot">{feature?.plot}</p>

          {feature?.budget !== null && feature?.rev !== null && (
            <div className="movie-money">
              <p>Budget : ${feature?.budget}</p>
              <p>Revenue : ${feature?.rev}</p>
            </div>
          )}
        </div>
        <div className="right">
          <button
            className="play_button"
            onClick={() =>
              trailerUrl ? setTrailerUrl("") : playTrailer(feature?.title)
            }
          >
            <i className={`fas fa-${trailerUrl ? "times" : "play"}`}></i>
            {trailerUrl ? "Close" : "Play"}
          </button>
          <button
            className="close_button"
            onClick={() => {
              setTrailerUrl("");
              onClose();
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <img src={feature?.wall} alt={feature?.title} loading="lazy" />
          <div className="poster-fadeleft"></div>
        </div>
        {trailerUrl && (
          <div>
            <YouTube videoId={trailerUrl} opts={opts} />{" "}
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}
