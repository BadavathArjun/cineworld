import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from '../MovieCard/MovieCard';
import './MediaSection.css';

const MediaSection = ({ title, endpoint, type }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/${endpoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                );
                const data = await response.json();
                setItems(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, [endpoint]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <section className="media-section loading">
                <h2>{title}</h2>
                <div className="loading-spinner"></div>
            </section>
        );
    }

    return (
        <section className="media-section">
            <h2 className="section-title">{title}</h2>

            <div className="media-slider">
                <button
                    className="scroll-button left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>

                <div className="media-container" ref={scrollContainerRef}>
                    {items.map(item => (
                        <div key={item.id} className="media-item">
                            <MovieCard
                                movie={{
                                    ...item,
                                    title: type === 'tv' ? item.name : item.title,
                                    release_date: type === 'tv' ? item.first_air_date : item.release_date
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="scroll-button right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
};

export default MediaSection; 