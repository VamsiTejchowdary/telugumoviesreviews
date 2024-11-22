import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRating } from "../../context/RatingContext"; // Import useRating hook
import "./movie.css";

const MovieReview = () => {
  const location = useLocation(); // Get location to access state
  const { id } = useParams(); // Extract `id` from URL
  const { rating, review } = useRating(); // Get rating and review from context
  const [currentMovieDetail, setMovie] = useState(location.state?.movieDetails || null); // Initialize with passed state or null

  useEffect(() => {
    if (!currentMovieDetail) {
      // Fetch movie details from API if not passed via state
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((error) => console.error("Error fetching movie details:", error));
    }
  }, [id, currentMovieDetail]);

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail?.backdrop_path || ""
          }`}
          alt="Movie Backdrop"
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail?.poster_path || ""
              }`}
              alt="Movie Poster"
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail?.original_title || "Title Not Available"}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail?.tagline || "Tagline Not Available"}
            </div>
            <div className="movie__rating">
              <strong style={{ color: "#FFD700" }}>TFI Meter:</strong>{" "}
              <span style={{ color: "#FFD700" }}>
                {rating || "No rating available"}
              </span>
              <i className="fas fa-star" style={{ color: "#FFD700" }} />
            </div>
            <div className="movie__runtime">
              {currentMovieDetail?.runtime
                ? `${currentMovieDetail.runtime} mins`
                : "Runtime Not Available"}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail?.release_date
                ? `Release Date: ${currentMovieDetail.release_date}`
                : "Release Date Not Available"}
            </div>
            <div className="movie__genres">
              {currentMovieDetail?.genres ? (
                currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))
              ) : (
                <span>No Genres Available</span>
              )}
            </div>
          </div>
          <div >
            <div className="synopsisText">TFInsiders Review:</div>
            <div>
              {review}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReview;