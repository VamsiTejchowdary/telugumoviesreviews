import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./moviereview.css";
import Footer from "../../components/footer/footer";
import CrewList from "../../components/crew/crew";

const MovieReview = () => {
  const location = useLocation(); // Get location to access state
  const { id } = useParams(); // Extract `id` from URL
  const [currentMovieDetail, setMovie] = useState(
    location.state?.movieDetails || null
  ); // Initialize with passed state or null
  const [trailerLink, setTrailerLink] = useState(null); // Initialize YouTube link state
  const [reviewLink, setReviewLink] = useState(null); // Initialize review link state
  const [rating, setRating] = useState(null); // Initialize rating state
  const [moviereview, setMovieReview] = useState(null); // Initialize review text state
  const [streamingService, setStreamingService] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [crewDetails, setCrewDetails] = useState([]);

  const movieLinks = useMemo(
    () => ({
      1399790: {
        //BACHALLA MALLI
        moviereview:
          "Naresh anna acting tapha em led anna cinema loo.",
        rating: 6.1,
        trailerLink: "https://www.youtube.com/watch?v=aggB9HZItzg",
        reviewLink: "https://www.youtube.com/watch?v=_yCo-hHCjfE",
        streamingOn: "",
      },

      857598: {
        //PUSHPA-2
        moviereview:
          "First Half keka, second half good going over all ga rapa rapa.",
        rating: 7.9,
        trailerLink: "https://www.youtube.com/watch?v=g3JUbgOHgdw",
        reviewLink: "https://www.youtube.com/watch?v=C3NeVVa2xUc",
        streamingOn: "",
      },
      1390698: {
        //ZEBRA
        moviereview:
          "Satyadev anna kummesada chala baga act chesad enjoyed a lot.",
        rating: 8.1,
        trailerLink: "https://www.youtube.com/watch?v=xDfuWMmlS1w",
        reviewLink: "https://www.youtube.com/watch?v=R31XDoAGXSg",
        streamingOn: {
          name: "AHA VIDEO",
          logo: "/Aha_logo.png",
          url: "https://www.aha.video/movie/zebra",
        },
      },
      1102353: {
        //MECHANIC ROCKY
        moviereview:
          "Ok First Half, Excellent Second half with good twists. Vishwak anna agressive tandavamey.",
        rating: 7.7,
        trailerLink: "https://www.youtube.com/watch?v=tEBYk7cA8Vk",
        reviewLink: "https://www.youtube.com/watch?v=ltDcabArSkQ",
        streamingOn: {
          name: "Prime Video",
          logo: "/prime_logo.png",
          url: "https://www.primevideo.com/detail/Mechanic-Rocky/0J8V0T4BPV421OT6Y3TWO4P0TJ",
        },
      },
      1233327: {
        //MATKA
        moviereview: "Should be taken better",
        rating: 5.5,
        trailerLink: "https://www.youtube.com/watch?v=FKtnAhHnfUo",
        reviewLink: "https://www.youtube.com/watch?v=JwcB9ZcUIOA",
        streamingOn: {
          name: "Prime Video",
          logo: "/prime_logo.png",
          url: "https://www.primevideo.com/detail/Matka/0NUKTYDUQO2KYCTJ2RK4CTASXF",
        },
      },
      1239511: {
        //LUCKY BHASKAR
        moviereview:
          "After a different concept like Sir/Vaathi, Venky Atluri made a movie like Wolf of Wall Street and he succeeded in it. Bound script, tight screenplay, crisp runtime added value to the movie. Actors Dulqer Salman, Meenakshi Choudary did their best and the supporting characters also performed well. Even though some scenes feels like illogical, most of the movie makes sense. The writing and directing part by Venky Atluri outstands. Worth watching.",
        rating: 8.4,
        trailerLink: "https://www.youtube.com/watch?v=krdomVobIxE",
        reviewLink: "https://www.youtube.com/watch?v=j3w37GPSHhE",
        streamingOn: {
          name: "Netflix",
          logo: "/netflix_logo.png",
          url: "https://www.netflix.com/title/81902035",
        },
      },
      1353436: {
        //KA
        moviereview: "Story and screenplay dominated acting.",
        rating: 7.6,
        trailerLink: "https://www.youtube.com/watch?v=n75xEs-9u1I",
        reviewLink: "https://www.youtube.com/watch?v=7T3x77fPaX4",
        streamingOn: {
          name: "ETV Win",
          logo: "/etv_win_logo.png",
          url: "https://www.etvwin.com/original-movies/ka-with-dolby-vision-and-atmos",
        },
      },
      1249902: {
        //MATHU VADHLARA - 2
        moviereview: "End to end laguther.",
        rating: 8.0,
        trailerLink: "https://www.youtube.com/watch?v=ahZX-ewuZP8",
        reviewLink: "https://www.youtube.com/watch?v=hklfS3ep-zU",
        streamingOn: {
          name: "Netflix",
          logo: "/netflix_logo.png",
          url: "https://www.netflix.com/title/81942680",
        },
      },
      811941: {
        //DEVARA
        moviereview:
          "Story was ok, NTR screen presence is what I liked the most.",
        rating: 7.8,
        trailerLink: "https://www.youtube.com/watch?v=5cx7rvMvAWo&t=3s",
        reviewLink: "",
        streamingOn: {
          name: "Netflix",
          logo: "/netflix_logo.png",
          url: "https://www.netflix.com/title/81728598",
        },
      },
      1194915: {
        //SARIPODHA SANIVARAM
        moviereview: "Full packed movie for nani, loved the most.",
        rating: 8.3,
        trailerLink: "https://www.youtube.com/watch?v=dkx07ZvjKE4",
        reviewLink: "",
        streamingOn: {
          name: "Netflix",
          logo: "/netflix_logo.png",
          url: "https://www.netflix.com/search?q=sarip&jbv=81770422",
        },
      },
      801688: {
        //KALKI
        moviereview: "I loved entry scene the most and also lucky girl role.",
        rating: 8.7,
        trailerLink: "https://www.youtube.com/watch?v=aninoDcPWo4",
        reviewLink: "",
        streamingOn: {
          name: "Prime Video",
          logo: "/prime_logo.png",
          url: "https://www.amazon.com/Kalki-2898-AD-Nag-Ashwin/dp/B0DC74WPTT",
        },
      },
      770906: {
        //SALAR
        moviereview:
          "Netflx lo kanisam week ki 4 times chustanu movie ni, fav movie ever.",
        rating: 9.0,
        trailerLink: "https://www.youtube.com/watch?v=4GPvYMKtrtI",
        reviewLink: "",
        streamingOn: { name: "Netflix", logo: "/netflix_logo.png", url:"https://www.netflix.com/search?q=sala&jbv=81727155" },
      },
      1232219: {
        //Mr.Bachan
        moviereview:
          "Enti bro ravi anna tesey cinemala asluu.",
        rating: 5.2,
        trailerLink: "https://www.youtube.com/watch?v=BZefBM0Bwdc",
        reviewLink: "",
        streamingOn: { name: "Netflix", logo: "/netflix_logo.png", url:"https://www.netflix.com/search?q=mr%20&jbv=81918754" },
      },
      // Add more movies here as needed
    }),
    []
  );

  useEffect(() => {
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

    const movieData = movieLinks[id] || {};
    setTrailerLink(movieData.trailerLink || null);
    setReviewLink(movieData.reviewLink || null);
    setRating(movieData.rating || null);
    setMovieReview(movieData.moviereview || null);
    setStreamingService(movieData.streamingOn || null);

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=acaba87d72eba033de2058214994a722`
    )
      .then((res) => res.json())
      .then((data) => {
        // Get the top 10 important cast members (hero, heroine, etc.)
        const mainCast = data.cast.slice(0, 20); // You can adjust the number as needed
        setCrewDetails(mainCast);
      })
      .catch((error) => console.error("Error fetching crew details:", error));
  }, [id, currentMovieDetail, movieLinks]);

  const getYouTubeEmbedUrl = (url) => {
    const urlParams = new URL(url).searchParams;
    return `https://www.youtube.com/embed/${urlParams.get("v")}`;
  };

  return (
    <div className="movie">
      {/* <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={
            currentMovieDetail?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
              : "/finaltfilogo.png"
          }
          alt="Movie Backdrop"
        />
      </div> */}
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

      {/* CrewList */}
      <div className="movie__crew">
        <h3 className="meet-the-crew-heading">Movie Cast</h3>
        {crewDetails.length === 0 ? (
          <p>No available data</p> // Display this message when crewDetails is empty
        ) : (
          <CrewList crewDetails={crewDetails} />
        )}
      </div>

      {/* Embedded Trailer Section */}
      {trailerLink && (
        <div className="movie__trailer">
          <iframe
            src={getYouTubeEmbedUrl(trailerLink)}
            title="YouTube trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="movie__links">
        {reviewLink ? (
          <a
            href={reviewLink}
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="youtubereview_button youtube_review__button">
                Public Review{" "}
                <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        ) : (
          <p>No public review link available.</p>
        )}
      </div>

      {/* Streaming Information Section */}
      <div className="streaming__info">
        {streamingService ? (
          <>
            <p>
              <strong>Streaming on:</strong>
            </p>
            <a
              href={streamingService.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={streamingService.logo}
                alt={`${streamingService.name} logo`}
                className="streaming__logo"
              />
            </a>
          </>
        ) : (
          <p>
            <strong>Streaming on:</strong> Not on OTT
          </p>
        )}
      </div>
      <div className="movie__feedback">
        <p className="feedback__text">
          Have you watched the movie? Did you enjoy it?
        </p>
        <div className="movie__feedbackIcons">
          <i
            className={`fas fa-thumbs-up ${
              feedback === "up" ? "active-feedback" : ""
            }`}
            onClick={() => setFeedback("up")}
          ></i>
          <i
            className={`fas fa-thumbs-down ${
              feedback === "down" ? "active-feedback" : ""
            }`}
            onClick={() => setFeedback("down")}
          ></i>
        </div>
      </div>

      <div className="movie__links">
        <div className="movie__heading">GET FREE TICKETS</div>
        <a
          href="/movies/reviewform"
          style={{ textDecoration: "none", color: "#ffffff" }}
        >
          <p>
            <span className="movie__reviewButton review__Button">
              Submit Review
            </span>
          </p>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default MovieReview;
