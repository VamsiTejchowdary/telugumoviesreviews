import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import TFIReviews from './components/tfimeterlist/reviewmovielist';
import MovieReview from './pages/movieDetail/moviereview';
import ReviewForm from './components/reviewform/reviewform';
import { RatingProvider } from './context/RatingContext'; 

function App() {
  return (
    <div className="App">
      
      <RatingProvider> {/* Wrap the app with RatingProvider */}
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="movies/:type" element={<MovieList />} />
            <Route path="movies/Insights" element={<TFIReviews />} />
            <Route path="movies/Reviewform" element={<ReviewForm />} />
            <Route path="/moviereview/:id" element={<MovieReview />} /> {/* Remove the :rating from the URL */}
            <Route path="/*" element={<h1>Error Page</h1>} />
          </Routes>
        </Router>
      </RatingProvider>
    </div>
  );
}

export default App;