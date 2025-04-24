import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaPlay, FaCircle } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
                );
                const data = await response.json();
                setMovies(data.results.slice(0, 5)); // Get first 5 movies
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 6000); // Change movie every 6 seconds

        return () => clearInterval(timer);
    }, [movies]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    if (loading || movies.length === 0) {
        return (
            <div className="hero-section loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const currentMovie = movies[currentIndex];

    return (
        <div className="hero-section">
            {movies.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    }}
                >
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1>{movie.title}</h1>
                        <div className="hero-meta">
                            <span className="rating">
                                <FaStar /> {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="year">
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                            <span className="runtime">
                                Coming Soon
                            </span>
                        </div>
                        <p className="overview">{movie.overview}</p>
                        <div className="hero-actions">
                            <Link to={`/movie/${movie.id}`} className="view-details-btn">
                                <FaPlay /> View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="hero-dots">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <FaCircle />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeroSection; 