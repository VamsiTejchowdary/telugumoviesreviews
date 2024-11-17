import React, { useEffect, useState } from "react";
import "./reviewmovielist.css";
import Footer from "../../components/footer/footer";
import ReviewCard from "../reviewcard/reviewcard";

const ReviewsmovieList = () => {
  const [movieList, setMovieList] = useState([]);

  // Hardcoded movie IDs and corresponding ratings
  

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = [];
      const limit = 8; // Show only 8 cards
  
      // Hardcoded movie IDs and corresponding ratings
      const movieData = [
        { id: 1233327, rating: 5.5 }, // Matka
        { id: 1239511, rating: 8.4 },//Lucky Bhaskar
        { id: 1353436, rating: 7.6 },//KA
        { id: 1249902, rating: 8 },//Mathu Vadhalara-2
        { id: 811941, rating: 8.5 }, // Devara × TAKARAZUKA
        { id: 1194915, rating: 8.3 }, // Saripodha sanivaram
        { id: 801688, rating: 8.7 },//kalki
        { id: 770906, rating: 9.0 }, // salaar
        
        
      ];
  
      for (let i = 0; i < Math.min(movieData.length, limit); i++) {
        const { id, rating } = movieData[i];
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722&language=te`;
  
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
  
          // Add the hardcoded rating along with the movie data
          movies.push({
            ...data,
            rating: rating, // Add the hardcoded rating here
          });
        } catch (error) {
          console.error(`Error fetching movie with ID ${id}:`, error);
        }
      }
  
      setMovieList(movies);
    };
  
    fetchMovies();
  }, []); // No need for movieData in dependencies

  return (
    <div>
      <div className="movie__list">
        <h2 className="list__title">Telugu Film Insights</h2>
        <div className="list__cards">
          {movieList.length > 0 ? (
            movieList.map((movie) => (
              <ReviewCard movie={movie} key={movie.id} rating={movie.rating} /> // Pass the hardcoded rating as a prop
            ))
          ) : (
            <h3>Loading movies...</h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsmovieList;
