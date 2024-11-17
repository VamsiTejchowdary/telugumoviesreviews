import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Footer  from "../../components/footer/footer";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        // Fetch popular movies
        fetch(
            "https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2015-01-01&sort_by=popularity.asc&vote_average.gte=7https://api.themoviedb.org/3/discover/movie?api_key=acaba87d72eba033de2058214994a722&with_original_language=te&primary_release_date.gte=2024-01-01&primary_release_date.lte=2024-12-31&sort_by=vote_average.desc&vote_average.gte=7"
        )
            .then((res) => res.json())
            .then((data) => setPopularMovies(data.results));
    }, []);

    return (
        <>
            <div className="poster">
                <div>
                    <h1> Movie Lovers Top Rated</h1>
                </div>
                <div>
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {popularMovies.map((movie) => (
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
                                            <i className="fas fa-star" />{" "}
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
                {/* Pass popularMovies to MovieList component */}
                <MovieList movies={popularMovies} />
                <Footer/>
            </div>
        </>
    );
};

export default Home;