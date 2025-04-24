import React from 'react';
import { FaFire } from 'react-icons/fa';
import MovieGrid from '../MovieGrid/MovieGrid';
import './PopularSection.css';

const PopularSection = () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const fetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

    return (
        <section className="popular-section">
            <div className="popular-header">
                <h2 className="section-title">
                    <FaFire className="popular-icon" />
                    Popular Movies
                </h2>
            </div>
            <MovieGrid fetchUrl={fetchUrl} />
        </section>
    );
};

export default PopularSection; 