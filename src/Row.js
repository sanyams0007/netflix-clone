import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [overview, setOverview] = useState('off');
    const [feature, setFeature] = useState({
        title: "",
        plot: "",
        wall: "",
    });

    // a snippet of code which runs based on a condition
    useEffect(() => {
        //if [] run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const playTrailer = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            /*  movieTrailer(movie?.name || movie?.title || movie?.original_name || "") */
            movieTrailer(movie || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    console.log("done");
                })
                .catch((error) => console.log(error));
        }
    }

    const handleClick = (movie) => {
        if (overview === 'on') {
            setOverview("off");
        } else {
            setOverview(overview === "on" ? "off" : "on");
            setFeature(() => {
                return {
                    title: movie?.name || movie?.title || movie?.original_name,
                    plot: movie?.overview,
                    wall: `${base_url}${!isLargeRow ? movie.poster_path : movie.backdrop_path}`,
                }
            });
        }

    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    //{truncate(movie?.overview, 500)}
    //console.log(movies);
    //console.table(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>

            {/* <div className='row_posters'>
                {movies.map(movie => {
                    return (
                        <div className='additional'>
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                 onClick={() => handleClick(movie)} 
                                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                            <h5 className="row_movie_title">{movie?.name || movie?.title || movie?.original_name}</h5>
                            <div className={`overview overview_${overview}`}>
                                <Overview
                                    movie={movie}
                                    update={handleClick}
                                />
                            </div>
                        </div>
                    )
                })}
            </div> */}

            <div className='row_posters'>
                {movies.map(movie => (
                    <div className='movie_container'>
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                        <h5 className="row_movie_title">{movie?.name || movie?.title || movie?.original_name}</h5>
                    </div>
                ))}
            </div>

            <div className={`feature overview_${overview}`}>
                <div className="left">
                    <h2>{feature?.title}</h2>
                    <p>{feature.plot}{truncate(feature?.plot, 500)}</p>
                    <button className='play_button'
                        onClick={() => playTrailer(feature?.title)}
                    >
                        Play
                    </button>
                    <button className='play_button'
                        onClick={handleClick}
                    >
                        Close
                </button>
                </div>
                <img
                    className='right'
                    src={feature?.wall}
                    alt='Movie Wall'
                />
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}


        </div>
    )
}

export default Row;


