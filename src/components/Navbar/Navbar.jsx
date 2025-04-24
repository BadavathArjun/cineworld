import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaFilm, FaHeart, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const updateFavoriteCount = () => {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            setFavoriteCount(favorites.length);
        };

        // Update count on mount
        updateFavoriteCount();

        // Listen for storage changes
        window.addEventListener('storage', updateFavoriteCount);

        // Custom event for favorite updates
        window.addEventListener('favoritesUpdated', updateFavoriteCount);

        return () => {
            window.removeEventListener('storage', updateFavoriteCount);
            window.removeEventListener('favoritesUpdated', updateFavoriteCount);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchFocused(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="nav-left">
                    <div className="nav-brand">
                        <Link to="/">
                            <span className="brand-cine">Cine</span>
                            <span className="brand-world">World</span>
                        </Link>
                    </div>

                    <form
                        className={`search-form ${isSearchFocused ? 'focused' : ''}`}
                        onSubmit={handleSearch}
                    >
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </form>
                </div>

                <div className="nav-links">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <FaHome />
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/movies"
                        className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}
                    >
                        <FaFilm />
                        <span>Movies</span>
                    </Link>

                    <Link
                        to="/favorites"
                        className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                    >
                        <FaHeart />
                        <span>Favorites</span>
                        {favoriteCount > 0 && (
                            <span className="favorite-count">{favoriteCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 