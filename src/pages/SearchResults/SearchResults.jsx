import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaVideo, FaStar } from 'react-icons/fa';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`
                );
                const data = await response.json();
                if (page === 1) {
                    setMovies(data.results);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                }
                setTotalResults(data.total_results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [query, page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    if (!query) {
        return (
            <div className="search-results">
                <div className="search-header">
                    <h1>Search Movies</h1>
                    <p>Enter a search term to find movies</p>
                </div>
            </div>
        );
    }

    return (
        <div className="search-results">
            <div className="search-header">
                <h1>Search Results for "{query}"</h1>
                <p>{totalResults} movies found</p>
            </div>

            <div className="movies-grid">
                {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="no-poster">
                                <FaVideo />
                                <span>No Poster</span>
                            </div>
                        )}
                        <div className="release-date">
                            {formatDate(movie.release_date)}
                        </div>
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <div className="movie-meta">
                                <div className="rating">
                                    <FaStar /> {movie.vote_average.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {!loading && movies.length > 0 && movies.length < totalResults && (
                <button className="load-more-button" onClick={handleLoadMore}>
                    Load More Results
                </button>
            )}

            {loading && <div className="loading-spinner" />}

            {!loading && movies.length === 0 && (
                <div className="no-results">
                    <FaVideo className="no-results-icon" />
                    <h2>No movies found</h2>
                    <p>Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults; 