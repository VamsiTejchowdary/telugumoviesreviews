import React, { useEffect, useState, useRef } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import TFI from "../../components/tfimeterlist/reviewmovielist";

const Home = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [trailers] = useState([
    {
      title: "GAMECHANGER",
      videoUrl: "https://www.youtube.com/watch?v=zHiKFSBO_JE",
    },
    {
      title: "DAKUMAHARAJ",
      videoUrl: "https://www.youtube.com/watch?v=teN0JZ67KZU",
    },
    {
      title: "Sankranthi ki vastunam",
      videoUrl: "https://www.youtube.com/watch?v=yCkl2Z3PBs0",
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const trailerContainerRef = useRef(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const getYouTubeEmbedUrl = (url) => {
    const urlParams = new URL(url).searchParams;
    return `https://www.youtube.com/embed/${urlParams.get("v")}`;
  };

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&sort_by=release_date.desc&vote_average.gte=5&page=1`
        );
        const data = await response.json();
        
        // Filter out movies without a backdrop_path
        const filteredMovies = data.results.filter((movie) => movie.backdrop_path);
        setRecentMovies(filteredMovies.slice(0, 8));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recent Telugu movies:", error);
        setError("Failed to load movies.");
        setIsLoading(false);
      }

      const timer = setTimeout(() => {
        setIsTextVisible(true);
        setTimeout(() => {
          setIsTextVisible(false);
        }, 6000);
      }, 0);
      return () => clearTimeout(timer);
    };

    fetchRecentMovies();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="poster">
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
            <div key={movie.id} className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt={movie.original_title}
              />
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie?.original_title}
                </div>
                <div className="posterImage__runtime">
                  Released on: {movie?.release_date}
                </div>
                <div className="posterImage__description">
                  {movie?.overview}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="trailers">
          <h2> Upcoming Release Trailers</h2>
          <div className="trailers-container" ref={trailerContainerRef}>
            {trailers.map((trailer, index) => (
              <div key={index} className="trailer-item">
                <iframe
                  className="trailer-video"
                  src={getYouTubeEmbedUrl(trailer.videoUrl)}
                  title={trailer.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
        <TFI recentMovies={recentMovies} />
      </div>
    </>
  );
};

export default Home;
