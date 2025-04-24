import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaGun, // Action
    FaCompass, // Adventure
    FaChild, // Animation
    FaFaceLaugh, // Comedy
    FaHandcuffs, // Crime
    FaVideo, // Documentary
    FaMasksTheater, // Drama
    FaHouse, // Family
    FaDragon, // Fantasy
    FaLandmark, // History
    FaSkull, // Horror
    FaMusic, // Music
    FaMagnifyingGlass, // Mystery
    FaHeart, // Romance
    FaRobot, // Science Fiction
    FaTv, // TV Movie
    FaUserNinja, // Thriller
    FaShield // War
} from 'react-icons/fa6';
import './GenreList.css';

const genreIcons = {
    28: { icon: FaGun, color: '#f57c00' },         // Action
    12: { icon: FaCompass, color: '#d81b60' },     // Adventure
    16: { icon: FaChild, color: '#8e24aa' },       // Animation
    35: { icon: FaFaceLaugh, color: '#5e35b1' },   // Comedy
    80: { icon: FaHandcuffs, color: '#3949ab' },   // Crime
    99: { icon: FaVideo, color: '#1e88e5' },       // Documentary
    18: { icon: FaMasksTheater, color: '#039be5' }, // Drama
    10751: { icon: FaHouse, color: '#00acc1' },    // Family
    14: { icon: FaDragon, color: '#00897b' },       // Fantasy
    36: { icon: FaLandmark, color: '#43a047' },    // History
    27: { icon: FaSkull, color: '#7cb342' },       // Horror
    10402: { icon: FaMusic, color: '#c0ca33' },    // Music
    9648: { icon: FaMagnifyingGlass, color: '#fdd835' }, // Mystery
    10749: { icon: FaHeart, color: '#fb8c00' },    // Romance
    878: { icon: FaRobot, color: '#f4511e' },      // Science Fiction
    10770: { icon: FaTv, color: '#6d4c41' },       // TV Movie
    53: { icon: FaUserNinja, color: '#757575' },   // Thriller
    10752: { icon: FaShield, color: '#546e7a' }    // War
};

const GenreList = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
                );
                const data = await response.json();
                // Filter to only include genres we have icons for
                const filteredGenres = data.genres.filter(genre => genreIcons[genre.id]);
                setGenres(filteredGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="genre-section">
            <h2 className="genre-heading">Browse by Genre</h2>
            <div className="genre-list">
                {genres.map((genre) => {
                    const { icon: Icon, color } = genreIcons[genre.id] || { icon: FaVideo, color: '#1e88e5' };
                    return (
                        <Link
                            to={`/genre/${genre.id}`}
                            key={genre.id}
                            className="genre-card"
                            style={{ backgroundColor: color }}
                        >
                            <Icon className="genre-icon" />
                            <span className="genre-explore">Explore →</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default GenreList; 