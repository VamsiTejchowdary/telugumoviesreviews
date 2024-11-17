import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Footer from "../../components/footer/footer";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [footer, setFooter] = useState(true); // Set footer state
  const { type } = useParams(); // Get 'type' from the URL

  // Memoizing the getData function using useCallback to prevent it from being recreated on every render
  const getData = useCallback(() => {
    let apiUrl = "";

    if (type === "popular") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2015-01-01&sort_by=popularity.desc`;
      setFooter(true); // Set footer to true for popular
    } else if (type === "upcoming") {
      apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=acaba87d72eba033de2058214994a722&language=te&region=IN&release_date.gte=${
        new Date().toISOString().split("T")[0]
      }`;
      setFooter(true); // Set footer to true for upcoming
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2022-01-01&primary_release_date.lte=2024-12-31&sort_by=popularity.desc`;
      setFooter(false); // Set footer to false for other types (in your case, else)
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  }, [type]); // Include 'type' as a dependency since it changes based on the URL

  useEffect(() => {
    getData(); // Call getData inside useEffect
  }, [getData]); // Dependency on the memoized getData function

  return (
    <div>
      <div className="movie__list">
        <h2 className="list__title">
          {(type ? type : "POPULAR").toUpperCase()}
        </h2>
        <div className="list__cards">
          {movieList.length > 0 ? (
            movieList.map((movie) => <Cards movie={movie} key={movie.id} />)
          ) : (
            <h3>No movies available</h3>
          )}
        </div>
      </div>
      {footer ? <Footer /> : null} {/* Conditionally render Footer */}
    </div>
  );
};

export default MovieList;