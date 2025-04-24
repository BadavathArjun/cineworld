import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa6';
import './GenrePage.css';

const GenrePage = () => {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGenreDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
                );
                const data = await response.json();
                const currentGenre = data.genres.find(g => g.id === parseInt(genreId));
                setGenre(currentGenre);
            } catch (error) {
                console.error('Error fetching genre details:', error);
            }
        };

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
                );
                const data = await response.json();
                if (page === 1) {
                    setMovies(data.results);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...data.results]);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };

        fetchGenreDetails();
        fetchMovies();
    }, [genreId, page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (!genre) {
        return <div className="loading-spinner" />;
    }

    return (
        <div className="genre-page">
            <div className="genre-header">
                <h1>{genre.name} Movies</h1>
                <p>Explore the best {genre.name.toLowerCase()} movies</p>
            </div>

            <div className="movies-grid">
                {movies.map(movie => (
                    <a href={`/movie/${movie.id}`} key={movie.id} className="movie-card">
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
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <div className="movie-meta">
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                                <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {!loading && movies.length > 0 && (
                <button className="load-more-button" onClick={handleLoadMore}>
                    Load More Movies
                </button>
            )}

            {loading && <div className="loading-spinner" />}
        </div>
    );
};

export default GenrePage; 