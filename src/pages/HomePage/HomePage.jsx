import { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import GenreList from '../../components/GenreList/GenreList';
import MediaSection from '../../components/MediaSection/MediaSection';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <GenreList />

            <main className="main-content">
                <MediaSection
                    title="Trending Movies"
                    endpoint="trending/movie/week"
                    type="movie"
                />

                <MediaSection
                    title="Trending TV Shows"
                    endpoint="trending/tv/week"
                    type="tv"
                />

                <MediaSection
                    title="Popular Movies"
                    endpoint="movie/popular"
                    type="movie"
                />

                <MediaSection
                    title="Popular TV Shows"
                    endpoint="tv/popular"
                    type="tv"
                />
            </main>
        </div>
    );
};

export default HomePage; 