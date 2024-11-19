import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Footer from "../../components/footer/footer";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [footer, setFooter] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const { type } = useParams(); // Get 'type' from the URL

  const getData = useCallback(() => {
    let apiUrl = "";

    if (type === "popular") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2015-01-01&sort_by=popularity.desc`;
      setFooter(true);
      setShowPopup(true); // Show the popup when the type is 'popular'
    } else if (type === "upcoming") {
      apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=acaba87d72eba033de2058214994a722&language=te&region=IN&release_date.gte=${
        new Date().toISOString().split("T")[0]
      }`;
      setFooter(true);
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2022-01-01&primary_release_date.lte=2024-12-31&sort_by=popularity.desc`;
      setFooter(false);
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  }, [type]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

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

      {/* Conditionally render the popup for the 'popular' type */}
      {showPopup && type === "popular" && (
        <div className="popup-overlay">
          <div className="popup">
            {/* TFamilyI Logo centered */}
            <img
              src="/finaltfilogo.png"
              alt="TFamilyI Logo"
              className="popup-logo"
            />

            <button className="close-btn" onClick={closePopup}>
              X
            </button>
            <h3>Hey TFamilyI</h3>
            <p>
              The reviews on this page are averages of all ratings. For
              TFI meter reviews, visit the TFInsights page. ⭐🎬🔍
            </p>
          </div>
        </div>
      )}

      {footer ? <Footer /> : null}
    </div>
  );
};

export default MovieList;
