import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams(); // Get 'type' from the URL

    useEffect(() => {
        getData();
    }, [type]); // Re-fetch when 'type' changes

    const getData = () => {
        let apiUrl = "";

        if (type === "popular") {
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2015-01-01&sort_by=popularity.desc`;
        } else if (type === "upcoming") {
            apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=acaba87d72eba033de2058214994a722&language=te&region=IN&release_date.gte=${new Date().toISOString().split("T")[0]}`;
        }
        else{
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2022-01-01&primary_release_date.lte=2024-12-31&sort_by=popularity.desc`;
        }

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setMovieList(data.results));
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.length > 0 ? (
                    movieList.map((movie) => <Cards movie={movie} key={movie.id} />)
                ) : (
                    <h3>No movies available</h3>
                )}
            </div>
        </div>
    );
};

export default MovieList;