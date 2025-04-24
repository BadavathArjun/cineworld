import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import { FaFilm, FaTv } from 'react-icons/fa';
import './TrendingSection.css';

const TrendingSection = () => {
    const [activeTab, setActiveTab] = useState('movie');

    const tabs = [
        { id: 'movie', label: 'Movies', icon: FaFilm },
        { id: 'tv', label: 'TV Shows', icon: FaTv }
    ];

    return (
        <section className="trending-section">
            <div className="trending-header">
                <h2 className="section-title">Trending Now</h2>
                <div className="trending-tabs">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <MovieGrid
                fetchUrl={`https://api.themoviedb.org/3/trending/${activeTab}/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`}
                type={activeTab}
                showLoadMore={true}
            />
        </section>
    );
};

export default TrendingSection; 