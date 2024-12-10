import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import TFIReviews from './components/tfimeterlist/reviewmovielist';
import MovieReview from './pages/movieDetail/moviereview';
import ReviewForm from './components/reviewform/reviewform';
import FAQ from './components/faq/faq';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="movies/:type" element={<MovieList />} />
            <Route path="movies/Insights" element={<TFIReviews />} />
            <Route path="movies/Reviewform" element={<ReviewForm />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/moviereview/:id" element={<MovieReview />} /> {/* Remove the :rating from the URL */}
            <Route path="/*" element={<h1>Error Page</h1>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;