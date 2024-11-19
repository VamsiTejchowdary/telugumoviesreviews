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
    const [isTextVisible, setIsTextVisible] = useState(false); // State to track text visibility

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

        // Set the text to appear for 5 seconds
        const timer = setTimeout(() => {
            setIsTextVisible(true);
            setTimeout(() => {
                setIsTextVisible(false);
            }, 6000); // Hide the text after 5 seconds
        }, 0); // Show text immediately after the page loads

        return () => clearTimeout(timer); // Cleanup the timer on unmount
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
                <div>
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={1000} // Adjust transition time
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
                                        alt={movie.original_title}
                                    />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">
                                        {movie?.original_title}
                                    </div>
                                    <div className="posterImage__runtime">
                                        {movie?.release_date}
                                    </div>
                                    <div className="posterImage__description">
                                        {movie?.overview}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
                {/* Text below the carousel (visible for 5 seconds) */}
                {isTextVisible && (
                    <div className="review-prompt">
                        <p>
                            Submit your recent movie review and get tickets for <strong>Pushpa 2</strong>! 
                            <Link to="/movies/reviewform" style={{ textDecoration: "none", color: "#ffffff;" }}>
                                Review Form
                            </Link>
                        </p>
                    </div>
                )}
                {/* Pass recentMovies to TFI component if needed */}
                <TFI recentMovies={recentMovies} />
            </div>
        </>
    );
};

export default Home;