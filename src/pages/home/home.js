import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import TFI from "../../components/tfimeterlist/reviewmovielist";

const Home = () => {
    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        const fetchRecentMovies = async () => {
            try {
                // Fetch the most recent Telugu movies
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&sort_by=release_date.desc&vote_average.gte=5&page=1`
                );
                const data = await response.json();

                // Get the first 8 movies
                setRecentMovies(data.results.slice(0, 8));
            } catch (error) {
                console.error("Error fetching recent Telugu movies:", error);
            }
        };

        fetchRecentMovies();
    }, []);

    return (
        <>
            <div className="poster">
                <div>
                    <h1>Recent Telugu Movies</h1>
                </div>
                <div>
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
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
                                        <span className="posterImage__rating">
                                            {movie?.vote_average}
                                            <i className="fas fa-star" />
                                        </span>
                                    </div>
                                    <div className="posterImage__description">
                                        {movie?.overview}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                </div>
                {/* Pass recentMovies to TFI component if needed */}
                <TFI recentMovies={recentMovies} />
            </div>
        </>
    );
};

export default Home;