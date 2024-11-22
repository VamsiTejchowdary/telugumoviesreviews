import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useRating } from "../../context/RatingContext"; // Import useRating hook
import "./reviewcard.css";

const ReviewCard = ({ movie, rating, review }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setRating, setReview } = useRating(); // Get setRating and setReview from context

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading time of 1.5 seconds
  }, []);

  const handleClick = () => {
    setRating(rating); // Store rating in context
    setReview(review); // Store review in context
  };

  return (
    <>
      {isLoading ? (
        <div className="review-card">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/moviereview/${movie.id}`} // Only pass movie ID in the URL
          style={{ textDecoration: "none", color: "white" }}
          onClick={handleClick} // Store rating and review when clicked
        >
          <div className="review-card">
            <img
              className="review-card__img"
              src={`https://image.tmdb.org/t/p/original${
                movie?.poster_path || ""
              }`}
              alt={movie?.original_title || "Movie Poster"}
            />
            <div className="review-card__overlay">
              <div className="review-card__title">
                {movie?.original_title || "Title Unavailable"}
              </div>
              <div className="review-card__runtime">
                {movie?.release_date || "Release Date Unavailable"}
              </div>
              <div className="review-card__tfi-meter">
                <strong>TFI Meter: </strong>
                <span>{rating || movie?.vote_average || "N/A"}</span>
                <i className="fas fa-star" style={{ color: "#FFD700" }} />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ReviewCard;