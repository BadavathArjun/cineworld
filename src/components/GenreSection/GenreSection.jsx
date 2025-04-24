import { Link } from 'react-router-dom';
import { 
  FaMusic, FaFilm, FaGamepad, FaBook, FaTheaterMasks, 
  FaPaintBrush, FaUtensils, FaRunning, FaLaughBeam, 
  FaFlask, FaHeadphones, FaCamera, FaCode, FaFutbol, 
  FaShoppingBag, FaChevronRight 
} from 'react-icons/fa';
import './GenreSection.css';

const genreIcons = {
  'music': <FaMusic />,
  'movie': <FaFilm />,
  'game': <FaGamepad />,
  'book': <FaBook />,
  'theater': <FaTheaterMasks />,
  'art': <FaPaintBrush />,
  'food': <FaUtensils />,
  'sport': <FaRunning />,
  'comedy': <FaLaughBeam />,
  'science': <FaFlask />,
  'audio': <FaHeadphones />,
  'photo': <FaCamera />,
  'tech': <FaCode />,
  'fitness': <FaFutbol />,
  'fashion': <FaShoppingBag />,
  // Add more genre-icon mappings as needed
};

const GenreSection = ({ genres }) => {
  const getGenreIcon = (genreName) => {
    const lowerName = genreName.toLowerCase();
    for (const [key, icon] of Object.entries(genreIcons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }
    return <FaMusic />; // Default icon
  };

  return (
    <section className="genre-section">
      <h2 className="section-title">Explore by Genre</h2>
      <div className="genres-container">
        <div className="genres-scroll">
          {genres.map(genre => (
            <Link
              to={`/genre/${genre.id}`}
              key={genre.id}
              className="genre-card"
              style={{
                background: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`
              }}
            >
              <div className="genre-content">
                <div className="genre-icon">
                  {getGenreIcon(genre.name)}
                </div>
                <h3 className="genre-name">{genre.name}</h3>
                <div className="genre-arrow">
                  <FaChevronRight />
                </div>
              </div>
              <div className="genre-overlay"></div>
              <div className="genre-hover-effect"></div>
              <div className="genre-particles">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="particle"></div>
                ))}
              </div>
              <div className="genre-sparkles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="sparkle"></div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to generate random vibrant colors
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607',
    '#8338EC', '#3A86FF', '#FF006E', '#A5DD9B', '#F9C74F',
    '#90BE6D', '#43AA8B', '#577590', '#F94144', '#F3722C',
    '#2EC4B6', '#E71D36', '#FF9F1C', '#011627', '#2EC4B6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default GenreSection;