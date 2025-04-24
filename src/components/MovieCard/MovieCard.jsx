import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const {
        id,
        title,
        poster_path,
        vote_average,
        release_date,
        genre_ids = []
    } = movie;

    const posterUrl = `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${poster_path}`;
    const releaseYear = new Date(release_date).getFullYear();

    // Add genre-based classes for special effects
    const isActionOrAdventure = genre_ids.some(id => [28, 12].includes(id)); // 28 is action, 12 is adventure
    const cardClasses = `movie-card ${isActionOrAdventure ? 'action' : ''}`;

    return (
        <Link to={`/movie/${id}`} className={cardClasses}>
            <div className="movie-poster">
                <img src={posterUrl} alt={title} />
            </div>
            <div className="movie-overlay">
                <h3 className="movie-title">{title}</h3>
                <div className="movie-info">
                    <span className="movie-year">{releaseYear}</span>
                </div>
            </div>
            {vote_average > 0 && (
                <div className="movie-rating">
                    <FaStar color="#FFD700" />
                    <span className="rating-number">
                        {vote_average.toFixed(1)}
                    </span>
                </div>
            )}
            <div className="release-date">
                {release_date}
            </div>
        </Link>
    );
};

export default MovieCard; 