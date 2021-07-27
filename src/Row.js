import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const poster_url = "https://image.tmdb.org/t/p/w500/";
const backdrop_url = "https://image.tmdb.org/t/p/w780/";
const url = `https://api.themoviedb.org/3`;

const Row = ({ title, fetchUrl, isLargeRow, isSearchRow, setOpen }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [overview, setOverview] = useState(false);
  const [feature, setFeature] = useState({
    id: "",
    title: "",
    plot: "",
    wall: "",
    language: "",
    date: "",
    budget: "",
    genres: [],
    rev: "",
    time: "",
    status: "",
    ratings: 0,
    tagline: "",
  });

  // a snippet of code which runs based on a condition
  useEffect(() => {
    //if [] run once when the row loads, and dont run again
    async function fetchData() {
      let {
        data: { results },
      } = await axios.get(fetchUrl);
      if (isSearchRow) {
        results = results.filter((result) => result.media_type !== "person");
      }
      setMovies(results);
      return results;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const playTrailer = (movieTitle) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movieTitle || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const handleClick = async (movie) => {
    if (feature.id === movie.id) {
      return;
    }

    // getting dynamic url based on input click
    const isMovieOrSeries =
      movie.first_air_date !== undefined ? "/tv/" : "/movie/";
    const finalUrl = `${url}${isMovieOrSeries}${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,images&include_image_language=en,null`;
    const { data } = await axios.get(finalUrl);

    // converting time from minutes to hours and minutes
    const time = data?.runtime || data?.episode_run_time;
    const hour =
      Math.floor(Number(time) / 60) >= 1
        ? `${Math.floor(Number(time) / 60)}h`
        : "";
    const minute = Number(time) % 60 >= 1 ? `${Number(time) % 60}m` : "";
    const runtime = `${hour} ${minute}`;

    // getting random wallpaper from movie gallery
    const wall = `${backdrop_url}${
      data.images.backdrops[
        Math.floor(Math.random() * data.images.backdrops.length)
      ].file_path
    }`;

    setFeature({
      id: data?.id,
      title: data?.name || data?.title || data?.original_name,
      plot: data?.overview,
      wall: wall,
      spoken_lang: data?.spoken_languages,
      language: data?.languages || data?.original_language,
      date: data?.release_date || data?.first_air_date || "N/A",
      budget: data?.budget || null,
      genres: data?.genres,
      rev: data?.revenue || null,
      time: runtime,
      status: data?.status,
      ratings: data?.vote_average,
      tagline: data?.tagline,
    });
    setTrailerUrl("");
    setOverview(true);
    setOpen(true);
  };

  return (
    <div className={`row ${isSearchRow && "row_search"}`}>
      <h2>{title}</h2>

      <div className={`row_posters ${isSearchRow && "row_search_posters"}`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
            src={
              isLargeRow
                ? `${poster_url}${movie?.poster_path}`
                : `${backdrop_url}${movie?.backdrop_path}`
            }
            alt={movie.name}
          />
        ))}
      </div>
      {/*  {overview && <Modal feature={feature}/>} */}
      {overview && (
        <>
          {feature && (
            <div className="feature">
              <div className="left">
                <h2 className="movie-title">
                  {feature?.title}({feature?.status})
                </h2>
                {feature?.tagline && (
                  <h3 className="tagline">{feature?.tagline}</h3>
                )}
                <div className="movie-genre">
                  <span>Genres : </span>

                  {feature?.genres.map((genre) => (
                    <span className="genre-name" key={genre?.name}>
                      {genre?.name}
                    </span>
                  ))}
                </div>
                <div
                  className="movie-meta"
                  /* style={{ justifyContent: "flex-start" }} */
                >
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

                <button
                  className="play_button"
                  onClick={() => playTrailer(feature?.title)}
                >
                  <i className="fas fa-play"></i>
                  Play
                </button>
                <button
                  className="play_button"
                  onClick={() => setOverview(false)}
                >
                  <i className="fas fa-times"></i>
                  Close
                </button>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
              </div>
              <div className="right">
                <img src={feature?.wall} alt="poster" />
                <div className="poster-fadeleft"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Row;
