import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTimes } from 'react-icons/fa';
import './Favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (favoriteIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const moviePromises = favoriteIds.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
                        .then(res => res.json())
                );

                const movies = await Promise.all(moviePromises);
                setFavorites(movies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = (movieId) => {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favoriteIds.filter(id => id !== movieId.toString());
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(favorites.filter(movie => movie.id !== movieId));

        // Dispatch custom event to update navbar counter
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    if (loading) {
        return (
            <div className="favorites-page loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="favorites-header">
                <h1><FaHeart /> My Favorites</h1>
                <p>{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}</p>
            </div>

            {favorites.length === 0 ? (
                <div className="no-favorites">
                    <h2>No favorites yet</h2>
                    <p>Start adding movies to your favorites list!</p>
                    <Link to="/" className="browse-movies-btn">Browse Movies</Link>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map(movie => (
                        <div key={movie.id} className="favorite-card">
                            <button
                                className="remove-favorite"
                                onClick={() => removeFavorite(movie.id)}
                                title="Remove from favorites"
                            >
                                <FaTimes />
                            </button>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="favorite-info">
                                    <h3>{movie.title}</h3>
                                    <p>{new Date(movie.release_date).getFullYear()}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites; 