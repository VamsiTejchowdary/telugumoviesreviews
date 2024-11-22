import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import TFI from "../../components/tfimeterlist/reviewmovielist";

const Home = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTextVisible, setIsTextVisible] = useState(false);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&sort_by=release_date.desc&vote_average.gte=5&page=1`
        );
        const data = await response.json();
        setRecentMovies(data.results.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recent Telugu movies:", error);
        setError("Failed to load movies.");
        setIsLoading(false);
      }
    };

    fetchRecentMovies();

    // const popupShown = sessionStorage.getItem("popupShown");
    // if (!popupShown) {
    //   setIsPopupVisible(true);
    //   sessionStorage.setItem("popupShown", "true");
    // }

    const timer = setTimeout(() => {
      setIsTextVisible(true);
      setTimeout(() => {
        setIsTextVisible(false);
      }, 6000);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* {isPopupVisible && (
    <div className="tfi-popup">
        <div className="tfi-popup-content">
            <img
                src="/finaltfilogo.png" // Replace with the logo URL
                alt="Announcement Logo"
                className="tfi-popup-logo"
            />
            <p className="tfi-popup-text">
                🎉 Hurray! Winners of the week have been announced. Get your free tickets now! 🎟️
            </p>
            <button
                className="tfi-popup-close"
                onClick={() => setIsPopupVisible(false)}
            >
                Close
            </button>
        </div>
    </div>
)} */}
      <div className="poster">
        <div>
          {isTextVisible && (
            <div className="review-prompt">
              <p>
                Submit your recent movie review and get tickets for{" "}
                <strong>upcoming releases</strong>{" "}
                <Link
                  to="/movies/reviewform"
                  style={{ textDecoration: "none", color: "#ffffff;" }}
                >
                  Review Form
                </Link>
              </p>
            </div>
          )}
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={1000}
            infiniteLoop={true}
            showStatus={false}
          >
            {recentMovies.map((movie) => (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
                key={movie.id}
              >
                <div className="posterImage">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={`Review of Telugu movie ${movie.original_title}`}
                  />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie?.original_title}
                  </div>
                  <div className="posterImage__runtime">
                    Released on: {movie?.release_date}
                  </div>
                  <div className="posterImage__description">
                    {movie?.overview}. Get a detailed review of this and other
                    Telugu cinema hits on Telugu Film Insights.
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
        <TFI recentMovies={recentMovies} />
      </div>
    </>
  );
};

export default Home;