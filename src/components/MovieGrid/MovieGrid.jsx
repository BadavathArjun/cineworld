import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { FaSpinner } from 'react-icons/fa';
import './MovieGrid.css';

const MovieGrid = ({ 
  title, 
  fetchUrl, 
  type = 'movie',
  showLoadMore = false,
  initialPage = 1
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${fetchUrl}&page=${pageNum}`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      
      const data = await response.json();
      
      setMovies(prev => append ? [...prev, ...data.results] : data.results);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchUrl]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  if (error) {
    return (
      <div className="movies-error">
        <h2>Error Loading Movies</h2>
        <p>{error}</p>
        <button onClick={() => fetchMovies()}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="movie-grid-section">
      {title && <h2 className="section-title">{title}</h2>}
      
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
        
        {loading && (
          <div className="loading-overlay">
            <FaSpinner className="spinner" />
            <p>Loading movies...</p>
          </div>
        )}
      </div>

      {showLoadMore && hasMore && !loading && (
        <div className="load-more">
          <button 
            className="load-more-btn"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default MovieGrid; 