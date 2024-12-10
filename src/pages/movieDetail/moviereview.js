import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
//import { useRating } from "../../context/RatingContext"; // Import useRating hook
import "./moviereview.css";

const MovieReview = () => {
  const location = useLocation(); // Get location to access state
  const { id } = useParams(); // Extract `id` from URL
  const [currentMovieDetail, setMovie] = useState(
    location.state?.movieDetails || null
  ); // Initialize with passed state or null
  const [trailerLink, setTrailerLink] = useState(null); // Initialize youtubelink state
  const [reviewLink, setReviewLink] = useState(null); // Initialize review link state
  const [rating, setRating] = useState(null); // Initialize review link state
  const [moviereview, setMovieReview] = useState(null); // Initialize review link state


  const movieLinks = useMemo(() => ({
    "857598": {
    //PUSHPA-2
    moviereview: "First Half keka, second half good going over all ga rapa rapa.",
    rating: 7.9,
    trailerLink: "https://www.youtube.com/watch?v=g3JUbgOHgdw",
    reviewLink: "https://www.youtube.com/watch?v=C3NeVVa2xUc"
  },
  "1390698": {
    //ZEBRA
    moviereview: "Satyadev anna kummesada chala baga act chesad enjoyed a lot.",
    rating: 8.1,
    trailerLink: "https://www.youtube.com/watch?v=xDfuWMmlS1w",
    reviewLink: ""
  },
  "1102353": {
    //MECHANIC ROCKY
    moviereview: "Ok First Half, Excellent Second half with good twists. Vishwak anna agressive tandavamey.",
    rating: 7.7,
    trailerLink: "https://www.youtube.com/watch?v=tEBYk7cA8Vk",
    reviewLink: ""
  },
  "1233327": {
    //MATKA
    moviereview: "Should be taken better",
    rating: 5.5,
    trailerLink: "https://www.youtube.com/watch?v=FKtnAhHnfUo",
    reviewLink: ""
  },
  "1239511": {
    //LUCKY BHASKAR
    moviereview: "After a different concept like Sir/Vaathi, Venky Atluri made a movie like Wolf of Wall Street and he succeeded in it. Bound script, tight screenplay, crisp runtime added value to the movie. Actors Dulqer Salman, Meenakshi Choudary did their best and the supporting characters also performed well. Even though some scenes feels like illogical, most of the movie makes sense. The writing and directing part by Venky Atluri outstands. Worth watching.",
    rating: 8.4,
    trailerLink: "https://www.youtube.com/watch?v=krdomVobIxE",
    reviewLink: ""
  },
  "1353436": {
    //KA
    moviereview: "Story and screenplay dominated acting.",
    rating: 7.6,
    trailerLink: "https://www.youtube.com/watch?v=n75xEs-9u1I",
    reviewLink: ""
  },
  "1249902": {
    //MATHU VADHLARA - 2
    moviereview: "End to end laguther.",
    rating: 8.0,
    trailerLink: "https://www.youtube.com/watch?v=ahZX-ewuZP8",
    reviewLink: ""
  },
  "811941": {
    //DEVARA
    moviereview: "Story was ok, NTR screen presence is what I liked the most.",
    rating: 8.5,
    trailerLink: "https://www.youtube.com/watch?v=5cx7rvMvAWo&t=3s",
    reviewLink: ""
  },
  "1194915": {
    //SARIPODHA SANIVARAM
    moviereview: "Full packed movie for nani, loved the most.",
    rating: 8.3,
    trailerLink: "https://www.youtube.com/watch?v=jVEE7mvg8Sc",
    reviewLink: ""
  },
  "801688": {
    //KALKI
    moviereview: "I loved entry scene the most and also lucky girl role.",
    rating: 8.7,
    trailerLink: "https://www.youtube.com/watch?v=y1-w1kUGuz8",
    reviewLink: ""
  },
  "770906": {
    //SALAR
    moviereview: "Netflx lo kanisam week ki 4 times chustanu movie ni, fav movie ever.",
    rating: 9.0,
    trailerLink: "https://www.youtube.com/watch?v=4GPvYMKtrtI",
    reviewLink: ""
  }
    // Add more movies here as needed
  }), []);
  
  useEffect(() => {
    // Fetch movie details if not passed via state
    if (!currentMovieDetail) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    }
  
    // Set YouTube and review links based on movie ID
    const movieData = movieLinks[id] || {};
    setTrailerLink(movieData.trailerLink || null); // Default to null if no link is found
    setReviewLink(movieData.reviewLink || null);
    setRating(movieData.rating || null);
    setMovieReview(movieData.moviereview || null);
  
  }, [id, currentMovieDetail, movieLinks]);
  
 
  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={
            currentMovieDetail?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
              : "/finaltfilogo.png"
          }
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
            <div className="insider_review">
              <strong style={{ color: "#FFD700" }}>TFInsider Review:</strong>
            </div>
            <div>
              <span style={{ color: "#C0C0C0" }}>
                {moviereview || "No review available"}
              </span>
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
        </div>
      </div>

      {/* YouTube Links Section */}
      <div className="movie__links">
        <div className="movie__heading">Related Links</div>
        {trailerLink ? (
          <a
            href={trailerLink}
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie_trailerButton trailer__button">
                Watch Trailer{" "}
                <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        ) : (
          <p>No YouTube link available.</p>
        )}

        {reviewLink ? (
          <a
            href={reviewLink}
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="youtubereview_button youtube_review__button">
                Public Review <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        ) : (
          <p>No review link available.</p>
        )}
      </div>

      {/* Useful Links Section */}
      <div className="movie__links">
        <div className="movie__heading">GET FREE TICKETS</div>

        <a
          href="/movies/reviewform" // Update the URL to the review form page
          style={{ textDecoration: "none", color: "#ffffff" }} // Keep the styling consistent
        >
          <p>
            <span className="movie__reviewButton review__Button">
              Submit Review
            </span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default MovieReview;
