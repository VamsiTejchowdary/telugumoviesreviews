import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [footer, setFooter] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const { type } = useParams(); // Get 'type' from the URL

  const getData = useCallback(async () => {
    let apiUrl = "";
    const fallbackMovieIds = []; // Hardcoded fallback movie IDs

    if (type === "popular") {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2015-01-01&sort_by=popularity.desc`;
      setFooter(true);
      setShowPopup(true); // Show the popup when the type is 'popular'
    } else if (type === "upcoming") {
      apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=acaba87d72eba033de2058214994a722&region=IN`;
      setFooter(true);
    } else {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2022-01-01&primary_release_date.lte=2024-12-31&sort_by=popularity.desc`;
      setFooter(false);
    }

    try {
      // Fetch primary data
      const mainResponse = await fetch(apiUrl);
      const mainData = await mainResponse.json();

      // Fetch fallback data for each movie in the fallback list
      const fallbackMoviesPromises = fallbackMovieIds.map((id) => {
        const fallbackUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722&language=te`;
        return fetch(fallbackUrl).then((response) => response.json());
      });

      // Wait for all fallback movies to be fetched
      const fallbackMovies = await Promise.all(fallbackMoviesPromises);

      // Merge the main results with the fetched fallback movies
      const mergedResults = mainData.results
        ? [...mainData.results, ...fallbackMovies]
        : fallbackMovies;

      // Sort the movie list if it's upcoming, based on the release date in ascending order
      if (type === "upcoming") {
        mergedResults.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      }

      // Set the combined and sorted movie list
      setMovieList(mergedResults);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
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
              <p>
                The reviews displayed on this page represent the average ratings
                from all references from google. Please note that the{" "}
                <span className="tfi-mete">TFI Meter⭐</span> is not based on
                these reviews. For TFI Meter ratings, visit the{" "}
                <Link
                  to="/movies/Insights"
                  style={{ textDecoration: "none", color: "yellow" }}
                  className="shake-text" // Added shake-text class
                >
                  TFInsights page
                </Link>
                🎬🔍
              </p>
            </p>
          </div>
        </div>
      )}

      {footer ? <Footer /> : null}
    </div>
  );
};

export default MovieList;
