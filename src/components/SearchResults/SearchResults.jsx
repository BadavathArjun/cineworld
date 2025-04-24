import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaStar, FaSearch } from 'react-icons/fa';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            } catch (err) {
                setError('Error searching for movies');
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    if (loading) {
        return (
            <div className="search-results loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-results error">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="search-results">
            <div className="search-header">
                <h1>
                    <FaSearch /> Search Results
                </h1>
                <p>Found {movies.length} results for "{query}"</p>
            </div>

            {movies.length === 0 ? (
                <div className="no-results">
                    <h2>No movies found</h2>
                    <p>Try searching with different keywords</p>
                </div>
            ) : (
                <div className="results-grid">
                    {movies.map(movie => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="movie-card"
                        >
                            <div className="movie-poster">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <div className="no-poster">
                                        <span>No Poster Available</span>
                                    </div>
                                )}
                            </div>
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <div className="movie-meta">
                                    <span className="year">
                                        {movie.release_date ?
                                            new Date(movie.release_date).getFullYear()
                                            : 'N/A'
                                        }
                                    </span>
                                    <span className="rating">
                                        <FaStar />
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 