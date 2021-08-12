import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const poster_url = "https://image.tmdb.org/t/p/w500/";
const backdrop_url = "https://image.tmdb.org/t/p/w780/";

const Row = ({
  title,
  fetchUrl,
  isLargeRow,
  isSearchRow,
  setOpen,
  setModalData,
}) => {
  const [movies, setMovies] = useState([]);

  // a snippet of code which runs based on a condition
  //if [] run once when the row loads, and dont run again
  useEffect(() => {
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
  }, [fetchUrl, isSearchRow]);

  const handleClick = async (movie) => {
    // getting dynamic movie or tv data
    const isMovieOrSeries =
      movie.first_air_date !== undefined ? "/tv/" : "/movie/";
    const finalUrl = `${isMovieOrSeries}${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,images&include_image_language=en,null`;
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
    const wall =
      data.images.backdrops.length > 0 &&
      `${backdrop_url}${
        data.images.backdrops[
          Math.floor(Math.random() * data.images.backdrops.length)
        ].file_path
      }`;

    // getting random trailer or teaser from movie videos
    const trailer = data?.videos?.results.filter(
      ({ type }) => type === "Trailer"
    );

    const videoURL =
      trailer.length > 0 && trailer[Math.floor(Math.random() * trailer.length)];

    setModalData({
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
      video: videoURL,
    });

    setOpen(true);
  };

  return (
    <div className={`row ${isSearchRow ? "row_search" : ""}`}>
      <h2>{title}</h2>

      <div className={`row_posters ${isSearchRow ? "row_search_posters" : ""}`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow ? "row_posterLarge" : ""} ${
              isSearchRow ? "row_search_poster" : ""
            } `}
            src={
              isLargeRow
                ? `${poster_url}${movie?.poster_path}`
                : `${backdrop_url}${movie?.backdrop_path}`
            }
            alt={movie.name || movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
