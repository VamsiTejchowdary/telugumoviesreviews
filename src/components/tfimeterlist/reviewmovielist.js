import React, { useEffect, useState } from "react";
import "./reviewmovielist.css";
import Footer from "../../components/footer/footer";
import ReviewCard from "../reviewcard/reviewcard";

const ReviewsmovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = [];
      const limit = 10; // Limit the number of movie cards displayed
  
      // Hardcoded movie IDs and ratings
      const movieData = [
        { id: 857598, rating: 7.9, review: "\"First Half keka, second half good going over all ga rapa rapa.\"" }, //Pushpa-2
        { id: 1390698, rating: 8.1, review: "\"Satyadev anna kummesada chala baga act chesad enjoyed a lot.\"" }, //Zebra
        { id: 1102353, rating: 7.7, review: "\"Ok First Half, Excellent Second half with good twists. Vishwak anna agressive tandavamey\"." }, //Mechanic Rocky
        { id: 1233327, rating: 5.5, review: "\"Should be taken better\"" }, // Matka
        { id: 1239511, rating: 8.4, review: "\"After a different concept like Sir/Vaathi, Venky Atluri made a movie like Wolf of Wall Street and he succeeded in it. Bound script, tight screenplay, crisp runtime added value to the movie. Actors Dulqer Salman, Meenakshi Choudary did their best and the supporting characters also performed well. Even though some scenes feels like illogical, most of the movie makes sense. The writing and directing part by Venky Atluri outstands. Worth watching.\"" }, // Lucky Bhaskar
        { id: 1353436, rating: 7.6, review: "\"Story and screenplay dominated acting\"."  }, // KA
        { id: 1249902, rating: 8.0, review: "\"End to end laguther.\""  }, // Mathu Vadhalara-2
        { id: 811941, rating: 8.5, review: "\"Story was ok, NTR screen presence is what I liked the most.\""  },  // Devara × TAKARAZUKA
        { id: 1194915, rating: 8.3, review: "\"Full packed movie for nani, loved the most.\""  }, // Saripodha Sanivaram
        { id: 801688, rating: 8.7, review: "\"I loved entry scene the most and also lucky girl role\"."  },  // Kalki
        { id: 770906, rating: 9.0, review: "\"Netflx lo kanisam week ki 4 times chustanu movie ni, fav movie ever.\""  },  // Salaar
      ];
  
      for (let i = 0; i < Math.min(movieData.length, limit); i++) {
        const { id, rating, review} = movieData[i];
        const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=acaba87d72eba033de2058214994a722&language=te`;
  
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          movies.push({
            ...data,
            rating: rating,
            review: review, // Add the hardcoded rating
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
              <ReviewCard movie={movie} key={movie.id} rating={movie.rating}  review={movie.review}/>
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