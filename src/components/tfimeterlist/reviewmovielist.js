import React, { useEffect, useState } from "react";
import "./reviewmovielist.css";
import Footer from "../../components/footer/footer";
import ReviewCard from "../reviewcard/reviewcard";

const ReviewsmovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = [];
      const limit = 8; // Limit the number of movie cards displayed
  
      // Hardcoded movie IDs and ratings
      const movieData = [
        { id: 1233327, rating: 5.5 }, // Matka
        { id: 1239511, rating: 8.4 }, // Lucky Bhaskar
        { id: 1353436, rating: 7.6 }, // KA
        { id: 1249902, rating: 8.0 }, // Mathu Vadhalara-2
        { id: 811941, rating: 8.5 },  // Devara × TAKARAZUKA
        { id: 1194915, rating: 8.3 }, // Saripodha Sanivaram
        { id: 801688, rating: 8.7 },  // Kalki
        { id: 770906, rating: 9.0 },  // Salaar
      ];
  
      for (let i = 0; i < Math.min(movieData.length, limit); i++) {
        const { id, rating } = movieData[i];
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722&language=te`;
  
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          movies.push({
            ...data,
            rating: rating, // Add the hardcoded rating
          });
        } catch (error) {
          console.error(`Error fetching movie with ID ${id}:`, error);
        }
      }
  
      setMovieList(movies);
    };
  
    fetchMovies();
  }, []);

  return (
    <main>
      <section className="movie__list">
        <header>
          <h1 className="list__title">Latest Telugu Movies Reviews</h1>
          <div className="hidden-text">
            <p>
              Discover insights, ratings, and reviews for the most recent and
              popular Telugu movies. From blockbusters like{" "}
              <strong>Salaar</strong> to hidden gems like
              <strong>Mathu Vadhalara-2</strong>, dive into the world of
              Tollywood with Telugu Film Insights.
            </p>
          </div>
        </header>
        <div className="list__cards">
          {movieList.length > 0 ? (
            movieList.map((movie) => (
              <ReviewCard movie={movie} key={movie.id} rating={movie.rating} />
            ))
          ) : (
            <h3>Loading movie reviews...</h3>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ReviewsmovieList;