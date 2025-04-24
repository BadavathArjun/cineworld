import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaCalendar, FaClock, FaInfoCircle, FaUsers, FaPlay, FaArrowLeft, FaDollarSign, FaTicketAlt, FaLanguage, FaFilm } from 'react-icons/fa';
import Footer from '../Footer/Footer';
import './MovieDetails.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [trailers, setTrailers] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) {
                setError('Movie ID is missing');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const [movieResponse, creditsResponse, videosResponse, similarResponse] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
                ]);

                if (!movieResponse.ok || !creditsResponse.ok || !videosResponse.ok || !similarResponse.ok) {
                    throw new Error('Failed to fetch movie data');
                }

                const [movieData, creditsData, videosData, similarData] = await Promise.all([
                    movieResponse.json(),
                    creditsResponse.json(),
                    videosResponse.json(),
                    similarResponse.json()
                ]);

                if (movieData.success === false) {
                    throw new Error(movieData.status_message || 'Failed to fetch movie data');
                }

                setMovie(movieData);
                setCast(creditsData.cast?.slice(0, 12) || []);
                setCrew(creditsData.crew?.filter(person =>
                    person.job === "Director" ||
                    person.job === "Producer" ||
                    person.job === "Screenplay" ||
                    person.job === "Writer"
                ) || []);
                setTrailers(videosData.results?.filter(video => video.type === "Trailer") || []);
                setSimilarMovies(similarData.results?.slice(0, 6) || []);

                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                setIsFavorite(favorites.includes(movieId.toString()));
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const toggleFavorite = () => {
        if (!movie) return;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            const updatedFavorites = favorites.filter(favId => favId !== movieId.toString());
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(movieId.toString());
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading movie details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p>{error}</p>
                <button className="home-button" onClick={() => navigate('/')}>Go Back Home</button>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="error-container">
                <h2>Movie Not Found</h2>
                <button className="home-button" onClick={() => navigate('/')}>Go Back Home</button>
            </div>
        );
    }

    return (
        <div className="movie-details-page">
            <div className="movie-backdrop" style={{
                backgroundImage: movie.backdrop_path
                    ? `linear-gradient(to right, rgba(20, 20, 20, 0.9) 0%, rgba(20, 20, 20, 0.7) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : 'none'
            }}></div>

            <button className="back-button" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Back
            </button>

            <div className="movie-content-container">
                <div className="movie-poster-container">
                    {movie.poster_path ? (
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="movie-poster"
                            loading="lazy"
                        />
                    ) : (
                        <div className="poster-placeholder">
                            <FaFilm size={50} />
                        </div>
                    )}
                </div>

                <div className="movie-info-container">
                    <div className="movie-header">
                        <h1>{movie.title} {movie.release_date && <span>({new Date(movie.release_date).getFullYear()})</span>}</h1>
                        
                        <div className="movie-actions">
                            <button
                                className={`favorite-button ${isFavorite ? 'active' : ''}`}
                                onClick={toggleFavorite}
                            >
                                <FaHeart /> {isFavorite ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>

                    <div className="movie-meta">
                        {movie.vote_average !== undefined && (
                            <div className="meta-item rating">
                                <FaStar className="meta-icon" />
                                <span>{movie.vote_average.toFixed(1)}/10</span>
                            </div>
                        )}
                        {movie.runtime && (
                            <div className="meta-item runtime">
                                <FaClock className="meta-icon" />
                                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                            </div>
                        )}
                        {movie.release_date && (
                            <div className="meta-item release-date">
                                <FaCalendar className="meta-icon" />
                                <span>{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        )}
                        {movie.original_language && (
                            <div className="meta-item language">
                                <FaLanguage className="meta-icon" />
                                <span>{movie.original_language.toUpperCase()}</span>
                            </div>
                        )}
                    </div>

                    {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}

                    <div className="tabs-container">
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <FaInfoCircle /> Overview
                            </button>
                            <button
                                className={`tab ${activeTab === 'cast' ? 'active' : ''}`}
                                onClick={() => setActiveTab('cast')}
                            >
                                <FaUsers /> Cast & Crew
                            </button>
                            <button
                                className={`tab ${activeTab === 'trailers' ? 'active' : ''}`}
                                onClick={() => setActiveTab('trailers')}
                            >
                                <FaPlay /> Media
                            </button>
                        </div>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <>
                                <h3 className="section-title">Synopsis</h3>
                                <p className="overview">{movie.overview || 'No overview available.'}</p>

                                <div className="movie-details-grid">
                                    <div className="detail-section">
                                        <h4 className="detail-title">Status</h4>
                                        <p className="detail-value">{movie.status || 'N/A'}</p>
                                    </div>
                                    <div className="detail-section">
                                        <h4 className="detail-title">Budget</h4>
                                        <p className="detail-value">
                                            {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="detail-section">
                                        <h4 className="detail-title">Revenue</h4>
                                        <p className="detail-value">
                                            {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {movie.production_companies && movie.production_companies.length > 0 && (
                                    <div className="production-section">
                                        <h3 className="section-title">Production Companies</h3>
                                        <div className="companies-grid">
                                            {movie.production_companies.map(company => (
                                                <div key={company.id} className="company-item">
                                                    {company.logo_path ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                            alt={company.name}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <span className="company-name">{company.name}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === 'cast' && (
                            <div className="cast-crew-section">
                                <div className="cast-section">
                                    <h3 className="section-title">Top Cast</h3>
                                    {cast.length > 0 ? (
                                        <div className="cast-grid">
                                            {cast.map(actor => (
                                                <div key={actor.id} className="cast-card">
                                                    <div className="cast-image-container">
                                                        <img
                                                            src={actor.profile_path
                                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                                : '/placeholder-profile.png'}
                                                            alt={actor.name}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="cast-info">
                                                        <h4 className="cast-name">{actor.name}</h4>
                                                        <p className="cast-character">{actor.character}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-data">No cast information available</p>
                                    )}
                                </div>

                                <div className="crew-section">
                                    <h3 className="section-title">Key Crew</h3>
                                    {crew.length > 0 ? (
                                        <div className="crew-grid">
                                            {crew.map(person => (
                                                <div key={`${person.id}-${person.job}`} className="crew-card">
                                                    <div className="crew-info">
                                                        <h4 className="crew-name">{person.name}</h4>
                                                        <p className="crew-job">{person.job}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-data">No crew information available</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'trailers' && (
                            <div className="media-section">
                                <h3 className="section-title">Trailers</h3>
                                {trailers.length > 0 ? (
                                    <div className="trailers-grid">
                                        {trailers.map(trailer => (
                                            <div key={trailer.id} className="trailer-card">
                                                <div className="trailer-video-container">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&modestbranding=1`}
                                                        title={trailer.name}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <h4 className="trailer-title">{trailer.name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">No trailers available</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {similarMovies.length > 0 && (
                <div className="similar-movies-section">
                    <div className="section-header">
                        <h2 className="section-title">Similar Movies</h2>
                    </div>
                    <div className="similar-movies-grid">
                        {similarMovies.map(similarMovie => (
                            <div 
                                key={similarMovie.id} 
                                className="similar-movie-card"
                                onClick={() => navigate(`/movie/${similarMovie.id}`)}
                            >
                                <img
                                    src={similarMovie.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`
                                        : '/placeholder-poster.png'}
                                    alt={similarMovie.title}
                                    loading="lazy"
                                />
                                <div className="similar-movie-info">
                                    <h4>{similarMovie.title}</h4>
                                    <div className="similar-movie-meta">
                                        <span><FaStar /> {similarMovie.vote_average.toFixed(1)}</span>
                                        <span>{new Date(similarMovie.release_date).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default MovieDetails;