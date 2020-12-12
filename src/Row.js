import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

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

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    console.log("done");
                })
                .catch((error) => console.log(error));
        }
    }
    //console.log(movies);
    //console.table(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row_posters'>
                {movies.map(movie => {
                    return (
                        <div className='additional'>
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                            <h5 className="row_movie_title">{movie?.name || movie?.title || movie?.original_name}</h5>
                        </div>
                    )
                })}

            </div>
            {/* <div className='row_posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div> */}

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}


        </div>
    )
}

export default Row;


